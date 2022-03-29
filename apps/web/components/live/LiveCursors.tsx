import { AnimatePresence, motion } from 'framer-motion'
import { compact, merge } from 'lodash'
import { useRouter } from 'next/router'
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import stringHash from 'string-hash'
import tinycolor from 'tinycolor2'
import { clsxm } from 'ui'
import { UIComponent } from 'ui/@types/core'

import { makeRoomIdByRoute, useLiveblocksStore } from '~/store/liveblocks.store'

type CursorProps = {
  id: string
  x: number
  y: number
  message: string | null
}
const Cursor: UIComponent<CursorProps> = ({ className, id, x, y, message }) => {
  const encodedName = encodeURI(id)
  const hashed = stringHash(encodedName)
  const color = tinycolor({ h: hashed % 360, s: 0.85, l: 0.75 })

  return (
    <div
      style={{
        transition: 'transform 0.55s cubic-bezier(.17,.93,.38,1)',
        transform: `translateX(${x}px) translateY(${y}px)`,
      }}
      className={clsxm('absolute left-0 top-0 flex flex-col', className)}
    >
      <svg
        width="24"
        height="36"
        viewBox="0 0 24 36"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        opacity="0.6"
      >
        <path
          d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
          fill={color.toHexString()}
          stroke="white"
        />
      </svg>
      {message && message !== '' && (
        <span
          className="translate-x-3 -translate-y-4 rounded-2xl rounded-tl-sm px-3 py-1.5 text-sm font-medium text-slate-900/90 antialiased opacity-90 mix-blend-color-dodge"
          style={{ backgroundColor: color.toHexString() }}
        >
          {message}
        </span>
      )}
    </div>
  )
}

type LiveCursor = {
  id: string
  x: number
  y: number
  message: string | null
}

const LiveCursorMessageTooltip: FC = () => {
  const [isShowing, setIsShowing] = useState(false)
  const cursor = useLiveblocksStore((state) => state.cursor)
  const message = useLiveblocksStore((state) => state.message)
  const updateMessage = useLiveblocksStore((state) => state.setMessage)
  const inputRef = useRef<HTMLInputElement>(null)
  const handleOnKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const focusInput = () => {
        setTimeout(() => inputRef.current?.focus(), 100)
      }

      if (e.key === '/') {
        if (message === null) {
          setIsShowing(true)
          focusInput()
        } else {
          focusInput()
        }
      }

      if (message !== null) {
        if (e.key === 'Enter') {
          inputRef.current?.blur()
        }

        if (e.key === 'Escape') {
          setIsShowing(false)
          updateMessage(null)
        }
      }
    },
    [message, updateMessage]
  )
  const {
    liveblocks: { room },
  } = useLiveblocksStore()
  const encodedName = encodeURI(room?.getSelf()?.connectionId?.toString() ?? '')
  const hashed = stringHash(encodedName)
  const color = tinycolor({ h: hashed % 360, s: 0.8, l: 0.7 })

  useEffect(() => {
    window.addEventListener('keydown', handleOnKeyDown)

    return () => {
      window.removeEventListener('keydown', handleOnKeyDown)
    }
  }, [handleOnKeyDown])

  return (
    <>
      <AnimatePresence>
        {isShowing && (
          <motion.div
            className="absolute"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, x: cursor.x, y: cursor.y }}
            exit={{ opacity: 0 }}
          >
            <div
              className="relative ml-3 mt-4 inline-grid items-center align-top after:invisible after:w-auto after:resize-none after:appearance-none after:whitespace-pre-wrap after:border-none after:bg-none after:px-3 after:py-1.5 after:outline-none"
              data-value={message ?? ''}
            >
              <input
                ref={inputRef}
                className="m-0 w-auto resize-none appearance-none overflow-auto rounded-2xl rounded-tl-sm border-2 border-slate-50/20 bg-none py-1.5 px-3 text-sm font-medium text-slate-900/90 antialiased placeholder-slate-900/50 opacity-95 mix-blend-color-dodge outline-none focus:outline-none"
                type="text"
                name="message"
                autoCapitalize="off"
                autoComplete="off"
                autoCorrect="off"
                size={8}
                style={{
                  backgroundColor: color.toHexString(),
                }}
                placeholder="说点什么..."
                onChange={(e) => updateMessage(e.target.value)}
              />
            </div>
            <style jsx>{`
              div[data-value]:after {
                content: attr(data-value) ' ';
              }
              div[data-value]:after,
              input {
                min-width: 1em;
                grid-area: 1 / 2;
              }
            `}</style>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

const LiveCursors: FC = () => {
  const {
    liveblocks: { enterRoom, leaveRoom },
  } = useLiveblocksStore()
  const { route } = useRouter()
  const roomId = useMemo(() => makeRoomIdByRoute(route), [route])

  useEffect(() => {
    enterRoom(roomId, { cursor: { x: -100, y: -100 } })

    return () => {
      leaveRoom(roomId)
    }
  }, [enterRoom, leaveRoom, roomId])

  const updateCursor = useLiveblocksStore((state) => state.setCursor)
  const others = useLiveblocksStore((state) => state.liveblocks.others)
  const othersCursors: LiveCursor[] = useMemo(
    () =>
      compact(
        others.map((user) =>
          merge({ id: user.connectionId }, user.presence?.cursor, {
            message: user.presence?.message ?? null,
          })
        )
      ),
    [others]
  )

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      updateCursor({ x: e.pageX, y: e.pageY })
    }
    const handlePointerLeave = () => {
      updateCursor({ x: -100, y: -100 })
    }
    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerleave', handlePointerLeave)
    window.addEventListener('blur', handlePointerLeave)

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerleave', handlePointerLeave)
      window.removeEventListener('blur', handlePointerLeave)
    }
  }, [updateCursor, route])

  return (
    <div className="pointer-events-none absolute inset-0 select-none overflow-hidden">
      <div className="relative">
        {othersCursors?.map((cursor) => {
          return (
            <Cursor
              key={cursor.id}
              id={cursor.id}
              x={cursor.x}
              y={cursor.y}
              message={cursor.message}
            />
          )
        })}
      </div>

      <LiveCursorMessageTooltip />
    </div>
  )
}

export default LiveCursors
