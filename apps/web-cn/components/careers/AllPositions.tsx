import { motion, Transition, Variants } from 'framer-motion'
import Link from 'next/link'
import { useMemo } from 'react'
import { Avatar, clsxm, SeatReclineIcon } from 'ui'
import type { UIComponent } from 'ui/@types/core'

import { jobs } from '~/lib/data'

import { Job } from '~/@types/careers'

import {
  AcademicCapIcon,
  CalendarIcon,
  CheckCircleIcon,
  XCircleIcon,
} from '@heroicons/react/outline'
import { ArrowNarrowUpIcon, ArrowRightIcon } from '@heroicons/react/solid'

const JobFlyer: UIComponent<Job> = ({
  className,
  icon: Icon,
  status,
  title,
  description,
  slug,
  minDegree,
  minYearsExperience,
  canBeRemote,
  noDetailPage,
}) => {
  const idleKey = 'idle'
  const hoverKey = 'hover'
  const springTransition: Transition = {
    type: 'spring',
    damping: 20,
    stiffness: 300,
  }
  const backCard1Variants: Variants = {
    [idleKey]: { x: 0, y: 0, rotate: 0, scale: 0.9 },
    [hoverKey]: {
      x: -5,
      y: 5,
      rotate: -6,
      scale: 0.98,
    },
  }
  const backCard2Variants: Variants = {
    [idleKey]: { x: 0, y: 0, rotate: 0, scale: 0.8 },
    [hoverKey]: {
      x: -18,
      y: -6,
      rotate: -11,
      scale: 0.85,
    },
  }
  const mainCardVariants: Variants = {
    [idleKey]: {
      scale: 1,
    },
    [hoverKey]: {
      scale: 1.025,
    },
  }

  const isOpen = useMemo(() => status === 'open', [status])

  return (
    <motion.aside
      initial={idleKey}
      whileHover={hoverKey}
      className="relative aspect-[3/4] h-[350px] flex-shrink-0"
    >
      <motion.div
        variants={backCard2Variants}
        transition={springTransition}
        className={clsxm(
          'absolute inset-0 rounded-2xl bg-gradient-bg',
          isOpen && 'shadow-xl shadow-neon-500/10'
        )}
      />
      <motion.div
        variants={backCard1Variants}
        transition={springTransition}
        className={clsxm(
          'absolute inset-0 rounded-2xl bg-slate-900',
          isOpen && 'shadow-xl shadow-sky-500/10'
        )}
      />
      <motion.div
        variants={mainCardVariants}
        transition={springTransition}
        className={clsxm(
          'absolute inset-0 rounded-2xl shadow-in-dark',
          isOpen
            ? 'bg-gradient-to-br from-slate-800 to-slate-900'
            : 'bg-slate-900',
          className
        )}
      >
        <div
          className={clsxm(
            'flex h-full w-full flex-col items-center p-5',
            !isOpen && 'opacity-50'
          )}
        >
          {!noDetailPage && (
            <Link href={`/careers/${slug}`}>
              <a className="absolute inset-0" />
            </Link>
          )}
          <div className="relative mb-4 flex h-14 w-14 items-center justify-center">
            <Avatar name={slug} className="absolute inset-0 z-10" />
            <Icon className="z-20 h-8 w-8 text-slate-100 mix-blend-difference" />
          </div>
          <strong
            className={clsxm(
              'text-neon w-full text-center text-2xl font-semibold tracking-tight'
            )}
          >
            {title}
          </strong>
          <p className="text-center text-sm font-medium text-white/50">
            {description}
          </p>
          <div className="grid w-full flex-1 grid-cols-3 gap-4">
            <div
              className="flex flex-col items-center justify-center"
              aria-label="最低工作年限"
            >
              <CalendarIcon className="mb-2 h-6 w-6 text-slate-200" />
              <span className="flex items-center text-sm font-medium text-sky-400">
                {minYearsExperience}年+
              </span>
            </div>
            <div
              className="flex flex-col items-center justify-center"
              aria-label="最低学历要求"
            >
              <AcademicCapIcon className="mb-2 h-6 w-6 text-slate-200" />
              <span className="flex items-center text-sm font-medium text-amber-400">
                <span>{minDegree}</span>
                <ArrowNarrowUpIcon className="h-3 w-3" aria-hidden="true" />
              </span>
            </div>
            <div
              className="flex flex-col items-center justify-center"
              aria-label="可否远程办公"
            >
              <SeatReclineIcon className="mb-2 h-6 w-6 text-slate-200" />
              <span
                className={clsxm(
                  'flex items-center text-sm font-medium',
                  canBeRemote ? 'text-emerald-400' : 'text-rose-400'
                )}
              >
                {canBeRemote ? (
                  <CheckCircleIcon className="h-4 w-4" />
                ) : (
                  <XCircleIcon className="h-4 w-4" />
                )}
                <span className="pl-0.5">远程</span>
              </span>
            </div>
          </div>

          {!noDetailPage && (
            <Link href={`/careers/${slug}`} passHref>
              <motion.a className="flex w-full items-center justify-center rounded-lg bg-gradient-to-br from-indigo-400 to-pink-600 py-2 text-center text-sm text-slate-50 no-underline">
                <span>查看详情</span>
                <motion.span
                  className="ml-1"
                  variants={{
                    [idleKey]: { opacity: 0.75, x: 0 },
                    [hoverKey]: { opacity: 1, x: 3 },
                  }}
                  transition={springTransition}
                >
                  <ArrowRightIcon className="h-3 w-3" aria-hidden="true" />
                </motion.span>
              </motion.a>
            </Link>
          )}
        </div>

        <span
          className={clsxm(
            'absolute -left-1.5 top-2 rounded-md px-1.5 py-0.5 text-xs font-semibold tracking-tight',
            isOpen
              ? 'bg-gradient-to-r from-sky-500 to-pink-700 text-slate-100'
              : 'bg-slate-800 text-slate-300'
          )}
        >
          {isOpen ? '热招中' : '已聘用'}
        </span>
      </motion.div>
    </motion.aside>
  )
}

const AllPositions: UIComponent = ({ className }) => {
  return (
    <section className={clsxm('relative max-w-xs md:max-w-none', className)}>
      <div className="flex min-h-[420px] flex-nowrap justify-start space-x-8 overflow-x-scroll bg-dark bg-cover bg-repeat px-14 pl-10 md:pl-14 lg:min-h-[500px] lg:px-24 lg:py-20">
        {jobs.map((job, i) => (
          <JobFlyer key={i} {...job} />
        ))}

        <style jsx>{`
          div {
            background-image: radial-gradient(
                50% 50% at 50% 50%,
                rgba(10, 13, 35, 0) 0%,
                #0a0d23 100%
              ),
              url('/assets/careers/bricks-bg.png');
          }
        `}</style>
      </div>

      <div className="pointer-events-none absolute inset-y-0 -left-1 z-30 w-8 select-none bg-gradient-to-r from-dark md:left-0 lg:w-12" />
      <div className="pointer-events-none absolute inset-y-0 -right-1 z-30 w-8 select-none bg-gradient-to-l from-dark lg:w-12" />
    </section>
  )
}

export default AllPositions
