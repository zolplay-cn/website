export function getOpenGraphImage(title: string, locale: string) {
  const url = new URL(process.env.NEXT_PUBLIC_OG_URL ?? '')
  url.searchParams.set('title', title)
  url.searchParams.set('locale', locale)

  return {
    url: url.toString(),
    width: 1200,
    height: 630,
  }
}
