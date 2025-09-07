import { clsxm } from '@zolplay/utils'
import { useLocale, useTranslations } from 'next-intl'
import { WithFrame } from '~/components/mdx'
import WordmarkMorphScene from '~/modules/fx/wordmark-morph-scene'

export function Footer() {
  const t = useTranslations('Copyright')
  const locale = useLocale()

  return (
    <footer
      className={clsxm(
        'mt-8 relative flex flex-col items-center justify-center',
        'before:absolute before:top-0 before:left-[-100vw] before:w-[200vw] before:h-px before:bg-(--grid-border-color)',
        'after:absolute after:bottom-0 after:right-[-100vw] after:w-[200vw] after:h-px after:bg-(--grid-border-color)',
      )}
    >
      <WithFrame className='w-full relative aspect-[35/12] h-auto'>
        <WordmarkMorphScene className='mix-blend-difference dark:mix-blend-lighten' />
      </WithFrame>

      <p className='my-6 text-sm opacity-50'>
        {t('Text', {
          year: new Date().getFullYear(),
        })}
      </p>

      {locale === 'zh-CN' && (
        <a className='my-2 text-xs opacity-50' href='https://beian.miit.gov.cn/' target='_blank' rel='noreferrer'>
          粤ICP备2025454293号
        </a>
      )}
    </footer>
  )
}
