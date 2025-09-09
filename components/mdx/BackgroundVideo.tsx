import type { VideoHTMLAttributes } from 'react'
import { clsxm } from '@zolplay/utils'

interface BackgroundVideoProps extends Omit<VideoHTMLAttributes<HTMLVideoElement>, 'children' | 'className' | 'src'> {
  src: string
  aspectRatio?: string
  className?: string
  ariaLabel?: string
}

export function BackgroundVideo({
  src,
  aspectRatio = '16/9',
  className,
  // sensible defaults for background videos
  autoPlay = true,
  muted = true,
  loop = true,
  playsInline = true,
  preload = 'metadata',
  controls = false,
  poster,
  ariaLabel,
  ...rest
}: BackgroundVideoProps) {
  const providedAriaLabel = (rest as any)?.['aria-label'] as string | undefined
  const labelled = ariaLabel || providedAriaLabel || rest.title

  // Use object-cover for true background behavior when not showing controls
  const videoClasses = clsxm(
    'absolute inset-0 h-full w-full',
    controls ? 'object-contain' : 'object-cover',
    controls ? undefined : 'pointer-events-none select-none',
  )

  return (
    <div className={clsxm('not-prose relative overflow-hidden', className)} style={{ aspectRatio }}>
      <video
        // spread remaining attributes first; explicit props below set defaults
        {...rest}
        src={src}
        className={videoClasses}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        playsInline={playsInline}
        preload={preload}
        poster={poster}
        controls={controls}
        // Accessibility: hide from SR unless labelled; set label/title when provided
        aria-label={ariaLabel ?? providedAriaLabel}
        aria-hidden={labelled ? undefined : true}
        title={ariaLabel ?? rest.title}
      />
    </div>
  )
}
