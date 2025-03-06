import type { MDXComponents } from 'mdx/types'
import { ZolplayPoster } from './modules/mdx-components/zolplay-poster'
import NextImage from 'next/image'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    Red: ({ children }) => (
      <span className='bg-gradient-to-r from-red-400 to-red-600 bg-clip-text font-bold tracking-tight text-transparent dark:from-red-200 dark:to-red-400'>
        {children}
      </span>
    ),
    Green: ({ children }) => (
      <span className='bg-gradient-to-r from-emerald-400 to-green-600 bg-clip-text font-bold tracking-tight text-transparent dark:from-green-200 dark:to-green-400'>
        {children}
      </span>
    ),
    Gradient: ({ children }) => (
      <span className='bg-gradient-to-r from-yellow-500 to-indigo-500 bg-clip-text font-bold tracking-tight text-transparent dark:from-amber-200 dark:to-sky-400'>
        {children}
      </span>
    ),
    ZolplayPoster: ZolplayPoster,
    Image:NextImage

  }
}
