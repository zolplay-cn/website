import { motion, MotionProps } from 'framer-motion'
import stringHash from 'string-hash'
import tinycolor from 'tinycolor2'

import type { UIComponent } from './@types/core'
import { clsxm } from './utils'

const Fallback: UIComponent<{ name: string }> = ({ name, className }) => {
  const encodedName = encodeURI(name.split(' ').join('_'))
  const hashed = stringHash(encodedName)
  const c = tinycolor({ h: hashed % 360, s: 0.95, l: 0.5 })
  const c1 = c.toHexString()
  const c2 = c.triad()[1].toHexString()

  return (
    <svg role="img" aria-label={name} className={className} viewBox="0 0 80 80">
      <defs>
        <linearGradient x1="0%" y1="0%" x2="100%" y2="100%" id={encodedName}>
          <stop stopColor={c1} offset="0%" />
          <stop stopColor={c2} offset="100%" />
        </linearGradient>
      </defs>
      <g stroke="none" strokeWidth="1" fill="none">
        <rect
          fill={`url(#${encodedName})`}
          x="0"
          y="0"
          width="100%"
          height="100%"
        />
      </g>
    </svg>
  )
}

type AvatarProps = {
  name: string
  src?: string | null
  initials?: boolean
} & MotionProps
export const Avatar: UIComponent<AvatarProps> = ({
  className,
  name,
  ...rest
}) => {
  // TODO: uncomment to use initials
  // const initials = useMemo(
  //   () =>
  //     take(
  //       name.split(' ').map((n) => n[0]),
  //       2
  //     ).join(''),
  //   [name]
  // )

  return (
    <motion.div
      className={clsxm(
        'relative inline-flex select-none items-center justify-center overflow-hidden tracking-tight',
        className
      )}
      {...rest}
    >
      <Fallback
        name={name}
        className={clsxm('absolute inset-0 rounded-full')}
      />
    </motion.div>
  )
}
