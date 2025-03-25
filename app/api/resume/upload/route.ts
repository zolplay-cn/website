'use server'

import { put } from '@vercel/blob'
import { NextResponse } from 'next/server'

// limit file size to 50MB
const FILE_SIZE_LIMIT = 50 * 1024 * 1024

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ]

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type' }, { status: 400 })
    }

    if (file.size > FILE_SIZE_LIMIT) {
      return NextResponse.json({ error: 'File size exceeds 50MB' }, { status: 400 })
    }

    const blob = await put(file.name, file, {
      access: 'public',
      contentType: file.type,
      addRandomSuffix: true,
    })

    return NextResponse.json({ url: blob.url })
  } catch (error) {
    console.error('Resume upload error:', error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
