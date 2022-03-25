import { motion } from 'framer-motion'
import { FC } from 'react'

import NationalEmblem from '~/components/icp/NationalEmblem'

const IcpLicense: FC = () => {
  return (
    <motion.a
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: 'spring', delay: 0.55 }}
      href="https://beian.miit.gov.cn/#/Integrated/index"
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center space-x-2 text-amber-50/50"
    >
      <NationalEmblem className="h-3.5 w-3.5" />
      <span className="text-neon text-xs tracking-wide group-hover:underline">
        粤ICP备2021175747号-1
      </span>
    </motion.a>
  )
}

export default IcpLicense
