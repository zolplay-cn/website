import { Suspense } from 'react'
import { ConfigKey, getConfigValue } from '~/lib/edge-config'
import { OpenPositionButtonImpl } from './open-position-button-impl'

export async function OpenPositionButton() {
  const showOpenPositions = await getConfigValue(ConfigKey.ShowOpenPositions, false)

  if (!showOpenPositions) {
    return null
  }

  return <OpenPositionButtonImpl />
}

export function SuspendedOpenPositionButton() {
  return (
    <Suspense>
      <OpenPositionButton />
    </Suspense>
  )
}
