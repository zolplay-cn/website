import type { StaticImageData } from 'next/image'
import type { SocialPlatform } from './social-platform'
import caliDark from './headshots/dark/cali.jpeg'
import ethanDark from './headshots/dark/ethan.jpeg'
import larryDark from './headshots/dark/larry.jpeg'
import soniaDark from './headshots/dark/sonia.jpeg'
import timxDark from './headshots/dark/timx.jpeg'
import willDark from './headshots/dark/will.jpeg'
import caliLight from './headshots/light/cali.jpeg'
import ethanLight from './headshots/light/ethan.jpeg'
import larryLight from './headshots/light/larry.jpeg'
import soniaLight from './headshots/light/sonia.jpeg'
import timxLight from './headshots/light/timx.jpeg'
import willLight from './headshots/light/will.jpeg'

export interface Zolplayer {
  name: string
  slug: string
  role: {
    en: string
    'zh-CN': string
  }
  portrait: {
    dark: StaticImageData
    light: StaticImageData
  }
  social: {
    platform: SocialPlatform
    url: string
  }[]
}

export const ZOLPLAYERS = [
  {
    name: 'Cali Castle',
    slug: 'cali',
    role: {
      'zh-CN': '创始人 CEO',
      en: 'Founder & CEO',
    },
    portrait: {
      dark: caliDark,
      light: caliLight,
    },
    social: [
      { platform: 'twitter', url: 'https://x.com/thecalicastle' },
      { platform: 'github', url: 'https://github.com/CaliCastle' },
      { platform: 'website', url: 'https://cali.so' },
      { platform: 'youtube', url: 'https://www.youtube.com/@calicastle' },
    ],
  },
  {
    name: 'Ethan Liu',
    slug: 'ethan',
    role: {
      'zh-CN': '全栈工程师',
      en: 'Full Stack Engineer',
    },
    portrait: {
      dark: ethanDark,
      light: ethanLight,
    },
    social: [
      {
        platform: 'twitter',
        url: 'https://x.com/peekbomb',
      },
      {
        platform: 'github',
        url: 'https://github.com/Peek-A-Booo',
      },
    ],
  },
  {
    name: 'Larry Zhou',
    slug: 'larry',
    role: {
      en: 'Product Manager',
      'zh-CN': '产品经理',
    },
    portrait: {
      dark: larryDark,
      light: larryLight,
    },
    social: [
      {
        platform: 'twitter',
        url: 'https://x.com/larryfreeform',
      },
    ],
  },
  {
    name: 'Sonia Liu',
    slug: 'sonia',
    role: {
      en: 'Founding Designer',
      'zh-CN': '创始设计师',
    },
    portrait: {
      dark: soniaDark,
      light: soniaLight,
    },
    social: [
      {
        platform: 'twitter',
        url: 'https://x.com/thesonia33',
      },
    ],
  },
  {
    name: 'Timx Wong',
    slug: 'timx',
    role: {
      en: 'Tech Manager',
      'zh-CN': '技术经理',
    },
    portrait: {
      dark: timxDark,
      light: timxLight,
    },
    social: [],
  },
  {
    name: 'Will Xiang',
    slug: 'will-xiang',
    role: {
      en: 'Founding Engineer',
      'zh-CN': '创始工程师',
    },
    portrait: {
      dark: willDark,
      light: willLight,
    },
    social: [
      {
        platform: 'twitter',
        url: 'https://x.com/thecuvii',
      },
      {
        platform: 'github',
        url: 'https://github.com/thecuvii',
      },
      { platform: 'instagram', url: 'https://www.instagram.com/thecuvii' },
      {
        platform: 'website',
        url: 'https://cuvii.dev',
      },
    ],
  },
] satisfies Zolplayer[]

// sort members by alphabetical order
export const ZOLPLAYERS_SORTED = ZOLPLAYERS.sort((a, b) => a.name.localeCompare(b.name))
