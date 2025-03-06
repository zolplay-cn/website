'use client'

import { useTranslations } from 'next-intl'
import { usePostHog } from 'posthog-js/react'
import { TbArrowRight } from 'react-icons/tb'
import { ButtonLink } from '~/components/ui/Button'

export function OpenPositionButton() {
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
