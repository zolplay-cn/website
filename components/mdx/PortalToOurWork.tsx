import Image from 'next/image'
import { Link } from '~/modules/i18n/navigation'
import { LATEST_PORTFOLIO } from '~/modules/portfolios/datasource'

export function PortalToOurWork({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex flex-col items-center justify-center pt-12 pb-6'>
      <div
        className='group relative grid grid-cols-1 col-span-1 w-full blur-none hover:blur-sm transition-all duration-200'
        style={
          {
            '--bg-color': LATEST_PORTFOLIO.palette.background,
            '--tw-shadow-color': LATEST_PORTFOLIO.palette.background,
            '--ar': '32/9',
          } as React.CSSProperties
        }
      >
        <div className='absolute top-0 left-0 w-full scale-90 aspect-(--ar) border-stone-200 dark:border-stone-700/60 border-2 border-dashed bg-stone-50 dark:bg-neutral-800 rounded-2xl shadow-[0_0_60px_rgba(0,0,0,0.05)] -translate-y-10 group-hover:scale-100 group-hover:-translate-y-2 transition-transform duration-200'></div>
        <div className='absolute top-0 left-0 w-full scale-95 aspect-(--ar) border-stone-200 dark:border-stone-700/60 border-2 border-dashed bg-stone-50 dark:bg-neutral-800 rounded-2xl shadow-[0_0_60px_rgba(0,0,0,0.08)] -translate-y-5 group-hover:scale-100 group-hover:-translate-y-2 transition-transform duration-150'></div>

        <Link
          href={`/work/${LATEST_PORTFOLIO.slug}`}
          className='absolute inset-0 shadow-xl overflow-hidden rounded-2xl aspect-(--ar) bg-(--bg-color) translate-y-0 group-hover:-translate-y-2 transition-transform duration-200'
        >
          <div className='absolute inset-0 flex items-center justify-center blur-sm'>
            <Image
              src={LATEST_PORTFOLIO.image}
              alt={LATEST_PORTFOLIO.title.en}
              className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
            />
          </div>
          <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col items-center justify-center p-4 gap-4'>
            <Image
              src={LATEST_PORTFOLIO.logo}
              alt={`${LATEST_PORTFOLIO.title.en} logo`}
              className='not-prose h-12 object-contain'
            />
            <span className='not-prose text-white text-lg md:text-xl tracking-tight'>{LATEST_PORTFOLIO.title.en}</span>
          </div>
        </Link>
      </div>
    </div>
  )
}
