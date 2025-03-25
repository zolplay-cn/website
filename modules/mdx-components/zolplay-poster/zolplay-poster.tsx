import Image from 'next/image'
import Poster from './zolplay-poster.png'

export function ZolplayPoster() {
  return <Image src={Poster} alt='Zolplay Poster' placeholder='blur' />
}
