const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

/**
 * 创建URL链接
 *
 * @param uri
 */
export function makeUrl(uri: string) {
  return `${baseUrl}${uri}`
}
