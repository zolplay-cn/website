'use client'

import type { SVGProps } from 'react'
import { clsxm } from '@zolplay/utils'
import { useLocale } from 'next-intl'
import React from 'react'
import { Button } from '~/components/ui/button'

type GridProps = React.PropsWithChildren<{
  cols?: 1 | 2 | 3 | 4 | 5 | 6
  md?: 1 | 2 | 3 | 4 | 5 | 6
  lg?: 1 | 2 | 3 | 4 | 5 | 6
  gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6
  className?: string
}>

const colsMap = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
} as const

const gapMap = {
  0: 'gap-0',
  1: 'gap-1',
  2: 'gap-2',
  3: 'gap-3',
  4: 'gap-4',
  5: 'gap-5',
  6: 'gap-6',
} as const

export function Grid({ cols = 1, md, lg, gap = 4, className, children }: GridProps) {
  const id = React.useId()

  return (
    <div
      className={clsxm(
        'not-prose grid relative overflow-hidden',
        colsMap[cols],
        gapMap[gap],
        // include responsive class literals so Tailwind can see them
        md === 1 && 'md:grid-cols-1',
        md === 2 && 'md:grid-cols-2',
        md === 3 && 'md:grid-cols-3',
        md === 4 && 'md:grid-cols-4',
        md === 5 && 'md:grid-cols-5',
        md === 6 && 'md:grid-cols-6',
        lg === 1 && 'lg:grid-cols-1',
        lg === 2 && 'lg:grid-cols-2',
        lg === 3 && 'lg:grid-cols-3',
        lg === 4 && 'lg:grid-cols-4',
        lg === 5 && 'lg:grid-cols-5',
        lg === 6 && 'lg:grid-cols-6',
        className,
      )}
    >
      {/* Diagonal gutter background */}
      <svg className='pointer-events-none absolute inset-0 [z-index:-1] size-full select-none text-(--grid-border-color) py-[1px] opacity-60'>
        <defs>
          <pattern id={`${id}-gutter`} width='4' height='4' patternUnits='userSpaceOnUse' patternTransform='rotate(45)'>
            <line x1='0' y1='0' x2='0' y2='4' stroke='currentColor' strokeWidth='1.5' />
          </pattern>
        </defs>
        <rect width='100%' height='100%' fill={`url(#${id}-gutter)`}></rect>
      </svg>
      {children}
    </div>
  )
}

// Localized messages used in this component only
const messagesByLocale = {
  en: {
    downloadSvg: 'Download SVG',
    copy: 'Copy',
    copied: 'Copied',
    copiedEmph: 'Copied!',
  },
  'zh-CN': {
    downloadSvg: '下载 SVG',
    copy: '复制',
    copied: '已复制',
    copiedEmph: '已复制！',
  },
} as const

interface GridItemActionDownload {
  kind: 'download'
  href: string
  fileName?: string
  label?: string
}

interface GridItemActionCopy {
  kind: 'copy'
  text: string
  label?: string
  copiedLabel?: string
}

type GridItemAction = GridItemActionDownload | GridItemActionCopy

type GridItemProps = React.PropsWithChildren<{
  className?: string
  action?: GridItemAction
}>

type IconProps = SVGProps<SVGSVGElement> & {
  secondaryfill?: string
  strokewidth?: number
  title?: string
}

function CloudArrowDownload({ fill = 'currentColor', secondaryfill, ...props }: IconProps) {
  secondaryfill = secondaryfill || fill

  return (
    <svg aria-hidden='true' height='24' width='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' {...props}>
      <g fill='none'>
        <path
          d='M6.51 6.97a6.502 6.502 0 0 1 11.734-.515c.237.446.355.668.42.756.1.136.067.1.191.215.08.073.305.228.755.537A5.5 5.5 0 0 1 22 12.5c0 1.33-.472 2.55-1.257 3.5M6.51 6.97l-.046.11m.046-.11-.045.108v.002m0 0A6.5 6.5 0 0 0 6 9.5m.465-2.42c-.322.803-.483 1.204-.561 1.325-.152.235-.038.1-.244.29-.106.097-.579.39-1.525.976A4.497 4.497 0 0 0 2.758 16'
          fill='none'
          opacity='.35'
          stroke={fill}
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='2'
        />
        <path
          d='M16 17.596a19 19 0 0 1-3.445 3.232.94.94 0 0 1-1.11 0A19 19 0 0 1 8 17.596m4-5.37V21'
          fill='none'
          stroke={fill}
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='2'
        />
      </g>
    </svg>
  )
}

function CopyDefault({ fill = 'currentColor', secondaryfill, ...props }: IconProps) {
  secondaryfill = secondaryfill || fill

  return (
    <svg aria-hidden='true' height='24' width='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' {...props}>
      <g fill='none'>
        <path
          d='M16.902 16.902a4 4 0 0 0 .643-.147 5 5 0 0 0 3.21-3.21C21 12.792 21 11.861 21 10s0-2.792-.245-3.545a5 5 0 0 0-3.21-3.21C16.792 3 15.861 3 14 3s-2.792 0-3.545.245a5 5 0 0 0-3.21 3.21 4 4 0 0 0-.147.643'
          fill='none'
          opacity='.35'
          stroke={fill}
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='2'
        />
        <path
          d='M3 14c0-1.861 0-2.792.245-3.545a5 5 0 0 1 3.21-3.21C7.208 7 8.139 7 10 7s2.792 0 3.545.245a5 5 0 0 1 3.21 3.21C17 11.208 17 12.139 17 14s0 2.792-.245 3.545a5 5 0 0 1-3.21 3.21C12.792 21 11.861 21 10 21s-2.792 0-3.545-.245a5 5 0 0 1-3.21-3.21C3 16.792 3 15.861 3 14Z'
          fill='none'
          stroke={fill}
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='2'
        />
      </g>
    </svg>
  )
}

export function GridItem({ className, action, children }: GridItemProps) {
  const locale = useLocale() as keyof typeof messagesByLocale
  const m = messagesByLocale[locale] ?? messagesByLocale.en
  const [copied, setCopied] = React.useState(false)

  const handleAction = React.useCallback(async () => {
    if (!action) return
    if (action.kind === 'download') {
      const anchor = document.createElement('a')
      anchor.href = action.href
      const resolvedFileName = (() => {
        if (action.fileName) return action.fileName
        try {
          const url = new URL(action.href, window.location.href)
          const lastSegment = url.pathname.split('/').filter(Boolean).pop()
          return lastSegment ?? ''
        } catch {
          return ''
        }
      })()
      anchor.download = resolvedFileName
      anchor.rel = 'noopener'
      // Allow same-tab download by default; fallback to opening if blocked
      document.body.appendChild(anchor)
      anchor.click()
      anchor.remove()
      return
    }

    // Copy action
    try {
      await navigator.clipboard.writeText(action.text)
      setCopied(true)
      const t = setTimeout(() => setCopied(false), 1500)
      return () => clearTimeout(t)
    } catch {
      // Fallback if clipboard not available
      const textarea = document.createElement('textarea')
      textarea.value = action.text
      document.body.appendChild(textarea)
      textarea.select()
      try {
        document.execCommand('copy')
        setCopied(true)
        const t = setTimeout(() => setCopied(false), 1500)
        return () => clearTimeout(t)
      } finally {
        textarea.remove()
      }
    }
  }, [action])

  return (
    <div
      className={clsxm(
        'group relative p-6 flex items-center justify-center',
        'before:absolute before:top-0 before:h-px before:w-[200vw] before:-left-[100vw] before:bg-(--grid-border-color)',
        'after:absolute after:bottom-0 after:h-px after:w-[200vw] after:-right-[100vw] after:bg-(--grid-border-color)',
        className,
      )}
    >
      <div className='absolute inset-0 before:absolute before:left-0 before:w-px before:h-[200vh] before:-top-[100vh] before:bg-(--grid-border-color) after:absolute after:right-0 after:w-px after:h-[200vh] after:-bottom-[100vh] after:bg-(--grid-border-color)' />
      {children}
      {action ? (
        <div className='pointer-events-none absolute inset-0 z-10 flex items-center justify-center'>
          <div
            className={clsxm(
              'transition-all duration-300 ease-in-out',
              'opacity-0 blur-sm scale-95 translate-y-1',
              'group-hover:opacity-100 group-hover:blur-none group-hover:scale-100 group-hover:translate-y-0',
              'group-focus-within:opacity-100 group-focus-within:blur-none group-focus-within:scale-100 group-focus-within:translate-y-0',
            )}
          >
            <Button
              onClick={handleAction}
              size='sm'
              className='pointer-events-auto backdrop-blur-[2px] border border-(--grid-border-color) !bg-neutral-100 !text-neutral-800 dark:!bg-neutral-800 dark:!text-neutral-100'
              aria-label={
                action.kind === 'download'
                  ? (action.label ?? m.downloadSvg)
                  : copied
                    ? (action.copiedLabel ?? m.copied)
                    : (action.label ?? m.copy)
              }
            >
              {action.kind === 'download' ? (
                <span className='inline-flex items-center gap-2'>
                  <CloudArrowDownload className='size-4' />
                  {action.label ?? m.downloadSvg}
                </span>
              ) : (
                <span className='inline-flex items-center gap-2'>
                  <CopyDefault className='size-4' />
                  {copied ? (action.copiedLabel ?? m.copiedEmph) : (action.label ?? m.copy)}
                </span>
              )}
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  )
}
