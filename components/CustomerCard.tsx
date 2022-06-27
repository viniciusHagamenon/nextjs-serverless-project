import React from 'react'
import Image from 'next/image'

import { Customer } from '@/pages/api/customers'

const DataInfo: React.FC<{ label: string; value?: React.ReactNode }> = ({ label, value }) => (
  <div className="w-full py-2">
    <p className="font-normal text-gray-600 text-sm tracking-wide mb-1">{label}</p>
    <div className="text-default leading-5 break-words">{value ?? 'Not available'}</div>
  </div>
)

export const CustomerCard: React.FC<{ customer: Customer }> = ({ customer }) => (
  <div className="w-1/3 p-2">
    <div className="border border-solid border-gray-400 bg-white rounded-b p-4 flex flex-col justify-between leading-normal">
      <div className="flex flex-col">
        <div className="relative h-48 mb-2">
          <Image
            src={customer.image}
            alt={customer.name}
            layout="fill"
            objectFit="cover"
            priority
            onError={e => console.log('Image error:', e)}
          />
        </div>
        <DataInfo label="Name" value={customer.name} />
        <DataInfo label="Country" value={customer.country} />
        <DataInfo label="VAT ID" value={customer.vat} />
        <DataInfo label="Email" value={<a href={`mailto:${customer.email}`}>{customer.email}</a>} />
        <DataInfo label="Phone" value={<a href={`tel:${customer.phone}`}>{customer.phone}</a>} />
        <DataInfo
          label="Website"
          value={
            <a href={customer.website} target="_blank" rel="noreferrer">
              {customer.website}
            </a>
          }
        />
      </div>
    </div>
  </div>
)
