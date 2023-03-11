import { TbFileText } from 'react-icons/tb'
import { defineField, defineType } from 'sanity'

import { blockContentSchema } from '~/schemas/objects/blockContent'

export const pageSchema = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  i18n: true,
  icon: TbFileText,
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
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      description: 'Recommended size: 1200x630',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: blockContentSchema.name,
    }),
  ],
})
