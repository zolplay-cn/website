import type { ComponentProps } from 'react'
import { clsxm } from '@zolplay/utils'
import { AnimatePresence, motion } from 'motion/react'
import React, { use } from 'react'
import { Button } from '~/components/ui/button'

type FormRootProps = ComponentProps<'form'> & {
  submitting?: boolean
}
function Root({ className, children, submitting, ...rest }: FormRootProps) {
  return (
    <form
      className={clsxm('space-y-8 transition-opacity', submitting && 'pointer-events-none opacity-50', className)}
      {...rest}
    >
      {children}
    </form>
  )
}
Root.displayName = 'Form.Root'

function Container({ children, className }: ComponentProps<'div'>) {
  return (
    <div className={clsxm('space-y-8 divide-y divide-stone-200 dark:divide-stone-700/60', className)}>{children}</div>
  )
}
Container.displayName = 'Form.Container'

type FormSectionProps = ComponentProps<'section'> & {
  title?: string | React.ReactNode
}
function Section({ children, className, title }: FormSectionProps) {
  return (
    <section className={className}>
      {title && (
        <div>
          <h3 className='text-base font-medium leading-6 tracking-tight'>{title}</h3>
        </div>
      )}
      <div className='grid grid-cols-1 gap-x-4 gap-y-6 mt-6 sm:grid-cols-6'>{children}</div>
    </section>
  )
}
Section.displayName = 'Form.Section'

const FieldGroupContext = React.createContext<{
  name?: string
}>({})

type FormFieldGroupProps = ComponentProps<'div'> & {
  size?: 'sm' | 'md' | 'lg'
  name?: string
}
function FieldGroup({ children, className, size = 'md', name }: FormFieldGroupProps) {
  const contextValue = React.useMemo(() => ({ name }), [name])

  return (
    <FieldGroupContext value={contextValue}>
      <div
        className={clsxm(
          'space-y-2',
          {
            'sm:col-span-2': size === 'sm',
            'sm:col-span-3': size === 'md',
            'sm:col-span-6': size === 'lg',
          },
          className,
        )}
      >
        {children}
      </div>
    </FieldGroupContext>
  )
}
FieldGroup.displayName = 'Form.FieldGroup'

const label = 'block text-sm font-medium leading-6 tracking-tight'
function Label({ className, htmlFor, ...rest }: ComponentProps<'label'>) {
  const { name } = use(FieldGroupContext)
  return <label className={clsxm(label, className)} htmlFor={name ?? htmlFor} {...rest} />
}
Label.displayName = 'Form.Label'

const input =
  'block w-full rounded-lg border-0 bg-transparent py-1.5 px-2.5 ring-1 ring-inset ring-stone-300 placeholder:text-stone-400 focus:ring-2 focus:ring-inset focus:ring-stone-400 dark:ring-stone-700 dark:placeholder:text-stone-600 dark:focus:ring-stone-500 text-sm sm:leading-6'

function Input({ ref, className, id, name, type, ...rest }: ComponentProps<'input'>) {
  const { name: defaultName } = use(FieldGroupContext)
  return (
    <input
      ref={ref}
      className={clsxm(input, className)}
      id={id ?? defaultName ?? name}
      name={defaultName ?? name}
      type={type ?? 'text'}
      autoCorrect='off'
      autoComplete='off'
      spellCheck={false}
      {...rest}
    />
  )
}
Input.displayName = 'Form.Input'

function TextArea({ ref, className, id, name, ...rest }: ComponentProps<'textarea'>) {
  const { name: defaultName } = use(FieldGroupContext)
  return (
    <textarea
      ref={ref}
      className={clsxm(input, className, 'p-2.5')}
      id={id ?? defaultName ?? name}
      name={defaultName ?? name}
      autoCorrect='off'
      autoComplete='off'
      spellCheck={false}
      {...rest}
    />
  )
}
TextArea.displayName = 'Form.TextArea'

interface FormErrorProps {
  message?: string
  className?: string
}
const formError = ['text-red-600', 'dark:text-red-400', 'text-xs', 'font-normal']
function Error({ className, message }: FormErrorProps) {
  return (
    <AnimatePresence mode='wait'>
      {message !== undefined && message.trim() !== '' && (
        <motion.span
          className={clsxm(formError, className)}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 5 }}
        >
          {message}
        </motion.span>
      )}
    </AnimatePresence>
  )
}
Error.displayName = 'Form.Error'

function Footer({ className, ...props }: ComponentProps<'div'>) {
  return <div className={clsxm('flex justify-end pt-6', className)} {...props} />
}
Footer.displayName = 'Form.Footer'

function SubmitButton({ className, ...props }: ComponentProps<typeof Button>) {
  return <Button type='submit' className={clsxm('rounded-lg', className)} {...props} />
}
SubmitButton.displayName = 'Form.SubmitButton'

export const Form = {
  Root,
  Container,
  Section,
  FieldGroup,
  Label,
  Input,
  TextArea,
  Error,
  Footer,
  SubmitButton,
} as const
