'use client'

import { useTranslations } from 'next-intl'
import { usePostHog } from 'posthog-js/react'
import { TbArrowRight } from 'react-icons/tb'
import { ButtonLink } from '~/components/ui/button'

export function OpenPositionButtonImpl() {
  const posthog = usePostHog()
  const t = useTranslations('Careers')
  return (
    <ButtonLink
      href='#positions'
      onClick={() => {
        posthog?.capture('click_see_all_cta')
      }}
    >
      {t('SeeAllCTA')}&nbsp;
      <TbArrowRight />
    </ButtonLink>
  )
}
