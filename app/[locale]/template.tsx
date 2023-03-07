'use client'

import { motion } from 'framer-motion'

export default function RootTemplate({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
    >
      {children}
    </motion.div>
  )
}
