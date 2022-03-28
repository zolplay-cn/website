import { motion } from 'framer-motion'
import React from 'react'
import type { UIComponent } from 'ui/@types/core'

import { NeonLogo, NeonTextLogo } from '~/components/NeonLogos'
import SiteLink from '~/components/SiteLink'

import { navigation } from '~/config/navigation'

import Tippy from '@tippyjs/react'

const NavBar: UIComponent = () => {
  return (
    <nav className="absolute top-0 z-[1000] flex h-20 w-full items-center antialiased">
      <main className="container flex w-full items-center justify-between px-2 lg:px-6">
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
                      animate={{ y: [0, -1], scale: [1, 0.98], rotate: [0, 4] }}
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
      </main>
    </nav>
  )
}

export default NavBar
