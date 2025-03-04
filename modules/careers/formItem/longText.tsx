import { AnimatePresence, motion } from 'framer-motion'
import type { FieldErrors, Path, UseFormRegister } from 'react-hook-form'
import { formError, label, textInput } from '../job'

export function LongText<T extends Record<string, any>>({
  title,
  subtitle,
  path,
  register,
  errors,
}: {
  title: string
  subtitle?: string
  path: Path<T>
  register: UseFormRegister<T>
  errors: FieldErrors<T>
}) {
  return (
    <div>
      <label htmlFor={path as string} className={label()}>
        {title}
      </label>
      <div className="mb-[10px] mt-1 text-[13px] leading-4 text-stone-500">
        {subtitle}
      </div>
      <div>
        <textarea
          id={path as string}
          autoComplete={path}
          className={textInput()}
          placeholder="Type here..."
          rows={4}
          {...register(path)}
        />
        <AnimatePresence mode="wait">
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
