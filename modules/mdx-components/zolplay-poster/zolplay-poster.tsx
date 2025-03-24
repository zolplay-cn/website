'use client'

import Image from 'next/image'
import { useUWU } from '~/hooks/useUWU'
import UwU from '../../../modules/uwu/zolplay-logo-uwu.png'
import Poster from './zolplay-poster.png'

export function ZolplayPoster() {
  const isUWU = useUWU()

  return <Image src={isUWU ? UwU : Poster} alt='Zolplay Poster' placeholder='blur' />
}
