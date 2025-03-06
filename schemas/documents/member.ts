import { FaUserAstronaut } from 'react-icons/fa'
import { defineField, defineType } from 'sanity'
import { z } from 'zod'
import { PaletteSwatch } from '~/schemas/documents/portfolio'
import { localeStringSchema } from '~/schemas/objects/localeString'

// eslint-disable-next-line unused-imports/no-unused-vars
const member = z.object({
  _id: z.string(),
  name: z.string(),
  slug: z.string(),
  role: z.string(),
  portrait: z.object({
    _type: z.literal('image'),
    asset: z.object({
      _ref: z.string(),
      _type: z.literal('reference'),
    }),
    lqip: z.string(),
    palette: z.object({
      darkMuted: PaletteSwatch,
      darkVibrant: PaletteSwatch,
      lightMuted: PaletteSwatch,
      lightVibrant: PaletteSwatch,
    }),
    dimensions: z.object({
      aspectRatio: z.number(),
      height: z.number(),
      width: z.number(),
    }),
  }),
  social: z.array(
    z.object({
      _key: z.string(),
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
      url: z.string().url(),
    }),
  ),
  joinedDate: z.string(),
})
export type Member = z.infer<typeof member>

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
    defineField({
      name: 'joinedDate',
      title: 'Joined Date',
      type: 'date',
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
