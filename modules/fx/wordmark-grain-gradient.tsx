/** @paper-design/shaders-react@0.0.52 */
import { GrainGradient } from '@paper-design/shaders-react'
import Image from 'next/image'
import wordmark from '~/public/assets/wordmark.png'

export default function WordmarkGrainGradient() {
  return (
    <div className='w-full aspect-[3/1] contain-layout relative flex items-center justify-center'>
      <GrainGradient
        className='w-full h-full bg-neutral-50 dark:bg-black dark:mix-blend-hard-light absolute inset-0'
        colors={['#29262A', '#E6E6E6', '#343434']}
        colorBack='#00000000'
        speed={1}
        scale={1}
        rotation={0}
        offsetX={0}
        offsetY={0}
        softness={0.5}
        intensity={0.5}
        noise={0.25}
        shape='corners'
      />
      <Image src={wordmark} alt='Zolplay Wordmark' className='invert-75 dark:invert-0 mix-blend-color-dodge w-10/12' />
    </div>
  )
}
