import Image from 'next/image'
import { useMemo } from 'react'
import type { UIComponent } from 'ui/@types/core'

import logoNeonSm from '~/assets/logo-neon-sm.png'
import logoTextNeonSm from '~/assets/logo-text-neon-sm.png'

type NeonLogoProps = {
  type?: 'sm'
}
export const NeonLogo: UIComponent<NeonLogoProps> = ({
  className,
  type = 'sm',
}) => {
  const src = useMemo(() => {
    switch (type) {
      case 'sm':
        return logoNeonSm
    }
  }, [type])
  const size = useMemo(() => {
    switch (type) {
      case 'sm':
        return 56
    }
  }, [type])

  return (
    <Image
      className={className}
      src={src}
      width={size}
      height={size}
      alt="logo"
    />
  )
}

export const NeonTextLogo: UIComponent<NeonLogoProps> = ({
  className,
  type,
}) => {
  const aspectRatio = 163 / 89
  const src = useMemo(() => {
    switch (type) {
      case 'sm':
        return logoTextNeonSm
    }
  }, [type])
  const size = useMemo(() => {
    switch (type) {
      case 'sm':
        return 46
    }
  }, [type])

  return (
    <Image
      className={className}
      src={src}
      width={size * aspectRatio}
      height={size}
      alt="logo"
    />
  )
}
