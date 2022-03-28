import { BiRestaurant } from 'react-icons/bi'
import { IoLogoChrome, IoLogoGameControllerB } from 'react-icons/io'
import { IoLogoFigma } from 'react-icons/io5'
import { MdEmojiFoodBeverage, MdManageAccounts } from 'react-icons/md'
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
    status: 'open',
    icon: IoLogoChrome,
    slug: 'frontend-engineer',
    title: '前端攻城狮',
    description: '负责打造Web前端高质量项目，React.js优先',
    minYearsExperience: 3,
    minDegree: '大专',
    canBeRemote: true,
  },
  {
    status: 'closed',
    icon: IoLogoFigma,
    slug: 'ui-designer',
    title: 'UI设计狮',
    description: '负责UI组件以及UX交互流程设计，Figma优先',
    minYearsExperience: 3,
    minDegree: '本科',
    canBeRemote: false,
  },
  {
    status: 'closed',
    icon: MdManageAccounts,
    slug: 'technical-manager',
    title: '技术经理',
    description: '负责业务技术架构以及管理内部全端技术工具',
    minYearsExperience: 5,
    minDegree: '本科',
    canBeRemote: false,
  },
]

export const getOpenPositions = (): Job[] =>
  jobs.filter((job) => job.status === 'open')

export const coreBenefits: EmploymentBenefit[] = [
  {
    icon: LibraryIcon,
    title: '五险一金',
    description: '附加住房补助、餐补、交通补助以及加班补助',
    cardColor: 'sky-slate',
  },
  {
    icon: CurrencyYenIcon,
    title: '年终奖 & 项目提成',
    description: '不拿固定工资，跟着公司共赢，早日奔向财务自由',
    cardColor: 'rose',
  },
  {
    icon: SeatReclineIcon,
    title: '弹性办公',
    description: '可居家/咖啡厅/厕所/想哪办公就哪办公 疫情再次爆发也不怕',
    cardColor: 'pink-indigo',
  },
  {
    icon: CalendarMultipleIcon,
    title: '周末双休',
    description: '朝九晚五，俗话说：懂得休息的人，才会更效率地完成工作',
    cardColor: 'emerald-teal',
  },
  {
    icon: IoLogoGameControllerB,
    title: '周常团队游戏活动',
    description: '每两周或不定时的团队"开黑"，释怀自己的游戏技能',
    cardColor: 'yellow-fuchsia',
  },
  {
    icon: KeyboardIcon,
    title: '国际顶尖付费软件',
    description: '我们始终相信优秀的生产力与协同工具能造就更效率的团队',
    cardColor: 'sky-slate-2',
  },
]
export const miscBenefits: EmploymentBenefit[] = [
  {
    icon: CatIcon,
    title: '办公室撸猫',
  },
  {
    icon: BiRestaurant,
    title: '节日聚会、团队聚餐',
  },
  {
    icon: MdEmojiFoodBeverage,
    title: '饮料、零食供应',
  },
  {
    icon: PlusCircleIcon,
    title: '更多福利等待你来发现',
  },
]
