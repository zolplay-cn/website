import { getJobs } from '~/lib/ashbyhq.queries'
import { PositionsImpl } from './positions-impl'

export async function Positions() {
  const jobs = await getJobs()
  return <PositionsImpl jobs={jobs} />
}
