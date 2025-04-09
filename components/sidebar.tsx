'use client'

import type { ComponentProps } from '@zolplay/react'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { clsxm } from '@zolplay/utils'
import { motion } from 'motion/react'
import { useTranslations } from 'next-intl'

import NextLink from 'next/link'
import React from 'react'
import { ZpAboutIcon } from '~/components/icons/ZpAboutIcon'
import { ZpBrandGitHubIcon } from '~/components/icons/ZpBrandGitHubIcon'
import { ZpBrandXIcon } from '~/components/icons/ZpBrandXIcon'
import { ZpBrandYouTubeIcon } from '~/components/icons/ZpBrandYouTubeIcon'
import { ZpBriefcaseIcon } from '~/components/icons/ZpBriefcaseIcon'
import { ZpContactUsIcon } from '~/components/icons/ZpContactUsIcon'
import { ZpHomeIcon } from '~/components/icons/ZpHomeIcon'
import { ZpMailIcon } from '~/components/icons/ZpMailIcon'
import { ZpProjectGridIcon } from '~/components/icons/ZpProjectGridIcon'
import { LocaleSelector } from '~/components/locale-selector'
import { LogoHelmetFilled } from '~/components/logo'
import { ThemeSelector } from '~/components/theme-selector'
import { Clock } from '~/components/ui/clock'
import { Link, usePathname } from '~/modules/i18n/navigation'

const links = [
  { href: '/', label: 'Home', icon: ZpHomeIcon },
  { href: '/work', label: 'Projects', icon: ZpProjectGridIcon },
  { href: '/about', label: 'About', icon: ZpAboutIcon },
  { href: '/careers', label: 'Careers', icon: ZpBriefcaseIcon },
  // { href: '/services', label: 'Services', icon: TbAugmentedReality2 },
  { href: '/contact', label: 'Contact', icon: ZpContactUsIcon },
  // { href: '/gallery', label: 'Gallery', icon: TbPhoto },
]
const social = [
  {
    name: 'Twitter',
    url: 'https://x.com/zolplay',
    label: 'X/Twitter',
    icon: ZpBrandXIcon,
  },
  {
    name: 'GitHub',
    url: 'https://github.com/zolplay-cn',
    label: 'GitHub',
    icon: ZpBrandGitHubIcon,
  },
  {
    name: 'YouTube',
    url: 'https://youtube.com/@zolplay',
    label: 'YouTube',
    icon: ZpBrandYouTubeIcon,
  },
  {
    name: 'Email',
    url: 'mailto:contact@zolplay.com',
    label: 'Email',
    icon: ZpMailIcon,
  },
]

// Caption component for section headers
function Caption({ children }: { children: React.ReactNode }) {
  return (
    <span
      className='scale-65 origin-left text-(--sidebar-fg)/50 text-xs font-mono tracking-wider select-none pointer-events-none'
      aria-hidden='true'
    >
      {children}
    </span>
  )
}

export function Sidebar({ className }: { className?: string }) {
  const t = useTranslations('Root.Metadata')

  return (
    <aside
      className={clsxm(
        'fixed top-0 left-[calc(50%-(3*var(--gutter-width))-(2*var(--spacing)*44))] md:mx-0 md:w-44 md:flex-shrink-0 md:px-0',
        'bg-[image:repeating-linear-gradient(45deg,_var(--sidebar-bg)_0,_var(--sidebar-bg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed [--sidebar-bg:var(--color-black)]/5 [--sidebar-fg:var(--color-neutral-500)] dark:[--sidebar-bg:var(--color-white)]/8 dark:[--sidebar-fg:var(--color-neutral-400)]',
        'border-x border-(--sidebar-bg)',
        'overflow-y-scroll',
        className,
      )}
    >
      <div className='flex flex-col items-between justify-between h-dvh pt-12 lg:pt-16'>
        <div className=''>
          <div className='flex items-center justify-between'>
            <Caption>01_LOGO</Caption>
          </div>
          <Link
            href='/'
            aria-label={t('Title')}
            className={clsxm(
              'group relative p-4 flex focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-500 focus-visible:ring-opacity-50 focus-visible:ring-offset-2 focus-visible:ring-offset-(--sidebar-bg) dark:focus-visible:ring-stone-700 dark:focus-visible:ring-offset-stone-800 justify-center items-center gap-2 border-y border-(--sidebar-bg)',
              '**:data-highlight:opacity-35 hover:**:data-highlight:opacity-100',
            )}
          >
            <LogoHelmetFilled className='size-6' />
            <span className='text-xl font-bold tracking-tight'>{t('Title')}</span>
            <svg
              width='5'
              height='5'
              viewBox='0 0 5 5'
              className='absolute top-[2px] left-[2px] fill-(--sidebar-fg)'
              data-highlight
            >
              <path d='M2 0h1v2h2v1h-2v2h-1v-2h-2v-1h2z' />
            </svg>
            <svg
              width='5'
              height='5'
              viewBox='0 0 5 5'
              className='absolute top-[2px] right-[2px] fill-(--sidebar-fg)'
              data-highlight
            >
              <path d='M2 0h1v2h2v1h-2v2h-1v-2h-2v-1h2z' />
            </svg>
            <svg
              width='5'
              height='5'
              viewBox='0 0 5 5'
              className='absolute bottom-[2px] left-[2px] fill-(--sidebar-fg)'
              data-highlight
            >
              <path d='M2 0h1v2h2v1h-2v2h-1v-2h-2v-1h2z' />
            </svg>
            <svg
              width='5'
              height='5'
              viewBox='0 0 5 5'
              className='absolute bottom-[2px] right-[2px] fill-(--sidebar-fg)'
              data-highlight
            >
              <path d='M2 0h1v2h2v1h-2v2h-1v-2h-2v-1h2z' />
            </svg>
          </Link>

          <NavMenu />

          <section className='md:pt-6'>
            <div className='flex items-center justify-between'>
              <Caption>03_SOCIAL</Caption>
            </div>
            <div className='grid grid-cols-4 w-full items-center relative border-y border-(--sidebar-bg)'>
              {/* <div className='absolute h-full w-0 left-[calc(50%+1px)] -translate-x-1/2 border-r border-(--sidebar-bg)' /> */}
              {social.map((item) => (
                <NextLink
                  href={item.url}
                  key={item.name}
                  aria-label={item.name}
                  target='_blank'
                  rel='noopener noreferrer'
                  className={clsxm(
                    'text-(--sidebar-fg) transition-colors hover:text-stone-800 dark:hover:text-stone-100',
                    'aspect-square border-r border-(--sidebar-bg) last-of-type:border-r-0',
                    'flex items-center justify-center',
                    {
                      'hover:text-[#FF0000] dark:hover:text-[#FF0000]': item.name === 'YouTube',
                    },
                  )}
                >
                  <item.icon className='size-5' />
                </NextLink>
              ))}
            </div>
          </section>
        </div>

        <div className='relative z-50 grid grid-cols-1'>
          <Caption>04_SETTINGS</Caption>
          <div className='border-t border-(--sidebar-bg) w-full h-0' />
          <ThemeSelector />
          <div className='border-t border-(--sidebar-bg) w-full h-0' />
          <LocaleSelector />
          <div className='border-t border-(--sidebar-bg) w-full h-0' />
          <Clock />
        </div>
      </div>
    </aside>
  )
}

function NavMenu() {
  const t = useTranslations('NavMenu')

  return (
    <NavigationMenu.Root className='relative z-50 ml-0 md:pt-6' orientation='vertical'>
      <div className='flex items-center justify-between'>
        <Caption>02_NAVIGATION</Caption>
      </div>
      <NavigationMenu.List className='m-0 flex list-none flex-wrap items-center overflow-scroll px-4 py-1.5 md:flex-col md:items-start md:overflow-visible md:px-0 md:py-0 border-b border-(--sidebar-bg)'>
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
    <li className='border-t border-(--sidebar-bg) w-full'>
      <NavigationMenu.Link active={isActive} asChild>
        <Link
          href={href}
          onClick={() => {
            // @see https://github.com/framer/motion/issues/2006#issuecomment-1477824846
            window.scroll(0, 0)
          }}
          className={clsxm(
            'relative flex select-none p-3.5 font-medium leading-none text-(--sidebar-fg) no-underline outline-none transition-colors hover:text-stone-800 dark:hover:text-stone-100',
            'focus-visible:outline-stone-300 dark:focus-visible:outline-stone-700',
            'data-active:text-black dark:data-active:text-white',
            'data-active:**:data-highlight:opacity-20',
            className,
          )}
          aria-label={label}
          ref={forwardedRef}
        >
          {isActive && (
            <motion.span
              className='absolute inset-0 -z-10 bg-white dark:bg-stone-950 outline outline-(--sidebar-fg)/35'
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
