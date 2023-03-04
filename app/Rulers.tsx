'use client'

import { motion } from 'framer-motion'

const CONTAINER_WIDTH = 720
const PADDING = 64

export function Rulers() {
  return (
    <>
      {/* Left line */}
      <motion.div
        className="fixed top-0 left-1/2 h-screen w-px bg-gradient-to-b from-stone-200 dark:from-stone-700"
        initial={{ x: -CONTAINER_WIDTH / 2 + PADDING, y: '-50%', opacity: 0 }}
        animate={{ x: -CONTAINER_WIDTH / 2 + PADDING, y: 0, opacity: 1 }}
      />
      {/* Right line */}
      <motion.div
        className="fixed bottom-0 right-1/2 h-screen w-px bg-gradient-to-t from-stone-200 dark:from-stone-700"
        initial={{
          x: CONTAINER_WIDTH / 2 + PADDING * 1.75,
          y: '50%',
          opacity: 0,
        }}
        animate={{
          x: CONTAINER_WIDTH / 2 + PADDING * 1.75,
          y: 0,
          opacity: 0.75,
        }}
      />
    </>
  )
}
