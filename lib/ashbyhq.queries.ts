import { Buffer } from 'node:buffer'
import { cache } from 'react'

// eslint-disable-next-line node/prefer-global/process
const ASHBY_API_KEY = process.env.ASHBY_API_KEY!
export const getJobs = cache(async () => {
  try {
    const res = await fetch('https://api.ashbyhq.com/jobPosting.list', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: `Basic ${Buffer.from(`${ASHBY_API_KEY}:`).toString('base64')}`,
      },
      body: JSON.stringify({ listedOnly: true }),
      cache: 'no-cache',
    }).then((res) => res.json())

    if (!res.success) return []

    return res.results
  } catch (error) {
    console.error(error, 'get jobs error')
    return []
  }
})

export const getJob = cache(async (id: string) => {
  try {
    const res = await fetch('https://api.ashbyhq.com/jobPosting.info', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: `Basic ${Buffer.from(`${ASHBY_API_KEY}:`).toString('base64')}`,
      },
      body: JSON.stringify({
        jobPostingId: id,
      }),
    }).then((res) => res.json())

    if (!res.success) return null

    return res.results
  } catch {
    return null
  }
})
