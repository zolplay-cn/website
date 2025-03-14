'use client'

import { createContext, use } from 'react'

export interface EdgeConfigType {
  [key: string]: any
}

export const EdgeConfigContext = createContext<EdgeConfigType>({})

export function useEdgeConfig() {
  return use(EdgeConfigContext)
}
