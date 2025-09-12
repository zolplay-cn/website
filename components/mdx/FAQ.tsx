import type { ReactNode } from 'react'
import { BiChevronDown } from 'react-icons/bi'

interface FAQProps {
  title: string
  className?: string
  children: ReactNode
}

interface FAQItemProps {
  question: string
  defaultOpen?: boolean
  children: ReactNode
}

export function FAQ({ title, className, children }: FAQProps) {
  return (
    <section className={`not-prose my-12 ${className ?? ''}`.trim()}>
      <div className='grid gap-6 md:gap-10 md:grid-cols-3'>
        <div className='md:col-span-1'>
          <h2 className='text-3xl md:text-4xl font-medium tracking-tight'>{title}</h2>
        </div>
        <div className='md:col-span-2'>
          <ul className='m-0 p-0 list-none space-y-2'>{children}</ul>
        </div>
      </div>
    </section>
  )
}

export function FAQItem({ question, defaultOpen, children }: FAQItemProps) {
  return (
    <li>
      <details className='group border border-(--grid-border-color) bg-white dark:bg-[#1a1a1a]' open={defaultOpen}>
        <summary className='flex cursor-pointer items-center justify-between gap-3 px-4 py-3 md:px-5 md:py-3 text-base font-medium tracking-tight text-neutral-900 dark:text-neutral-100 select-none'>
          <span>{question}</span>
          <BiChevronDown className='size-5 shrink-0 text-neutral-500 transition-transform group-open:rotate-180' />
        </summary>
        <div className='px-4 pb-4 md:px-5 md:pb-5 text-neutral-700 dark:text-neutral-300 leading-relaxed'>
          {children}
        </div>
      </details>
    </li>
  )
}
