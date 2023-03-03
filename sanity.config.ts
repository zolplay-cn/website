import { visionTool } from '@sanity/vision'
import { apiVersion, dataset, projectId } from 'lib/sanity.api'
// import { previewDocumentNode } from 'plugins/previewPane'
// import { productionUrl } from 'plugins/productionUrl'
// import { settingsPlugin, settingsStructure } from 'plugins/settings'
import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'

const title = process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE || 'Zolplay Website'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  title,
  schema: {
    // If you want more content types, you can add them to this array
    types: [],
  },
  plugins: [
    deskTool({
      // structure: settingsStructure(settingsType),
      // `defaultDocumentNode` is responsible for adding a “Preview” tab to the document pane
      // defaultDocumentNode: previewDocumentNode({ apiVersion, previewSecretId }),
    }),
    // Configures the global "new document" button, and document actions, to suit the Settings document singleton
    // settingsPlugin({ type: settingsType.name }),
    // Add the "Open preview" action
    // productionUrl({
    //   apiVersion,
    //   previewSecretId,
    //   types: [postType.name, settingsType.name],
    // }),
    // Vision lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})
