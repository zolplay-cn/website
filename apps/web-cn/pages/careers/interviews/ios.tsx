import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import { IoLogoApple } from 'react-icons/io'

import { useCareersLayoutConfig } from '~/components/layouts/CareersLayout'

export default function IOSInterviewPageInChina() {
  const title = 'iOS 面试习题'
  const { query } = useRouter()
  const candidate = query.candidate as string

  useCareersLayoutConfig({
    icon: IoLogoApple,
    title,
  })

  return (
    <>
      <NextSeo title={title} />

      <p>为了更好地测试面试者的iOS开发流程掌握，我们准备了以下习题：</p>

      <h2>步骤与要求</h2>
      <p>在你认为合适的步骤时，集成Git流程并进行commit</p>
      <p>(UI自行发挥，不作限制)</p>

      <ol>
        <li>
          完全从零开始创建一个简app，取名为 <b>Repos</b>；
        </li>
        <li>
          在你的简app中，创建一个新的分支，取名为{' '}
          <code>feature/{candidate ?? 'candidate'}</code>；
        </li>
        <li>在第一个页面中，绘制一个输入框，用来输入GitHub的用户名；</li>
        <li>
          当输入框输入完后，点击按钮，获取该用户的仓库列表；
          <blockquote>
            从GitHub REST API获取repos列表，并在页面上展示出来
            <code>https://api.github.com/users/USERNAME/repos</code>
          </blockquote>
        </li>
        <li>
          每一行仓库信息都可以点击跳转到该仓库的页面，并在页面上展示出来一些额外信息；
        </li>
      </ol>

      <h2>加分项</h2>
      <ul>
        <li>使用SwiftUI</li>
        <li>UI/UX处理</li>
        <li>代码命名、书写习惯</li>
        <li>任意额外拓展的功能</li>
      </ul>
    </>
  )
}
