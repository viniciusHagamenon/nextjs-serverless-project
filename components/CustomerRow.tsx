import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { Customer } from '@/pages/api/customers'

export const CustomerRow: React.FC<{ customer: Customer }> = ({ customer }) => {
  const router = useRouter()
  return (
    <tr
      className="border-b border-solid border-gray-300 bg-white"
      onClick={() => router.push(`/customer/${customer.Id}`)}
    >
      <td className="p-2">
        {customer.Image && (
          <div className="relative h-8">
            <Image
              src={customer.Image}
              alt={customer.Name}
              layout="fill"
              objectFit="cover"
              priority
              onError={e => console.log('Image error:', e)}
            />
          </div>
        )}
      </td>
      <td className="p-2">{customer.Name}</td>
      <td className="p-2">{customer.Country}</td>
      <td className="p-2">{customer.Email}</td>
    </tr>
  )
}
