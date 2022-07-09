import Image from 'next/image'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import { ReactColorIcon } from 'ui'

import Benefits from '~/components/careers/Benefits'
import { EngineerHiringProcess } from '~/components/careers/HiringProcess'
import { useCareersLayoutConfig } from '~/components/layouts/CareersLayout'

import SlackCloneImage from '~/assets/Slack Clone 1.png'

export default function ReactInterviewPageInChina() {
  const { query } = useRouter()
  const candidate = query.candidate as string
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

      {isRemote ? (
        <>
          <h2>准备事项</h2>
          <p>首先你可以从以下两种方案中选择一条：</p>
          <ol>
            <li>
              使用我们提供的在线IDE环境，在线编辑代码，并<b>在线</b>提交代码；
              <blockquote>
                在线Replit IDE：
                <a
                  href="https://replit.com/join/rkfkrflilu-zolplay"
                  target="_blank"
                  rel="noreferrer"
                >
                  加入链接
                </a>
              </blockquote>
            </li>
            <li>
              使用自己的电脑环境与代码编辑器，分享屏幕，并在<b>本地</b>
              提交代码；
              <blockquote>
                在本地建立一个Git仓库，并新建一个React项目（脚手架自选）
              </blockquote>
            </li>
          </ol>
        </>
      ) : (
        <>
          <h2>准备事项</h2>
          <p>
            首先你需要在项目文件目录中开启一个新的Git分支，起名叫做{' '}
            <code>
              interview/
              {`${new Date().getMonth() + 1}-${new Date().getDate()}${
                candidate ? '_' + candidate : ''
              }`}
            </code>
          </p>
        </>
      )}

      <h2>面试测试题流程</h2>

      <p>现在有一个设计稿UI图如下：</p>

      <section className="-mx-[10vw] rounded-2xl border-2 border-sky-300/20 shadow-2xl shadow-indigo-500/20">
        <Image
          src={SlackCloneImage}
          placeholder="blur"
          alt="Slack Clone"
          className="rounded-2xl"
          layout="responsive"
        />
      </section>

      <p>请使用React Hooks形式的函数组件来实现界面布局，并最大程度上地还原UI</p>
      <p>（不限制任何框架、第三方库的使用）</p>

      <h2>加分项</h2>
      <p>下列加分项并非必须，但是可以为你的题目完成增加一些额外的分数：</p>
      <ul>
        <li>
          Semantic 语义化的 HTML5 标签使用，而不是滥用{' '}
          <code>&lt;div /&gt;</code>
        </li>
        <li>添加合理的交互动画，让UI更加生动；</li>
        <li>组件化代码，让代码更加简洁；</li>
        <li>使用TypeScript完成代码；</li>
      </ul>

      <h2>福利待遇</h2>
      <Benefits />

      <h2>佐玩工程师的招聘流程</h2>
      <EngineerHiringProcess />
    </>
  )
}
