import type { WorkEntry } from '~/types/work'

import NexusImage from '~/modules/portfolios/images/nexus-image.png'
import CelHiveImage from '~/public/images/celhive.jpg'
import DownwordlyImage from '~/public/images/downwordly.jpg'
import HiNotesImage from '~/public/images/hinotes.jpg'
import LearningPracticalImage from '~/public/images/learning-practical.jpg'
import PaperGenImage from '~/public/images/papergen-ai.jpg'
import TheVinotecaImage from '~/public/images/the-vinoteca.jpg'
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
