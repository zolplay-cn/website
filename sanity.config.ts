import {
  documentI18n,
  getFilteredDocumentTypeListItems,
} from '@sanity/document-internationalization'
import { visionTool } from '@sanity/vision'
import { apiVersion, dataset, previewSecretId, projectId } from 'lib/sanity.api'
import { previewDocumentNode } from 'plugins/previewPane'
import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'

import { i18n } from '~/i18n'
import { jobSchema } from '~/schemas/documents/job'
import { memberSchema } from '~/schemas/documents/member'
import { pageSchema } from '~/schemas/documents/page'
import { portfolioSchema } from '~/schemas/documents/portfolio'
import { squadSchema } from '~/schemas/documents/squad'
import { blockContentSchema } from '~/schemas/objects/blockContent'
import { localeStringSchema } from '~/schemas/objects/localeString'

const title = process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE || 'Zolplay Website'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  title,
  schema: {
    types: [
      localeStringSchema,
      blockContentSchema,
      memberSchema,
      squadSchema,
      jobSchema,
      portfolioSchema,
      pageSchema,
    ],
  },
  plugins: [
    documentI18n({
      base: i18n.defaultId,
      languages: i18n.languages,
    }),
    deskTool({
      structure: (S, { schema }) => {
        const items = getFilteredDocumentTypeListItems({
          S,
          schema,
          config: {
            base: i18n.defaultId,
            languages: i18n.languages,
          },
        }).map((item) => {
          // pluralize the title
          item.title = item.title + 's'
          return item
        })

        return S.list()
          .title('Content')
          .items([...items])
      },
      // `defaultDocumentNode` is responsible for adding a “Preview” tab to the document pane
      defaultDocumentNode: previewDocumentNode({ apiVersion, previewSecretId }),
    }),
    // Configures the global "new document" button, and document actions, to suit the Settings document singleton
    // settingsPlugin({ type: settingsType.name }),
    // Vision lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})
