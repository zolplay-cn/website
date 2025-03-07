export function getOpenGraphImage(title: string, locale: string, subtitle?: string, image?: string) {
  // eslint-disable-next-line node/prefer-global/process
  const url = new URL(process.env.NEXT_PUBLIC_OG_URL ?? '')
  url.searchParams.set('title', title)
  url.searchParams.set('locale', locale)
  if (subtitle) {
    url.searchParams.set('subtitle', subtitle)
  }
  if (image) {
    url.searchParams.set('image', image)
  }

  return {
    url: url.toString(),
    width: 1200,
    height: 630,
  }
}
