import type { ComponentProps } from '@zolplay/react'
import { clsxm } from '@zolplay/utils'
import { Button } from '~/components/ui/Button'
import { cva } from 'class-variance-authority'
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'

type FormRootProps = ComponentProps & {
  submitting?: boolean
} & React.HTMLAttributes<HTMLFormElement>
function Root({ className, children, submitting, ...rest }: FormRootProps) {
  return (
    <form
      className={clsxm(
        'space-y-8 divide-y divide-stone-200 transition-opacity dark:divide-stone-700/60',
        submitting && 'pointer-events-none opacity-50',
        className
      )}
      {...rest}
    >
      {children}
    </form>
  )
}
Root.displayName = 'Form.Root'

function Container({ children, className }: ComponentProps) {
  return (
    <div
      className={clsxm(
        'space-y-8 divide-y divide-stone-200 dark:divide-stone-700/60',
        className
      )}
    >
      {children}
    </div>
  )
}
Container.displayName = 'Form.Container'

type FormSectionProps = ComponentProps & {
  title?: string | React.ReactNode
}
function Section({ children, className, title }: FormSectionProps) {
  return (
    <section className={className}>
      {title && (
        <div>
          <h3 className="text-base font-semibold leading-6">{title}</h3>
        </div>
      )}
      <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
        {children}
      </div>
    </section>
  )
}
Section.displayName = 'Form.Section'

const FieldGroupContext = React.createContext<{
  name?: string
}>({})

type FormFieldGroupProps = ComponentProps & {
  size?: 'sm' | 'md' | 'lg'
  name?: string
}
function FieldGroup({
  children,
  className,
  size = 'md',
  name,
}: FormFieldGroupProps) {
  return (
    <FieldGroupContext.Provider value={{ name }}>
      <div
        className={clsxm(
          'space-y-2',
          {
            'sm:col-span-2': size === 'sm',
            'sm:col-span-3': size === 'md',
            'sm:col-span-6': size === 'lg',
          },
          className
        )}
      >
        {children}
      </div>
    </FieldGroupContext.Provider>
  )
}
FieldGroup.displayName = 'Form.FieldGroup'

const label = cva(['block text-sm font-medium leading-6'])
type FormLabelProps = {
  className?: string
} & React.LabelHTMLAttributes<HTMLLabelElement>
function Label({ className, htmlFor, ...rest }: FormLabelProps) {
  const { name } = React.useContext(FieldGroupContext)
  return (
    <label
      className={clsxm(label(), className)}
      htmlFor={name ?? htmlFor}
      {...rest}
    />
  )
}
Label.displayName = 'Form.Label'

const input = cva([
  'block w-full rounded-md border-0 bg-transparent py-1.5 shadow-sm ring-1 ring-inset ring-stone-300 placeholder:text-stone-400 focus:ring-2 focus:ring-inset focus:ring-stone-400 dark:ring-stone-700 dark:placeholder:text-stone-600 dark:focus:ring-stone-500 text-sm sm:leading-6 ',
])
type FormInputProps = {
  className?: string
  label?: string
} & React.InputHTMLAttributes<HTMLInputElement>
const Input = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ className, id, name, type, ...rest }, ref) => {
    const { name: defaultName } = React.useContext(FieldGroupContext)
    return (
      <input
        ref={ref}
        className={clsxm(input(), className)}
        id={id ?? defaultName ?? name}
        name={defaultName ?? name}
        type={type ?? 'text'}
        autoCorrect="off"
        autoComplete="off"
        spellCheck={false}
        {...rest}
      />
    )
  }
)
Input.displayName = 'Form.Input'

type FormTextAreaProps = {
  className?: string
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>
const TextArea = React.forwardRef<HTMLTextAreaElement, FormTextAreaProps>(
  ({ className, id, name, ...rest }, ref) => {
    const { name: defaultName } = React.useContext(FieldGroupContext)
    return (
      <textarea
        ref={ref}
        className={clsxm(input(), className)}
        id={id ?? defaultName ?? name}
        name={defaultName ?? name}
        autoCorrect="off"
        autoComplete="off"
        spellCheck={false}
        {...rest}
      />
    )
  }
)
TextArea.displayName = 'Form.TextArea'

type FormErrorProps = {
  message?: string
  className?: string
}
const formError = cva([
  'text-red-600',
  'dark:text-red-400',
  'text-xs',
  'font-semibold',
])
function Error({ className, message }: FormErrorProps) {
  return (
    <AnimatePresence mode="wait">
      {message !== undefined && message.trim() !== '' && (
        <motion.span
          className={clsxm(formError(), className)}
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

function Footer({ children, className }: ComponentProps) {
  return (
    <div className={clsxm('flex justify-end pt-6', className)}>{children}</div>
  )
}
Footer.displayName = 'Form.Footer'

function SubmitButton({ children, className }: ComponentProps) {
  return (
    <Button type="submit" className={className}>
      {children}
    </Button>
  )
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
