import type { ReactNode } from 'react'

export function MDXTest({ children }: { children: ReactNode }) {
  return <div className='bg-red-300'>{children}</div>
}
