import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

import { CustomerCard } from '@/components/CustomerCard'
import { ButtonPrimary } from '@/components/Buttons'

import { fetcher } from '@/utils/fetcher'

import { Customer } from './api/customers'

type Props = {
  customers: Customer[]
}

const Home: NextPage<Props> = ({ customers }) => {
  return (
    <>
      <Head>
        <title>Customers App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col flex-1 w-full px-20">
        <h1 className="text-4xl font-bold">Customers App</h1>
        <div className="mt-6 -mx-2 flex flex-wrap">
          {customers.map(customer => (
            <CustomerCard key={customer.id} customer={customer} />
          ))}
        </div>
        <br />
        <Link href="/add-customer" passHref>
          <ButtonPrimary>Add Customer</ButtonPrimary>
        </Link>
      </main>
    </>
  )
}

Home.getInitialProps = async () => {
  const customers = await fetcher('http://localhost:3000/api/customers')
  return customers
}

export default Home
