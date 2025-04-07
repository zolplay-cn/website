'use client'

import type { ComponentProps } from '@zolplay/react'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { clsxm } from '@zolplay/utils'
import { motion } from 'motion/react'
import { useTranslations } from 'next-intl'

import NextLink from 'next/link'
import React from 'react'
import { TbBriefcase, TbCarouselHorizontal, TbMail, TbMailbox, TbPlanet } from 'react-icons/tb'
import { LocaleSelector } from '~/components/locale-selector'
import { LogoHelmetFilled, LogoHelmetOutline } from '~/components/logo'
import { ThemeSelector } from '~/components/theme-selector'
import { Clock } from '~/components/ui/clock'
import { Link, usePathname } from '~/modules/i18n/navigation'

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
    label: 'X/Twitter',
  },
  {
    name: 'GitHub',
    url: 'https://github.com/zolplay-cn',
    label: 'GitHub',
  },
  {
    name: 'YouTube',
    url: 'https://youtube.com/@zolplay',
    label: 'YouTube',
  },
  {
    name: 'Email',
    url: 'mailto:contact@zolplay.com',
    label: 'Email',
  },
]

export function Sidebar({ className }: { className?: string }) {
  const t = useTranslations('Root.Metadata')

  return (
    <aside
      className={clsxm(
        'fixed top-0 left-[calc(50%-(3*var(--gutter-width))-(2*var(--spacing)*44))] md:mx-0 md:w-44 md:flex-shrink-0 md:px-0',
        'bg-stone-50 border border-stone-200',
        className,
      )}
    >
      <div className='flex flex-col items-between justify-between h-dvh pt-12 lg:pt-16'>
        <div className=''>
          <div className='flex items-center justify-between'>
            <span className='text-stone-300 text-[10px] font-mono tracking-wider pl-2'>LOGO</span>
          </div>
          <Link
            href='/'
            aria-label={t('Title')}
            className='group relative p-4 flex focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-500 focus-visible:ring-opacity-50 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-200 dark:focus-visible:ring-stone-700 dark:focus-visible:ring-offset-stone-800 justify-center items-center gap-2 border-y border-stone-200'
          >
            <LogoHelmetFilled className='w-7 md:size-6' />
            <span className='text-xl font-bold tracking-tight'>{t('Title')}</span>
          </Link>

          <NavMenu />

          <section className='md:pt-6'>
            <div className='flex items-center justify-between'>
              <span className='text-stone-300 text-[10px] font-mono tracking-wider pl-2'>SOCIAL</span>
            </div>
            <div className='grid grid-cols-2 w-full items-center relative border-t border-stone-200'>
              <div className='absolute h-full w-0 left-[calc(50%+1px)] -translate-x-1/2 border-r border-stone-200' />
              {social.map((item) => (
                <NextLink
                  href={item.url}
                  key={item.name}
                  aria-label={item.name}
                  target='_blank'
                  rel='noopener noreferrer'
                  className={clsxm(
                    'text-stone-400 transition-colors hover:text-stone-800 dark:text-stone-500 dark:hover:text-stone-100',
                    'aspect-video border-b border-stone-200',
                    'flex items-center justify-center',
                    {
                      'hover:text-[#FF0000] dark:hover:text-[#FF0000]': item.name === 'YouTube',
                    },
                  )}
                >
                  <span className='text-xs font-medium'>{item.label}</span>
                </NextLink>
              ))}
            </div>
          </section>
        </div>

        <motion.div
          className='relative z-50 flex h-12 md:h-24 md:flex-col'
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
      </div>
    </aside>
  )
}

function NavMenu() {
  const t = useTranslations('NavMenu')

  return (
    <NavigationMenu.Root className='relative z-50 ml-0 md:pt-6' orientation='vertical'>
      <div className='flex items-center justify-between'>
        <span className='text-stone-300 text-[10px] font-mono tracking-wider pl-2'>NAVIGATION</span>
      </div>
      <NavigationMenu.List className='m-0 flex list-none flex-wrap items-center overflow-scroll px-4 py-1.5 md:flex-col md:items-start md:overflow-visible md:px-0 md:py-0 border-b border-stone-200'>
        {links.map(({ href, label, icon: Icon }) => (
          <MenuLink key={label} href={href} label={t(label)}>
            <Icon className='size-5 stroke-current' />
            <span>{t(label)}</span>
          </MenuLink>
        ))}
      </NavigationMenu.List>
    </NavigationMenu.Root>
  )
}

function MenuLink({
  ref: forwardedRef,
  className,
  children,
  href,
  label,
}: ComponentProps<{ href: string; label?: string }> & { ref?: React.RefObject<HTMLAnchorElement | null> }) {
  const pathname = usePathname()
  const isActive = href === pathname
  return (
    <li className='border-t border-stone-200 w-full'>
      <NavigationMenu.Link active={isActive} asChild>
        <Link
          href={href}
          onClick={() => {
            // @see https://github.com/framer/motion/issues/2006#issuecomment-1477824846
            window.scroll(0, 0)
          }}
          className={clsxm(
            'relative flex select-none p-3.5 font-medium leading-none text-stone-400 no-underline outline-none transition-colors hover:text-stone-800 dark:text-stone-500 dark:hover:text-stone-100',
            'focus-visible:outline-stone-300 dark:focus-visible:outline-stone-700',
            'data-[active]:text-stone-50 dark:data-[active]:text-stone-950',
            className,
          )}
          aria-label={label}
          ref={forwardedRef}
        >
          {isActive && (
            <motion.span
              className='absolute inset-0 bg-gradient-to-br from-stone-700 to-stone-950 dark:border-stone-700 dark:from-stone-900 dark:to-stone-800'
              layoutId='active-menu'
            />
          )}
          <span className='relative z-40 flex items-center space-x-1.5 text-sm tracking-tight'>{children}</span>
        </Link>
      </NavigationMenu.Link>
    </li>
  )
}
MenuLink.displayName = 'NavigationLinkMenuItem'
