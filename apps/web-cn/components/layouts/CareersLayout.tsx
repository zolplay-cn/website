import { motion } from 'framer-motion'
import { atom, useAtomValue } from 'jotai'
import { useUpdateAtom } from 'jotai/utils'
import Link from 'next/link'
import React, { FC, useEffect } from 'react'
import { CareersIcon } from 'ui'
import { UIComponent } from 'ui/@types/core'

const PageTitle: UIComponent = ({ children }) => {
  return (
    <span className="inline h-24 bg-gradient-to-r from-zinc-50 via-blue-200 to-pink-300 bg-clip-text object-center pt-4 text-transparent">
      {children}
    </span>
  )
}

type CareersLayoutConfig = {
  icon?: UIComponent
  title?: string | string[]
  cta?: {
    href: string
    label: string
  }
}
const careersConfigAtom = atom<CareersLayoutConfig>({})

export function useCareersLayoutConfig(config: CareersLayoutConfig) {
  const setConfig = useUpdateAtom(careersConfigAtom)
  useEffect(() => setConfig(config), [config, setConfig])
}

export const CareersLayout: FC = ({ children }) => {
  const { icon: Icon, title, cta } = useAtomValue(careersConfigAtom)

  return (
    <>
      <style global jsx>{`
        body {
          background-image: url('/assets/careers/foreground.png'),
            url('/assets/careers/background.jpg');
          background-repeat: no-repeat;
          background-position: top -120px center;
          background-size: clamp(840px, calc(100vw * 1.45 + 40px), 1700px);
        }
      `}</style>

      <header className="container mt-8 flex flex-col items-center text-center lg:mt-36">
        {Icon ? (
          <Icon className="mb-3 h-10 w-10 text-neon-500" />
        ) : (
          <CareersIcon className="mb-3 h-10 w-10 text-neon-500" />
        )}
        {title !== undefined && (
          <h1 className="text-neon flex flex-col items-center px-12 text-4xl font-extrabold tracking-tight lg:px-24 lg:text-[4.2rem]">
            {typeof title === 'string' ? (
              <PageTitle>{title}</PageTitle>
            ) : (
              title.map((t, i) => <PageTitle key={i}>{t}</PageTitle>)
            )}
          </h1>
        )}

        {cta !== undefined && (
          <Link href={cta.href} passHref>
            <motion.a
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              className="mt-10 inline-block rounded-2xl bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 p-1"
            >
              <div className="rounded-xl border border-zinc-100/10 bg-dark/80 px-14 py-3">
                <span className="text-sm font-bold text-zinc-200">
                  {cta.label}
                </span>
              </div>
            </motion.a>
          </Link>
        )}
      </header>

      <main className="container mt-40 flex flex-col items-center">
        <article className="prose prose-slate prose-sky prose-dark selection:bg-fuchsia-300 selection:text-fuchsia-900 lg:prose-lg">
          {children}
        </article>
      </main>
    </>
  )
}
