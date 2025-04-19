import type { StaticImageData } from 'next/image'
import type { Locale } from '../i18n/routing'
import downwordlyImage from './images/downwordly-image.png'
import downwordlyLogo from './images/downwordly-logo.webp'
import nexusImage from './images/nexus-image.png'
import nexusLogo from './images/nexus-logo.png'
import vvsImage from './images/vvs-image.gif'
import vvsLogo from './images/vvs-logo.png'

interface PaletteSwatch {
  background: string
  foreground: string
}

export interface Portfolio {
  title: Record<Locale, string>
  slug: string
  logo: StaticImageData
  image: StaticImageData
  palette: PaletteSwatch
  description: Record<Locale, string>
  timeframe: Record<Locale, string>
  website: string
  hasDetail: boolean
}

export const PORTFOLIOS: Portfolio[] = [
  {
    title: {
      en: 'Live Aware - Next-gen SaaS Platform for Game Developers',
      'zh-CN': 'Live Aware - 下一代游戏开发者SaaS平台',
    },
    slug: 'live-aware',
    website: 'https://liveaware.io',
    hasDetail: true,
    logo: nexusLogo,
    image: nexusImage,
    palette: {
      background: '#030115',
      foreground: '#eeeeee',
    },
    description: {
      en: 'A SaaS platform to help game developers build exceptional games, faster. At Zolplay, we are proud to lead both the development and design efforts to ensure that Live Aware is at its A game.',
      'zh-CN':
        '一个帮助游戏开发者更快打造出优秀游戏的 SaaS 平台。佐玩很自豪地领导着产品开发和所有设计工作，以确保 Live Aware 达到最出色的水准。',
    },
    timeframe: {
      en: '2021 - now',
      'zh-CN': '2021 - 至今',
    },
  },

  {
    title: {
      en: 'VVS - A Game Development Company Website',
      'zh-CN': 'VVS - 游戏公司官网',
    },
    slug: 'vvs-website',
    website: 'https://vvspaceship.website',
    hasDetail: false,
    logo: vvsLogo,
    image: vvsImage,
    palette: {
      background: '#e3691a',
      foreground: '#fff',
    },
    description: {
      en: '"very very spaceship" is a game development company based in Seattle. Zolplay was responsible for developing and iterating their official website, the speed and performance were boosted ~10x too.',
      'zh-CN':
        'very very spaceship 是西雅图的一家游戏开发公司，佐玩负责开发与迭代更新他们的官网，同时帮助了他们进行官网的数字转型与优化了~10倍以上的访问速度与性能指标。',
    },
    timeframe: {
      en: '2020 - 2023',
      'zh-CN': '2020 - 2023',
    },
  },

  {
    title: {
      en: 'Downwordly - A Word Building Game Website',
      'zh-CN': 'Downwordly - 拼字游戏官网',
    },
    slug: 'downwordly',
    palette: {
      background: '#1657FF',
      foreground: '#fff',
    },
    description: {
      en: 'Downwordly is a word building game that challenges you to make the most out of the letters you have. Zolplay helped Bird Cartel develop an official website for the game using an interactive 3D canvas.',
      'zh-CN':
        'Downwordly 是一个由 Bird Cartel 开发的英语拼词游戏，你需要充分利用手中的字母去拼凑成词汇，佐玩负责帮助 Bird Cartel 打造开发了一个 3D 版官方网站。',
    },
    timeframe: {
      en: '2021',
      'zh-CN': '2021',
    },
    website: 'https://downwordly.com',
    hasDetail: false,
    logo: downwordlyLogo,
    image: downwordlyImage,
  },
]

export const LATEST_PORTFOLIO = PORTFOLIOS[0]
