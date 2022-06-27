import { render, screen } from '@testing-library/react'

import Home from '@/pages/index'

import { createCustomer } from '../test-utils/customers'

describe('Customers App', () => {
  it('renders a customer', () => {
    const customer = createCustomer()

    render(<Home customers={[customer]} />)

    const name = screen.getByText(customer.Name)
    const country = screen.getByText(customer.Country)
    const email = screen.getByText(customer.Email)
    const image = screen.getByRole('img', { name: customer.Name })

    expect(name).toBeInTheDocument()
    expect(country).toBeInTheDocument()
    expect(email).toBeInTheDocument()
    expect(image).toBeInTheDocument()
  })
})
