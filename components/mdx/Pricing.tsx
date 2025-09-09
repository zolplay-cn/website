import { useLocale } from 'next-intl'
import Image from 'next/image'
import { BiCheck } from 'react-icons/bi'
import { CTAButton } from './CTAButton'
import { WithFrame } from './WithFrame'

export function PricingPlans() {
  const locale = useLocale()
  const isZH = locale === 'zh-CN'
  const fmt = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  })

  const plans = [
    {
      key: 'plus',
      name: 'Creative Plus',
      hours: isZH ? '每周 10 小时' : '10 hrs/week',
      price: 3000,
      features: isZH
        ? [
            '单一高优先级工作流',
            '资深水准落地执行',
            '异步协作，稳步推进',
            '高影响力事项优先',
            '无冗余流程与交付',
            '适合早期团队/创始人',
          ]
        : [
            'One high‑priority stream',
            'Senior‑level execution',
            'Async collaboration, steady cadence',
            'Focus on high‑impact essentials',
            'No‑fluff process and deliverables',
            'Best for early teams/founders',
          ],
    },
    {
      key: 'pro',
      name: 'Creative Pro',
      hours: isZH ? '每周 20 小时' : '20 hrs/week',
      price: 4800,
      features: isZH
        ? [
            '加倍节奏与产出',
            '1–2 条并行工作流',
            '更快迭代周期',
            '探索与打磨双保障',
            '更果断的产品与设计决策',
            '适合构建与增长期团队',
          ]
        : [
            '2x speed and output',
            '1–2 parallel streams',
            'Faster iteration cycles',
            'Room for exploration and refinement',
            'Faster product/design decisions',
            'Ideal for build‑and‑grow teams',
          ],
    },
    {
      key: 'max',
      name: 'Creative Max',
      hours: isZH ? '每周 30 小时' : '30 hrs/week',
      price: 6500,
      features: isZH
        ? [
            '部分制嵌入：你的设计团队',
            '多条并行（产品 UX/设计系统/站点/发布）',
            '日更节奏，最高优先级',
            '品牌、产品与网站同时推进',
            '为高速增长而生',
            '创始人与高标准团队的首选',
          ]
        : [
            'Embedded design org',
            'Multiple parallel streams',
            'Daily progress, first‑in‑line priority',
            'Brand, product, and growth in parallel',
            'Built for high‑velocity teams',
            'Gaining an unfair advantage',
          ],
    },
  ]

  return (
    <section className='not-prose my-8'>
      <ul className='grid gap-2 md:grid-cols-3 list-none m-0 p-0'>
        {plans.map(({ key, name, hours, features, price }) => {
          const isPopular = key === 'pro'
          const popularLabel = isZH ? '最受欢迎' : 'Most popular'
          return (
            <li
              key={key}
              className={`relative overflow-hidden border border-(--grid-border-color) bg-white dark:bg-[#1a1a1a] p-3 md:p-0 flex flex-col gap-3 h-full ${
                isPopular ? 'ring-1 ring-amber-400/60 dark:ring-amber-300/40' : ''
              }`}
            >
              {isPopular ? (
                <div className='pointer-events-none absolute z-30 top-2 left-2 rounded-full bg-amber-100 text-amber-900 dark:bg-amber-300 dark:text-amber-950 border border-(--grid-border-color) px-2 py-0.5 text-[10px] font-medium uppercase'>
                  {popularLabel}
                </div>
              ) : null}
              <WithFrame className='relative group z-20 aspect-square w-full bg-neutral-200/70 dark:bg-neutral-800/60 grid place-items-center text-neutral-500 dark:text-neutral-400 text-xs tracking-wide'>
                <Image src={`/images/pricing/${key}.jpg`} alt={name} fill className='object-cover' />
              </WithFrame>
              <div className='flex flex-col items-baseline justify-between p-0 md:px-3 md:py-2'>
                <h3 className='text-3xl md:text-xl lg:text-2xl font-medium tracking-tight'>{name}</h3>
                <span className='text-sm md:text-xs font-mono opacity-70'>{hours}</span>
              </div>
              <ul className='list-none m-0 p-0 md:px-3 md:py-2 space-y-1.5'>
                {features.map((text: string) => (
                  <li key={text} className='flex items-start gap-2'>
                    <span className='mt-0.5 inline-flex h-4 w-4 items-center justify-center rounded border border-(--grid-border-color) text-neutral-700 dark:text-neutral-300'>
                      <BiCheck className='size-3.5' />
                    </span>
                    <span className='text-sm leading-snug tracking-tight text-neutral-700 dark:text-neutral-300'>
                      {text}
                    </span>
                  </li>
                ))}
              </ul>
              <div className='mt-auto md:px-3 flex flex-col'>
                <div className='text-3xl md:text-2xl font-medium tracking-tight text-neutral-900 dark:text-neutral-100'>
                  {fmt.format(price)}
                  <span className='ml-1 text-sm font-normal opacity-70'>{isZH ? '/月' : '/mo'}</span>
                </div>
              </div>
              <CTAButton href='/contact' className='w-full'>
                {isZH ? '立即订阅' : 'Subscribe'}
              </CTAButton>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
