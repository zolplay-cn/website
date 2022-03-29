import { UIComponent } from 'ui/@types/core'

type SiteNavigation = {
  main: MainNavigation[]
  social: SocialNavigation[]
}

type MainNavigation = {
  name: string
  href: string
  icon?: UIComponent
  badge?: string | (() => string)
}

type SocialNavigation = {
  name: string
  href: string
  icon: UIComponent
  tippyContent?: JSX.Element
}
