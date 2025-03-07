import type { FieldErrors, Path } from 'react-hook-form'
import { AnimatePresence, motion } from 'motion/react'
import React from 'react'
import { BsFileEarmarkPdf } from 'react-icons/bs'
import { toast } from 'sonner'
import { Button } from '~/components/ui/button'
import { formError } from '../job'

export function Resume<T extends Record<string, any>>({
  path,
  onChange,
  errors,
}: {
  path: Path<T>
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  errors: FieldErrors<T>
}) {
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const [fileName, setFileName] = React.useState<string | null>(null)

  return (
    <div>
      <div className='mt-6 rounded-md border border-dashed py-2'>
        <div className='mt-2'>
          <div className='space-y-3 text-center'>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <BsFileEarmarkPdf className='mx-auto h-8 w-8 text-stone-400 dark:text-stone-500' />
            </motion.div>
            <AnimatePresence mode='wait'>
              {fileName && (
                <motion.div
                  className='flex flex-col items-center'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {fileName}
                </motion.div>
              )}
            </AnimatePresence>

            <div className='text-sm text-stone-600 dark:text-stone-400'>
              <input
                type='file'
                className='sr-only'
                multiple={false}
                accept='application/pdf'
                ref={fileInputRef}
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (!file) return
                  if (file.size > 50 * 1024 * 1024) {
                    toast.error('Resume should be PDF files and under 50MB')
                    return
                  }

                  setFileName(file.name)

                  onChange(e)
                }}
              />
              <Button
                variant='outline'
                type='button'
                onClick={() => {
                  fileInputRef.current?.click()
                  if (fileInputRef.current) {
                    fileInputRef.current.value = ''
                  }
                }}
              >
                {fileName ? 'Change Resume' : 'Add Resume'}
              </Button>
            </div>

            <p className='text-sm text-stone-500'>Resume should be PDF files and under 50MB</p>

            <AnimatePresence mode='wait'>
              {errors[path] && (
                <motion.span
                  className={formError()}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                >
                  {String(errors[path]?.message || '')}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
