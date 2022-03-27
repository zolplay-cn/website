import { UIComponent } from 'ui/@types/core'

type Job = {
  status: 'open' | 'closed'
  icon: UIComponent
  slug: string
  title: string
  description: string
  minYearsExperience: number
  minDegree: string
  canBeRemote?: boolean
}

type EmploymentBenefit = {
  icon: UIComponent
  title: string
  description?: string
  className?: string
}
