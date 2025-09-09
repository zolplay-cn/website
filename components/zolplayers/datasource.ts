import type { StaticImageData } from 'next/image'
import type { SocialPlatform } from './social-platform'
import cali from './images/cali-dithered.jpeg'
import ethan from './images/ethan-dithered.jpeg'
import larry from './images/larry-dithered.jpeg'
import sonia from './images/sonia-dithered.jpeg'
import timx from './images/timx-dithered.jpeg'
import will from './images/will-dithered.jpeg'

export interface Zolplayer {
  name: string
  slug: string
  role: {
    en: string
    'zh-CN': string
  }
  portrait: {
    url: StaticImageData
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
      'zh-CN': '创始人 CEO、设计工程师',
      en: 'Founder & CEO, Design Engineer',
    },
    portrait: {
      url: cali,
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
      url: ethan,
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
      en: 'Product & Project Manager',
      'zh-CN': '产品 & 项目经理',
    },
    portrait: {
      url: larry,
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
      url: sonia,
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
      en: 'Tech Manager, Full Stack Engineer',
      'zh-CN': '技术经理, 全栈工程师',
    },
    portrait: {
      url: timx,
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
      url: will,
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
