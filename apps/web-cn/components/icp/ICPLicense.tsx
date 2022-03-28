import { motion, MotionProps } from 'framer-motion'
import { clsxm } from 'ui'
import { UIComponent } from 'ui/@types/core'

import NationalEmblem from '~/components/icp/NationalEmblem'

const IcpLicense: UIComponent<MotionProps> = ({ className, ...rest }) => {
  return (
    <motion.a
      href="https://beian.miit.gov.cn/#/Integrated/index"
      target="_blank"
      rel="noopener noreferrer"
      className={clsxm(
        'group flex items-center space-x-2 text-amber-50/50',
        className
      )}
      {...rest}
    >
      <NationalEmblem className="h-3.5 w-3.5" />
      <span className="text-neon text-xs tracking-wide group-hover:underline">
        粤ICP备2021175747号-1
      </span>
    </motion.a>
  )
}

export default IcpLicense
