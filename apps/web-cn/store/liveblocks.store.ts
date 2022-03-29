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
  setCursor: (cursor: { x: number; y: number }) => void
}

export const useLiveblocksStore = create(
  middleware<LiveblocksStoreState>(
    (set) => ({
      cursor: { x: -100, y: -100 },
      setCursor: (cursor) => set({ cursor }),
    }),
    { client, presenceMapping: { cursor: true } }
  )
)
