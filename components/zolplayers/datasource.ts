import type { StaticImageData } from 'next/image'
import type { SocialPlatform } from './social-platform'
import cali from './headshots/cali.jpeg'
import ethan from './headshots/ethan.jpeg'
import jasper from './headshots/jasper.jpeg'
import larry from './headshots/larry.jpeg'
import sonia from './headshots/sonia.jpeg'
import tyler from './headshots/tyler.jpeg'
import will from './headshots/will.jpeg'

export interface Zolplayer {
  name: string
  slug: string
  role: {
    en: string
    'zh-CN': string
  }
  portrait: StaticImageData
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
    portrait: cali,
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
    portrait: ethan,
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
    name: 'Jasper Xu',
    slug: 'jasper',
    role: {
      en: 'Product Designer',
      'zh-CN': '产品设计师',
    },
    portrait: jasper,
    social: [],
  },
  {
    name: 'Larry Zhou',
    slug: 'larry',
    role: {
      en: 'Product Manager',
      'zh-CN': '产品经理',
    },
    portrait: larry,
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
    portrait: sonia,
    social: [
      {
        platform: 'twitter',
        url: 'https://x.com/thesonia33',
      },
    ],
  },
  {
    name: 'Tyler Lu',
    slug: 'tyler',
    role: {
      en: 'Visual Designer',
      'zh-CN': '视觉设计师',
    },
    portrait: tyler,
    social: [],
  },
  {
    name: 'Will Xiang',
    slug: 'will-xiang',
    role: {
      en: 'Founding Engineer',
      'zh-CN': '创始工程师',
    },
    portrait: will,
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
