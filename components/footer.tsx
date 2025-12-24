import { clsxm } from '@zolplay/utils'
import { useTranslations } from 'next-intl'
import WordmarkGrainGradient from '~/modules/fx/wordmark-grain-gradient'
import { ICPRecord } from './icp-record'
import { WithFrame } from './mdx'

export function Footer() {
  const t = useTranslations('Copyright')

  return (
    <footer
      className={clsxm(
        'mt-8 relative flex flex-col items-center justify-center',
        'before:absolute before:top-0 before:left-[-100vw] before:w-[200vw] before:h-px before:bg-(--grid-border-color)',
        'after:absolute after:bottom-0 after:right-[-100vw] after:w-[200vw] after:h-px after:bg-(--grid-border-color)',
      )}
    >
      <WithFrame className='w-full'>
        <WordmarkGrainGradient />
      </WithFrame>

      <p className='my-6 text-sm opacity-50'>
        {t('Text', {
          year: new Date().getFullYear(),
        })}
      </p>

      <ICPRecord />
    </footer>
  )
}
