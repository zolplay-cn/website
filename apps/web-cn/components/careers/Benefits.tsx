import { motion } from 'framer-motion'
import { useMemo } from 'react'
import { clsxm } from 'ui'
import { UIComponent } from 'ui/@types/core'

import styles from '~/styles/Benefits.module.css'

import { coreBenefits, miscBenefits } from '~/lib/data'

import { EmploymentBenefit } from '~/@types/careers'

const BenefitCard: UIComponent<EmploymentBenefit> = ({
  icon: Icon,
  className,
  title,
  description,
  cardColor,
}) => {
  const style = useMemo(() => {
    switch (cardColor) {
      case 'sky-slate':
        return styles.BenefitCardSkySlate
      case 'sky-slate-2':
        return styles.BenefitCardSkySlate2
      case 'pink-indigo':
        return styles.BenefitCardPinkIndigo
      case 'yellow-fuchsia':
        return styles.BenefitCardYellowFuchsia
      case 'emerald-teal':
        return styles.BenefitCardEmeraldTeal
      case 'rose':
        return styles.BenefitCardRose
    }
  }, [cardColor])

  return (
    <motion.div
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={clsxm(
        'flex h-[200px] flex-col items-center justify-center rounded-3xl rounded-bl-md p-4 text-center leading-relaxed tracking-[0.3px] text-slate-200 shadow-2xl',
        style,
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
