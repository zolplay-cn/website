import { clsxm } from '@zolplay/utils'
import * as React from 'react'
import { ButtonLink } from '~/components/ui/button'

interface CTAButtonProps {
  href: string
  children: React.ReactNode
  className?: string
  target?: React.HTMLAttributeAnchorTarget
  rel?: string
}

export function CTAButton({ href, children, className, target, rel }: CTAButtonProps) {
  const isExternal = /^https?:\/\//.test(href)
  const computedTarget = target ?? (isExternal ? '_blank' : undefined)
  const computedRel = rel ?? (isExternal ? 'noopener noreferrer' : undefined)

  return (
    <ButtonLink
      href={href}
      target={computedTarget}
      rel={computedRel}
      className={clsxm('w-full relative group', className)}
      variant='default'
      size='lg'
    >
      {children}
      <svg width='5' height='5' viewBox='0 0 5 5' className='absolute top-[4px] left-[4px] fill-current' data-highlight>
        <path d='M2 0h1v2h2v1h-2v2h-1v-2h-2v-1h2z' />
      </svg>
      <svg
        width='5'
        height='5'
        viewBox='0 0 5 5'
        className='absolute top-[4px] right-[4px] fill-current'
        data-highlight
      >
        <path d='M2 0h1v2h2v1h-2v2h-1v-2h-2v-1h2z' />
      </svg>
      <svg
        width='5'
        height='5'
        viewBox='0 0 5 5'
        className='absolute bottom-[4px] left-[4px] fill-current'
        data-highlight
      >
        <path d='M2 0h1v2h2v1h-2v2h-1v-2h-2v-1h2z' />
      </svg>
      <svg
        width='5'
        height='5'
        viewBox='0 0 5 5'
        className='absolute bottom-[4px] right-[4px] fill-current'
        data-highlight
      >
        <path d='M2 0h1v2h2v1h-2v2h-1v-2h-2v-1h2z' />
      </svg>
    </ButtonLink>
  )
}
