import { FaUserAstronaut } from 'react-icons/fa'
import { defineField, defineType } from 'sanity'
import { z } from 'zod'

import { localeStringSchema } from '~/schemas/objects/localeString'

const Member = z.object({
  _id: z.string(),
  name: z.string(),
  slug: z.object({
    current: z.string(),
  }),
  role: z.string(),
  portrait: z.object({
    _type: z.literal('image'),
    asset: z.object({ _type: z.enum(['reference']), _ref: z.string() }),
  }),
  social: z.array(
    z.object({
      platform: z.enum([
        'twitter',
        'linkedin',
        'github',
        'dribbble',
        'instagram',
        'youtube',
        'readcv',
        'xiaohongshu',
        'website',
      ]),
      url: z.string(),
    })
  ),
})
export type Member = z.infer<typeof Member>

export const memberSchema = defineType({
  name: 'member',
  title: 'Member',
  type: 'document',
  icon: FaUserAstronaut,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'name',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: localeStringSchema.name,
    }),
    defineField({
      name: 'portrait',
      title: 'Portrait',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'social',
      title: 'Social',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  { title: 'Twitter', value: 'twitter' },
                  { title: 'LinkedIn', value: 'linkedin' },
                  { title: 'GitHub', value: 'github' },
                  { title: 'Dribbble', value: 'dribbble' },
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'YouTube', value: 'youtube' },
                  { title: 'Website', value: 'website' },
                  { title: 'Read CV', value: 'readcv' },
                  { title: '小红书', value: 'xiaohongshu' },
                ],
              },
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role.en',
      media: 'portrait',
    },
  },
})
