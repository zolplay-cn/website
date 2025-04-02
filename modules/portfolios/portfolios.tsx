'use client'
import { useLocale } from 'next-intl'
import { PORTFOLIOS } from './datasource'
import { PortfolioCard } from './portfolios-card'

export function Portfolios() {
  const locale = useLocale()

  return (
    <div className='flex flex-col gap-8'>
      {PORTFOLIOS.map((portfolio) => (
        <PortfolioCard key={portfolio.slug} portfolio={portfolio} locale={locale} />
      ))}
    </div>
  )
}
