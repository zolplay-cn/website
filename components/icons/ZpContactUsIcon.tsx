import type { SVGProps } from 'react'
import React from 'react'

type IconProps = SVGProps<SVGSVGElement> & {
  secondaryfill?: string
  strokewidth?: number
  title?: string
}

export function ZpContactUsIcon({ fill = 'currentColor', secondaryfill, ...props }: IconProps) {
  secondaryfill = secondaryfill || fill

  return (
    <svg aria-hidden='true' height='18' width='18' viewBox='0 0 18 18' xmlns='http://www.w3.org/2000/svg' {...props}>
      <g fill={fill}>
        <path
          d='M2.88299 6.935L15.182 2.542C15.545 2.412 15.912 2.725 15.842 3.104L13.646 14.964C13.579 15.327 13.154 15.495 12.857 15.275L2.75399 7.807C2.43199 7.569 2.50599 7.07 2.88299 6.935Z'
          fill={secondaryfill}
          fillOpacity='0.1'
          stroke='none'
        />
        <path
          d='M5.75 10.022V14.268C5.75 14.677 6.214 14.913 6.544 14.672L7.284 14.133'
          fill='none'
          stroke={fill}
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='1.5'
        />
        <path
          d='M15.58 2.569L5.75 10.022'
          fill='none'
          stroke={fill}
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='1.5'
        />
        <path
          d='M2.88299 6.935L15.182 2.542C15.545 2.412 15.912 2.725 15.842 3.104L13.646 14.964C13.579 15.327 13.154 15.495 12.857 15.275L2.75399 7.807C2.43199 7.569 2.50599 7.07 2.88299 6.935Z'
          fill='none'
          stroke={fill}
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='1.5'
        />
      </g>
    </svg>
  )
}
