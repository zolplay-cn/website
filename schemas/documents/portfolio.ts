import { TbCarouselHorizontal } from 'react-icons/tb'
import { defineField, defineType } from 'sanity'
import { z } from 'zod'
import { blockContentSchema } from '~/schemas/objects/blockContent'

export const PaletteSwatch = z.object({
  background: z.string(),
  foreground: z.string(),
})

export const portfolio = z.object({
  _id: z.string(),
  title: z.string(),
  slug: z.string(),
  logo: z.any(),
  image: z.object({
    _ref: z.string(),
    asset: z.object({
      url: z.string(),
      path: z.string(),
      palette: PaletteSwatch,
      lqip: z.string(),
    }),
  }),
  palette: PaletteSwatch.optional(),
  description: z.string(),
  timeframe: z.string(),
  website: z.string(),
  order: z.number(),
  content: z.any(),
})
export type Portfolio = z.infer<typeof portfolio>

export const portfolioSchema = defineType({
  name: 'portfolio',
  title: 'Portfolio',
  i18n: true,
  type: 'document',
  icon: TbCarouselHorizontal,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      validation: (Rule) => Rule.required(),
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'palette',
      title: 'Palette',
      type: 'object',
      fields: [
        defineField({
          name: 'background',
          title: 'Background',
          type: 'string',
          validation: (Rule) => Rule.regex(/^#/, { name: 'hex' }),
        }),
        defineField({
          name: 'foreground',
          title: 'Foreground',
          type: 'string',
          validation: (Rule) => Rule.regex(/^#/, { name: 'hex' }),
        }),
      ],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'timeframe',
      title: 'Timeframe',
      type: 'string',
    }),
    defineField({
      name: 'website',
      title: 'Website',
      type: 'url',
      description: 'The website for this project.',
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'The order in which this portfolio should appear.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: blockContentSchema.name,
    }),
  ],
  preview: {
    select: {
      title: `title`,
      subtitle: `slug`,
      media: `logo`,
    },
  },
})
