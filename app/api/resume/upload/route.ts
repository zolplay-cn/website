import type { HandleUploadBody } from '@vercel/blob/client'
import { handleUpload } from '@vercel/blob/client'
import { NextResponse } from 'next/server'

// limit file size to 50MB
const FILE_SIZE_LIMIT = 50 * 1024 * 1024

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body = (await request.json()) as HandleUploadBody

    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => {
        return {
          allowedContentTypes: [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          ],
          maximumSizeInBytes: FILE_SIZE_LIMIT,
          tokenPayload: JSON.stringify({
            timestamp: Date.now(),
          }),
        }
      },
      onUploadCompleted: async () => {},
    })

    return NextResponse.json(jsonResponse)
  } catch (error) {
    console.error('Resume upload error:', error)
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Upload failed' }, { status: 400 })
  }
}
