import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import { ReactColorIcon } from 'ui'

import Benefits from '~/components/careers/Benefits'
import { EngineerHiringProcess } from '~/components/careers/HiringProcess'
import { useCareersLayoutConfig } from '~/components/layouts/CareersLayout'

export default function ReactInterviewPageInChina() {
  const { query } = useRouter()
  const isRemote = query.remote !== undefined
  const title = isRemote ? 'React 前端线上面试' : 'React 前端面试'
  useCareersLayoutConfig({
    icon: ReactColorIcon,
    title,
  })

  return (
    <>
      <NextSeo title={title} />

      <p>
        佐玩是一个推崇工程师文化、誓走在技术前沿的一个团队，队里的 OG
        狮子们是一群勇于大胆创新的创造者，我们时刻保持着好奇的心态，信任与合作是我们的关键词条。
      </p>

      <h2>准备事项</h2>

      <h2>加入面试</h2>

      <h2>福利待遇</h2>
      <Benefits />

      <h2>佐玩工程师的招聘流程</h2>
      <EngineerHiringProcess />
    </>
  )
}
