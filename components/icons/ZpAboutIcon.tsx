import type { SVGProps } from 'react'
import React from 'react'

type IconProps = SVGProps<SVGSVGElement> & {
  secondaryfill?: string
  strokewidth?: number
  title?: string
}

export function ZpAboutIcon({ fill = 'currentColor', secondaryfill, ...props }: IconProps) {
  secondaryfill = secondaryfill || fill

  return (
    <svg aria-hidden='true' height='18' width='18' viewBox='0 0 18 18' xmlns='http://www.w3.org/2000/svg' {...props}>
      <g fill={fill}>
        <path
          d='M9 11.25C10.2426 11.25 11.25 10.2426 11.25 9C11.25 7.75736 10.2426 6.75 9 6.75C7.75736 6.75 6.75 7.75736 6.75 9C6.75 10.2426 7.75736 11.25 9 11.25Z'
          fill={secondaryfill}
          fillOpacity='0.1'
          stroke='none'
        />
        <path
          d='M9 11.25C10.2426 11.25 11.25 10.2426 11.25 9C11.25 7.75736 10.2426 6.75 9 6.75C7.75736 6.75 6.75 7.75736 6.75 9C6.75 10.2426 7.75736 11.25 9 11.25Z'
          fill='none'
          stroke={fill}
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='1.5'
        />
        <path
          d='M2.75 6.75V4.75C2.75 3.645 3.645 2.75 4.75 2.75H6.75'
          fill='none'
          stroke={fill}
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='1.5'
        />
        <path
          d='M11.25 2.75H13.25C14.355 2.75 15.25 3.645 15.25 4.75V6.75'
          fill='none'
          stroke={fill}
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='1.5'
        />
        <path
          d='M15.25 11.25V13.25C15.25 14.355 14.355 15.25 13.25 15.25H11.25'
          fill='none'
          stroke={fill}
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='1.5'
        />
        <path
          d='M6.75 15.25H4.75C3.645 15.25 2.75 14.355 2.75 13.25V11.25'
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
