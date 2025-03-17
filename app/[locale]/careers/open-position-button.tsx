// 'use client'

import { Suspense } from 'react'
import { getConfigValue } from '~/lib/edge-config'
import { OpenPositionButtonImpl } from './open-position-button-impl'

export async function OpenPositionButton() {
  const showOpenPositions = await getConfigValue('showOpenPositions', false)

  if (!showOpenPositions) {
    return null
  }

  return <OpenPositionButtonImpl />
}

export function SuspendedOpenPositionButton() {
  return (
    <Suspense fallback={<></>}>
      <OpenPositionButton />
    </Suspense>
  )
}
