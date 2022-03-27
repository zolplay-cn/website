import { motion } from 'framer-motion'
import Image from 'next/image'
import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'
import {
  CareersIcon,
  clsxm,
  ExternalIcon,
  GithubIcon,
  ScanIcon,
  WeChatIcon,
} from 'ui'
import type { UIComponent } from 'ui/@types/core'

import { getOpenPositions } from '~/lib/data'

import { NeonLogo, NeonTextLogo } from '~/components/NeonLogos'

import wechatQRCode from '~/assets/qr-wechat-work.jpg'

import Tippy from '@tippyjs/react'

type NavBarLinkProps = {
  target?: '_blank' | '_self' | '_parent' | '_top'
  strict?: boolean
}
const NavBarLink: UIComponent<LinkProps & NavBarLinkProps> = ({
  className,
  href,
  children,
  strict,
  target,
  ...rest
}) => {
  const { route } = useRouter()
  const isRelativeUrl = useMemo(() => href.toString().startsWith('/'), [href])
  const isActive = useMemo(() => {
    if (!isRelativeUrl) return false
    if (!strict) return route.startsWith(href.toString())

    return route === href.toString()
  }, [isRelativeUrl, route, href, strict])

  return (
    <Link href={href} passHref {...rest}>
      <motion.a
        target={target}
        initial={{
          opacity: isActive ? 1 : 0.8,
        }}
        whileHover={{ opacity: 1 }}
        className={clsxm('text-neon flex items-center', className)}
        onClick={(e) => {
          if (href.toString() === '#') {
            e.preventDefault()
          }
        }}
      >
        {children}
        {target === '_blank' && <ExternalIcon className="ml-1 h-3 w-3" />}
      </motion.a>
    </Link>
  )
}

const NavBar: UIComponent = () => {
  const openPositions = getOpenPositions()

  return (
    <nav className="absolute top-0 z-[1000] flex h-20 w-full items-center antialiased">
      <main className="container flex w-full items-center justify-between px-6">
        <aside className="pl-4">
          <NavBarLink href="/" strict>
            <NeonLogo type="sm" />
            <NeonTextLogo type="sm" />
          </NavBarLink>
        </aside>

        <section className="flex flex-1 items-center justify-end">
          <ul
            className="relative flex items-center space-x-5 pr-6 text-zinc-50"
            id="nav-links"
          >
            <li>
              <NavBarLink
                href="/careers"
                className="flex items-center text-sm font-bold"
              >
                <CareersIcon className="h-5" />
                <span className="ml-1">岗位招聘</span>
                {openPositions.length > 0 && (
                  <motion.span
                    animate={{ y: [0, -1], scale: [1, 0.96], rotate: [0, 6] }}
                    transition={{
                      type: 'spring',
                      repeat: Infinity,
                      repeatType: 'reverse',
                    }}
                    className="ml-2 rounded-lg rounded-bl-none bg-neon-500/80 px-1.5 text-xs font-bold text-dark"
                  >
                    {openPositions.length}
                  </motion.span>
                )}
              </NavBarLink>
            </li>

            <style jsx>{`
              ul:after {
                content: '|';
                color: rgba(255, 255, 255, 0.25);
                font-size: 0.85rem;
                position: absolute;
                right: 0;
                top: 50%;
                transform: translateY(-50%);
              }
            `}</style>
          </ul>

          <ul
            id="nav-social"
            className="flex items-center space-x-5 pl-6 text-zinc-50"
          >
            <Tippy
              content={
                <div className="p-2">
                  <div className="rounded-xl bg-white p-2">
                    <Image src={wechatQRCode} alt="微信二维码" />
                  </div>
                  <div className="mt-3 flex items-center justify-center">
                    <span className="text-sm font-medium">使用微信扫一扫</span>
                    <ScanIcon className="ml-1 h-4 w-4 text-slate-200" />
                  </div>
                </div>
              }
            >
              <li>
                <NavBarLink href="#">
                  <WeChatIcon className="h-6" />
                </NavBarLink>
              </li>
            </Tippy>
            <li>
              <NavBarLink
                href={process.env.NEXT_PUBLIC_GITHUB_URL || ''}
                className="text-zinc-50"
                target="_blank"
              >
                <span className="sr-only">GitHub</span>
                <GithubIcon className="h-6" />
              </NavBarLink>
            </li>
          </ul>
        </section>
      </main>
    </nav>
  )
}

export default NavBar
