import Image from 'next/image'
import { WithFrame } from './WithFrame'

export function FramedImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    <WithFrame className={className}>
      <Image src={src} alt={alt} />
    </WithFrame>
  )
}
