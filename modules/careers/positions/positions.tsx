import { getJobs } from '~/lib/ashbyhq.queries'
import { getConfigValue } from '~/lib/edge-config'
import { PositionsImpl } from './positions-impl'

export async function Positions() {
  const showOpenPositions = await getConfigValue('showOpenPositions', true)

  // Fetch jobs only if the feature flag is enabled
  const jobs = showOpenPositions ? await getJobs() : []

  return <PositionsImpl jobs={jobs} />
}
