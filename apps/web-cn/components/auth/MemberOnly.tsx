import { FC } from 'react'

import { useAuth } from '~/hooks/useAuth'

const MemberOnly: FC = ({ children }) => {
  const { isLoadingAuth, isAuthenticated } = useAuth()

  if (!isLoadingAuth && isAuthenticated) {
    return <>{children}</>
  }

  return null
}

export default MemberOnly
