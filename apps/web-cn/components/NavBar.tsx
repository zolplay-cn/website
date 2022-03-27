import { motion } from 'framer-motion'
import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'
import { clsxm, GithubIcon, JoinIcon, WeChatIcon } from 'ui'
import type { UIComponent } from 'ui/@types/core'

import { NeonLogo, NeonTextLogo } from '~/components/NeonLogos'

type NavBarLinkProps = {
  strict?: boolean
}
const NavBarLink: UIComponent<LinkProps & NavBarLinkProps> = ({
  className,
  href,
  children,
  strict,
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
      </motion.a>
    </Link>
  )
}

const NavBar: UIComponent = () => {
  return (
    <nav className="absolute top-0 z-[1000] flex h-20 w-full items-center antialiased">
      <main className="container flex w-full items-center justify-between">
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
                className="space-x-1 text-sm font-bold"
              >
                <JoinIcon className="h-5" />
                <span>岗位招聘</span>
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
            <li>
              <NavBarLink href="#">
                <WeChatIcon className="h-6" />
              </NavBarLink>
            </li>
            <li>
              <NavBarLink
                href={process.env.NEXT_PUBLIC_GITHUB_URL || ''}
                className="text-zinc-50"
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
