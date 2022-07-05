import type { NextPage } from 'next'
import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

import { CustomerCard } from '@/components/CustomerCard'

import { Customer } from '../api/customers'
import { getCustomerById } from '../api/customers/[customerId]'

const Customer: NextPage<{ customer?: Customer; error?: Error | string | undefined }> = ({ customer, error }) => {
  return (
    <>
      <Head>
        <title>Customers App{customer && ` - Customer ${customer.Name}`}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col flex-1 w-full px-20">
        <div className="flex items-center justify-between h-12">
          <h1 className="text-4xl font-bold">Customers App</h1>
        </div>
        <div className="mt-6">
          <>
            <Link href="/">&larr; Go back</Link>
            <div className="mt-6">
              {error && (
                <div className="py-12 text-center font-semibold">
                  {typeof error === 'string' ? error : error?.message}
                </div>
              )}
              {customer && <CustomerCard customer={customer} />}
            </div>
          </>
        </div>
      </main>
    </>
  )
}

Customer.getInitialProps = async ({ query: { customerId } }) => {
  try {
    const customer = await getCustomerById(Number(customerId))

    if (customer) {
      return { customer }
    } else {
      return { error: `Customer ${customerId} not found!` }
    }
  } catch (error) {
    return { error: error as Error }
  }
}

export default Customer
