import { clsxm } from '@zolplay/utils'
import RawBackgroundVideo from 'next-video/background-video'

interface BackgroundVideoProps {
  src: string
  aspectRatio?: string
  className?: string
}

export function BackgroundVideo({ src, aspectRatio = '16/9', className }: BackgroundVideoProps) {
  return <RawBackgroundVideo src={src} className={clsxm('not-prose', className)} style={{ aspectRatio }} />
}
