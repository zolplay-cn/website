import createImageUrlBuilder from '@sanity/image-url'
import { dataset, projectId } from 'lib/sanity.api'

const imageBuilder = createImageUrlBuilder({ projectId, dataset })

export function urlForImage(source) {
  return imageBuilder.image(source).auto('format').fit('max')
}
