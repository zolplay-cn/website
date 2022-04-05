import { useEffect } from 'react'

import { useStore } from '~/store/app.store'

import { gql, useLazyQuery } from '@apollo/client'

const MY_PROFILE = gql`
  query MyProfile {
    me {
      id
      name
      phone
      email
    }
  }
`

export function useAuth() {
  const isLoading = useStore((state) => state.auth.isLoading)
  const isAuthenticated = useStore((state) => state.auth.isAuthenticated)
  const profile = useStore((state) => state.auth.profile)
  const { setMyProfile } = useStore((state) => state.actions)
  const [fetch, { loading, data }] = useLazyQuery<{ me: MyProfile }>(MY_PROFILE)

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      fetch()
    }
  }, [isLoading, isAuthenticated, fetch])

  useEffect(() => {
    if (data) {
      const { me } = data
      if (me) {
        setMyProfile(me)
      }
    }
  }, [data, setMyProfile])

  return {
    isLoadingAuth: isLoading,
    isAuthenticated,
    loadingProfile: loading,
    profile,
  }
}
