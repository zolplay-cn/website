/* eslint-disable react-hooks-extra/no-unnecessary-use-prefix */
import type { MDXComponents } from 'mdx/types'
import NextImage from 'next/image'
import Balancer from 'react-wrap-balancer'
import {
  BackgroundVideo,
  Capabilities,
  CTAButton,
  DefaultFAQ,
  FAQ,
  FAQItem,
  FramedImage,
  Gradient,
  Green,
  PartnerLogoWall,
  PortalToOurWork,
  Red,
  WeChatQRButton,
  WithFrame,
} from './components/mdx'
import CalendarBooker from './modules/contact/calendar-booker'
import { Link } from './modules/i18n/navigation'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    // Explicitly list MDX components to avoid spreading a proxied module namespace
    BackgroundVideo,
    Capabilities,
    CTAButton,
    Gradient,
    WithFrame,
    WeChatQRButton,
    Red,
    Green,
    PartnerLogoWall,
    PortalToOurWork,
    FAQ,
    FAQItem,
    DefaultFAQ,
    Balancer,
    Link,
    Image: FramedImage,
    NakedImage: NextImage,
    CalendarBooker,
  }
}
