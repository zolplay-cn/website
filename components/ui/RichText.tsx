import { Link } from 'next-intl'
import { TbArrowDownLeft } from 'react-icons/tb'

export const DefaultRichTextComponents = {
  br: () => <br />,
  b: (text) => <strong>{text}</strong>,
  red: (text) => (
    <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text font-bold tracking-tight text-transparent dark:from-red-200 dark:to-red-400">
      {text}
    </span>
  ),
  green: (text) => (
    <span className="bg-gradient-to-r from-emerald-400 to-green-600 bg-clip-text font-bold tracking-tight text-transparent dark:from-green-200 dark:to-green-400">
      {text}
    </span>
  ),
  gradient: (text) => (
    <span className="bg-gradient-to-r from-yellow-500 to-indigo-500 bg-clip-text font-bold tracking-tight text-transparent dark:from-amber-200 dark:to-sky-400">
      {text}
    </span>
  ),
  'contact-us-link': (text) => (
    <Link
      href="/contact"
      className="inline-flex items-center font-semibold text-blue-600 no-underline transition-colors hover:text-blue-800 hover:underline dark:text-sky-300 dark:hover:text-sky-500"
    >
      <span>{text}</span>
      <TbArrowDownLeft className="ml-px h-4 w-4" />
    </Link>
  ),
}
