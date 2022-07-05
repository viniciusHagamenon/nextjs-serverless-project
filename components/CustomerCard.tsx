import React from 'react'
import Image from 'next/image'

import { Customer } from '@/pages/api/customers'

const DataInfo: React.FC<{ label: string; value?: React.ReactNode }> = ({ label, value }) => (
  <div className="w-full py-2">
    <p className="font-normal text-gray-600 text-sm tracking-wide mb-1">{label}</p>
    <div className="text-default leading-5 break-words">{value ?? 'Not available'}</div>
  </div>
)

export const CustomerCard: React.FC<{ customer: Customer }> = ({ customer }) => {
  console.log('customer:', customer)
  return (
    <div className="w-1/3">
      <div className="border border-solid border-gray-400 bg-white rounded-b p-4 flex flex-col justify-between leading-normal">
        <div className="flex flex-col">
          {customer.Image && (
            <div className="relative h-48 mb-2">
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
          <DataInfo label="Name" value={customer.Name} />
          <DataInfo label="Country" value={customer.Country} />
          <DataInfo label="VAT ID" value={customer.Vat} />
          <DataInfo label="Email" value={<a href={`mailto:${customer.Email}`}>{customer.Email}</a>} />
          <DataInfo label="Phone" value={<a href={`tel:${customer.Phone}`}>{customer.Phone}</a>} />
          <DataInfo
            label="Website"
            value={
              <a href={customer.Website} target="_blank" rel="noreferrer">
                {customer.Website}
              </a>
            }
          />
        </div>
      </div>
    </div>
  )
}
