import { motion } from 'framer-motion'
import Head from 'next/head'
import { Layout, Logo } from 'ui'

export default function HomePage() {
  return (
    <Layout className="items-center justify-between">
      <Head>
        <title>Zolplay | Coming Soon</title>
      </Head>

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
            W
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
            e
          </motion.span>
          <span>l</span>
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
            come
          </motion.span>
        </motion.h1>
      </section>

      <footer className="mb-4">
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', delay: 0.55 }}
          className="text-neon text-sm text-amber-50/50"
        >
          &copy; Zolplay. {new Date().getFullYear() + 5} All rights from the
          future.
        </motion.span>
      </footer>
    </Layout>
  )
}
