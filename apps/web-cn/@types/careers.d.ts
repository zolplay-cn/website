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
  noDetailPage?: boolean
}

type EmploymentBenefit = {
  icon: UIComponent
  title: string
  description?: string
  cardColor?:
    | 'sky-slate'
    | 'rose'
    | 'pink-indigo'
    | 'emerald-teal'
    | 'yellow-fuchsia'
    | 'sky-slate-2'
}
