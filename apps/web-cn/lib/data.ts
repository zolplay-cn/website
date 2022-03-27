export const jobs: Job[] = [
  {
    isOpen: true,
    slug: 'frontend-engineer',
    title: '前端攻城狮',
    description: '',
    canBeRemote: true,
  },
]

export const getOpenPositions = (): Job[] => jobs.filter((job) => job.isOpen)
