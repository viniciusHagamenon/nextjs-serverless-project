import type { NextApiRequest, NextApiResponse } from 'next'

import { Customer, customers } from '../customers'

type Data = {
  customer: Customer
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const {
    method,
    query: { customerId },
  } = req

  switch (method) {
    case 'GET':
      const customer = customers.find(customer => customer.Id === Number(customerId))

      if (customer) {
        return res.status(200).json({ customer })
      } else {
        return res.status(404).end(`Customer ${customerId} not found!`)
      }
      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
