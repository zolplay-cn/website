'use client'

import * as SelectPrimitive from '@radix-ui/react-select'
import { clsxm } from '@zolplay/utils'
import React from 'react'
import { BiCheck, BiChevronDown } from 'react-icons/bi'

const Root = SelectPrimitive.Root

const Group = SelectPrimitive.Group

const Value = SelectPrimitive.Value

function Trigger({ className, children, ...props }: SelectPrimitive.SelectTriggerProps) {
  return (
    <SelectPrimitive.Trigger
      className={clsxm(
        'mr-2 flex h-8 w-full select-none items-center justify-between rounded-md border border-stone-300 bg-transparent px-2 py-1 text-sm placeholder:text-stone-600 focus:outline-none focus-visible:ring focus-visible:ring-stone-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-stone-700 dark:text-stone-100 dark:placeholder:text-stone-500 dark:focus-visible:ring-stone-700',
        'tracking-tight',
        className,
      )}
      {...props}
    >
      {children}
      <BiChevronDown className='h-4 w-4 opacity-50' />
    </SelectPrimitive.Trigger>
  )
}

function Content({ className, children, ...props }: SelectPrimitive.SelectContentProps) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        className={clsxm(
          'animate-in fade-in-80 relative z-50 min-w-[8rem] overflow-hidden rounded-xl border border-stone-100 bg-white text-stone-700 shadow-xl dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300',
          className,
        )}
        {...props}
      >
        <SelectPrimitive.Viewport className='p-1'>{children}</SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

function Label({ className, ...props }: SelectPrimitive.SelectLabelProps) {
  return (
    <SelectPrimitive.Label
      className={clsxm('py-1.5 pl-8 pr-2 text-sm font-semibold text-stone-800 dark:text-stone-200', className)}
      {...props}
    />
  )
}

function Item({ className, children, ...props }: SelectPrimitive.SelectItemProps) {
  return (
    <SelectPrimitive.Item
      className={clsxm(
        'relative z-50 flex cursor-default select-none items-center rounded-lg py-1.5 pl-8 pr-2 text-sm font-medium outline-none transition-colors focus:bg-stone-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-stone-800',
        'tracking-tight',
        className,
      )}
      {...props}
    >
      <span className='absolute left-2 flex h-3.5 w-3.5 items-center justify-center'>
        <SelectPrimitive.ItemIndicator>
          <BiCheck className='h-4 w-4' />
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
