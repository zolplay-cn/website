import {
  AnimatePresence,
  motion,
  SVGMotionProps,
  Transition,
} from 'framer-motion'
import { useAtomValue } from 'jotai'
import { atomWithReset, useResetAtom, useUpdateAtom } from 'jotai/utils'
import React, { FC, useEffect, useMemo, useState } from 'react'
import { clsxm } from 'ui'
import type { UIComponent } from 'ui/@types/core'

import { NeonLogo, NeonTextLogo } from '~/components/NeonLogos'
import SiteLink from '~/components/SiteLink'

import { navigation } from '~/config/navigation'

import Tippy from '@tippyjs/react'

type MenuButtonProps = SVGMotionProps<SVGElement> & {
  isOpen?: boolean
  strokeWidth?: string | number
  transition?: Transition
  lineProps?: SVGMotionProps<SVGLineElement>
}

const MenuButton: FC<MenuButtonProps> = ({
  isOpen = false,
  width = 24,
  height = 24,
  strokeWidth = 1,
  transition = null,
  lineProps = null,
  ...props
}) => {
  const variantKey = useMemo(() => (isOpen ? 'opened' : 'closed'), [isOpen])
  const top = {
    closed: {
      rotate: 0,
      translateY: 0,
    },
    opened: {
      rotate: 45,
      translateY: 1.25,
    },
  }
  const center = {
    closed: {
      opacity: 1,
      rotate: 0,
    },
    opened: {
      opacity: 0,
      rotate: -45,
    },
  }
  const bottom = {
    closed: {
      rotate: 0,
      translateY: 0,
    },
    opened: {
      rotate: -45,
      translateY: -1.25,
    },
  }
  lineProps = {
    stroke: 'currentColor',
    strokeWidth: strokeWidth as number,
    vectorEffect: 'non-scaling-stroke',
    initial: 'closed',
    animate: variantKey,
    transition,
    ...lineProps,
  }
  const unitHeight = 4
  const unitWidth = (unitHeight * (width as number)) / (height as number)

  return (
    <motion.svg
      viewBox={`0 0 ${unitWidth} ${unitHeight}`}
      overflow="visible"
      preserveAspectRatio="none"
      width={width}
      height={height}
      stroke="currentColor"
      {...props}
    >
      <motion.line
        x1="0"
        x2={unitWidth}
        y1="0"
        y2="0"
        variants={top}
        {...lineProps}
      />
      <motion.line
        x1="0"
        x2={unitWidth}
        y1="1.25"
        y2="1.25"
        variants={center}
        {...lineProps}
      />
      <motion.line
        x1="0"
        x2={unitWidth}
        y1="2.5"
        y2="2.5"
        variants={bottom}
        {...lineProps}
      />
    </motion.svg>
  )
}

const transparentMaxThresholdAtom = atomWithReset(Infinity)
export function useNavBarTransparentThreshold(transparentMaxThreshold: number) {
  const setValue = useUpdateAtom(transparentMaxThresholdAtom)
  const reset = useResetAtom(transparentMaxThresholdAtom)
  useEffect(() => {
    setValue(transparentMaxThreshold)
  }, [setValue, transparentMaxThreshold])

  useEffect(() => {
    return () => {
      reset()
    }
  }, [reset])
}

const NavBar: UIComponent = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isOverThreshold, setIsOverThreshold] = useState(false)
  const threshold = useAtomValue(transparentMaxThresholdAtom)

  useEffect(() => {
    const listener = () => {
      if (window.scrollY >= threshold) {
        setIsOverThreshold(true)
      } else {
        setIsOverThreshold(false)
      }
    }
    window.addEventListener('scroll', listener)

    return () => {
      window.removeEventListener('scroll', listener)
    }
  }, [threshold])

  return (
    <>
      <nav
        className={clsxm(
          'fixed top-0 z-[1000] flex h-20 w-full items-center antialiased transition-all duration-300',
          isOverThreshold &&
            !isOpen &&
            'bg-dark/90 saturate-150 backdrop-blur-xl'
        )}
      >
        <main className="container relative z-50 flex w-full items-center justify-between px-2 lg:px-6">
          <motion.aside
            initial={{ opacity: 0.3 }}
            whileInView={{ opacity: 1 }}
            whileHover={{ opacity: 1, scale: 1.015 }}
            whileTap={{ scale: 0.97 }}
            className="pl-0 lg:pl-4"
          >
            <SiteLink href="/" strict>
              <NeonLogo type="sm" />
              <div className="hidden lg:block">
                <NeonTextLogo type="sm" />
              </div>
            </SiteLink>
          </motion.aside>

          <section className="hidden flex-1 items-center justify-end lg:flex">
            <motion.ul
              className="relative flex items-center space-x-5 pr-6 text-zinc-50 after:absolute after:top-[50%] after:right-0 after:-translate-y-[50%] after:text-xs after:text-slate-100/25 after:content-['|']"
              id="nav-links"
              initial={{ opacity: 0, y: -10 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', delay: 0.07 }}
            >
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <SiteLink
                    href={item.href}
                    className="text-neon flex items-center text-sm font-semibold"
                  >
                    {item.icon && <item.icon className="mr-1 h-5" />}
                    <span>{item.name}</span>
                    {item.badge && (
                      <motion.span
                        animate={{
                          y: [0, -1],
                          scale: [1, 0.98],
                          rotate: [0, 4],
                        }}
                        transition={{
                          type: 'spring',
                          repeat: Infinity,
                          repeatType: 'reverse',
                        }}
                        className="ml-2 rounded-lg rounded-bl-none bg-neon-500/80 px-1.5 text-xs font-bold text-dark"
                      >
                        {typeof item.badge === 'string'
                          ? item.badge
                          : item.badge()}
                      </motion.span>
                    )}
                  </SiteLink>
                </li>
              ))}
            </motion.ul>

            <motion.ul
              id="nav-social"
              className="flex items-center space-x-5 pl-6 text-zinc-50"
              initial={{ opacity: 0, y: -15 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', delay: 0.15 }}
            >
              {navigation.social.map((social) => {
                const el = (
                  <li key={social.name}>
                    <SiteLink
                      href={social.href}
                      target={social.tippyContent ? undefined : '_blank'}
                      className="text-zinc-50"
                    >
                      <span className="sr-only">{social.name}</span>
                      <social.icon className="h-6" />
                    </SiteLink>
                  </li>
                )

                return social.tippyContent ? (
                  <Tippy content={social.tippyContent} key={social.name}>
                    {el}
                  </Tippy>
                ) : (
                  el
                )
              })}
            </motion.ul>
          </section>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: 'spring', delay: 0.15 }}
            className="absolute right-3 top-3 z-50 lg:hidden"
          >
            <motion.button
              initial={{ scale: 1 }}
              whileTap={{ scale: 0.85 }}
              aria-label="Toggle menu"
              className="appearance-none p-2 text-slate-200"
              onClick={() => setIsOpen(!isOpen)}
            >
              <MenuButton
                isOpen={isOpen}
                className="pointer-events-none select-none"
              />
            </motion.button>
          </motion.div>
        </main>
      </nav>
      <AnimatePresence>
        {isOpen && (
          <motion.section
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-0 z-30 block bg-slate-900/90 pt-24 pb-8 saturate-150 backdrop-blur-lg lg:hidden"
            transition={{ type: 'tween', duration: 0.25 }}
          >
            <div className="flex h-full w-full flex-col">
              <div className="relative flex flex-1 flex-col px-4 after:absolute after:left-12 after:right-12 after:bottom-0 after:h-0.5 after:rounded after:bg-slate-400/10 after:content-['']">
                {navigation.main.map((item) => (
                  <SiteLink
                    key={item.name}
                    className="flex items-center p-3 text-base text-slate-200"
                    href={item.href}
                  >
                    {item.icon && <item.icon className="mr-1 h-5" />}
                    <span>{item.name}</span>
                    {item.badge && (
                      <motion.span
                        animate={{
                          y: [0, -1],
                          scale: [1, 0.98],
                          rotate: [0, 4],
                        }}
                        transition={{
                          type: 'spring',
                          repeat: Infinity,
                          repeatType: 'reverse',
                        }}
                        className="ml-2 rounded-lg rounded-bl-none bg-neon-500/80 px-1.5 text-xs font-bold text-dark"
                      >
                        {typeof item.badge === 'string'
                          ? item.badge
                          : item.badge()}
                      </motion.span>
                    )}
                  </SiteLink>
                ))}
              </div>

              <div className="flex h-20 items-center justify-center pt-2">
                {navigation.social.map((item) => {
                  const el = (
                    <SiteLink
                      key={item.name}
                      className="flex items-center p-2 text-slate-200"
                      href={item.href}
                      target={item.tippyContent ? undefined : '_blank'}
                    >
                      <item.icon className="h-6 w-6" />
                    </SiteLink>
                  )

                  return item.tippyContent ? (
                    <Tippy content={item.tippyContent} key={item.name}>
                      <span>{el}</span>
                    </Tippy>
                  ) : (
                    el
                  )
                })}
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  )
}

export default NavBar
