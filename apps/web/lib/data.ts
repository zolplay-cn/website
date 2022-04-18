import { BiRestaurant } from 'react-icons/bi'
import { IoLogoChrome, IoLogoGameControllerB } from 'react-icons/io'
import { MdArchitecture, MdEmojiFoodBeverage } from 'react-icons/md'
import { RiPencilRuler2Fill } from 'react-icons/ri'
import {
  CalendarMultipleIcon,
  CatIcon,
  KeyboardIcon,
  SeatReclineIcon,
} from 'ui'

import { EmploymentBenefit, Job } from '~/@types/careers'

import { PlusCircleIcon } from '@heroicons/react/outline'
import { CurrencyYenIcon, LibraryIcon } from '@heroicons/react/solid'

export const jobs: Job[] = [
  {
    status: 'closed',
    icon: IoLogoChrome,
    slug: 'frontend-engineer',
    title: 'Frontend Engineer',
    description:
      'Responsible for building high quality web apps, React.js and TypeScript preferred',
    minYearsExperience: 3,
    minDegree: 'Bachelor',
    canBeRemote: true,
  },
  {
    status: 'closed',
    icon: RiPencilRuler2Fill,
    slug: 'ui-designer',
    title: 'UI Designer',
    description:
      'Responsible for designing UI components and UX flows, Figma preferred',
    minYearsExperience: 3,
    minDegree: 'Bachelor',
    canBeRemote: false,
  },
  {
    status: 'closed',
    icon: MdArchitecture,
    slug: 'technical-manager',
    title: 'Technical Manager',
    description:
      'Responsible for technical architecture, and backend development',
    minYearsExperience: 5,
    minDegree: 'Bachelor',
    canBeRemote: false,
    noDetailPage: true,
  },
]

export const getOpenPositions = (): Job[] =>
  jobs.filter((job) => job.status === 'open')

export const coreBenefits: EmploymentBenefit[] = [
  {
    icon: LibraryIcon,
    title: 'Health Insurance',
    description: 'Housing, commute and over-time reimbursements included',
    cardColor: 'sky-slate',
  },
  {
    icon: CurrencyYenIcon,
    title: 'Competitive Salary',
    description:
      'No fixed salary, we offer competitive pay and end of year bonuses',
    cardColor: 'rose',
  },
  {
    icon: SeatReclineIcon,
    title: 'Flexible Working Hours',
    description:
      "You can work from home or work from the toilet, it's up to you to wear pants or not",
    cardColor: 'pink-indigo',
  },
  {
    icon: CalendarMultipleIcon,
    title: 'Weekend and Holidays',
    description:
      'Daily nine to five, mute notifications to relax and enjoy the weekend',
    cardColor: 'emerald-teal',
  },
  {
    icon: IoLogoGameControllerB,
    title: 'Game Activities',
    description: 'Get your A game on, and just have a fun time together',
    cardColor: 'yellow-fuchsia',
  },
  {
    icon: KeyboardIcon,
    title: 'Top Notch Tools',
    description:
      "We believe the tools we use shape ourselves, let's work smarter",
    cardColor: 'sky-slate-2',
  },
]
export const miscBenefits: EmploymentBenefit[] = [
  {
    icon: CatIcon,
    title: 'Cats in the office',
  },
  {
    icon: BiRestaurant,
    title: 'Team outings and festive get-togethers',
  },
  {
    icon: MdEmojiFoodBeverage,
    title: 'Beverages and snacks',
  },
  {
    icon: PlusCircleIcon,
    title: 'More in the works for you to find out',
  },
]
