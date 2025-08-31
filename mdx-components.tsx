/* eslint-disable react-hooks-extra/no-unnecessary-use-prefix */
import type { MDXComponents } from 'mdx/types'
import NextImage from 'next/image'
import Balancer from 'react-wrap-balancer'
import {
  BackgroundVideo,
  Capabilities,
  CTAButton,
  Gradient,
  Green,
  PartnerLogoWall,
  PortalToOurWork,
  Red,
} from './components/mdx'
import { Link } from './modules/i18n/navigation'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    // Explicitly list MDX components to avoid spreading a proxied module namespace
    BackgroundVideo,
    Capabilities,
    CTAButton,
    Gradient,
    Red,
    Green,
    PartnerLogoWall,
    PortalToOurWork,
    Balancer,
    Link,
    Image: NextImage,
  }
}
