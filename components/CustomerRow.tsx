import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { Customer } from '@/pages/api/customers'

export const CustomerRow: React.FC<{ customer: Customer }> = ({ customer }) => {
  const router = useRouter()
  return (
    <tr
      className="border-b border-solid border-gray-300 bg-white cursor-pointer hover:bg-gray-100"
      onClick={() => router.push(`/customers/${customer.Id}`)}
    >
      <td className="p-2">
        {customer.Image && (
          <div className="flex items-center">
            <Image
              src={customer.Image}
              alt={customer.Name}
              width={96}
              height={72}
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
