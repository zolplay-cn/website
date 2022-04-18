import Image from 'next/image'
import React from 'react'
import { GithubIcon, ScanIcon, WeChatIcon } from 'ui'

import { getOpenPositions } from '~/lib/data'

import { SiteNavigation } from '~/@types/site'
import wechatQRCode from '~/assets/qr-wechat-work.jpg'

export const navigation: SiteNavigation = {
  main: [
    {
      name: 'English',
      href: 'https://zolplay.com',
    },
    // {
    //   name: '团队介绍',
    //   href: '/about',
    // },
    {
      name: '岗位招聘',
      href: '/careers',
      badge: () =>
        getOpenPositions().length === 0
          ? null
          : getOpenPositions().length.toString(),
    },
  ],
  social: [
    {
      name: 'WeChat',
      href: '#',
      icon: WeChatIcon,
      tippyContent: (
        <div className="p-2">
          <div className="rounded-xl bg-white p-2">
            <Image src={wechatQRCode} alt="微信二维码" />
          </div>
          <div className="mt-3 flex items-center justify-center">
            <span className="text-sm font-medium">使用微信扫一扫</span>
            <ScanIcon className="ml-1 h-4 w-4 text-slate-200" />
          </div>
        </div>
      ),
    },
    {
      name: 'GitHub',
      href: process.env.NEXT_PUBLIC_GITHUB_URL || '',
      icon: GithubIcon,
    },
  ],
}
