// Vercel Edge Config Reference: https://vercel.com/docs/edge-config/edge-config-integrations
import { createClient } from '@vercel/edge-config'

// eslint-disable-next-line node/prefer-global/process
const edgeConfigClient = createClient(process.env.EDGE_CONFIG || '')

export async function getConfigValue<T>(key: string, defaultValue?: T): Promise<T | undefined> {
  try {
    const value = await edgeConfigClient.get(key)
    return value !== undefined ? (value as T) : defaultValue
  } catch (error) {
    console.error(`Error getting config "${key}":`, error)
    return defaultValue
  }
}

export * from './hooks'
export * from './provider'
