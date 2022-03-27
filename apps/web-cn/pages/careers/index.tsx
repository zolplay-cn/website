import { NextPage } from 'next'
import { NextSeo } from 'next-seo'

import { makeUrl } from '~/lib/utils'

import AllPositions from '~/components/careers/AllPositions'
import Benefits from '~/components/careers/Benefits'
import { CareersLayout } from '~/components/layouts/CareersLayout'

import { MailOpenIcon } from '@heroicons/react/outline'

const CareersPageInChina: NextPage = () => {
  return (
    <>
      <CareersLayout
        title={['加入我们', '一起匠心打造每一款产品']}
        cta={{ label: '查看开放职位', href: '/careers#open-positions' }}
      >
        <h2>为什么创建佐玩</h2>
        <p>我们是热爱玩耍的创造者，佐玩提供了一个自由的创客空间（待补充）</p>
        <h2>佐玩的核心价值</h2>
        <p>
          佐玩是一个推崇工程师文化、誓走在技术前沿的一个团队，队里的OG狮子们是一群勇于大胆创新的创造者，我们时刻保持着好奇的心态，信任与合作是我们的关键词条。
        </p>
        <p>在佐玩，我们追求：</p>
        <ul>
          <li>反应迅速，快速行动，打破常规；</li>
          <li>勇于探索创新与卓越；</li>
        </ul>
        <p>
          （待补充）为了支持当前以及即将到来的主线和支线任务，佐玩里的狮子们从此踏上了不断寻找优秀的输出与辅助的道路。
        </p>
        <p>
          我们誓在拓展团队的多元化的同时将不断探索新的职业规划，为更多的创造者提供更多的机会。
        </p>
        <p>
          最后，如果你感觉佐玩所追求的精神与你很合的来，希望你能加入我们，因为我们需要你的帮助来一起达成共同的梦想。
        </p>

        <h2>佐玩的福利待遇</h2>

        <Benefits />

        <h2 id="open-positions">开放职位</h2>
        <p>
          如果你也秉持着构建卓越软件的使命，欢迎随时联系我们。
          <a href="mailto:hr@zolplay.cn" className="flex items-center">
            <MailOpenIcon className="mr-1 h-5 w-5" />
            <span>hr@zolplay.cn</span>
          </a>
        </p>

        <h3>选择属于你的角色</h3>
        <AllPositions className="my-12" />
        <p>别迟疑了！会是你吗？还不快你的大招展示给我们看看！</p>
      </CareersLayout>

      <NextSeo
        title="加入我们"
        openGraph={{
          images: [{ url: makeUrl('/assets/careers/og-image.jpg') }],
        }}
      />
    </>
  )
}

export default CareersPageInChina
