import type { WorkEntry } from '~/types/work'

import NexusImage from '~/modules/portfolios/images/nexus-image.png'
import CelHiveImage from '~/public/images/celhive.jpg'
import DownwordlyImage from '~/public/images/downwordly.jpg'
import HiNotesImage from '~/public/images/hinotes.jpg'
import LearningPracticalImage from '~/public/images/learning-practical.jpg'
import LetsVision24Image from '~/public/images/lets-visionos-24.jpg'
import PaddingLeftImage from '~/public/images/paddingleft.jpg'
import PaperGenImage from '~/public/images/papergen-ai.jpg'
import TechPodfest23Image from '~/public/images/tech-podfest.jpg'
import TheVinotecaImage from '~/public/images/the-vinoteca.jpg'
import VueConf24Image from '~/public/images/vueconf24.jpg'
import vvsImage from '~/public/images/vvs.jpg'
import WellwordImage from '~/public/images/wellword.jpg'

const works: WorkEntry[] = [
  {
    slug: 'live-aware',
    year: 2022,
    month: 1,
    title: {
      en: 'Live Aware',
      'zh-CN': 'Live Aware',
    },
    categories: ['cap:001', 'cap:002', 'cap:003'],
    featuredImage: NexusImage,
    hasCaseStudy: true,
    website: 'https://liveaware.io',
    isOriginal: false,
  },
  {
    slug: 'celhive',
    year: 2025,
    month: 9,
    title: {
      en: 'CelHive',
      'zh-CN': 'CelHive',
    },
    categories: ['cap:001', 'cap:002', 'cap:003'],
    featuredImage: CelHiveImage,
    showreel: {
      src: '/vids/work/celhive.mp4',
    },
    hasCaseStudy: false,
    website: 'https://celhive.com',
    isOriginal: false,
  },
  {
    slug: 'papergen-ai',
    year: 2025,
    month: 4,
    title: {
      en: 'PaperGen',
      'zh-CN': 'PaperGen',
    },
    categories: ['cap:002'],
    featuredImage: PaperGenImage,
    hasCaseStudy: false,
    website: 'https://papergen.ai',
    isOriginal: false,
  },
  {
    slug: 'padding-left',
    year: 2024,
    month: 8,
    title: {
      en: 'PaddingLeft',
      'zh-CN': 'PaddingLeft',
    },
    categories: ['cap:001'],
    featuredImage: PaddingLeftImage,
    showreel: {
      src: '/vids/work/padding-left-reel.mp4',
    },
    hasCaseStudy: false,
    website: 'https://padding-left.com',
    isOriginal: false,
  },
  {
    slug: 'vueconf24',
    year: 2024,
    month: 6,
    title: {
      en: 'VueConf China 2024',
      'zh-CN': 'VueConf China 2024',
    },
    categories: ['cap:002', 'cap:003'],
    featuredImage: VueConf24Image,
    hasCaseStudy: false,
    website: 'https://vueconf.zolplay.com',
    isOriginal: false,
  },
  {
    slug: 'tech-podfest-2023',
    year: 2023,
    month: 11,
    title: {
      en: 'Tech Podfest 2023',
      'zh-CN': 'Tech Podfest 2023',
    },
    categories: ['cap:002', 'cap:003'],
    featuredImage: TechPodfest23Image,
    hasCaseStudy: false,
    website: 'https://podfest.zolplay.com/',
    isOriginal: false,
  },
  {
    slug: 'lets-visionos-24',
    year: 2024,
    month: 4,
    title: {
      en: "Let's visionOS 2024",
      'zh-CN': 'Lets visionOS 2024',
    },
    categories: ['cap:003'],
    featuredImage: LetsVision24Image,
    hasCaseStudy: false,
    website: 'https://letsvisionos24.swiftgg.team/',
    isOriginal: false,
  },
  {
    slug: 'vvs-website',
    year: 2022,
    month: 5,
    title: {
      en: 'very very spaceship',
      'zh-CN': 'very very spaceship',
    },
    categories: ['cap:002', 'cap:003'],
    featuredImage: vvsImage,
    hasCaseStudy: false,
    website: 'https://vvspaceship.website',
    isOriginal: false,
  },
  {
    slug: 'hinotes',
    year: 2023,
    month: 9,
    title: {
      en: 'HiNotes',
      'zh-CN': 'HiNotes',
    },
    categories: ['cap:002'],
    featuredImage: HiNotesImage,
    hasCaseStudy: false,
    website: 'https://hidock.com',
    isOriginal: false,
  },
  {
    slug: 'the-vinoteca',
    year: 2022,
    month: 6,
    title: {
      en: 'The Vinoteca',
      'zh-CN': 'The Vinoteca',
    },
    categories: ['cap:002'],
    featuredImage: TheVinotecaImage,
    hasCaseStudy: false,
    website: 'https://thevinoteca.com',
    isOriginal: false,
  },
  {
    slug: 'well-word',
    year: 2023,
    month: 2,
    title: {
      en: 'Well Word',
      'zh-CN': 'Well Word',
    },
    categories: ['cap:002'],
    featuredImage: WellwordImage,
    hasCaseStudy: false,
    website: 'https://wellwordgame.com',
    isOriginal: false,
  },
  {
    slug: 'downwordly',
    year: 2021,
    month: 9,
    title: {
      en: 'Downwordly',
      'zh-CN': 'Downwordly',
    },
    categories: ['cap:002'],
    featuredImage: DownwordlyImage,
    hasCaseStudy: false,
    website: 'https://downwordly.com',
    isOriginal: false,
  },
  {
    slug: 'learning-practical',
    year: 2021,
    month: 12,
    title: {
      en: 'Learning Practical',
      'zh-CN': 'Learning Practical',
    },
    categories: ['cap:001', 'cap:002', 'cap:003'],
    featuredImage: LearningPracticalImage,
    hasCaseStudy: false,
    website: 'https://lp.ge',
    isOriginal: false,
  },
]

export default works
