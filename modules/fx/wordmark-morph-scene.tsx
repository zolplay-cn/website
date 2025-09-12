'use client'

import UnicornScene from 'unicornstudio-react/next'

interface Props {
  className?: string
}

export default function WordmarkMorphScene({ className }: Props) {
  return (
    <UnicornScene
      className={className}
      jsonFilePath='/assets/zolplay-wordmark-dither-morph.json'
      altText='Zolplay Wordmark Dither Animation'
      production={false}
      width='100%'
      height='100%'
    />
  )
}
