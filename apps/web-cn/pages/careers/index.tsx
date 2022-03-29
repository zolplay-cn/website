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
    title: ['加入我们', '一起匠心打造每一款产品'],
    cta: { label: '查看开放职位', href: '/careers#open-positions' },
  })

  return (
    <>
      <NextSeo
        title="加入我们"
        openGraph={{
          images: [{ url: makeUrl('/assets/careers/og-image.jpg') }],
        }}
      />

      <p>
        <b>Zolplay/佐玩</b> 是一个创业团队。
      </p>
      <h2>工程师文化</h2>
      <p>
        佐玩创始人——C（狮）EO自美国大学毕业后，顺利地从业于在美国的技术公司，相继任职了主席工程师，合作过的客户有星巴克、微软以及
        Niantic
        公司。回国以后毅然决定将美国工作期间深受感染的工程师文化打造起来，致力创造独特的同时，释放国内志同道合者的野心。
      </p>
      <h2>’CPR’战略</h2>
      <p>
        每个公司都有自己的金三角，那么佐玩的金三角就是——“CPR”战略！这可跟急救知识无关哦：
      </p>
      <ul>
        <li>‘C’ is Craft —— 打造。是我们的质量，我们探索乐趣、匠心创造；</li>
        <li>‘P’ is Pinpoint —— 瞄准。是我们的态度，我们打破常规、精准定位；</li>
        <li>‘R’ is Resolve —— 重塑。是我们的能力，快速行动、及时更正。</li>
      </ul>
      <h2>海外市场</h2>
      <p>
        为了支持当前的，以及即将到来的更多的主线和支线任务，在未来的探索里稳固扎实、开拓疆土。所以！佐玩正寻找各路英雄好汉：设计狮、工程狮、架构狮、程序猿……或成为MVP辅助，或是强有力的输出，再或者法师！
      </p>

      <h2>佐玩的福利待遇</h2>
      <Benefits />
      <p>
        哦对了，下午茶点、奶茶水果蛋糕小零食和电玩，最重要的每月一开黑对于我们来说是魂不可缺的，希望你能理解；另外还有情感慰问成员的时刻关怀——银点皮卡丘和乳色麦芽（新成员还在期待中……）
      </p>
      <p>
        什么？担心自己从此幸福肥？放心吧，VR运动、Switch健身环、日间集体Taiso体操可让你的脂肪无处可藏。
      </p>

      <h2>佐玩攻城狮的招聘流程</h2>
      <EngineerHiringProcess />

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
    </>
  )
}

export default CareersPageInChina
