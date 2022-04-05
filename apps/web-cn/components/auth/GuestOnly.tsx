import { FC } from 'react'

import { useAuth } from '~/hooks/useAuth'

const GuestOnly: FC = ({ children }) => {
  const { isLoadingAuth, isAuthenticated } = useAuth()

  if (isLoadingAuth || isAuthenticated) {
    return null
  }

  return <>{children}</>
}

export default GuestOnly
