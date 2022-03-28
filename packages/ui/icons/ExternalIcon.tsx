import React, { SVGProps } from 'react'

export function ExternalIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 21 21" {...props}>
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14.5 13.5v-7h-7m7 0l-8 8"
      />
    </svg>
  )
}
