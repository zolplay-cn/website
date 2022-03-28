import Link from 'next/link'
import { clsxm } from 'ui'
import type { UIComponent } from 'ui/@types/core'

import { MailOpenIcon } from '@heroicons/react/outline'

const ApplyNow: UIComponent = ({ className }) => {
  return (
    <div className={clsxm('py-4', className)}>
      <p>别迟疑了！会是你吗？还不快你的大招展示给我们看看！</p>
      <p>
        如果你也秉持着构建卓越软件的使命，欢迎随时附上你的简历并联系我们。
        <a href="mailto:hr@zolplay.cn" className="flex items-center">
          <MailOpenIcon className="mr-1 h-5 w-5" />
          <span>hr@zolplay.cn</span>
        </a>
      </p>
      <p>
        不是适合你的职位？<Link href="/careers#open-positions">点这里</Link>
        查看所有职位
      </p>
    </div>
  )
}

export default ApplyNow
