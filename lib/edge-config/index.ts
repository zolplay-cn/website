// Vercel Edge Config Reference: https://vercel.com/docs/edge-config/edge-config-integrations
import { createClient } from '@vercel/edge-config'
import { cache } from 'react'

let edgeConfigClient: ReturnType<typeof createClient> | null = null

if (typeof window === 'undefined') {
  // eslint-disable-next-line node/prefer-global/process
  edgeConfigClient = createClient(process.env.EDGE_CONFIG || '')
}

export const getConfigValue = cache(async <T>(key: string, defaultValue?: T): Promise<T | undefined> => {
  try {
    if (!edgeConfigClient) {
      console.warn('Edge Config client not initialized or running in client side')
      return defaultValue
    }
    const value = await edgeConfigClient.get(key)
    return value !== undefined ? (value as T) : defaultValue
  } catch (error) {
    console.error(`Error getting config "${key}":`, error)
    return defaultValue
  }
})

export * from './hooks'
export * from './provider'
