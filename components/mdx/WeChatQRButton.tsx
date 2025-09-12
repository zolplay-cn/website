'use client'

import { clsxm } from '@zolplay/utils'
import Image from 'next/image'
import React from 'react'
import { createPortal } from 'react-dom'
import { Button } from '~/components/ui/button'

interface WeChatQRButtonProps {
  className?: string
  label?: string
}

export default function WeChatQRButton({ className, label = '微信联系' }: WeChatQRButtonProps) {
  const [open, setOpen] = React.useState(false)
  const portalContainerRef = React.useRef<HTMLElement | null>(null)

  React.useEffect(() => {
    // Lazily create a container for the portal and append it to <body>
    const container = document.createElement('div')
    container.setAttribute('data-portal', 'wechat-qr')
    document.body.appendChild(container)
    portalContainerRef.current = container

    return () => {
      // Cleanup on unmount
      container.remove()
      portalContainerRef.current = null
    }
  }, [])

  return (
    <>
      <Button onClick={() => setOpen(true)} size='lg' className={clsxm('w-full relative', className)}>
        {label}
        <svg
          width='5'
          height='5'
          viewBox='0 0 5 5'
          className='absolute top-[4px] left-[4px] fill-current'
          data-highlight
        >
          <path d='M2 0h1v2h2v1h-2v2h-1v-2h-2v-1h2z' />
        </svg>
        <svg
          width='5'
          height='5'
          viewBox='0 0 5 5'
          className='absolute top-[4px] right-[4px] fill-current'
          data-highlight
        >
          <path d='M2 0h1v2h2v1h-2v2h-1v-2h-2v-1h2z' />
        </svg>
        <svg
          width='5'
          height='5'
          viewBox='0 0 5 5'
          className='absolute bottom-[4px] left-[4px] fill-current'
          data-highlight
        >
          <path d='M2 0h1v2h2v1h-2v2h-1v-2h-2v-1h2z' />
        </svg>
        <svg
          width='5'
          height='5'
          viewBox='0 0 5 5'
          className='absolute bottom-[4px] right-[4px] fill-current'
          data-highlight
        >
          <path d='M2 0h1v2h2v1h-2v2h-1v-2h-2v-1h2z' />
        </svg>
      </Button>

      {open && portalContainerRef.current
        ? createPortal(
            <div
              role='dialog'
              aria-modal='true'
              className='fixed inset-0 z-[10000] flex items-center justify-center p-4'
              onClick={() => setOpen(false)}
            >
              <div className='absolute inset-0 bg-black/50 backdrop-blur-sm' />
              <div
                className='relative z-10 w-full max-w-sm border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-stone-900 shadow-xl outline outline-neutral-300/40 dark:outline-stone-700/40'
                onClick={(e) => e.stopPropagation()}
              >
                <div className='flex items-center justify-between px-4 py-3 border-b border-neutral-200 dark:border-neutral-800'>
                  <h2 className='text-lg lg:text-xl not-prose font-semibold'>微信扫码联系</h2>
                  <button
                    type='button'
                    aria-label='关闭'
                    className='text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-100'
                    onClick={() => setOpen(false)}
                  >
                    <svg aria-hidden='true' viewBox='0 0 24 24' className='size-5'>
                      <path d='M6 6l12 12M18 6L6 18' stroke='currentColor' strokeWidth='2' strokeLinecap='round' />
                    </svg>
                  </button>
                </div>
                <div className='p-4 flex flex-col items-center gap-3'>
                  <Image
                    src='/assets/contact-wechat-qr.jpg'
                    alt='WeChat 联系二维码'
                    width={939}
                    height={1504}
                    className='h-auto w-full max-w-[220px] lg:max-w-[320px]'
                    priority
                  />
                  <p className='text-xs text-neutral-500 dark:text-neutral-400'>使用微信扫码添加，我们尽快回复。</p>
                </div>
              </div>
            </div>,
            portalContainerRef.current,
          )
        : null}
    </>
  )
}
