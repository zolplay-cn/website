import { NextPage } from 'next'
import { NextSeo } from 'next-seo'

import { makeUrl } from '~/lib/utils'

import AllPositions from '~/components/careers/AllPositions'
import Benefits from '~/components/careers/Benefits'
import { EngineerHiringProcess } from '~/components/careers/HiringProcess'
import { useCareersLayoutConfig } from '~/components/layouts/CareersLayout'

import { MailOpenIcon } from '@heroicons/react/outline'

const CareersPageInChina: NextPage = () => {
  useCareersLayoutConfig({
    title: ['Help us', 'craft stunning products'],
    cta: { label: 'See open positions', href: '/careers#open-positions' },
  })

  return (
    <>
      <NextSeo
        title="Join Us"
        openGraph={{
          images: [{ url: makeUrl('/assets/careers/og-image.jpg') }],
        }}
      />

      <p>
        <b>Zolplay</b> is a software company that&apos;s based in Shenzhen,
        China.
      </p>
      <p>
        We are a small team of engineers, designers, and product managers. We
        are all driven by a common goal: to build products that are intuitive to
        use and stunning to look at.
      </p>

      <h2>The CPR Motto</h2>
      <p>
        We prototype more and pontificate less, always moving in a fast pace and
        ready for what&apos;s to come
      </p>
      <ul>
        <li>‘C’ as in Craft —— we are a team of makers.</li>
        <li>
          ‘P’ as in Pinpoint —— we move swiftly to pinpoint problems or
          improvements.
        </li>
        <li>
          ‘R’ as in Resolve —— we effectively fix things up and repeat the
          process.
        </li>
      </ul>

      <h2>Global audience</h2>
      <p>
        Zolplay is now recruiting for a diverse expansion to our collective to
        support upcoming and current missions. We are on an everlasting journey
        with the quest looking for talented and like-minded engineers, designers
        and managers to join our team.
      </p>

      <h2>Benefits</h2>
      <Benefits />

      <p>
        We also provide Oculus VR for VR fitness/gaming, Nintendo Switch
        Fitness、unprecedented Radio Taiso to help you get fit and healthy.
      </p>

      <h2>Zolplay&apos;s hiring process</h2>
      <EngineerHiringProcess />

      <h2 id="open-positions">Open positions</h2>
      <p>
        If you&apos;re interested in joining our team, please send your CV to
        <a href="mailto:hr@zolplay.cn" className="flex items-center">
          <MailOpenIcon className="mr-1 h-5 w-5" />
          <span>hr@zolplay.com</span>
        </a>
      </p>

      <h3>Choose your role</h3>
      <AllPositions className="my-12" />
    </>
  )
}

export default CareersPageInChina
