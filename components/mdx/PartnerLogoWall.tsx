const partners = [
  {
    svg: (
      <svg viewBox='0 0 120 40' className='h-full w-auto'>
        <text x='10' y='25' className='fill-current text-sm font-medium'>
          Live Aware
        </text>
      </svg>
    ),
    ariaLabel: 'Live Aware',
  },
  {
    svg: (
      <svg viewBox='0 0 120 40' className='h-full w-auto'>
        <text x='10' y='25' className='fill-current text-sm font-medium'>
          Insta360
        </text>
      </svg>
    ),
    ariaLabel: 'Insta360',
  },
  {
    svg: (
      <svg viewBox='0 0 120 40' className='h-full w-auto'>
        <text x='10' y='25' className='fill-current text-sm font-medium'>
          Antigravity
        </text>
      </svg>
    ),
    ariaLabel: 'Antigravity',
  },
  {
    svg: (
      <svg viewBox='0 0 120 40' className='h-full w-auto'>
        <text x='10' y='25' className='fill-current text-sm font-medium'>
          CelHive
        </text>
      </svg>
    ),
    ariaLabel: 'CelHive',
  },
  {
    svg: (
      <svg viewBox='0 0 120 40' className='h-full w-auto'>
        <text x='10' y='25' className='fill-current text-sm font-medium'>
          Neuship
        </text>
      </svg>
    ),
    ariaLabel: 'Neuship',
  },
  {
    svg: (
      <svg viewBox='0 0 120 40' className='h-full w-auto'>
        <text x='10' y='25' className='fill-current text-sm font-medium'>
          Partner Six
        </text>
      </svg>
    ),
    ariaLabel: 'Partner Six',
  },
]

export function PartnerLogoWall() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-5 mb-6 border-y border-(--grid-border-color)'>
      {partners.map((partner) => (
        <div
          key={partner.ariaLabel}
          className='flex items-center justify-center p-4 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors'
          aria-label={partner.ariaLabel}
        >
          <div className='text-neutral-600 dark:text-neutral-400 h-8'>{partner.svg}</div>
        </div>
      ))}
    </div>
  )
}
