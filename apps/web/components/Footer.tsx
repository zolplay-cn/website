import { motion } from 'framer-motion'
import { atom, useAtomValue } from 'jotai'
import React from 'react'
import { clsxm, ExternalIcon } from 'ui'
import { UIComponent } from 'ui/@types/core'

import { NeonLogo } from '~/components/NeonLogos'
import SiteLink from '~/components/SiteLink'

import { navigation } from '~/config/navigation'

import { MailOpenIcon } from '@heroicons/react/outline'
import Tippy from '@tippyjs/react'

type FooterConfig = {
  transparent?: boolean
}
export const footerConfigAtom = atom<FooterConfig>({})

type FooterProps = {
  config?: FooterConfig
}
const Footer: UIComponent<FooterProps> = ({
  config: defaultConfig,
  className,
}) => {
  const config = useAtomValue(footerConfigAtom)

  return (
    <footer
      className={clsxm(
        'bg-dark',
        (defaultConfig?.transparent || config.transparent) && 'bg-transparent',
        className
      )}
    >
      <div className="mx-auto max-w-7xl overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
        <motion.nav
          className="-mx-5 -my-2 flex flex-wrap justify-center"
          aria-label="Footer"
          initial={{ opacity: 0, y: 5 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring' }}
        >
          {navigation.main.map((item) => (
            <div key={item.name} className="px-5 py-2">
              <SiteLink
                href={item.href}
                className="flex items-center text-base text-slate-100"
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
                    {typeof item.badge === 'string' ? item.badge : item.badge()}
                  </motion.span>
                )}
              </SiteLink>
            </div>
          ))}
        </motion.nav>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', delay: 0.07 }}
          className="mt-8 flex justify-center space-x-6"
        >
          {navigation.social.map((social) => {
            const el = (
              <SiteLink
                key={social.name}
                href={social.href}
                target={social.tippyContent ? undefined : '_blank'}
                className="text-zinc-50"
              >
                <span className="sr-only">{social.name}</span>
                <social.icon className="h-6" aria-hidden />
              </SiteLink>
            )

            return social.tippyContent ? (
              <Tippy content={social.tippyContent} key={social.name}>
                <span>{el}</span>
              </Tippy>
            ) : (
              el
            )
          })}
        </motion.div>
        <div className="mt-8 flex flex-col items-center space-y-5">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', delay: 0.17 }}
            className="flex items-center text-sm text-slate-300"
          >
            <MailOpenIcon className="mr-1 h-4 w-4" />
            <span className="flex items-center">
              Contact us at
              <a
                href="mailto:contact@zolplay.cn"
                className="ml-1 flex items-center hover:underline"
              >
                <span>contact@zolplay.com</span>
                <ExternalIcon className="ml-1 h-3 w-3" />
              </a>
            </span>
          </motion.span>

          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', delay: 0.23 }}
            className="text-neon flex items-center space-x-3 text-sm text-slate-300"
          >
            <span>&copy; {new Date().getFullYear()} Zolplay Co.</span>
            <span>Handcrafted in China</span>
          </motion.span>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', delay: 0.28 }}
            className="mt-3"
          >
            <SiteLink href="/" strict>
              <NeonLogo type="sm" />
            </SiteLink>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
