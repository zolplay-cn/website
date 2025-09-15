/* eslint-disable react-hooks-extra/no-unnecessary-use-prefix */
import type { MDXComponents } from 'mdx/types'
import NextImage from 'next/image'
import {
  BackgroundVideo,
  Capabilities,
  CareersEmailNote,
  CTAButton,
  DefaultFAQ,
  FAQ,
  FAQItem,
  FramedImage,
  Gradient,
  Green,
  Grid,
  GridItem,
  OpenRolesHeader,
  PartnerLogoWall,
  Red,
  RoleCard,
  RolesList,
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
    OpenRolesHeader,
    RolesList,
    RoleCard,
    CareersEmailNote,
    Capabilities,
    CTAButton,
    Gradient,
    WithFrame,
    WeChatQRButton,
    Red,
    Green,
    PartnerLogoWall,
    FAQ,
    FAQItem,
    DefaultFAQ,
    Link,
    Image: FramedImage,
    NakedImage: NextImage,
    CalendarBooker,
    Grid,
    GridItem,
  }
}
