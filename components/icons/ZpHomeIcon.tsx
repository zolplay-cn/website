import type { SVGProps } from 'react'

import React from 'react'

type IconProps = SVGProps<SVGSVGElement> & {
  secondaryfill?: string
  strokewidth?: number
  title?: string
}

export function ZpHomeIcon({ fill = 'currentColor', secondaryfill, ...props }: IconProps) {
  secondaryfill = secondaryfill || fill

  return (
    <svg aria-hidden='true' height='18' width='18' viewBox='0 0 18 18' xmlns='http://www.w3.org/2000/svg' {...props}>
      <g fill={fill}>
        <path
          d='M3.145 5.94999L8.395 1.96C8.753 1.688 9.248 1.688 9.605 1.96L14.855 5.94999C15.104 6.13899 15.25 6.434 15.25 6.746V14.25C15.25 15.355 14.355 16.25 13.25 16.25H4.75C3.645 16.25 2.75 15.355 2.75 14.25V6.746C2.75 6.433 2.896 6.13899 3.145 5.94999Z'
          fill={secondaryfill}
          fillOpacity='0.1'
          stroke='none'
        />
        <path
          d='M3.145 5.94999L8.395 1.96C8.753 1.688 9.248 1.688 9.605 1.96L14.855 5.94999C15.104 6.13899 15.25 6.434 15.25 6.746V14.25C15.25 15.355 14.355 16.25 13.25 16.25H4.75C3.645 16.25 2.75 15.355 2.75 14.25V6.746C2.75 6.433 2.896 6.13899 3.145 5.94999Z'
          fill='none'
          stroke={fill}
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='1.5'
        />
        <path
          d='M11.652 12.152C10.188 13.616 7.813 13.616 6.349 12.152'
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
