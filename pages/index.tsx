import type { NextPage } from 'next'
import { ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Head from 'next/head'

import { CustomerRow } from '@/components/CustomerRow'

import { fetcher } from '@/utils/fetcher'

import { Customer, PAGE_SIZE } from './api/customers'

type Props = {
  customers: Customer[]
  totalCustomers: number
}

const Home: NextPage<Props> = ({ customers: initialCustomers, totalCustomers }) => {
  const [customers, setCustomers] = useState(() => initialCustomers)
  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setLoading] = useState(false)

  const prevPage = useRef(page)

  const loadMore = useCallback(() => {
    setPage(page + 1)
    setSearchTerm('')
  }, [page, setPage])

  const searchInList = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.currentTarget.value)
    },
    [setSearchTerm]
  )

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true)
      const offset = Math.min((page - 1) * PAGE_SIZE, totalCustomers)

      const response = await fetcher(
        `https://u9opz1xf69.execute-api.eu-west-1.amazonaws.com/Stage/company?offset=${offset}&limit=${PAGE_SIZE}`
      )
      if (response.Code === 200) {
        setCustomers([...customers, ...response.Data])

        if (offset + PAGE_SIZE >= totalCustomers) {
          setLastPage(true)
        }
      }
      setLoading(false)
    }

    if (page > 1 && !isLoading && page > prevPage.current) {
      fetchCustomers()
      prevPage.current = page
    }
  }, [page, customers, totalCustomers, isLoading])

  // Inifinity scroll pagination
  useEffect(() => {
    const onScroll = () => {
      const { innerHeight: windowHeight, scrollY } = window
      const bodyHeight = document.body.offsetHeight
      const bottom = bodyHeight - windowHeight
      const threshold = bottom - scrollY - 250

      if (threshold < 0 && !isLoading && !lastPage) loadMore()
    }

    window.addEventListener('scroll', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [isLoading, lastPage, loadMore])

  const filteredCustomers = useMemo(() => {
    return customers.filter(customer => customer.Name.match(new RegExp(searchTerm, 'i')))
  }, [searchTerm, customers])

  const listCustomers = searchTerm ? filteredCustomers : customers

  return (
    <>
      <Head>
        <title>Customers App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col flex-1 w-full px-20">
        <div className="flex items-center justify-between h-12">
          <h1 className="text-4xl font-bold">Customers App</h1>
          <input
            className="px-8 h-12 rounded-md border border-gray-400"
            placeholder="Filter in list..."
            onChange={searchInList}
            value={searchTerm}
          />
        </div>
        {listCustomers.length > 0 && (
          <div className="mt-6">
            <p>
              Showing {listCustomers.length} of {totalCustomers} customers
            </p>
          </div>
        )}
        <div className="mt-6 -mx-2">
          {listCustomers.length ? (
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="p-2 text-left border-b border-gray-300">Image</th>
                  <th className="p-2 text-left border-b border-gray-300">Name</th>
                  <th className="p-2 text-left border-b border-gray-300">Country</th>
                  <th className="p-2 text-left border-b border-gray-300">Email</th>
                </tr>
              </thead>
              <tbody>
                {listCustomers.map(customer => (
                  <CustomerRow key={customer.Id} customer={customer} />
                ))}
              </tbody>
            </table>
          ) : searchTerm ? (
            <div className="px-12 text-center">No customers found for {searchTerm}</div>
          ) : (
            <div className="px-12 text-center">No customers</div>
          )}
        </div>
        <br />
        {isLoading && <div className="px-12 text-center">Loading...</div>}
        {lastPage && !isLoading && <div className="px-12 text-center">End of the customer list</div>}
      </main>
    </>
  )
}

Home.getInitialProps = async () => {
  const response = await fetcher(
    `https://u9opz1xf69.execute-api.eu-west-1.amazonaws.com/Stage/company?offset=0&limit=${PAGE_SIZE}`
  )

  if (response.Code === 200) {
    return { customers: response.Data, totalCustomers: response.Total }
  } else {
    return { customers: [], totalCustomers: 0 }
  }
}

export default Home
