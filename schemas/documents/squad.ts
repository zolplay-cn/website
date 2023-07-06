import { localeStringSchema } from '~/schemas/objects/localeString'
import { HiUsers } from 'react-icons/hi2'
import { defineField, defineType } from 'sanity'
import { z } from 'zod'

export const Squad = z.object({
  _id: z.string(),
  title: z.string(),
  slug: z.object({
    current: z.string(),
  }),
})
export type Squad = z.infer<typeof Squad>

export const squadSchema = defineType({
  name: 'squad',
  title: 'Squad',
  type: 'document',
  i18n: false,
  icon: HiUsers,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: localeStringSchema.name,
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title.en',
        maxLength: 96,
      },
    }),
  ],
  preview: {
    select: {
      title: `title.en`,
      subtitle: `title.zh_CN`,
    },
  },
})
