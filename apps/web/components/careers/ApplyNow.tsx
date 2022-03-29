import Link from 'next/link'
import { clsxm } from 'ui'
import type { UIComponent } from 'ui/@types/core'

import { MailOpenIcon } from '@heroicons/react/outline'

const ApplyNow: UIComponent = ({ className }) => {
  return (
    <div className={clsxm('py-4', className)}>
      <p>
        If you are interested in joining our team, please send your resume to
        <a href="mailto:hr@zolplay.cn" className="flex items-center">
          <MailOpenIcon className="mr-1 h-5 w-5" />
          <span>hr@zolplay.com</span>
        </a>
      </p>
      <p>
        Not the position you are looking for？
        <Link href="/careers#open-positions">Click here</Link>
        to see all positions.
      </p>
    </div>
  )
}

export default ApplyNow
