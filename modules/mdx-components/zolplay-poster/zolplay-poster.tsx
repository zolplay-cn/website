'use client'

import { useUWU } from "~/hooks/useUWU"
import UwU from '../../../modules/uwu/zolplay-logo-uwu.png'
import Poster from './zolplay-poster.png'
import Image from 'next/image'

export function ZolplayPoster(){
  const isUWU = useUWU()

  return <Image src={isUWU ? UwU : Poster} alt='Zolplay Poster' placeholder='blur' />
}
