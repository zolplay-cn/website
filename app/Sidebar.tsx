'use client'

import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import type { ComponentProps } from '@zolplay/react'
import { clsxm } from '@zolplay/utils'
import { LocaleSelector } from '~/app/LocaleSelector'
import { ThemeSelector } from '~/app/ThemeSelector'
import { BrandXIcon } from '~/components/icons/BrandXIcon'
import { XiaohongshuIcon } from '~/components/icons/XiaohongshuIcon'
import { LogoHelmetFilled, LogoHelmetOutline } from '~/components/Logo'
import { Clock } from '~/components/ui/Clock'
import { useUWU } from '~/hooks/useUWU'
import { motion } from 'framer-motion'
import { Link, useTranslations } from 'next-intl'
import { usePathname } from 'next-intl/client'
import Image from 'next/image'
import NextLink from 'next/link'
import React from 'react'
import { BsGithub, BsYoutube } from 'react-icons/bs'
import {
  TbBriefcase,
  TbCarouselHorizontal,
  TbMail,
  TbMailbox,
  TbPlanet,
} from 'react-icons/tb'
import UwU from './[locale]/zolplay-logo-uwu.png'

const links = [
  { href: '/', label: 'Home', icon: TbPlanet },
  { href: '/about', label: 'About', icon: LogoHelmetOutline },
  { href: '/careers', label: 'Careers', icon: TbBriefcase },
  { href: '/portfolios', label: 'Portfolios', icon: TbCarouselHorizontal },
  // { href: '/services', label: 'Services', icon: TbAugmentedReality2 },
  { href: '/contact', label: 'Contact', icon: TbMailbox },
  // { href: '/gallery', label: 'Gallery', icon: TbPhoto },
]
const social = [
  {
    name: 'Twitter',
    url: 'https://x.com/zolplay',
    icon: BrandXIcon,
  },
  {
    name: 'Xiaohongshu',
    url: 'https://www.xiaohongshu.com/user/profile/650008220000000004026eab',
    icon: XiaohongshuIcon,
  },
  {
    name: 'GitHub',
    url: 'https://github.com/zolplay-cn',
    icon: BsGithub,
  },
  {
    name: 'YouTube',
    url: 'https://youtube.com/@zolplay',
    icon: BsYoutube,
  },
  {
    name: 'Email',
    url: 'mailto:contact@zolplay.com',
    icon: TbMail,
  },
]

export function Sidebar({ className }: { className?: string }) {
  const t = useTranslations('Root.Metadata')
  const isUWU = useUWU()

  return (
    <aside
      className={clsxm('md:mx-0 md:w-44 md:flex-shrink-0 md:px-0', className)}
    >
      <motion.div className="md:sticky md:top-12 md:pr-4" layout layoutRoot>
        <Link
          href="/"
          aria-label={t('Title')}
          className="group relative mb-3 ml-3 inline-flex focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-500 focus-visible:ring-opacity-50 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-200 dark:focus-visible:ring-stone-700 dark:focus-visible:ring-offset-stone-800 md:mb-6"
        >
          {isUWU ? (
            <Image className="w-20" src={UwU} alt="zolplay logo uwu" />
          ) : (
            <motion.span
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
              }}
            >
              <LogoHelmetFilled className="w-7 md:w-10" />
            </motion.span>
          )}
        </Link>

        <NavMenu />

        <section className="flex w-full items-center gap-3 py-2 pl-2">
          {social.map((item) => (
            <NextLink
              href={item.url}
              key={item.name}
              aria-label={item.name}
              target="_blank"
              rel="noopener noreferrer"
              className={clsxm(
                'text-stone-400 transition-colors hover:text-stone-800 dark:text-stone-500 dark:hover:text-stone-100',
                {
                  'hover:text-[#FF0000] dark:hover:text-[#FF0000]':
                    item.name === 'YouTube',
                }
              )}
            >
              <item.icon className="h-4 w-4" />
            </NextLink>
          ))}
        </section>

        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            delay: 0.2,
          }}
        >
          <Separator />
        </motion.div>

        <motion.div
          className="relative z-50 flex h-12 md:h-24 md:flex-col"
          initial={{ opacity: 0, scale: 0.98, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30,
            delay: 0.1,
          }}
        >
          <ThemeSelector />
          <LocaleSelector />
          <Clock />
        </motion.div>
      </motion.div>
    </aside>
  )
}

function Separator() {
  return (
    <div className="pointer-events-none mx-2 my-2 hidden h-px bg-stone-200/70 dark:bg-stone-700/50 md:block" />
  )
}

function NavMenu() {
  const t = useTranslations('NavMenu')

  return (
    <NavigationMenu.Root
      className="relative z-50 -ml-4 md:ml-0"
      orientation="vertical"
    >
      <NavigationMenu.List className="m-0 flex scroll-pr-6 list-none flex-wrap items-center overflow-scroll px-4 py-1.5 md:scroll-p-0 md:flex-col md:items-start md:overflow-visible md:px-0 md:py-0">
        {links.map(({ href, label, icon: Icon }) => (
          <MenuLink key={label} href={href} label={t(label as any)}>
            <Icon className="h-5 w-5 stroke-current" />
            <span>{t(label as any)}</span>
          </MenuLink>
        ))}
      </NavigationMenu.List>
    </NavigationMenu.Root>
  )
}

const MenuLink = React.forwardRef<
  HTMLAnchorElement,
  ComponentProps<{ href: string; label?: string }>
>(({ className, children, href, label }, forwardedRef) => {
  const pathname = usePathname()
  const isActive = href === pathname
  return (
    <li>
      <NavigationMenu.Link active={isActive} asChild>
        <Link
          href={href}
          onClick={() => {
            // @see https://github.com/framer/motion/issues/2006#issuecomment-1477824846
            window.scroll(0, 0)
          }}
          className={clsxm(
            'relative inline-flex select-none p-2 font-bold leading-none text-stone-400 no-underline outline-none transition-colors hover:text-stone-800 dark:text-stone-500 dark:hover:text-stone-100',
            'rounded-lg focus-visible:outline-stone-300 dark:focus-visible:outline-stone-700',
            'data-[active]:text-stone-900 dark:data-[active]:text-stone-50',
            className
          )}
          aria-label={label}
          ref={forwardedRef}
        >
          {isActive && (
            <motion.span
              className="absolute inset-0 rounded-xl border border-stone-200 bg-gradient-to-r from-white to-stone-100 dark:border-stone-700 dark:from-stone-900 dark:to-stone-800 md:rounded-l-sm md:rounded-r-xl"
              layoutId="active-menu"
            />
          )}
          <span className="relative z-40 flex items-center space-x-1 text-sm tracking-tight md:pr-1">
            {children}
          </span>
        </Link>
      </NavigationMenu.Link>
    </li>
  )
})
MenuLink.displayName = 'NavigationLinkMenuItem'
