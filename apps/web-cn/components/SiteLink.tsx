import { motion } from 'framer-motion'
import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'
import { clsxm, ExternalIcon } from 'ui'
import { UIComponent } from 'ui/@types/core'

type SiteLinkProps = {
  target?: '_blank' | '_self' | '_parent' | '_top'
  strict?: boolean
}
const SiteLink: UIComponent<LinkProps & SiteLinkProps> = ({
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
    if (!strict) {
      return route.startsWith(href.toString())
    }

    return route === href.toString()
  }, [isRelativeUrl, route, href, strict])

  return (
    <Link href={href} passHref {...rest}>
      <motion.a
        target={target}
        animate={{
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

export default SiteLink
