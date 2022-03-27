import { motion } from 'framer-motion'
import Link from 'next/link'
import { NextSeo } from 'next-seo'
import React from 'react'
import { CareersIcon, clsxm } from 'ui'
import { UIComponent } from 'ui/@types/core'

import NavBar from '~/components/NavBar'

import { BareLayout } from './BareLayout'

const PageTitle: UIComponent = ({ children }) => {
  return (
    <span className="flex h-24 items-center bg-gradient-to-r from-zinc-50 via-blue-200 to-pink-300 bg-clip-text text-transparent">
      {children}
    </span>
  )
}

type CareersLayoutProps = {
  title: string | string[]
  cta?: {
    href: string
    label: string
  }
}
export const CareersLayout: UIComponent<CareersLayoutProps> = ({
  className,
  children,
  title,
  cta,
}) => {
  return (
    <>
      <NextSeo title={typeof title === 'string' ? title : title.join('')} />

      <style global jsx>{`
        body {
          background-image: url('/assets/careers/foreground.png'),
            url('/assets/careers/background.jpg');
          background-repeat: no-repeat;
          background-position: top -120px center;
          background-size: clamp(840px, calc(100vw * 1.45 + 40px), 1700px);
        }
      `}</style>

      <NavBar />

      <BareLayout
        className={clsxm('careers', 'items-center bg-none pb-12', className)}
      >
        <header className="container mt-8 flex flex-col items-center text-center lg:mt-36">
          <CareersIcon className="mb-3 h-10 w-10 text-neon-500" />
          <h1 className="text-neon flex flex-col items-center px-12 text-4xl font-extrabold tracking-tight lg:px-24 lg:text-[4.2rem]">
            {typeof title === 'string' ? (
              <PageTitle>{title}</PageTitle>
            ) : (
              title.map((t, i) => <PageTitle key={i}>{t}</PageTitle>)
            )}
          </h1>

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

        <article className="prose prose-slate prose-sky prose-dark mt-36 lg:prose-lg">
          {children}
        </article>
      </BareLayout>
    </>
  )
}
