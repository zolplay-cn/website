/* eslint-disable react-hooks-extra/no-unnecessary-use-prefix */
import type { MDXComponents } from 'mdx/types'
import NextImage from 'next/image'
import * as otherComponents from './components/mdx'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    ...otherComponents,
    Image: NextImage,
  }
}
