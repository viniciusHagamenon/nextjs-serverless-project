import type { NextApiRequest, NextApiResponse } from 'next'
import { v4 as uuidv4 } from 'uuid'

import { fetcher } from '@/utils/fetcher'

export type Customer = {
  Id: number
  Name: string
  Email: string
  Vat: string
  Phone: string
  Country: string
  Website: string
  Image: string
}

type Data = {
  customers: Customer[]
}

// Warning: This is a hack, in the ideal scenario we would use a cache service like redis since each lambda instance would have your own memory that is not shared
export let customers: Customer[]

export const PAGE_SIZE = 30

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const {
    method,
    body,
    query: { offset, limit },
  } = req

  switch (method) {
    case 'GET':
      fetcher(
        `https://u9opz1xf69.execute-api.eu-west-1.amazonaws.com/Stage/company?offset=${offset}&limit=${limit}`
      ).then(response => {
        customers = response.Status = 'OK' ? response.Data : []
        res.status(200).json({ customers })
      })
      break
    case 'POST':
      // Validate payload
      if (typeof body?.name !== 'string' || body?.name.length === 0) {
        return res.status(400).end('Name is missing!')
      }

      // Warning: This is a hack, in the ideal scenario we would use a real database
      customers.push({
        ...body,
        Id: uuidv4(),
      })

      res.status(200).json({ customers })
      break
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
