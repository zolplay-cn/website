import { motion } from 'framer-motion'
import Link from 'next/link'
import { NextSeo } from 'next-seo'
import React from 'react'
import { Logo } from 'ui'

export default function HomePageInChina() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-between">
      <NextSeo title="欢迎光临佐玩" />

      <header className="mt-8">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', duration: 0.7, delay: 0.25 }}
          className="relative h-48 w-48"
        >
          <div className="absolute inset-0">
            <Logo className="h-full w-full" />
          </div>
          <motion.div
            animate={{
              opacity: [
                0.3, 0.2, 0.5, 0.8, 1, 0.9, 1, 1, 0.77, 0.9, 1, 1, 1, 0.2, 0.5,
                0.7, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
              ],
            }}
            transition={{
              type: 'spring',
              duration: 3,
              repeat: Infinity,
            }}
            className="absolute inset-0"
          >
            <Logo className="h-full w-full" />
          </motion.div>
        </motion.div>
      </header>

      <section className="select-none px-12 pt-16 pb-[10vh]">
        <motion.h1
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', delay: 0.15 }}
          className="flex flex-wrap justify-center text-6xl font-extrabold tracking-wider text-neon-500"
        >
          <motion.span
            animate={{
              opacity: [
                0.5, 0.8, 0.75, 0.8, 1, 0.9, 1, 1, 1, 1, 1, 1, 1, 0.65, 0.5,
                0.7, 1, 1, 1, 1, 1, 1, 1, 1,
              ],
            }}
            transition={{
              type: 'spring',
              duration: 4,
              repeat: Infinity,
            }}
            className="text-neon h-24"
          >
            欢
          </motion.span>
          <motion.span
            animate={{
              opacity: [
                0.5, 1, 0.75, 0.8, 1, 0.9, 1, 1, 0.8, 1, 1, 0.8, 0.75, 0.7, 1,
                1, 0.95, 1, 1, 1, 1, 1,
              ],
            }}
            transition={{
              type: 'spring',
              duration: 3.5,
              repeat: Infinity,
            }}
            className="text-neon h-24"
          >
            迎
          </motion.span>
          <span className="text-neon h-24">光</span>
          <span className="text-neon h-24">临</span>
          <motion.span
            animate={{
              opacity: [
                1, 1, 0.85, 0.8, 1, 0.9, 1, 1, 1, 1, 1, 1, 1, 0.75, 0.6, 0.7, 1,
                1, 1, 0.85, 1, 1,
              ],
            }}
            transition={{
              type: 'spring',
              duration: 5.5,
              repeat: Infinity,
            }}
            className="text-neon mt-4 h-24 min-w-full text-center text-pink-400 sm:mt-0 sm:min-w-0"
          >
            佐玩
          </motion.span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ type: 'spring', delay: 0.62 }}
          className="mt-4 flex w-full items-center justify-center"
        >
          <Link href="/careers" passHref>
            <motion.a
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring' }}
              className="mt-10 inline-block rounded-2xl bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 p-1"
            >
              <div className="rounded-xl border border-zinc-100/10 bg-dark/80 px-14 py-3">
                <span className="text-sm font-bold text-zinc-200">
                  我们招人啦！
                </span>
              </div>
            </motion.a>
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
