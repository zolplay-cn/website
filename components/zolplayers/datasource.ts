import type { StaticImageData } from 'next/image'
import type { SocialPlatform } from './social-platform'
import caliDark from './headshots/dark/cali.jpg'
import ethanDark from './headshots/dark/ethan.jpg'
import jasperDark from './headshots/dark/jasper.jpg'
import larryDark from './headshots/dark/larry.jpg'
import soniaDark from './headshots/dark/sonia.jpg'
import timxDark from './headshots/dark/timx.jpg'
import willDark from './headshots/dark/will.jpg'
import caliLight from './headshots/light/cali.jpg'
import ethanLight from './headshots/light/ethan.jpg'
import jasperLight from './headshots/light/jasper.jpg'
import larryLight from './headshots/light/larry.jpg'
import soniaLight from './headshots/light/sonia.jpg'
import timxLight from './headshots/light/timx.jpg'
import willLight from './headshots/light/will.jpg'

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
    name: 'Jasper',
    slug: 'jasper',
    role: {
      en: 'Product Designer',
      'zh-CN': '产品设计师',
    },
    portrait: {
      dark: jasperDark,
      light: jasperLight,
    },
    social: [],
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
