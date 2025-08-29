import type { VariantProps } from 'class-variance-authority'
import type { ComponentProps } from 'react'
import { clsxm } from '@zolplay/utils'
import { cva } from 'class-variance-authority'

import * as React from 'react'
import { LocaleLink } from '~/modules/i18n/navigation'

const buttonVariants = cva(
  'active:scale-95 inline-flex no-underline items-center justify-center rounded-none text-sm font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 disabled:opacity-50 dark:focus-visible:ring-neutral-400 disabled:pointer-events-none dark:focus-visible:ring-offset-neutral-900 data-[state=open]:bg-neutral-100 dark:data-[state=open]:bg-neutral-800',
  {
    variants: {
      variant: {
        default:
          'bg-neutral-800 text-white hover:bg-neutral-700 dark:bg-neutral-50 dark:text-neutral-800 dark:hover:bg-neutral-200 dark:hover:text-neutral-800',
        destructive: 'bg-red-500 text-white hover:bg-red-600 dark:hover:bg-red-600',
        outline:
          'bg-transparent border border-neutral-200 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-100',
        subtle: 'bg-neutral-100 text-neutral-800 hover:bg-neutral-200 dark:bg-neutral-700 dark:text-neutral-100',
        ghost:
          'bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:text-neutral-100 dark:hover:text-neutral-100 data-[state=open]:bg-transparent dark:data-[state=open]:bg-transparent',
        link: 'bg-transparent dark:bg-transparent underline-offset-4 hover:underline text-neutral-900 dark:text-neutral-100 hover:bg-transparent dark:hover:bg-transparent',
      },
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-9 px-3',
        lg: 'h-12 px-6',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

type ButtonProps = ComponentProps<'button'> & VariantProps<typeof buttonVariants>

export function Button({ className, variant, size, ...props }: ButtonProps) {
  // eslint-disable-next-line react-dom/no-missing-button-type
  return <button className={clsxm(buttonVariants({ variant, size, className }))} {...props} />
}
Button.displayName = 'Button'

type ButtonLinkProps = ComponentProps<'a'> & VariantProps<typeof buttonVariants>

export function ButtonLink({ className, variant, size, href, ...props }: ButtonLinkProps) {
  const Tag = href?.startsWith('#') ? 'a' : LocaleLink

  return <Tag className={clsxm(buttonVariants({ variant, size, className }))} href={href ?? '/'} {...props} />
}
ButtonLink.displayName = 'ButtonLink'
