import React from 'react'
import { clsxm } from 'ui'
import type { UIComponent } from 'ui/@types/core'

export const BareLayout: UIComponent = ({ className, children }) => {
  return (
    <main
      className={clsxm(
        'flex min-h-screen flex-col bg-gradient-bg text-zinc-50',
        className
      )}
    >
      {children}
    </main>
  )
}
