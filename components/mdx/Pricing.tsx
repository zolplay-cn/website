import { useLocale } from 'next-intl'
import { BiCheck } from 'react-icons/bi'
import { CTAButton } from './CTAButton'

export function PricingPlans() {
  const locale = useLocale()
  const isZH = locale === 'zh-CN'

  const plans = [
    {
      key: 'plus',
      name: 'Creative Plus',
      hours: isZH ? '每周 10 小时' : '10 hrs/week',
      features: isZH
        ? [
            '单一高优先级工作流',
            '资深水准落地执行',
            '异步协作，稳步推进',
            '高影响力事项优先',
            '无冗余流程与交付',
            '适合早期团队/高标准创始人',
          ]
        : [
            'One high‑priority stream',
            'Senior‑level execution',
            'Async collaboration, steady cadence',
            'Focus on high‑impact essentials',
            'No‑fluff process and deliverables',
            'Best for early teams/high‑standard founders',
          ],
    },
    {
      key: 'pro',
      name: 'Creative Pro',
      hours: isZH ? '每周 20 小时' : '20 hrs/week',
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
            'Doubled cadence and output',
            '1–2 parallel streams',
            'Faster iteration cycles',
            'Room for exploration and refinement',
            'Sharper, faster product/design decisions',
            'Ideal for build‑and‑grow teams',
          ],
    },
    {
      key: 'max',
      name: 'Creative Max',
      hours: isZH ? '每周 30 小时' : '30 hrs/week',
      features: isZH
        ? [
            '部分制嵌入：你的设计团队',
            '多条并行（产品 UX/设计系统/站点/发布）',
            '日更节奏，最高优先级',
            '品牌、产品与网站同时推进',
            '为定义品类与高速增长而生',
            '创始人与高标准团队的首选',
          ]
        : [
            'Fractional, embedded design org',
            'Multiple parallel tracks (UX/system/site/launch)',
            'Daily progress, first‑in‑line priority',
            'Brand, product, and web in parallel',
            'Built for category‑defining, high‑velocity teams',
            'Founders’ choice for decisive advantage',
          ],
    },
  ]

  return (
    <section className='not-prose my-8'>
      <ul className='grid gap-4 md:grid-cols-3 list-none m-0 p-0'>
        {plans.map(({ key, name, hours, features }) => (
          <li
            key={key}
            className='relative overflow-hidden border border-(--grid-border-color) bg-white dark:bg-[#1a1a1a] p-3 md:p-0 flex flex-col gap-3'
          >
            <div className='aspect-square w-full bg-neutral-200/70 dark:bg-neutral-800/60 grid place-items-center text-neutral-500 dark:text-neutral-400 text-xs tracking-wide'>
              {isZH ? '插画占位' : 'Illustration placeholder'}
            </div>
            <div className='flex flex-col items-baseline justify-between p-0 md:px-3 md:py-2'>
              <h3 className='text-lg md:text-xl font-medium tracking-tight'>{name}</h3>
              <span className='text-xs font-mono opacity-60'>{hours}</span>
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
            <CTAButton href='/contact' className='mt-auto'>
              {isZH ? '立即订阅' : 'Subscribe'}
            </CTAButton>
          </li>
        ))}
      </ul>
    </section>
  )
}
