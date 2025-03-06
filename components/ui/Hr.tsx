import { clsxm } from '@zolplay/utils'
import React from 'react'

export function Hr({ className }: { className?: string }) {
  return (
    <div
      className={clsxm(
        'my-4 h-px w-full rounded-xl bg-gradient-to-r from-stone-50 to-stone-200 dark:from-stone-900 dark:to-stone-700',
        className,
      )}
    />
  )
}
