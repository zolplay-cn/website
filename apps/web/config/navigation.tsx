import { GithubIcon } from 'ui'

import { getOpenPositions } from '~/lib/data'

import { SiteNavigation } from '~/@types/site'

export const navigation: SiteNavigation = {
  main: [
    {
      name: '中文站',
      href: 'https://zolplay.cn',
    },
    {
      name: 'Careers',
      href: '/careers',
      badge: () => getOpenPositions().length.toString(),
    },
  ],
  social: [
    {
      name: 'GitHub',
      href: process.env.NEXT_PUBLIC_GITHUB_URL || '',
      icon: GithubIcon,
    },
  ],
}
