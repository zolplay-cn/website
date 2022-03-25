import React, { FC } from 'react'

import { clsxm } from './utils/clsxm'

export const Layout: FC<{ className?: string }> = ({ className, children }) => {
  return (
    <main
      className={clsxm('flex min-h-screen flex-col bg-gradient-bg', className)}
    >
      {children}
    </main>
  )
}
