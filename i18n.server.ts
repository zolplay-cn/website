import { getRequestConfig } from 'next-intl/server'

export default getRequestConfig(async ({ locale }) => {
  const { default: messages } = await import(`~/messages/${locale}.json`)

  return { messages }
})
