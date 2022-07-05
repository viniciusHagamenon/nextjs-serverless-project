import type { NextApiRequest, NextApiResponse } from 'next'

import { fetcher } from '@/utils/fetcher'

import { Customer } from '../customers'

type Data = {
  customer?: Customer
  error?: unknown
}

// Warning: This is a hack, in the ideal scenario we would have an endpoint to fetch
// the individual customer to avoid overfetching (both in the customer list and in the customer details page)
export const getCustomerById = async (customerId: number) => {
  const response = await fetcher(`https://u9opz1xf69.execute-api.eu-west-1.amazonaws.com/Stage/company`)

  const customer: Customer | undefined = response.Data.find((customer: Customer) => customer.Id === customerId)

  return customer
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const {
    method,
    query: { customerId },
  } = req

  switch (method) {
    case 'GET':
      getCustomerById(Number(customerId))
        .then(customer => {
          if (customer) {
            return res.status(200).json({ customer })
          } else {
            return res.status(404).json({ error: `Customer ${customerId} not found!` })
          }
        })
        .catch(error => {
          return res.status(500).json(error)
        })
      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
