import type { SVGProps } from 'react'
import React from 'react'

type IconProps = SVGProps<SVGSVGElement> & {
  secondaryfill?: string
  strokewidth?: number
  title?: string
}

export function ZpShirtIcon({ fill = 'currentColor', secondaryfill, ...props }: IconProps) {
  secondaryfill = secondaryfill || fill

  return (
    <svg aria-hidden='true' height='18' width='18' viewBox='0 0 18 18' xmlns='http://www.w3.org/2000/svg' {...props}>
      <g fill={fill}>
        <path
          d='M3.75 2.75C2.64543 2.75 1.75 3.64543 1.75 4.75V13.25C1.75 14.3546 2.64543 15.25 3.75 15.25H14.25C15.3546 15.25 16.25 14.3546 16.25 13.25V4.75C16.25 3.64543 15.3546 2.75 14.25 2.75H12.75V8.25L9 5.00579L5.25 8.25V2.75H3.75Z'
          fill={secondaryfill}
          fillOpacity='0.1'
          fillRule='evenodd'
          stroke='none'
        />
        <path
          d='M12.75 2.75H14.25C15.355 2.75 16.25 3.645 16.25 4.75V13.25C16.25 14.355 15.355 15.25 14.25 15.25H3.75C2.645 15.25 1.75 14.355 1.75 13.25V4.75C1.75 3.645 2.645 2.75 3.75 2.75H5.25'
          fill='none'
          stroke={fill}
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='1.5'
        />
        <path
          d='M9 5.01099V15.25'
          fill='none'
          stroke={fill}
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='1.5'
        />
        <path
          d='M11.75 11.25H13.75'
          fill='none'
          stroke={fill}
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='1.5'
        />
        <path
          d='M12.446 2.033L5.25 8.25V2.75C5.25 2.198 5.698 1.75 6.25 1.75H11.75C12.302 1.75 12.75 2.198 12.75 2.75V8.25L5.553 2.033'
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
