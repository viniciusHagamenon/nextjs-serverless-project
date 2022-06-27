import type { NextApiRequest, NextApiResponse } from 'next'
import { v4 as uuidv4 } from 'uuid'

export const customers = [
  {
    id: '1',
    name: 'Mills, Anderson and Swift',
    email: 'matilde.deckow@mcdermott.com',
    vat: '4642450122',
    phone: '+4006402480404',
    country: 'Armenia',
    website: 'http://little.net',
    image: 'http://placeimg.com/640/480/people',
  },
]

export type Customer = {
  id: string
  name: string
  email: string
  vat: string
  phone: string
  country: string
  website: string
  image: string
}

type Data = {
  customers: Customer[]
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { method, body } = req

  switch (method) {
    case 'GET':
      res.status(200).json({ customers })
      break
    case 'POST':
      // Validate payload
      if (typeof body?.name !== 'string' || body?.name.length === 0) {
        return res.status(400).end('Name is missing!')
      }

      customers.push({
        ...body,
        id: uuidv4(),
      })

      res.status(200).json({ customers })
      break
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
