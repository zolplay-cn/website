'use client'

import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { ComponentProps } from '@zolplay/react'
import { clsxm } from '@zolplay/utils'
import { motion } from 'framer-motion'
import { Link, useTranslations } from 'next-intl'
import { usePathname } from 'next-intl/client'
import React from 'react'
import {
  TbAugmentedReality2,
  TbBriefcase,
  TbCarouselHorizontal,
  TbMailbox,
  TbPlanet,
} from 'react-icons/tb'

import { LocaleSelector } from '~/app/LocaleSelector'
import { ThemeSelector } from '~/app/ThemeSelector'
import { Logo, LogoHelmet } from '~/components/Logo'

export function Sidebar({ className }: { className?: string }) {
  const t = useTranslations('Root.Metadata')

  return (
    <aside
      className={clsxm(
        '-mx-4 md:mx-0 md:w-44 md:flex-shrink-0 md:px-0',
        className
      )}
    >
      <div className="pr-4 lg:sticky lg:top-12">
        <Link
          href="/"
          aria-label={t('Title')}
          className="group mb-6 ml-3 inline-flex focus:outline-none focus:ring-2 focus:ring-stone-500 focus:ring-opacity-50 focus:ring-offset-2 focus:ring-offset-stone-200 dark:focus:ring-stone-700 dark:focus:ring-offset-stone-800"
        >
          <Logo className="w-10" />
        </Link>
        <NavMenu />

        <Separator />

        <ThemeSelector />
        <LocaleSelector />
      </div>
    </aside>
  )
}

function Separator() {
  return <div className="mx-2 my-2 h-px bg-stone-200 dark:bg-stone-700" />
}

const links = [
  { href: '/', label: 'Home', icon: TbPlanet },
  { href: '/about', label: 'About', icon: LogoHelmet },
  { href: '/careers', label: 'Careers', icon: TbBriefcase },
  { href: '/portfolio', label: 'Portfolio', icon: TbCarouselHorizontal },
  { href: '/services', label: 'Services', icon: TbAugmentedReality2 },
  { href: '/contact', label: 'Contact', icon: TbMailbox },
]

function NavMenu() {
  const t = useTranslations('NavMenu')

  return (
    <NavigationMenu.Root className="relative z-50" orientation="vertical">
      <NavigationMenu.List className="m-0 flex list-none flex-col">
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
>(({ className, children, href, label, ...props }, forwardedRef) => {
  const pathname = usePathname()
  const isActive = href === pathname
  return (
    <li>
      <NavigationMenu.Link active={isActive} asChild>
        <Link
          href={href}
          className={clsxm(
            'relative inline-flex select-none p-2 font-bold leading-none text-stone-400 no-underline outline-none transition-colors hover:text-stone-800 dark:text-stone-500 dark:hover:text-stone-100',
            'focus:outline-none focus:ring-2 focus:ring-stone-500 focus:ring-opacity-50 focus:ring-offset-2 focus:ring-offset-stone-200 dark:focus:ring-stone-700 dark:focus:ring-offset-stone-800',
            'data-[active]:text-stone-900 dark:data-[active]:text-stone-50',
            className
          )}
          aria-label={label}
          ref={forwardedRef}
        >
          {isActive && (
            <motion.span
              className="absolute inset-0 rounded-r-xl rounded-l-sm border border-stone-200 bg-gradient-to-r from-white to-stone-100 dark:border-stone-700 dark:from-stone-900 dark:to-stone-800"
              layoutId="active-menu"
            />
          )}
          <span className="relative z-40 flex items-center space-x-1 pr-1 text-sm tracking-tight">
            {children}
          </span>
        </Link>
      </NavigationMenu.Link>
    </li>
  )
})
MenuLink.displayName = 'NavigationLinkMenuItem'
