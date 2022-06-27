import { render, screen } from '@testing-library/react'

import Home from '@/pages/index'

import { createCustomer } from '../test-utils/customers'

describe('Customers App', () => {
  it('renders a customer', () => {
    const customer = createCustomer()

    render(<Home customers={[customer]} />)

    const name = screen.getByText(customer.name)
    const country = screen.getByText(customer.country)
    const vat = screen.getByText(customer.vat)
    const email = screen.getByText(customer.email)
    const phone = screen.getByText(customer.phone)
    const website = screen.getByText(customer.website)
    const image = screen.getByRole('img', { name: customer.name })

    expect(name).toBeInTheDocument()
    expect(country).toBeInTheDocument()
    expect(vat).toBeInTheDocument()
    expect(email).toBeInTheDocument()
    expect(phone).toBeInTheDocument()
    expect(website).toBeInTheDocument()
    expect(image).toBeInTheDocument()
  })
})
