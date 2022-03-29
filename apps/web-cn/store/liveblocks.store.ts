import create from 'zustand'

import { createClient } from '@liveblocks/client'
import { middleware } from '@liveblocks/zustand'

const client = createClient({
  publicApiKey: process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY || '',
})

export const makeRoomIdByRoute = (route: string) => {
  return `${process.env.NEXT_PUBLIC_LIVEBLOCKS_ROOM_PREFIX || 'route_'}${route}`
}

export type LiveblocksStoreState = {
  cursor: {
    x: number
    y: number
  }
  message: string | null
  setCursor: (cursor: { x: number; y: number }) => void
  setMessage: (message: string | null) => void
}

export const useLiveblocksStore = create(
  middleware<LiveblocksStoreState>(
    (set) => ({
      cursor: { x: -100, y: -100 },
      message: null,
      setCursor: (cursor) => set({ cursor }),
      setMessage: (message) => set({ message }),
    }),
    { client, presenceMapping: { cursor: true, message: true } }
  )
)
