import type { WorkEntry } from '~/types/work'

import NexusImage from '~/modules/portfolios/images/nexus-image.png'
import AntigravityImage from '~/public/images/antigravity.jpg'
import BagelPayImage from '~/public/images/bagelpay.jpg'
import BeaconImage from '~/public/images/beacon.jpg'
import BenchflowImage from '~/public/images/benchflow.jpg'
import BerkeleySummitHouseImage from '~/public/images/bsh.jpg'
import CelHiveImage from '~/public/images/celhive.jpg'
import CronusImage from '~/public/images/cronus.jpg'
import DownwordlyImage from '~/public/images/downwordly.jpg'
import HiNotesImage from '~/public/images/hinotes.jpg'
import Insta360Image from '~/public/images/insta360.jpg'
import IsthataiImage from '~/public/images/isthatai.jpg'
import LearningPracticalImage from '~/public/images/learning-practical.jpg'
import LetsVision24Image from '~/public/images/lets-visionos-24.jpg'
import MoimoiImage from '~/public/images/moimoi.jpg'
import NeuSalonImage from '~/public/images/neusalon.jpg'
import NeushipImage from '~/public/images/neuship.jpg'
import PaddingLeftImage from '~/public/images/paddingleft.jpg'
import PaperGenImage from '~/public/images/papergen-ai.jpg'
import PerformAdImage from '~/public/images/performad.jpg'
import TechPodfest23Image from '~/public/images/tech-podfest.jpg'
import TheVinotecaImage from '~/public/images/the-vinoteca.jpg'
import VivgridImage from '~/public/images/vivgrid.jpeg'
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
    slug: 'beacon',
    year: 2025,
    month: 10,
    title: {
      en: 'Beacon',
      'zh-CN': 'Beacon',
    },
    categories: ['cap:001', 'cap:002', 'cap:003'],
    featuredImage: BeaconImage,
    hasCaseStudy: false,
    website: 'https://beacon.zolplay.co',
    isOriginal: true,
  },
  {
    slug: 'bagelpay',
    year: 2025,
    month: 8,
    title: {
      en: 'BagelPay',
      'zh-CN': 'BagelPay',
    },
    categories: ['cap:001', 'cap:002'],
    featuredImage: BagelPayImage,
    showreel: {
      src: '/vids/work/bagelpay-brand-reveal.mp4',
    },
    hasCaseStudy: false,
    website: 'https://bagelpay.io',
    isOriginal: false,
  },
  {
    slug: 'celhive',
    year: 2025,
    month: 8,
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
    slug: 'antigravity',
    year: 2025,
    month: 8,
    title: {
      en: 'Antigravity',
      'zh-CN': 'Antigravity',
    },
    categories: ['cap:002'],
    featuredImage: AntigravityImage,
    hasCaseStudy: false,
    website: 'https://antigravity.tech',
    isOriginal: false,
  },
  {
    slug: 'insta360',
    year: 2025,
    month: 7,
    title: {
      en: 'Insta360',
      'zh-CN': 'Insta360',
    },
    categories: ['cap:002'],
    featuredImage: Insta360Image,
    hasCaseStudy: false,
    website: 'https://insta360.com',
    isOriginal: false,
  },
  {
    slug: 'cronus',
    year: 2025,
    month: 7,
    title: {
      en: 'Cronus',
      'zh-CN': 'Cronus',
    },
    categories: ['cap:001', 'cap:002', 'cap:003'],
    featuredImage: CronusImage,
    showreel: {
      src: '/vids/work/cronus-demo.mp4',
    },
    hasCaseStudy: false,
    website: 'https://cronushq.com',
    isOriginal: false,
  },
  {
    slug: 'berkeleysummithouse',
    year: 2025,
    month: 6,
    title: {
      en: 'Berkeley Summit House',
      'zh-CN': 'Berkeley Summit House',
    },
    categories: ['cap:002', 'cap:003'],
    featuredImage: BerkeleySummitHouseImage,
    showreel: {
      src: '/vids/work/bsh-reel.mp4',
    },
    hasCaseStudy: false,
    website: 'https://berkeleysummithouse.org',
    isOriginal: false,
  },
  {
    slug: 'performad',
    year: 2025,
    month: 5,
    title: {
      en: 'PerforMad',
      'zh-CN': '亿帆出海',
    },
    categories: ['cap:001', 'cap:002', 'cap:003'],
    featuredImage: PerformAdImage,
    showreel: {
      src: '/vids/work/performad-reel.mp4',
    },
    hasCaseStudy: false,
    website: 'https://www.performad.cn/en',
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
    slug: 'benchflow',
    year: 2025,
    month: 2,
    title: {
      en: 'BenchFlow',
      'zh-CN': 'BenchFlow',
    },
    categories: ['cap:001', 'cap:002', 'cap:003'],
    featuredImage: BenchflowImage,
    showreel: {
      src: '/vids/work/benchflow-reel.mp4',
    },
    hasCaseStudy: false,
    website: 'https://benchflow.ai',
    isOriginal: false,
  },
  {
    slug: 'neuship',
    year: 2025,
    month: 5,
    title: {
      en: 'Neuship',
      'zh-CN': 'Neuship',
    },
    categories: ['cap:001', 'cap:003'],
    featuredImage: NeushipImage,
    showreel: {
      src: '/vids/work/neuship-reel.mp4',
    },
    hasCaseStudy: false,
    isOriginal: true,
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
    slug: 'vivgrid',
    year: 2024,
    month: 9,
    title: {
      en: 'vivgrid',
      'zh-CN': 'vivgrid',
    },
    showreel: {
      src: '/vids/work/vivgrid.mp4',
    },
    categories: ['cap:001', 'cap:002', 'cap:003'],
    featuredImage: VivgridImage,
    hasCaseStudy: false,
    website: 'https://vivgrid.com',
    isOriginal: false,
  },
  {
    slug: 'neusalon',
    year: 2024,
    month: 7,
    title: {
      en: 'neu.salon',
      'zh-CN': 'neu.salon',
    },
    showreel: {
      src: '/vids/work/neusalon-reel.mp4',
    },
    categories: ['cap:001', 'cap:002', 'cap:003'],
    featuredImage: NeuSalonImage,
    hasCaseStudy: false,
    website: 'https://neu.salon',
    isOriginal: true,
  },
  {
    slug: 'moimoi',
    year: 2024,
    month: 5,
    title: {
      en: 'moimoi',
      'zh-CN': 'moimoi',
    },
    showreel: {
      src: '/vids/work/moimoi-reel.mp4',
    },
    categories: ['cap:001', 'cap:002', 'cap:003'],
    featuredImage: MoimoiImage,
    hasCaseStudy: false,
    website: 'https://moimoi.app',
    isOriginal: true,
  },
  {
    slug: 'isthatai',
    year: 2023,
    month: 10,
    title: {
      en: 'IsThat.AI',
      'zh-CN': 'IsThat.AI',
    },
    categories: ['cap:001', 'cap:002', 'cap:003'],
    featuredImage: IsthataiImage,
    showreel: {
      src: '/vids/work/isthatai.mp4',
    },
    hasCaseStudy: false,
    isOriginal: true,
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
