'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '~/components/ui/Form'
import { useTranslations } from 'next-intl'
import React from 'react'
import { useForm } from 'react-hook-form'
import { TbMail } from 'react-icons/tb'
import { toast } from 'sonner'
import { z } from 'zod'

const contactFormSchema = z.object({
  message: z.string().min(2),
  name: z.string().min(2),
  email: z.string().email(),
})
export type ContactFormSchema = z.infer<typeof contactFormSchema>
export function Contact() {
  const t = useTranslations('Contact')
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormSchema>({
    resolver: zodResolver(contactFormSchema),
  })
  const onSubmit = React.useCallback(
    async (data) => {
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          body: JSON.stringify({ data }),
        })
        if (response.ok) {
          toast.success(t('Form.Submit.Success'), { duration: 5000 })
          reset()
        } else {
          toast.error(t('Form.Submit.Error'))
        }
      } catch (error) {
        toast.error(t('Form.Submit.Error'))
      }
    },
    [t, reset]
  )

  return (
    <>
      <h1>{t.rich('Heading')}</h1>

      <p>{t('Description')}</p>

      <Form.Root submitting={isSubmitting} onSubmit={handleSubmit(onSubmit)}>
        <Form.Container>
          <header>
            <p className="flex flex-col text-sm tracking-tight text-stone-500 md:flex-row md:items-center">
              {t.rich('Tips', {
                email: (text) => (
                  <span className="inline-flex items-center space-x-0.5 text-stone-600 dark:text-stone-300 md:mx-1">
                    <TbMail className="h-4 w-4" />
                    <a
                      href="mailto:contact@zolplay.com"
                      className="text-stone-600 no-underline hover:underline dark:text-stone-300"
                    >
                      {text}
                    </a>
                  </span>
                ),
              })}
            </p>
          </header>

          <Form.Section>
            <Form.FieldGroup name="name">
              <Form.Label>{t('Form.FullName.Label')}</Form.Label>
              <Form.Input
                placeholder={t('Form.FullName.Placeholder')}
                {...register('name')}
              />
              <Form.Error message={errors.name?.message} />
            </Form.FieldGroup>
            <Form.FieldGroup name="email">
              <Form.Label>{t('Form.Email.Label')}</Form.Label>
              <Form.Input
                type="email"
                autoComplete="on"
                placeholder={t('Form.Email.Placeholder')}
                {...register('email')}
              />
              <Form.Error message={errors.email?.message} />
            </Form.FieldGroup>

            <Form.FieldGroup name="message" size="lg">
              <Form.Label>{t('Form.Message.Label')}</Form.Label>
              <Form.TextArea
                defaultValue=""
                rows={3}
                placeholder={t('Form.Message.Placeholder')}
                {...register('message')}
              />
              <Form.Error message={errors.message?.message} />
            </Form.FieldGroup>
          </Form.Section>
        </Form.Container>

        <Form.Footer>
          <Form.SubmitButton>
            {t(isSubmitting ? 'Form.Submit.Sending' : 'Form.Submit.Idle')}
          </Form.SubmitButton>
        </Form.Footer>
      </Form.Root>
    </>
  )
}
