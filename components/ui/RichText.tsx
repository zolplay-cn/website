import type { PortableTextMarkComponentProps } from '@portabletext/react/src/types'
import { PortableText } from '@portabletext/react'
import { Link } from 'next-intl'
import { TbArrowDownLeft, TbArrowUpRight } from 'react-icons/tb'
import { Benefits } from '~/components/Benefits'
import { ImageBlock } from '~/components/ImageBlock'
import { OurStacks } from '~/components/OurStacks'
import { OurTools } from '~/components/OurTools'

export const DefaultRichTextComponents = {
  br: () => <br />,
  b: (text) => <strong>{text}</strong>,
  red: (text) => (
    <span className='bg-gradient-to-r from-red-400 to-red-600 bg-clip-text font-bold tracking-tight text-transparent dark:from-red-200 dark:to-red-400'>
      {text}
    </span>
  ),
  green: (text) => (
    <span className='bg-gradient-to-r from-emerald-400 to-green-600 bg-clip-text font-bold tracking-tight text-transparent dark:from-green-200 dark:to-green-400'>
      {text}
    </span>
  ),
  gradient: (text) => (
    <span className='bg-gradient-to-r from-yellow-500 to-indigo-500 bg-clip-text font-bold tracking-tight text-transparent dark:from-amber-200 dark:to-sky-400'>
      {text}
    </span>
  ),
  'contact-us-link': (text) => (
    <Link
      href='/contact'
      className='inline-flex items-center font-semibold text-blue-600 no-underline transition-colors hover:text-blue-800 hover:underline dark:text-sky-300 dark:hover:text-sky-500'
    >
      <span>{text}</span>
      <TbArrowDownLeft className='ml-px h-4 w-4' />
    </Link>
  ),
}

const DefaultMarks = Object.freeze({
  red: ({ text }) => (
    <span className='bg-gradient-to-r from-red-400 to-red-600 bg-clip-text font-bold tracking-tight text-transparent dark:from-red-200 dark:to-red-400'>
      {text}
    </span>
  ),
  green: ({ text }) => (
    <span className='bg-gradient-to-r from-emerald-400 to-green-600 bg-clip-text font-bold tracking-tight text-transparent dark:from-green-200 dark:to-green-400'>
      {text}
    </span>
  ),
  highlight: ({ text }) => (
    <span className='bg-gradient-to-r from-teal-500 to-sky-500 bg-clip-text font-bold tracking-tight text-transparent dark:from-teal-300 dark:to-sky-400'>
      {text}
    </span>
  ),
  link: ({ text, value }: PortableTextMarkComponentProps) => (
    <Link
      href={value?.href}
      className='inline-flex items-center font-semibold text-purple-500 no-underline transition-colors hover:text-blue-800 hover:underline dark:text-sky-300 dark:hover:text-sky-500'
      target={value?.href?.startsWith('http') ? '_blank' : undefined}
    >
      {text}
      {value?.href?.startsWith('/') && <TbArrowDownLeft className='ml-px h-4 w-4' />}
      {value?.href?.startsWith('http') && <TbArrowUpRight className='ml-px h-4 w-4' />}
    </Link>
  ),
})

const DefaultBlocks = Object.freeze({
  benefits: Benefits,
  ourStacks: OurStacks,
  ourTools: OurTools,
  image: ImageBlock,
})

export function RichText({ value }: { value: any[] }) {
  return <PortableText value={value} components={{ marks: DefaultMarks, types: DefaultBlocks }} />
}
