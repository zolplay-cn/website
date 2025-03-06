'use client'
import type { Zolplayer } from './datasource'
import { Link } from '~/modules/i18n/navigation'
import { SOCIAL_ICON_MAP } from './social-platform'

export function SocialLink({ social, onClick }: { social: Zolplayer['social'][number]; onClick?: () => void }) {
  const Icon = SOCIAL_ICON_MAP[social.platform]

  return (
    <li className='flex items-center' onClick={onClick}>
      <Link
        href={social.url}
        target='_blank'
        className='transition-transform duration-200 hover:-rotate-6 hover:scale-105'
      >
        <Icon className={social.platform === 'twitter' ? 'h-4' : 'h-5 w-5'} />
      </Link>
    </li>
  )
}
