import type { SVGProps } from 'react'
import React from 'react'

type IconProps = SVGProps<SVGSVGElement> & {
  fill?: string
  secondaryfill?: string
  strokewidth?: number
}

export function ZpWorkIcon({ fill = 'currentColor', secondaryfill, ...props }: IconProps) {
  secondaryfill = secondaryfill || fill
  return (
    <svg aria-hidden='true' height='18' width='18' viewBox='0 0 18 18' xmlns='http://www.w3.org/2000/svg' {...props}>
      <g fill={fill}>
        <path
          d='M14.925 15.75H8.75L10.618 11.55C10.698 11.3699 10.877 11.25 11.075 11.25H16.481C16.843 11.25 17.085 11.62 16.938 11.95L15.382 15.45C15.302 15.6301 15.123 15.75 14.925 15.75Z'
          fill={secondaryfill}
          fillOpacity='0.1'
          stroke='none'
        />
        <path
          d='M8 8.25C9.7949 8.25 11.25 6.794 11.25 5C11.25 3.206 9.7949 1.75 8 1.75C6.2051 1.75 4.75 3.206 4.75 5C4.75 6.794 6.2051 8.25 8 8.25Z'
          fill='none'
          stroke={fill}
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='1.5'
        />
        <path
          d='M1.953 14.5C3.1574 12.6813 5.15919 11.4395 7.45889 11.2699'
          fill='none'
          stroke={fill}
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='1.5'
        />
        <path
          d='M14.925 15.75H8.75L10.618 11.55C10.698 11.3699 10.877 11.25 11.075 11.25H16.481C16.843 11.25 17.085 11.62 16.938 11.95L15.382 15.45C15.302 15.6301 15.123 15.75 14.925 15.75Z'
          fill='none'
          stroke={fill}
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='1.5'
        />
        <path
          d='M8.75 15.75H5.75'
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
