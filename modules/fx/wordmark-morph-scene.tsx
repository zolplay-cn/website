'use client'

import UnicornScene from 'unicornstudio-react/next'

export default function WordmarkMorphScene({ className }: { className?: string }) {
  return (
    <UnicornScene
      jsonFilePath='/assets/zolplay-wordmark-dither-morph.json'
      fps={60}
      dpi={1.5}
      scale={1}
      production
      className={className}
    />
  )
}
