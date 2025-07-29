import { Suspense } from 'react'
import { queryJobs } from '../_queries/jobs.query'
import { PositionsImpl } from './positions-impl'

export async function Positions() {
  const jobs = await queryJobs()
  return <PositionsImpl jobs={jobs} />
}

export function SuspendedPositions() {
  return (
    <Suspense>
      <Positions />
    </Suspense>
  )
}
