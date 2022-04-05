import cookie from 'js-cookie'
import { useLayoutEffect } from 'react'
import create, { UseBoundStore } from 'zustand'
import createContext from 'zustand/context'

import { COOKIES_TOKEN_NAME } from '~/lib/apollo'

let store: UseBoundStore<AppState>

type AppState = {
  auth: {
    isLoading: boolean
    isAuthenticated: boolean
    profile?: MyProfile
  }
}

type AppActions = {
  signIn: (token: string) => void
  setMyProfile: (profile?: MyProfile) => void
}

const initialState: AppState = {
  auth: {
    isLoading: true,
    isAuthenticated: false,
  },
}
type StoreState = AppState & { actions: AppActions }

const zustandContext = createContext<StoreState>()
export const Provider = zustandContext.Provider
export const useStore = zustandContext.useStore

export const initializeStore = (preloadedState: Partial<AppState> = {}) => {
  const state = initialState

  if (typeof document !== 'undefined') {
    state.auth.isLoading = false

    if (cookie.get(COOKIES_TOKEN_NAME)) {
      state.auth.isAuthenticated = true
    }
  }

  // eslint-disable-next-line unused-imports/no-unused-vars
  return create<StoreState>((set) => ({
    ...state,
    ...preloadedState,
    actions: {
      signIn: (token: string) => {
        cookie.set(COOKIES_TOKEN_NAME, token, {
          expires: 90,
        })

        set((state) => ({
          auth: {
            ...state.auth,
            isLoading: false,
            isAuthenticated: true,
          },
        }))
      },
      setMyProfile: (profile?: MyProfile) => {
        set((state) => ({
          auth: {
            ...state.auth,
            profile,
          },
        }))
      },
    },
  }))
}

export function useCreateStore(initialState: Partial<AppState>) {
  // For SSR & SSG, always use a new store.
  if (typeof window === 'undefined') {
    return () => initializeStore(initialState)
  }

  // For CSR, always re-use the same store.
  store = store ?? initializeStore(initialState)

  // And if initialState changes, then merge states in the next render cycle.
  //
  // eslint complaining "React Hooks must be called in the exact same order in every component render"
  // is ignorable as this code runs in same order in a given environment
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useLayoutEffect(() => {
    if (initialState && store) {
      store.setState({
        ...store.getState(),
        ...initialState,
      })
    }
  }, [initialState])

  return () => store
}
