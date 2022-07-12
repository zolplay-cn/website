import Image from 'next/image'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import { useMemo } from 'react'
import { ReactColorIcon } from 'ui'

import Benefits from '~/components/careers/Benefits'
import { EngineerHiringProcess } from '~/components/careers/HiringProcess'
import { useCareersLayoutConfig } from '~/components/layouts/CareersLayout'

import ExampleImage from '~/assets/react-interview-example.png'

export default function ReactInterviewPageInChina() {
  const { query } = useRouter()
  const candidate = query.candidate as string
  const isRemote = query.remote !== undefined
  const title = isRemote ? 'React 前端线上面试' : 'React 前端面试'
  useCareersLayoutConfig({
    icon: ReactColorIcon,
    title,
  })

  const branchName = useMemo(
    () =>
      `interview/${new Date().getMonth() + 1}-${new Date().getDate()}${
        candidate ? '_' + candidate : ''
      }`,
    [candidate]
  )

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
          <ol>
            <li>
              在本地克隆我们的{' '}
              <a href="https://github.com/zolplay-cn/react-interview">
                GitHub仓库
              </a>
              <blockquote>
                <code>
                  git clone https://github.com/zolplay-cn/react-interview.git
                </code>
              </blockquote>
              ；
            </li>
            <li>
              基于 <code>main</code> 分支，创建一个新的分支名叫{' '}
              <code>{branchName}</code>，并切换到该分支；
            </li>
            <li>使用你喜爱的代码编辑器/IDE打开文件夹项目；</li>
            <li>在文件夹项目根目录下，使用pnpm安装依赖（或npm/yarn）；</li>
            <li>
              运行 <code>pnpm/npm/yarn run dev</code> 命令，启动项目
            </li>
          </ol>
        </>
      ) : (
        <>
          <h2>准备事项</h2>
          <ol>
            <li>
              在项目目录中开启一个新的Git分支名为 <code>{branchName}</code>
              ，并切换到该分支；
            </li>
            <li>
              运行 <code>pnpm dev</code> 命令，启动项目；
            </li>
          </ol>
        </>
      )}

      <h2>面试测试题要求</h2>

      <p>
        我们为你准备了一个类似Spotlight的搜索器界面，可以先查阅现有的项目代码并熟悉一下项目的结构。
      </p>

      <section className="-mx-[10vw] rounded-2xl border-2 border-sky-300/20 shadow-2xl shadow-indigo-500/20">
        <Image
          src={ExampleImage}
          placeholder="blur"
          alt="Example"
          className="rounded-2xl"
          layout="responsive"
        />
      </section>

      <p>熟悉完之后我们就可以投入到测试题开发当中，你需要完成以下几个要求：</p>

      <ul>
        <li>
          当搜索输入框的值发生改变的时候，应该触发一个搜索请求，请求的URL为
          <code>/api/search?q=QUERY</code>；
        </li>
        <li>
          将返回的搜索结果替换在列表中显示，并传真实数据到{' '}
          <code>&lt;RepositoryOption /&gt;</code>
          组件中，并对该组件进行封装能够动态渲染仓库信息；
        </li>
        <li>
          当搜索结果为空时，应该显示一个提示信息，提示信息的内容为：
          <code>暂无 QUERY 的相关仓库信息</code>；
        </li>
        <li>
          确保每次发出的搜索请求间隔 <b>大于等于500ms</b>；
        </li>
      </ul>

      <h2>加分项</h2>
      <p>在时间允许的前提下，可以选择性完成任意一个/多个加分任务：</p>
      <ul>
        <li>优化搜索结果的渲染，使其可以更加高效的渲染，提高用户体验；</li>
        <li>给UI添加动画效果，增加用户体验；</li>
        <li>
          当选中仓库信息的时候，应该在浏览器中打开仓库的链接，并且查看仓库的详细信息。
        </li>
        <li>
          增加一个搜索历史记录，用户可以在搜索框中输入关键字，并且可以查看历史记录。
        </li>
      </ul>

      <br />
      <p>======= 分割线 =======</p>
      <br />

      <h2>福利待遇</h2>
      <Benefits />

      <h2>佐玩工程师的招聘流程</h2>
      <EngineerHiringProcess />
    </>
  )
}
