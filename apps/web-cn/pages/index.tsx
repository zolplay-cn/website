import { motion } from 'framer-motion'
import Link from 'next/link'
import { NextSeo } from 'next-seo'
import React from 'react'
import { Logo } from 'ui'

import ICPLicense from '~/components/icp/ICPLicense'
import { BareLayout } from '~/components/layouts/BareLayout'

export default function HomePageInChina() {
  return (
    <BareLayout className="items-center justify-between">
      <NextSeo title="敬请期待" />

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

      <section className="select-none pb-[10vh]">
        <motion.h1
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', delay: 0.15 }}
          className="text-neon text-6xl font-extrabold tracking-wider text-neon-500"
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
          >
            迎
          </motion.span>
          <span>光</span>
          <span>临</span>
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
            className="bg-gradient-to-r from-pink-500 to-violet-400 bg-clip-text text-transparent"
          >
            佐玩
          </motion.span>
        </motion.h1>

        <div className="mt-4 flex w-full items-center justify-center">
          <Link href="/careers" passHref>
            <motion.a
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
                transition: {
                  delay: 0.65,
                  type: 'spring',
                },
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              className="mt-10 inline-block rounded-2xl bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 p-1"
            >
              <div className="rounded-xl border border-zinc-100/10 bg-dark/80 px-14 py-3">
                <span className="text-sm font-bold text-zinc-200">
                  加入我们吧！
                </span>
              </div>
            </motion.a>
          </Link>
        </div>
      </section>

      <footer className="mb-4 flex flex-col items-center space-y-4 px-4 md:flex-row md:space-x-5 md:space-y-0">
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', delay: 0.35 }}
          className="text-neon text-xs text-violet-100/60"
        >
          &copy; {new Date().getFullYear() + 5} 深圳市佐玩信息技术有限公司
          {' - '}
          来自未来的版权
        </motion.span>
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', delay: 0.4 }}
          className="text-neon text-xs text-green-100/60"
        >
          联系邮箱：
          <a href="mailto:contact@zolplay.cn" className="hover:underline">
            contact@zolplay.cn
          </a>
        </motion.span>
        <ICPLicense />
      </footer>
    </BareLayout>
  )
}
