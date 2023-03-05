export async function getMessages({ locale }: RootParams) {
  const { default: messages } = await import(`~/messages/${locale}.json`)

  return messages as IntlMessages
}
