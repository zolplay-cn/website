import { NextSeo } from 'next-seo'
import React from 'react'
import { clsxm } from 'ui'
import { UIComponent } from 'ui/@types/core'

import NavBar from '~/components/NavBar'

import { BareLayout } from './BareLayout'

type CareersLayoutProps = {
  title: string
}
export const CareersLayout: UIComponent<CareersLayoutProps> = ({
  className,
  children,
  title,
}) => {
  return (
    <>
      <NextSeo title={title} />

      <style global jsx>{`
        body {
          background-image: url('/assets/careers/foreground.png'),
            url('/assets/careers/background.jpg');
          background-repeat: no-repeat;
          background-position: top -120px center;
          background-size: clamp(840px, calc(100vw * 1.45 + 40px), 1700px);
        }
      `}</style>

      <NavBar />

      <BareLayout className={clsxm('careers', 'bg-none', className)}>
        <header className="container mt-12 flex flex-col text-center lg:mt-56">
          <h1 className="text-neon px-12 text-4xl font-extrabold tracking-tight lg:px-24 lg:text-[4.5rem]">
            {title}
          </h1>
        </header>
        {children}
      </BareLayout>
    </>
  )
}
