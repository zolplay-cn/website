import { FC, useMemo } from 'react'

import { BareLayout } from '~/components/layouts/BareLayout'
import { CareersLayout } from '~/components/layouts/CareersLayout'

export const RouteLayouts: Record<string, FC> = {
  '*': BareLayout,
  '/404': BareLayout,
  '/500': BareLayout,
  '/careers': CareersLayout,
  '/careers/*': CareersLayout,
}

export function useLayout(route: string): FC {
  return useMemo(() => {
    const explicitLayout = RouteLayouts[route]
    if (explicitLayout) return explicitLayout

    const splitRoute = route.split('/')
    if (splitRoute.length > 1) {
      const [_, rootRoute] = splitRoute
      return RouteLayouts[`/${rootRoute}/*`] ?? RouteLayouts['*']
    } else {
      return RouteLayouts['*']
    }
  }, [route])
}
