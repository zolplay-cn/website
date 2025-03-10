import type { HTMLInputTypeAttribute } from 'react'
import type { FieldErrors, Path, UseFormRegister } from 'react-hook-form'
import { clsxm } from '@zolplay/utils'
import { AnimatePresence, motion } from 'motion/react'
import React from 'react'
import { formError, label, textInput } from '../job'

export function Input<T extends Record<string, any>>({
  isRequired = false,
  title,
  subtitle,
  placeholder,
  path,
  type,
  register,
  errors,
}: {
  isRequired?: boolean
  title: string
  subtitle?: string
  placeholder?: string
  path: Path<T>
  type: HTMLInputTypeAttribute
  register: UseFormRegister<T>
  errors: FieldErrors<T>
}) {
  return (
    <div>
      <label
        htmlFor={path as string}
        className={clsxm(
          label(),
          isRequired && 'after:font-semibold after:text-red-500 after:content-["*"] after:dark:text-red-400',
        )}
      >
        {title}
      </label>
      <div className='mb-[10px] mt-1 text-[13px] leading-4 text-stone-500'>{subtitle}</div>
      <div className='mt-2'>
        <input
          type={type}
          autoComplete={path}
          placeholder={placeholder || 'Type here...'}
          id={path as string}
          className={clsxm(textInput(), 'px-2')}
          {...register(path)}
        />
        <AnimatePresence mode='wait'>
          {errors[path] && (
            <motion.span
              className={formError()}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
            >
              {String(errors[path]?.message || '')}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
