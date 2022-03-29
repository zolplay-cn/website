import { compact, merge } from 'lodash'
import { useRouter } from 'next/router'
import { FC, useEffect, useMemo } from 'react'
import stringHash from 'string-hash'
import tinycolor from 'tinycolor2'
import { clsxm } from 'ui'
import { UIComponent } from 'ui/@types/core'

import { makeRoomIdByRoute, useLiveblocksStore } from '~/store/liveblocks.store'

type CursorProps = {
  id: string
  x: number
  y: number
}
const Cursor: UIComponent<CursorProps> = ({ className, id, x, y }) => {
  const encodedName = encodeURI(id)
  const hashed = stringHash(encodedName)
  const color = tinycolor({ h: hashed % 360, s: 0.85, l: 0.75 })

  return (
    <svg
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        transition: 'transform 0.55s cubic-bezier(.17,.93,.38,1)',
        transform: `translateX(${x}px) translateY(${y}px)`,
      }}
      width="24"
      height="36"
      viewBox="0 0 24 36"
      xmlns="http://www.w3.org/2000/svg"
      className={clsxm('fill-none', className)}
    >
      <path
        d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
        fill={color.toHexString()}
        stroke="white"
      />
    </svg>
  )
}

type LiveCursor = {
  id: string
  x: number
  y: number
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
          merge({ id: user.connectionId }, user.presence?.cursor)
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
      <div className="relative opacity-50">
        {othersCursors?.map((cursor) => {
          return (
            <Cursor key={cursor.id} id={cursor.id} x={cursor.x} y={cursor.y} />
          )
        })}
      </div>
    </div>
  )
}

export default LiveCursors
