/* eslint-disable react-hooks-extra/no-unnecessary-use-prefix */
import type { MDXComponents } from 'mdx/types'
import NextImage from 'next/image'
import * as otherComponents from './components/mdx'
import { Link } from './modules/i18n/navigation'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    ...otherComponents,
    Link,
    Image: NextImage,
  }
}
