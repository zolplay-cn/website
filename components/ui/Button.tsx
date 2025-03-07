import type { VariantProps } from 'class-variance-authority'
import type { ComponentProps } from 'react'
import { clsxm } from '@zolplay/utils'
import { cva } from 'class-variance-authority'

import * as React from 'react'
import { LocaleLink } from '~/modules/i18n/navigation'

const buttonVariants = cva(
  'active:scale-95 inline-flex no-underline items-center justify-center rounded-lg text-sm font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 focus-visible:ring-offset-2 dark:hover:bg-stone-800 dark:hover:text-stone-100 disabled:opacity-50 dark:focus-visible:ring-stone-400 disabled:pointer-events-none dark:focus-visible:ring-offset-stone-900 data-[state=open]:bg-stone-100 dark:data-[state=open]:bg-stone-800',
  {
    variants: {
      variant: {
        default: 'bg-stone-900 text-white hover:bg-stone-700 dark:bg-stone-50 dark:text-stone-900',
        destructive: 'bg-red-500 text-white hover:bg-red-600 dark:hover:bg-red-600',
        outline: 'bg-transparent border border-stone-200 hover:bg-stone-100 dark:border-stone-700 dark:text-stone-100',
        subtle: 'bg-stone-100 text-stone-900 hover:bg-stone-200 dark:bg-stone-700 dark:text-stone-100',
        ghost:
          'bg-transparent hover:bg-stone-100 dark:hover:bg-stone-800 dark:text-stone-100 dark:hover:text-stone-100 data-[state=open]:bg-transparent dark:data-[state=open]:bg-transparent',
        link: 'bg-transparent dark:bg-transparent underline-offset-4 hover:underline text-stone-900 dark:text-stone-100 hover:bg-transparent dark:hover:bg-transparent',
      },
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-9 px-2 rounded-md',
        lg: 'h-11 px-8 rounded-md',
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
