import type { WorkEntry } from '~/types/work'

import NexusImage from '~/modules/portfolios/images/nexus-image.png'
import DownwordlyImage from '~/public/images/downwordly.jpg'
import vvsImage from '~/public/images/vvs.jpg'
import WellwordImage from '~/public/images/wellword.jpg'

const works: WorkEntry[] = [
  {
    slug: 'live-aware',
    year: 2021,
    month: 12,
    title: {
      en: 'Live Aware',
      'zh-CN': 'Live Aware',
    },
    categories: ['cap:001', 'cap:002', 'cap:003'],
    featuredImage: NexusImage,
    hasCaseStudy: true,
    website: 'https://liveaware.io',
  },
  {
    slug: 'celhive',
    year: 2025,
    month: 3,
    title: {
      en: 'CelHive',
      'zh-CN': 'CelHive',
    },
    categories: ['cap:001', 'cap:002', 'cap:003'],
    featuredImage: DownwordlyImage,
    showreel: {
      src: '/vids/work/celhive.mp4',
    },
    hasCaseStudy: false,
    website: 'https://celhive.com',
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
  },
]

export default works
