'use client'

import type { FieldErrors, Path } from 'react-hook-form'
import { AnimatePresence, motion } from 'motion/react'
import React, { useImperativeHandle } from 'react'
import { BsFileEarmarkPdf } from 'react-icons/bs'
import { Button } from '~/components/ui/button'
import { formError } from '../job'

interface ResumeProps<T extends Record<string, any>> {
  path: Path<T>
  onChange: (value: string) => void
  errors: FieldErrors<T>
  onUploadStart: () => void
  onUploadComplete: (url: string) => void
  onUploadError: (error: Error) => void
}

export interface ResumeRef {
  upload: () => Promise<string | null>
}
const FILE_SIZE_LIMIT = 50 * 1024 * 1024 //  50MB

export function Resume({
  ref,
  path,
  onChange,
  errors,
  onUploadStart,
  onUploadComplete,
  onUploadError,
}: ResumeProps<any> & { ref?: React.RefObject<ResumeRef | null> }) {
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const [file, setFile] = React.useState<File | null>(null)
  const [isUploading, setIsUploading] = React.useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFile = e.target.files?.[0]
    if (!newFile) return

    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ]

    if (!allowedTypes.includes(newFile.type)) {
      onUploadError(new Error('Invalid file type'))
      return
    }

    if (newFile.size > FILE_SIZE_LIMIT) {
      onUploadError(new Error('File size exceeds 50MB'))
      return
    }

    setFile(newFile)
    onChange('pending')
  }

  const upload = async () => {
    if (!file) return null
    setIsUploading(true)
    onUploadStart()
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/resume/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Upload failed')
      }

      const data = await response.json()
      onChange(data.url)
      onUploadComplete(data.url)
      setIsUploading(false)
      return data.url
    } catch (error) {
      console.error('Upload failed:', error)
      onUploadError(error instanceof Error ? error : new Error('Upload failed'))
      setIsUploading(false)
      return null
    }
  }

  useImperativeHandle(ref, () => ({
    upload,
  }))

  return (
    <div>
      <div className='py-2 mt-6 rounded-md border border-dashed'>
        <div className='mt-2'>
          <div className='space-y-3 text-center'>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <BsFileEarmarkPdf className='mx-auto w-8 h-8 text-stone-400 dark:text-stone-500' />
            </motion.div>
            <AnimatePresence mode='wait'>
              {file && (
                <motion.div
                  className='flex flex-col items-center'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {file.name}
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
                onChange={handleFileChange}
                disabled={isUploading}
              />
              <Button
                variant='outline'
                type='button'
                disabled={isUploading}
                onClick={() => {
                  if (file) {
                    setFile(null)
                    onChange('')
                    if (fileInputRef.current) {
                      fileInputRef.current.value = ''
                    }
                  } else {
                    fileInputRef.current?.click()
                  }
                }}
              >
                {isUploading ? 'Uploading...' : file ? 'Remove Resume' : 'Add Resume'}
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
