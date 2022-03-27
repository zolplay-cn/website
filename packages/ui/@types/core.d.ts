import { FC } from 'react'

// CSS custom variables
declare module 'react' {
  interface CSSProperties {
    [key: `--${string}`]: string | number
  }
}

// eslint-disable-next-line @typescript-eslint/ban-types
declare type UIComponent<P = {}> = FC<
  {
    className?: string
  } & P
>
