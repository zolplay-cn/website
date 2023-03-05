import { BsPersonWorkspace } from 'react-icons/bs'
import { defineField, defineType } from 'sanity'
import { z } from 'zod'

import { squadSchema } from '~/schemas/documents/squad'

export const Job = z.object({
  _type: z.literal('job'),
  open: z.boolean(),
  title: z.string(),
  remote: z.boolean(),
  employmentType: z.enum(['fullTime', 'partTime', 'contract', 'internship']),
  squad: z.object({ _type: z.enum(['reference']), _ref: z.string() }),
  excerpt: z.string(),
  description: z.array(z.object({ _type: z.enum(['block']) })),
})
export type Job = z.infer<typeof Job>

export const jobSchema = defineType({
  name: 'job',
  title: 'Job',
  type: 'document',
  i18n: true,
  icon: BsPersonWorkspace,
  fields: [
    defineField({
      name: 'open',
      title: 'Open',
      type: 'boolean',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'remote',
      title: 'Remote',
      type: 'boolean',
    }),
    defineField({
      name: 'employmentType',
      title: 'Employment Type',
      type: 'string',
      options: {
        list: [
          { title: 'Full Time', value: 'fullTime' },
          { title: 'Part Time', value: 'partTime' },
          { title: 'Contract', value: 'contract' },
          { title: 'Internship', value: 'internship' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'squad',
      title: 'Squad',
      type: 'reference',
      to: [{ type: squadSchema.name }],
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [
        {
          type: 'block',
        },
        {
          type: 'image',
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'excerpt',
    },
  },
})
