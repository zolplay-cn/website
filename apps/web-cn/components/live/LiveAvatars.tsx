import { AnimatePresence, motion } from 'framer-motion'
import { take } from 'lodash'
import React, { useMemo } from 'react'
import { IoChatbubble } from 'react-icons/io5'
import { Avatar, clsxm } from 'ui'
import { UIComponent } from 'ui/@types/core'

import { useLiveblocksStore } from '~/store/liveblocks.store'

import { UserGroupIcon } from '@heroicons/react/solid'
import Tippy from '@tippyjs/react'

const maxOtherUsersCount = 4

const LiveAvatars: UIComponent<{ id: string }> = ({ id, className }) => {
  const others = useLiveblocksStore((state) => state.liveblocks.others)
  const totalUsers = useMemo(() => others.length, [others])

  return (
    <>
      <AnimatePresence>
        {totalUsers >= 1 && (
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 12 }}
            transition={{ type: 'spring' }}
            className={clsxm('relative z-0 flex h-10 items-center', className)}
          >
            <Tippy
              content={
                <div className="space-y-1.5 p-2.5 text-sm">
                  <div className="flex items-center justify-center space-x-1.5 px-3 text-slate-200">
                    <UserGroupIcon className="h-3.5 w-3.5" />
                    <span>
                      {totalUsers > 1 ? `其他${totalUsers}人` : '另一个人'}
                      也在浏览此页面
                    </span>
                  </div>
                  <div className="flex items-center justify-center space-x-1.5 font-medium text-slate-400">
                    <IoChatbubble className="h-3.5 w-3.5" />
                    <span>按 / 键可开启实时消息</span>
                  </div>
                </div>
              }
              interactive={false}
            >
              <ul className="flex items-center -space-x-1">
                {take(others, maxOtherUsersCount).map(({ connectionId }) => (
                  <motion.li
                    layoutId={`${id}_${connectionId}`}
                    className="relative z-20 h-7 w-7 lg:h-6 lg:w-6"
                    key={connectionId}
                  >
                    <Avatar
                      name={`${id}_${connectionId}`}
                      className="z-30 inline-block h-full w-full rounded-full ring-2 ring-dark"
                    />
                  </motion.li>
                ))}

                {totalUsers > maxOtherUsersCount && (
                  <motion.li
                    className="h-7 w-7 lg:h-6 lg:w-6"
                    key="more-users"
                    layoutId="more"
                  >
                    <span className="relative z-40 inline-flex h-full w-full items-center justify-center rounded-full bg-neon-500 text-center text-xs font-bold text-slate-800 ring-2 ring-dark">
                      +
                      {totalUsers - maxOtherUsersCount > 9
                        ? '9'
                        : totalUsers - maxOtherUsersCount}
                    </span>
                  </motion.li>
                )}
              </ul>
            </Tippy>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default LiveAvatars
