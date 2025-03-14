'use client'

import type { ReactNode } from 'react'
import type { EdgeConfigType } from './hooks'
import React from 'react'
import { EdgeConfigContext, useEdgeConfig } from './hooks'

export function EdgeConfigProvider({ children, config }: { children: ReactNode; config: EdgeConfigType }) {
  return <EdgeConfigContext value={config}>{children}</EdgeConfigContext>
}

export function RenderIfConfig({
  configKey,
  expectedValue = true,
  children,
}: {
  configKey: string
  expectedValue?: any
  children: ReactNode
}) {
  const config = useEdgeConfig()
  const value = config[configKey]

  return value === expectedValue ? children : null
}
