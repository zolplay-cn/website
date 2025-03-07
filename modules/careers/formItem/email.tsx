import type { FieldErrors, Path, UseFormRegister } from 'react-hook-form'
import { clsxm } from '@zolplay/utils'
import { AnimatePresence, motion } from 'motion/react'
import { formError, label, textInput } from '../job'

export function Email<T extends Record<string, any>>({
  isRequired = false,
  title,
  path,
  register,
  errors,
}: {
  isRequired?: boolean
  title: string
  path: Path<T>
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
      <div className='mt-2'>
        <input
          id={path as string}
          type='email'
          autoComplete={path}
          placeholder='hello@example.com...'
          className={textInput()}
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
