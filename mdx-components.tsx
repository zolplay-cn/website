/* eslint-disable react-hooks-extra/no-unnecessary-use-prefix */
import type { MDXComponents } from 'mdx/types'
import NextImage from 'next/image'
import Balancer from 'react-wrap-balancer'
import * as otherComponents from './components/mdx'
import { Link } from './modules/i18n/navigation'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    ...otherComponents,
    Balancer,
    Link,
    Image: NextImage,
  }
}
