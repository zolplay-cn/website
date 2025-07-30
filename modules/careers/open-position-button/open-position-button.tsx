import { Suspense } from 'react'

export async function OpenPositionButton() {
  return null

  // return <OpenPositionButtonImpl />
}

export function SuspendedOpenPositionButton() {
  return (
    <Suspense>
      <OpenPositionButton />
    </Suspense>
  )
}
