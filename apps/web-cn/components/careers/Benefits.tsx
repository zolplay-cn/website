import { motion } from 'framer-motion'
import { BiRestaurant } from 'react-icons/bi'
import { IoLogoGameControllerB } from 'react-icons/io'
import { MdEmojiFoodBeverage } from 'react-icons/md'
import {
  CalendarMultipleIcon,
  CatIcon,
  clsxm,
  KeyboardIcon,
  SeatReclineIcon,
} from 'ui'
import { UIComponent } from 'ui/@types/core'

import { EmploymentBenefit } from '~/@types/careers'

import { PlusCircleIcon } from '@heroicons/react/outline'
import { CurrencyYenIcon, LibraryIcon } from '@heroicons/react/solid'

const coreBenefits: EmploymentBenefit[] = [
  {
    icon: LibraryIcon,
    title: '五险一金',
    description: '附加住房补助、餐补、交通补助以及加班补助',
    className: 'bg-gradient-to-br from-sky-500 to-pink-800 shadow-pink-400/10',
  },
  {
    icon: CurrencyYenIcon,
    title: '年终奖 & 项目提成',
    description: '不拿固定工资，跟着公司共赢，早日奔向财务自由',
    className: 'bg-gradient-to-br from-rose-400 to-rose-900 shadow-rose-400/10',
  },
  {
    icon: SeatReclineIcon,
    title: '弹性办公',
    description: '可居家/咖啡厅/厕所/想哪办公就哪办公 疫情再次爆发也不怕',
    className:
      'bg-gradient-to-br from-slate-500 to-gray-900 shadow-gray-400/10',
  },
  {
    icon: CalendarMultipleIcon,
    title: '周末双休',
    description: '朝九晚五，俗话说：懂得休息的人，才会更效率地完成工作',
    className:
      'bg-gradient-to-br from-sky-400 to-slate-800 shadow-slate-400/20',
  },
  {
    icon: IoLogoGameControllerB,
    title: '周常团队游戏活动',
    description: '每两周或不定时的团队"开黑"，释怀自己的游戏技能',
    className:
      'bg-gradient-to-br from-cyan-500 to-fuchsia-900 shadow-fuchsia-400/20',
  },
  {
    icon: KeyboardIcon,
    title: '国际顶尖付费软件',
    description: '我们始终相信优秀的生产力与协同工具能造就更效率的团队',
    className:
      'bg-gradient-to-br from-teal-500 to-green-900 shadow-green-400/20',
  },
]
const miscBenefits: EmploymentBenefit[] = [
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

const BenefitCard: UIComponent<EmploymentBenefit> = ({
  icon: Icon,
  className,
  title,
  description,
}) => {
  return (
    <motion.div
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={clsxm(
        'flex h-[200px] flex-col items-center justify-center rounded-3xl rounded-bl-md p-4 text-center leading-relaxed tracking-[0.3px] text-slate-200 shadow-2xl',
        className
      )}
    >
      <div className="mb-3">
        <Icon className="h-6 w-6" />
      </div>
      <strong className="mb-3 text-lg font-semibold">{title}</strong>
      {description && <p className="text-sm text-white/70">{description}</p>}
    </motion.div>
  )
}

const Benefits: UIComponent = () => {
  return (
    <>
      <div className="flex gap-6 space-x-6 pb-6 lg:grid lg:grid-cols-3 lg:space-x-0">
        {coreBenefits.map((benefit, i) => (
          <BenefitCard key={i} {...benefit} />
        ))}
      </div>
      <h3>其他福利待遇</h3>
      <ul>
        {miscBenefits.map((benefit, i) => (
          <li key={i} className="flex items-center">
            <benefit.icon className="h-6 w-6" />
            <span className="ml-2">{benefit.title}</span>
          </li>
        ))}
      </ul>
    </>
  )
}

export default Benefits
