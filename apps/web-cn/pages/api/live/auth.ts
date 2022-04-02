import type { NextApiRequest, NextApiResponse } from 'next'

import { authorize } from '@liveblocks/node'

const secret = process.env.LIVEBLOCKS_API_SECRET_KEY || ''

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const room = req.body.room
  const result = await authorize({ room, secret })

  return res.status(result.status).end(result.body)
}
