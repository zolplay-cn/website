'use client'

import { motion } from 'motion/react'
import { modulate } from './utils/math'

const GRID_STEPS = [
  {
    min: -1,
    mid: 0.15,
    size: 64,
    id: 'grid-step-1',
  },
  {
    min: 0.05,
    mid: 0.375,
    size: 16,
    id: 'grid-step-2',
  },
  {
    min: 0.15,
    mid: 1,
    size: 4,
    id: 'grid-step-3',
  },
  {
    min: 0.7,
    mid: 2.5,
    size: 1,
    id: 'grid-step-4',
  },
]

const DEFAULT_CAMERA = { position: { x: 0, y: 0 }, zoom: 1 }
function Grids({
  grid,
  camera = DEFAULT_CAMERA,
}: {
  grid: number
  camera?: { position: { x: number; y: number }; zoom: number }
}) {
  return (
    <svg
      className='w-full h-full bg-transparent pointer-events-none select-none touch-none'
      version='1.1'
      xmlns='http://www.w3.org/2000/svg'
      fill='transparent'
    >
      <defs>
        {GRID_STEPS.map(({ min, mid, size, id }) => {
          const s = size * grid * camera.zoom
          const xo = camera.position.x * camera.zoom
          const yo = camera.position.y * camera.zoom
          const gxo = xo > 0 ? xo % s : s + (xo % s)
          const gyo = yo > 0 ? yo % s : s + (yo % s)
          const opacity = camera.zoom < mid ? modulate(camera.zoom, [min, mid], [0.25, 1]) : 1

          return (
            <pattern
              key={id}
              id={`grid-${id}`}
              width={s}
              height={s}
              patternUnits='userSpaceOnUse'
              fill='transparent'
              className='bg-transparent'
            >
              <circle
                cx={gxo}
                cy={gyo}
                r={1}
                opacity={opacity}
                className='bg-transparent fill-stone-500 dark:fill-stone-600'
              />
            </pattern>
          )
        })}
      </defs>
      {GRID_STEPS.map(({ id }) => (
        <rect key={id} width='100%' height='100%' fill={`url(#grid-${id})`} />
      ))}
    </svg>
  )
}

export function Background() {
  return (
    <>
      <div className='fixed inset-0 -z-[1] bg-stone-100 dark:bg-stone-950' />
      <motion.span
        className='fixed inset-0 w-full h-full pointer-events-none'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Grids grid={10} />
      </motion.span>

      <motion.span
        className='pointer-events-none fixed top-0 block h-[600px] w-full select-none bg-[radial-gradient(103.72%_46.58%_at_50%_0%,rgba(12,12,12,0.03)_0%,rgba(12,12,12,0)_100%)] dark:bg-[radial-gradient(103.72%_46.58%_at_50%_0%,rgba(255,255,255,0.013)_0%,rgba(255,255,255,0)_100%)]'
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, type: 'spring' }}
      />

      <div className='mask-t pointer-events-none fixed hidden md:block inset-x-0 top-0 z-30 h-[100px] md:h-[88px] w-full select-none backdrop-blur-[1px]' />
    </>
  )
}
