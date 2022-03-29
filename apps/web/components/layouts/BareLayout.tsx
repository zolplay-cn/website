import { useUpdateAtom } from 'jotai/utils'
import React, { FC, useEffect } from 'react'

import { footerConfigAtom } from '~/components/Footer'

export const BareLayout: FC = ({ children }) => {
  const setConfig = useUpdateAtom(footerConfigAtom)
  useEffect(() => setConfig({ transparent: true }), [setConfig])

  return (
    <>
      <main className="min-h-screen pt-20 text-zinc-50">{children}</main>

      <style global jsx>{`
        body {
          background-image: radial-gradient(
              26.96% 41.05% at 51.76% -18%,
              rgba(24, 114, 97, 0.2) 0%,
              rgba(24, 114, 97, 0) 100%
            ),
            linear-gradient(
              113.5deg,
              #1c1c1f 10.29%,
              #121a2e 39.01%,
              #110b25 66.3%,
              #260f45 94.71%
            );
        }
      `}</style>
    </>
  )
}
