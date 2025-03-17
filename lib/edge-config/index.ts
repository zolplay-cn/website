import { createClient } from '@vercel/edge-config'
import { cache } from 'react'
import 'server-only'

export enum ConfigKey {
  ShowOpenPositions = 'showOpenPositions',
}

export interface ConfigValues {
  [ConfigKey.ShowOpenPositions]: boolean
}

let edgeConfigClient: ReturnType<typeof createClient>
try {
  // eslint-disable-next-line node/prefer-global/process
  edgeConfigClient = createClient(process.env.EDGE_CONFIG || '')
} catch (error) {
  console.error('Failed to initialize Edge Config client:', error)
  throw new Error('Edge Config initialization failed')
}

export const getConfigValue = cache(
  async <K extends ConfigKey>(key: K, defaultValue?: ConfigValues[K]): Promise<ConfigValues[K] | undefined> => {
    try {
      const value = await edgeConfigClient.get(key)
      if (value === undefined) return defaultValue
      return value as ConfigValues[K]
    } catch (error) {
      console.error(`Error getting config "${key}":`, error)
      return defaultValue
    }
  },
)
