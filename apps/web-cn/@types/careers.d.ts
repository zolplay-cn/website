import { UIComponent } from 'ui/@types/core'

type Job = {
  isOpen: boolean
  slug: string
  title: string
  description: string
  canBeRemote?: boolean
}

type EmploymentBenefit = {
  icon: UIComponent
  title: string
  description?: string
  className?: string
}
