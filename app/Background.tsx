'use client'

import { motion } from 'framer-motion'

const GRID_STEPS = [
  {
    min: -1,
    mid: 0.15,
    size: 64,
  },
  {
    min: 0.05,
    mid: 0.375,
    size: 16,
  },
  {
    min: 0.15,
    mid: 1,
    size: 4,
  },
  {
    min: 0.7,
    mid: 2.5,
    size: 1,
  },
]

/**
 * Modulate a value between two ranges.
 * @param value
 * @param rangeA from [low, high]
 * @param rangeB to [low, high]
 * @param clamp
 */
export function modulate(
  value: number,
  rangeA: number[],
  rangeB: number[],
  clamp = false
): number {
  const [fromLow, fromHigh] = rangeA
  const [v0, v1] = rangeB
  const result = v0 + ((value - fromLow) / (fromHigh - fromLow)) * (v1 - v0)

  return clamp
    ? v0 < v1
      ? Math.max(Math.min(result, v1), v0)
      : Math.max(Math.min(result, v0), v1)
    : result
}

function Grids({
  grid,
  camera = { position: { x: 0, y: 0 }, zoom: 1 },
}: {
  grid: number
  camera?: { position: { x: number; y: number }; zoom: number }
}) {
  return (
    <svg
      className="pointer-events-none h-full w-full touch-none select-none bg-transparent"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      fill="transparent"
    >
      <defs>
        {GRID_STEPS.map(({ min, mid, size }, i) => {
          const s = size * grid * camera.zoom
          const xo = camera.position.x * camera.zoom
          const yo = camera.position.y * camera.zoom
          const gxo = xo > 0 ? xo % s : s + (xo % s)
          const gyo = yo > 0 ? yo % s : s + (yo % s)
          const opacity =
            camera.zoom < mid ? modulate(camera.zoom, [min, mid], [0, 1]) : 1

          return (
            <pattern
              key={`grid-pattern-${i}`}
              id={`grid-${i}`}
              width={s}
              height={s}
              patternUnits="userSpaceOnUse"
              fill="transparent"
              className="bg-transparent"
            >
              <circle
                cx={gxo}
                cy={gyo}
                r={2}
                opacity={opacity}
                className="bg-transparent fill-stone-300 dark:fill-stone-700"
              />
            </pattern>
          )
        })}
      </defs>
      {GRID_STEPS.map((_, i) => (
        <rect
          key={`grid-rect-${i}`}
          width="100%"
          height="100%"
          fill={`url(#grid-${i})`}
        />
      ))}
    </svg>
  )
}

export function Background() {
  return (
    <>
      <motion.span
        className="pointer-events-none fixed inset-0 h-full w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Grids grid={10} />
      </motion.span>

      <motion.span
        className="pointer-events-none fixed top-0 block h-[600px] w-full select-none bg-[radial-gradient(103.72%_46.58%_at_50%_0%,rgba(12,12,12,0.03)_0%,rgba(12,12,12,0)_100%)] dark:bg-[radial-gradient(103.72%_46.58%_at_50%_0%,rgba(255,255,255,0.013)_0%,rgba(255,255,255,0)_100%)]"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, type: 'spring' }}
      />

      <div className="mask-t pointer-events-none fixed inset-x-0 top-0 z-30 h-[88px] w-full select-none backdrop-blur-[1px]" />
      <div className="mask-b pointer-events-none fixed inset-x-0 bottom-0 z-30 h-[80px] w-full select-none backdrop-blur-[1px]" />
    </>
  )
}
