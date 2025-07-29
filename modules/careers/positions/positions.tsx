import { Suspense } from 'react'
import { getJobs } from '~/lib/ashbyhq.queries'
import { ConfigKey, getConfigValue } from '~/lib/edge-config'
import { PositionsImpl } from './positions-impl'

export async function Positions() {
  const showOpenPositions = await getConfigValue(ConfigKey.ShowOpenPositions, true)

  if (!showOpenPositions) {
    return <PositionsImpl jobs={[]} />
  }

  const jobs = await getJobs()
  return <PositionsImpl jobs={jobs} />
}

export function SuspendedPositions() {
  return (
    <Suspense>
      <Positions />
    </Suspense>
  )
}
