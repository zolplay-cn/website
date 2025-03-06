import { Buffer } from 'node:buffer'

export async function getJobs() {
  try {
    const res = await fetch('https://api.ashbyhq.com/jobPosting.list', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: `Basic ${Buffer.from(`${process.env.ASHBY_API_KEY!}:`).toString('base64')}`,
      },
      body: JSON.stringify({ listedOnly: true }),
      cache: 'no-cache',
    }).then((res) => res.json())

    if (!res.success) 
return []

    return res.results
  } catch (error) {
    console.error(error, 'get jobs error')
    return []
  }
}

export async function getJob(id: string) {
  try {
    const res = await fetch('https://api.ashbyhq.com/jobPosting.info', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: `Basic ${Buffer.from(`${process.env.ASHBY_API_KEY!}:`).toString('base64')}`,
      },
      body: JSON.stringify({
        jobPostingId: id,
      }),
    }).then((res) => res.json())

    if (!res.success) 
return null

    return res.results
  } catch {
    return null
  }
}
