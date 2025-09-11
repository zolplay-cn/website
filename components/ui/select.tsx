'use client'

import * as SelectPrimitive from '@radix-ui/react-select'
import { clsxm } from '@zolplay/utils'
import React from 'react'
import { BiCheck, BiChevronDown } from 'react-icons/bi'

const Root = SelectPrimitive.Root

const Group = SelectPrimitive.Group

const Value = SelectPrimitive.Value

function Trigger({ className, children, ...props }: SelectPrimitive.SelectTriggerProps & { noChevron?: boolean }) {
  const { noChevron, ...rest } = props
  return (
    <SelectPrimitive.Trigger
      className={clsxm(
        'mr-2 flex h-8 w-full select-none items-center justify-between rounded-md border border-stone-300 bg-transparent px-2 py-1 text-sm placeholder:text-stone-600 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-stone-700 dark:text-stone-100 dark:placeholder:text-stone-500',
        'tracking-tight',
        className,
      )}
      {...rest}
    >
      {children}
      {!noChevron && <BiChevronDown className='h-4 w-4 opacity-50' />}
    </SelectPrimitive.Trigger>
  )
}

function Content({ className, children, ...props }: SelectPrimitive.SelectContentProps) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        className={clsxm(
          '[--select-outline:var(--color-stone-300)] dark:[--select-outline:var(--color-stone-700)]',
          'animate-in fade-in-80 relative z-50 min-w-[8rem] overflow-hidden border border-(--select-outline) bg-white text-stone-700 shadow-xl/10 dark:bg-stone-900 dark:text-stone-300',
          'relative',
          className,
        )}
        {...props}
      >
        <div className='absolute left-2 top-0 h-full w-0 border-r border-dashed border-(--select-outline)' />
        <div className='absolute right-2 top-0 h-full w-0 border-l border-dashed border-(--select-outline)' />
        <div className='absolute top-2 left-0 h-0 w-full border-b border-dashed border-(--select-outline)' />
        <div className='absolute bottom-2 left-0 h-0 w-full border-b border-dashed border-(--select-outline)' />
        <SelectPrimitive.Viewport className='m-2 border border-transparent'>{children}</SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

function Label({ className, ...props }: SelectPrimitive.SelectLabelProps) {
  return (
    <SelectPrimitive.Label
      className={clsxm('py-1.5 pl-8 pr-2 text-sm font-medium text-stone-800 dark:text-stone-200', className)}
      {...props}
    />
  )
}

function Item({ className, children, ...props }: SelectPrimitive.SelectItemProps) {
  return (
    <SelectPrimitive.Item
      className={clsxm(
        'relative z-50 flex cursor-default select-none items-center py-1.5 pl-8 pr-2 text-sm font-medium outline-none transition-colors focus:bg-stone-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-stone-800',
        'tracking-tight',
        'border-b border-dashed border-(--select-outline) last-of-type:border-b-0',
        className,
      )}
      {...props}
    >
      <span className='absolute left-2 flex size-3.5 items-center justify-center'>
        <SelectPrimitive.ItemIndicator>
          <BiCheck className='size-4' />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

function Separator({ className, ...props }: SelectPrimitive.SelectSeparatorProps) {
  return (
    <SelectPrimitive.Separator
      className={clsxm('-mx-1 my-1 h-px bg-stone-100 dark:bg-stone-700', className)}
      {...props}
    />
  )
}

export const Select = Object.freeze({
  Root,
  Group,
  Value,
  Trigger,
  Content,
  Label,
  Item,
  Separator,
})
