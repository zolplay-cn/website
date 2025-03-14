'use client'

import { createContext, useContext } from 'react'

export interface EdgeConfigType {
  [key: string]: any
}

export const EdgeConfigContext = createContext<EdgeConfigType>({})

export function useEdgeConfig() {
  return useContext(EdgeConfigContext)
}

export function useConfigValue<T>(key: string, defaultValue?: T): T | undefined {
  const config = useEdgeConfig()
  return key in config ? config[key] : defaultValue
}
