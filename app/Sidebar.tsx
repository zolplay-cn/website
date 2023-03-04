import { clsxm } from '@zolplay/utils'
import { Link } from 'next-intl'

import { Logo } from '~/components/Logo'

export function Sidebar({ className }: { className?: string }) {
  return (
    <aside
      className={clsxm(
        '-mx-4 md:mx-0 md:w-44 md:flex-shrink-0 md:px-0',
        className
      )}
    >
      <div className="lg:sticky lg:top-12">
        <Link href="/">
          <Logo className="w-10" />
        </Link>
      </div>
    </aside>
  )
}
