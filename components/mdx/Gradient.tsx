export function Gradient({ children }: { children: React.ReactNode }) {
  return (
    <span className='bg-gradient-to-r from-rose-500 to-indigo-500 bg-clip-text font-medium text-transparent dark:from-amber-200 dark:to-sky-400'>
      {children}
    </span>
  )
}

export function Red({ children }: { children: React.ReactNode }) {
  return (
    <span className='bg-gradient-to-r from-red-400 to-red-600 bg-clip-text font-medium text-transparent dark:from-red-200 dark:to-red-400'>
      {children}
    </span>
  )
}

export function Green({ children }: { children: React.ReactNode }) {
  return (
    <span className='bg-gradient-to-r from-emerald-500 to-green-600 bg-clip-text font-medium text-transparent dark:from-green-200 dark:to-green-400'>
      {children}
    </span>
  )
}
