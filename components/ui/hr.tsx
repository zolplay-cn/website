import type { ComponentProps } from 'react'
import { clsxm } from '@zolplay/utils'
import React from 'react'

export function Hr({ className, ...rest }: ComponentProps<'div'>) {
  return <div className={clsxm('my-4 h-px w-full bg-(--grid-border-color)', className)} {...rest} />
}
