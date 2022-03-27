import { motion } from 'framer-motion'
import { clsxm } from 'ui'
import { UIComponent } from 'ui/@types/core'

import { coreBenefits, miscBenefits } from '~/lib/data'

import { EmploymentBenefit } from '~/@types/careers'

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
