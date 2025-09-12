'use client'

import type { ComponentProps } from '@zolplay/react'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { clsxm } from '@zolplay/utils'
import { motion } from 'motion/react'
import { useLocale, useTranslations } from 'next-intl'

import NextLink from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Drawer } from 'vaul'
import { ZpBrandGitHubIcon } from '~/components/icons/ZpBrandGitHubIcon'
import { ZpBrandXIcon } from '~/components/icons/ZpBrandXIcon'
import { ZpBrandYouTubeIcon } from '~/components/icons/ZpBrandYouTubeIcon'
import { ZpContactUsIcon } from '~/components/icons/ZpContactUsIcon'
import { ZpHomeIcon } from '~/components/icons/ZpHomeIcon'
import { ZpMailIcon } from '~/components/icons/ZpMailIcon'
import { ZpPricingIcon } from '~/components/icons/ZpPricingIcon'
import { ZpSignboardIcon } from '~/components/icons/ZpSignboardIcon'
import { ZpWorkIcon } from '~/components/icons/ZpWorkIcon'
import { LocaleSelector } from '~/components/locale-selector'
import { LogoHelmetFilled } from '~/components/logo'
import { ThemeSelector } from '~/components/theme-selector'
import { Clock } from '~/components/ui/clock'
import { Select } from '~/components/ui/select'
import { Link, usePathname } from '~/modules/i18n/navigation'

const links = [
  { href: '/', label: 'Home', icon: ZpHomeIcon },
  { href: '/work', label: 'Work', icon: ZpWorkIcon },
  { href: '/services', label: 'Services', icon: ZpSignboardIcon },
  // { href: '/careers', label: 'Careers', icon: ZpShirtIcon },
  { href: '/pricing', label: 'Pricing', icon: ZpPricingIcon },
  { href: '/contact', label: 'Contact', icon: ZpContactUsIcon },
  // { href: '/blog', label: 'Blog', icon: ZpBlogIcon },
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
        'fixed top-0 md:left-4 lg:left-[calc(50%-(3*var(--gutter-width))-(2*var(--spacing)*44))] md:mx-0 md:w-44 md:flex-shrink-0 md:px-0',
        '[--sidebar-backdrop:var(--color-stone-100)] dark:[--sidebar-backdrop:var(--color-stone-950)]',
        'bg-[image:repeating-linear-gradient(45deg,_var(--sidebar-bg)_0,_var(--sidebar-bg)_1px,_var(--sidebar-backdrop)_0,_var(--sidebar-backdrop)_50%)] bg-[size:16px_16px] bg-fixed [--sidebar-bg:var(--color-black)]/3 [--sidebar-fg:var(--color-neutral-500)] dark:[--sidebar-bg:var(--color-white)]/5 dark:[--sidebar-fg:var(--color-neutral-400)]',
        'border-x border-(--sidebar-fg)/20',
        'overflow-y-scroll z-30',
        'hidden md:block',
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
              'group relative px-3.5 py-2.5 flex focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-500 focus-visible:ring-opacity-50 focus-visible:ring-offset-2 focus-visible:ring-offset-(--sidebar-bg) dark:focus-visible:ring-stone-700 dark:focus-visible:ring-offset-stone-800 justify-start items-center gap-1.5 border-y border-(--sidebar-fg)/20',
              '**:data-highlight:opacity-35 hover:**:data-highlight:opacity-100',
            )}
          >
            <LogoHelmetFilled className='size-4.5' />
            <span className='text-sm font-medium tracking-tight'>Zolplay</span>
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
            <div className='grid grid-cols-4 w-full items-center relative border-y border-(--sidebar-fg)/20'>
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
                    'aspect-square border-r border-(--sidebar-fg)/20 last-of-type:border-r-0',
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
          <div className='border-t border-(--sidebar-fg)/20 w-full h-0' />
          <ThemeSelector />
          <div className='border-t border-(--sidebar-fg)/20 w-full h-0' />
          <LocaleSelector />
          <div className='border-t border-(--sidebar-fg)/20 w-full h-0' />
          <Clock />
        </div>
      </div>
    </aside>
  )
}

function NavMenu() {
  const t = useTranslations('NavMenu')
  const [resourcesOpen, setResourcesOpen] = React.useState(false)

  return (
    <NavigationMenu.Root className='relative z-50 ml-0 md:pt-6' orientation='vertical'>
      <div className='flex items-center justify-between'>
        <Caption>02_NAVIGATION</Caption>
      </div>
      <NavigationMenu.List className='m-0 flex list-none flex-wrap items-center overflow-scroll px-4 py-1.5 md:flex-col md:items-start md:overflow-visible md:px-0 md:py-0 border-b border-(--sidebar-fg)/20'>
        {links.map(({ href, label, icon: Icon }) => (
          <MenuLink key={label} href={href} label={t(label)}>
            <Icon className='size-4.5' />
            <span>{t(label)}</span>
          </MenuLink>
        ))}

        {/* Resources submenu */}
        <li className='border-t border-(--sidebar-fg)/20 w-full'>
          <button
            type='button'
            onClick={() => setResourcesOpen((v) => !v)}
            aria-expanded={resourcesOpen}
            aria-controls='resources-submenu'
            className={clsxm(
              'relative w-full text-left flex select-none p-3.5 font-medium leading-none text-(--sidebar-fg) outline-none transition-colors duration-75 hover:text-stone-800 dark:hover:text-stone-100',
              'focus-visible:outline-stone-300 dark:focus-visible:outline-stone-700',
            )}
          >
            <span className='relative z-40 flex items-center space-x-1.5 text-sm tracking-tight'>
              <svg
                aria-hidden='true'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
                className={clsxm('size-4.5 transition-transform', resourcesOpen && 'rotate-90')}
              >
                <g fill='none'>
                  <path
                    d='M10 8.14a20.4 20.4 0 0 1 3.894 3.701.47.47 0 0 1 0 .596A20.4 20.4 0 0 1 10 16.139'
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                  />
                </g>
              </svg>
              <span>{t('Resources')}</span>
            </span>
          </button>

          {resourcesOpen ? (
            <ul id='resources-submenu' className='pl-7 pr-3 pb-2 pt-1.5 space-y-1.5 -mt-3.5 list-decimal'>
              {[
                { href: '/llms.txt', label: t('LLMs'), locale: 'en' },
                { href: '/privacy', label: t('Privacy') },
                { href: '/terms', label: t('Terms') },
              ].map((item) => (
                <li key={item.href} className='marker:text-(--sidebar-fg)/40 marker:text-xs ml-3'>
                  <Link
                    locale={item.locale ?? undefined}
                    href={item.href}
                    className='block text-(--sidebar-fg) text-xs hover:text-stone-800 dark:hover:text-stone-100'
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </li>
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
    <li className='border-t border-(--sidebar-fg)/20 w-full'>
      <NavigationMenu.Link active={isActive} asChild>
        <Link
          href={href}
          className={clsxm(
            'relative flex select-none p-3.5 font-medium leading-none text-(--sidebar-fg) no-underline outline-none transition-colors duration-75 hover:text-stone-800 dark:hover:text-stone-100',
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

// NavBar component for mobile
export function NavBar() {
  const t = useTranslations('Root.Metadata')
  const tMenu = useTranslations('NavMenu')
  const pathname = usePathname()
  const isLinkActive = (href: string) => href === pathname
  const locale = useLocale()
  const router = useRouter()

  const [isOpen, setIsOpen] = React.useState(false)
  React.useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <header className='sticky md:hidden top-0 z-[9000] h-14 -ml-2 [--nav-bg:var(--color-stone-100)] dark:[--nav-bg:var(--color-stone-900)] bg-gradient-to-b from-stone-100 to-stone-100/85 dark:from-stone-900 dark:to-stone-900/80 w-[calc(100%+var(--spacing)*4)] flex items-center border-b border-(--grid-border-color)'>
      <div className='w-full h-full relative mx-2 pt-1.5 flex border-x border-(--grid-border-color)'>
        <div className='absolute w-[calc(100%+var(--spacing)*6)] -left-3 top-1.5 h-0 z-10 border-t border-(--grid-border-color)' />
        <div className='absolute size-2 z-10 border border-stone-400/50 dark:border-stone-600/50 border-dashed bg-stone-200 dark:bg-stone-800 left-[-4.6px] top-[3px]' />
        <div className='absolute size-2 z-10 border border-stone-400/50 dark:border-stone-600/50 border-dashed bg-stone-200 dark:bg-stone-800 right-[-4.6px] top-[3px]' />
        <div className='absolute size-2 z-10 border border-stone-400/50 dark:border-stone-600/50 border-dashed bg-stone-200 dark:bg-stone-800 left-[-4.6px] -bottom-1' />
        <div className='absolute size-2 z-10 border border-stone-400/50 dark:border-stone-600/50 border-dashed bg-stone-200 dark:bg-stone-800 right-[-4.6px] -bottom-1' />

        <nav data-orientation='horizontal' className='relative z-2 w-full py-3 px-4 flex justify-between gap-4'>
          <div className='flex gap-2 items-center'>
            <Link
              href='/'
              aria-label={t('Title')}
              className={clsxm(
                'flex relative justify-center items-center gap-1',
                '**:data-highlight:opacity-35 hover:**:data-highlight:opacity-100',
              )}
            >
              <LogoHelmetFilled className='size-4.5' />
              <span className='text-base font-bold tracking-tight'>{t('SiteName')}</span>
            </Link>
          </div>

          <Drawer.Root open={isOpen} onOpenChange={setIsOpen}>
            <Drawer.Trigger
              className='relative w-8 h-full outline-none active:outline-none'
              aria-label={tMenu('ToggleNav')}
            >
              <span className='absolute inset-0 flex items-center justify-end'>
                <svg aria-hidden='true' height='18' width='18' viewBox='0 0 18 18' xmlns='http://www.w3.org/2000/svg'>
                  <g fill='currentColor'>
                    <path
                      d='M2.25 9H15.75'
                      fill='none'
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='1.5'
                    />
                    <path
                      d='M2.25 3.75H15.75'
                      fill='none'
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='1.5'
                    />
                    <path
                      d='M9.75 14.25H15.75'
                      fill='none'
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='1.5'
                    />
                  </g>
                </svg>
              </span>
            </Drawer.Trigger>
            <Drawer.Portal>
              <Drawer.Overlay className='fixed inset-x-0 bottom-0 h-[calc(var(--spacing)*24+var(--spacing)*142)] z-50 mask-t-from-70% bg-white/80 dark:bg-black/70 backdrop-blur-xl backdrop-saturate-50' />
              <Drawer.Content
                className={clsxm(
                  'z-50 flex flex-col mt-24 h-fit fixed bottom-0 left-0 right-0 outline-none bg-[image:repeating-linear-gradient(135deg,_var(--drawer-bg)_0,_var(--drawer-bg)_1px,_transparent_0,_transparent_50%)] bg-[size:12px_12px] bg-fixed',
                  '[--drawer-bg:var(--color-black)]/4 [--drawer-fg:var(--color-stone-400)] dark:[--drawer-bg:var(--color-white)]/7 dark:[--drawer-fg:var(--color-gray-600)]',
                  'border-t border-(--grid-border-color)',
                  'mix-blend-multiply dark:mix-blend-difference',
                  'pb-[calc(env(safe-area-inset-bottom)+var(--spacing)*2)]',
                  'overflow-hidden',
                )}
              >
                <div className='p-4 flex-1'>
                  <div aria-hidden className='mx-auto w-8 h-1 flex-shrink-0 rounded-full bg-(--drawer-fg) mb-4' />
                  <div className='max-w-md mx-auto relative before:absolute before:top-0 before:h-px before:w-[200vw] before:-left-[100vw] before:bg-(--grid-border-color) after:absolute after:bottom-0 after:h-px after:w-[200vw] after:-right-[100vw] after:bg-(--grid-border-color)'>
                    <div className='absolute -left-1 -top-[100vh] w-px h-[200vh] bg-(--grid-border-color)' />
                    <div className='absolute -right-1 -top-[100vh] w-px h-[200vh] bg-(--grid-border-color)' />

                    <Drawer.Title
                      className='font-medium relative mb-6 text-2xl text-gray-900 dark:text-white tracking-tight before:absolute before:left-0 before:-top-3 before:font-mono before:text-xs before:text-(--navbar-fg)/50 before:content-[attr(data-label)] before:tracking-wide before:scale-65 before:origin-left before:select-none before:pointer-events-none before:opacity-40 after:absolute after:bottom-0 after:h-px after:w-[200vw] after:-right-[100vw] after:bg-(--grid-border-color)'
                      data-label='TAGLINE'
                    >
                      {t('OpenGraphTitle')}
                    </Drawer.Title>

                    {/* Navigation */}
                    <ul
                      className='relative mb-2 grid grid-cols-4 gap-4 before:absolute before:left-1 before:-top-3 before:font-mono before:text-xs before:text-(--navbar-fg)/50 before:content-[attr(data-label)] before:tracking-wide before:scale-65 before:origin-left before:select-none before:pointer-events-none before:opacity-40 after:absolute after:top-0 after:h-px after:w-[200vw] after:-right-[100vw] after:bg-(--grid-border-color) -left-1 -mr-2'
                      data-label='NAVIGATION'
                    >
                      {links.map(({ href, label, icon: Icon }) => (
                        <li
                          key={label}
                          className={clsxm(
                            'flex relative h-14 items-center before:absolute before:top-0 before:h-px before:w-[200vw] before:-left-[100vw] before:bg-(--grid-border-color) after:absolute after:bottom-0 after:h-px after:w-[200vw] after:-right-[100vw] after:bg-(--grid-border-color) data-active:**:data-highlight:opacity-20',
                            'text-(--navbar-fg)',
                            'data-active:outline data-active:outline-black/30 dark:data-active:outline-white/20 data-active:bg-black/10 dark:data-active:bg-white/10 data-active:text-black dark:data-active:text-white',
                          )}
                          data-active={isLinkActive(href) ? 'true' : null}
                        >
                          <div className='absolute right-0 top-0 w-px h-full bg-(--grid-border-color)' />
                          <div className='absolute left-0 top-0 w-px h-full bg-(--grid-border-color)' />
                          <Link className='flex flex-col justify-between w-full h-full p-0.5' href={href}>
                            <Icon className='size-5' />
                            <span className='text-[13px] font-medium tracking-tight'>{tMenu(label)}</span>
                          </Link>
                        </li>
                      ))}

                      {/* Resources dropdown (mirrors NavMenu Resources) */}
                      {(() => {
                        const resources = [
                          { href: '/llms.txt', label: tMenu('LLMs'), locale: 'en' as const },
                          { href: '/privacy', label: tMenu('Privacy') },
                          { href: '/terms', label: tMenu('Terms') },
                        ]
                        const isResourcesActive = resources.some((r) => r.href === pathname)

                        return (
                          <li
                            className={clsxm(
                              'flex relative h-14 items-center before:absolute before:top-0 before:h-px before:w-[200vw] before:-left-[100vw] before:bg-(--grid-border-color) after:absolute after:bottom-0 after:h-px after:w-[200vw] after:-right-[100vw] after:bg-(--grid-border-color) data-active:**:data-highlight:opacity-20',
                              'text-(--navbar-fg)',
                              'data-active:outline data-active:outline-black/30 dark:data-active:outline-white/20 data-active:bg-black/10 dark:data-active:bg-white/10 data-active:text-black dark:data-active:text-white',
                            )}
                            data-active={isResourcesActive ? 'true' : null}
                          >
                            <div className='absolute right-0 top-0 w-px h-full bg-(--grid-border-color)' />
                            <div className='absolute left-0 top-0 w-px h-full bg-(--grid-border-color)' />
                            <Select.Root
                              onValueChange={(value) => {
                                const targetLocale = value === '/llms.txt' ? 'en' : (locale as string)
                                router.push(`/${targetLocale}${value}`)
                              }}
                            >
                              <Select.Trigger
                                aria-label={tMenu('Resources')}
                                className={clsxm(
                                  'h-full w-full rounded-none border-0 bg-transparent p-0.5 text-left shadow-none items-start',
                                  'flex flex-col justify-between',
                                )}
                                noChevron
                              >
                                {/* Simple icon placeholder to match grid style */}
                                <span className='flex items-center'>
                                  <svg aria-hidden='true' viewBox='0 0 24 24' className='size-5'>
                                    <g fill='none' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round'>
                                      <path d='M5 7h14' />
                                      <path d='M5 12h14' />
                                      <path d='M5 17h10' />
                                    </g>
                                  </svg>
                                </span>
                                <span className='text-[13px] font-medium tracking-tight'>{tMenu('Resources')}</span>
                              </Select.Trigger>
                              <Select.Content position='popper'>
                                {resources.map((item) => (
                                  <Select.Item key={item.href} value={item.href}>
                                    {item.label}
                                  </Select.Item>
                                ))}
                              </Select.Content>
                            </Select.Root>
                          </li>
                        )
                      })()}
                    </ul>

                    {/* Social */}
                    <ul
                      className='relative text-(--navbar-fg) mt-8 mb-4 grid grid-cols-5 gap-6 before:absolute before:left-1 before:-top-3 before:font-mono before:text-xs before:text-(--navbar-fg)/50 before:content-[attr(data-label)] before:tracking-wide before:scale-65 before:origin-left before:select-none before:pointer-events-none before:opacity-40 after:absolute after:top-0 after:h-px after:w-[200vw] after:-right-[100vw] after:bg-(--grid-border-color) -left-1 -mr-2'
                      data-label='SOCIAL'
                    >
                      {social.map(({ url, label, icon: Icon }) => (
                        <li
                          key={label}
                          className='flex relative aspect-square justify-center items-center before:absolute before:top-0 before:h-px before:w-[200vw] before:-left-[100vw] before:bg-(--grid-border-color) after:absolute after:bottom-0 after:h-px after:w-[200vw] after:-right-[100vw] after:bg-(--grid-border-color)'
                        >
                          <div className='absolute right-0 top-0 w-px h-full bg-(--grid-border-color)' />
                          <div className='absolute left-0 top-0 w-px h-full bg-(--grid-border-color)' />
                          <Link className='flex flex-col justify-center' href={url}>
                            <Icon className='size-5' />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className='p-4 border-t border-(--grid-border-color) mt-auto'>
                  <div className='relative grid grid-cols-2 gap-1 max-w-md mx-auto before:absolute before:top-0 before:h-px before:w-[200vw] before:-left-[100vw] before:bg-(--grid-border-color) after:absolute after:w-px after:left-[calc(50%-0.5px)] after:top-0 after:h-full after:bg-(--grid-border-color)'>
                    <div
                      className='relative before:absolute before:left-0 before:-top-3 before:font-mono before:text-xs before:text-(--navbar-fg)/50 before:content-[attr(data-label)] before:tracking-wide before:scale-65 before:origin-left before:select-none before:pointer-events-none before:opacity-40'
                      data-label='THEME'
                    >
                      <ThemeSelector />
                    </div>
                    <div
                      className='relative before:absolute before:left-0 before:-top-3 before:font-mono before:text-xs before:text-(--navbar-fg)/50 before:content-[attr(data-label)] before:tracking-wide before:scale-65 before:origin-left before:select-none before:pointer-events-none before:opacity-40'
                      data-label='LANGUAGE'
                    >
                      <LocaleSelector />
                    </div>
                  </div>
                  <div className='relative flex justify-end max-w-md mx-auto before:absolute before:top-0 before:h-px before:w-[200vw] before:-left-[100vw] before:bg-(--grid-border-color) after:absolute after:bottom-0 after:h-px after:w-[200vw] after:-right-[100vw] after:bg-(--grid-border-color)'>
                    <Clock className='pl-1 scale-70 origin-right opacity-40' />
                  </div>
                </div>
              </Drawer.Content>
            </Drawer.Portal>
          </Drawer.Root>
        </nav>
      </div>
    </header>
  )
}
