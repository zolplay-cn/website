import { openRolesCount } from '~/modules/careers/open-roles'
import { Link } from '~/modules/i18n/navigation'
import { WithFrame } from './WithFrame'

export function OpenRolesHeader({
  count = openRolesCount,
  label = 'OPEN ROLES',
  showsCount = true,
}: {
  count?: number
  label?: string
  showsCount?: boolean
}) {
  return (
    <div className='mt-4 ml-1 text-sm font-mono text-neutral-500 dark:text-neutral-400 pb-4'>
      {label}
      {showsCount ? ` — ${String(count)}` : ''}
    </div>
  )
}

export function RolesList({ children }: { children: React.ReactNode }) {
  return <ul className='grid gap-2 list-none not-prose'>{children}</ul>
}

export function RoleCard({
  href,
  index,
  title,
  description,
  tags,
}: {
  href: string
  index: number
  title: string
  description: string
  tags: string[]
}) {
  const num = `#${String(index).padStart(2, '0')}`
  return (
    <li>
      <Link
        href={`/careers/${href}`}
        className='group block relative overflow-hidden bg-white/60 dark:bg-black/40 backdrop-blur-[1px] hover:bg-white/75 dark:hover:bg-black/55 transition-colors'
      >
        <WithFrame className='grid grid-cols-12 min-h-52'>
          <div className='col-span-1 lg:col-span-2 p-1.5 lg:p-3 border-r border-(--grid-border-color) flex flex-col justify-between'>
            <span className='text-[10px] lg:text-xs tracking-normal lg:tracking-wide font-mono text-neutral-400 dark:text-neutral-600'>
              ROLE
            </span>
            <span className='text-[10px] lg:text-xs font-mono text-neutral-600 dark:text-neutral-300'>{num}</span>
          </div>
          <div className='col-span-11 lg:col-span-10 p-4 pl-6 md:pl-10 flex flex-col justify-between'>
            <div className='flex items-start justify-between'>
              <h2 className='text-lg md:text-xl font-normal tracking-tighter leading-none text-neutral-900 dark:text-neutral-50'>
                {title}
              </h2>
              <span className='opacity-0 group-hover:opacity-100 transition-opacity text-neutral-500' aria-hidden>
                →
              </span>
            </div>
            <p className='mt-3 max-w-2xl text-sm tracking-tight text-neutral-600 dark:text-neutral-300'>
              {description}
            </p>
            <div className='mt-4 grid grid-cols-1 lg:grid-cols-3 gap-2 text-[10px] lg:text-xs font-mono text-neutral-500'>
              {tags.map((t, i) => (
                <span key={t} className={i === 1 ? 'text-center' : i === 2 ? 'text-right' : 'text-left'}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </WithFrame>
      </Link>
    </li>
  )
}

export function CareersEmailNote({
  email = 'cv@zolplay.com',
  subject = 'Application',
  children,
}: {
  email?: string
  subject?: string
  children?: React.ReactNode
}) {
  const href = `mailto:${email}?subject=${encodeURIComponent(subject)}`
  return (
    <div className='mt-6 ml-1 text-sm text-neutral-600 dark:text-neutral-300'>
      {children ?? (
        <>
          Prefer email? Send a short intro and portfolio to <a href={href}>{email}</a>.
        </>
      )}
    </div>
  )
}
