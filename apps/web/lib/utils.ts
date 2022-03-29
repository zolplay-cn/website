const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

/**
 * Create an internal URL for a given pathname.
 *
 * @param uri
 */
export function makeUrl(uri: string) {
  return `${baseUrl}${uri}`
}
