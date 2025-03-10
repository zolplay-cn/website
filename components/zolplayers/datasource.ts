import type { StaticImageData } from 'next/image'
import type { SocialPlatform } from './social-platform'
import cali from './images/cali.png'
import ethan from './images/ethan.png'
import larry from './images/larry.png'
import sonia from './images/sonia.png'
import spike from './images/spike.png'
import timx from './images/timx.png'
import will from './images/will.png'

export interface Zolplayer {
  name: string
  slug: string
  role: {
    en: string
    'zh-CN': string
  }
  portrait: {
    url: StaticImageData
    palette: {
      background: { light: string; dark: string }
    }
  }
  social: {
    platform: SocialPlatform
    url: string
  }[]
  joinedDate: string
}

export const ZOLPLAYERS = [
  {
    name: 'Cali Castle',
    slug: 'cali',
    role: {
      'zh-CN': '创始人 CEO、首席工程师',
      en: 'Founder & CEO, Principal Engineer',
    },
    portrait: {
      url: cali,
      palette: {
        background: {
          light: '#5c7c04',
          dark: '#f9b191',
        },
      },
    },
    social: [
      { platform: 'twitter', url: 'https://x.com/thecalicastle' },
      { platform: 'github', url: 'https://github.com/CaliCastle' },
      { platform: 'website', url: 'https://cali.so' },
      { platform: 'youtube', url: 'https://www.youtube.com/@calicastle' },
    ],
    joinedDate: '2021-02-01',
  },
  {
    name: 'Ethan',
    slug: 'ethan',
    role: {
      'zh-CN': '全栈工程师',
      en: 'Full Stack Engineer',
    },
    portrait: {
      url: ethan,
      palette: {
        background: {
          light: '#144688',
          dark: '#64acfc',
        },
      },
    },
    social: [
      {
        platform: 'twitter',
        url: 'https://twitter.com/peekbomb',
      },
      {
        platform: 'github',
        url: 'https://github.com/Peek-A-Booo',
      },
    ],
    joinedDate: '2023-09-27',
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
      palette: {
        background: {
          light: '#c7a60e',
          dark: '#f69679',
        },
      },
    },
    social: [
      {
        platform: 'twitter',
        url: 'https://twitter.com/larryfreeform',
      },
    ],
    joinedDate: '2022-08-01',
  },
  {
    name: 'Sonia Liu',
    slug: 'sonia',
    role: {
      en: 'Senior Designer',
      'zh-CN': '高级设计师',
    },
    portrait: {
      url: sonia,
      palette: {
        background: {
          light: '#39120b',
          dark: '#fc7474',
        },
      },
    },
    social: [
      {
        platform: 'twitter',
        url: 'https://twitter.com/thesonia33',
      },
    ],
    joinedDate: '2024-11-11',
  },
  {
    name: 'Spike',
    slug: 'spike',
    role: {
      en: 'Full Stack Engineer',
      'zh-CN': '全栈工程师',
    },
    portrait: {
      url: spike,
      palette: {
        background: {
          light: '#0a1431',
          dark: '#74acfc',
        },
      },
    },
    social: [
      {
        platform: 'twitter',
        url: 'https://twitter.com/real_spike014',
      },
    ],
    joinedDate: '2023-09-01',
  },
  {
    name: 'Tim X',
    slug: 'timx',
    role: {
      en: 'Tech Manager, Full Stack Engineer',
      'zh-CN': '技术经理, 全栈工程师',
    },
    portrait: {
      url: timx,
      palette: {
        background: {
          light: '#141c2c',
          dark: '#a3b4d5',
        },
      },
    },
    social: [],
    joinedDate: '2021-04-26',
  },
  {
    name: 'Will Xiang',
    slug: 'will-xiang',
    role: {
      en: 'No-stack Developer & Headless Engineer',
      'zh-CN': '全不会工程师',
    },
    portrait: {
      url: will,
      palette: {
        background: {
          light: '#06b357',
          dark: '#fa936f',
        },
      },
    },
    social: [
      {
        platform: 'twitter',
        url: 'https://twitter.com/thecuvii',
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
    joinedDate: '2023-04-25',
  },
] satisfies Zolplayer[]
