import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { FormProvider, useForm, useFormContext, get, RegisterOptions } from 'react-hook-form'

import { ButtonPrimary } from '@/components/Buttons'

import { fetcher } from '@/utils/fetcher'

import { Customer } from './api/customers'

const FieldInput: React.FC<
  React.InputHTMLAttributes<HTMLInputElement> & { name: string; label: string; registerOptions?: RegisterOptions }
> = ({ name, label, registerOptions, ...props }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  const fieldError = get(errors, name)

  return (
    <div className="w-full mb-4">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor={`field-${name}`}>
        {label}
      </label>
      <input
        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        id={`field-${name}`}
        type="text"
        {...props}
        {...register(name, registerOptions)}
      />
      {fieldError?.type === 'required' && <p className="mt-3 text-red-500 text-xs italic">{label} is required</p>}
    </div>
  )
}

const AddCustomer: NextPage = () => {
  const methods = useForm()
  const router = useRouter()

  const { handleSubmit } = methods

  const onSubmit = async (data: Partial<Customer>) => {
    try {
      const customers = await fetcher('/api/customers', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      console.log('New customers:', customers)

      router.push('/')
    } catch (e) {
      console.log('Add customer error:', e)
    }
  }

  return (
    <>
      <Head>
        <title>Customers App - Add Customer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col flex-1 w-full px-20">
        <h1 className="text-4xl font-bold">Customers App</h1>
        <div className="mt-6 flex flex-col max-w-lg flex-wrap sm:w-full">
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FieldInput name="name" label="Name" registerOptions={{ required: true }} />
              <FieldInput name="email" label="Email" registerOptions={{ required: true }} />
              <FieldInput name="vat" label="VAT ID" registerOptions={{ required: true }} />
              <FieldInput name="phone" label="Phone" registerOptions={{ required: true }} />
              <FieldInput name="country" label="Country" registerOptions={{ required: true }} />
              <FieldInput name="website" label="Website" registerOptions={{ required: true }} />
              <FieldInput
                name="image"
                label="Image"
                registerOptions={{ required: true, value: 'http://placeimg.com/640/480/people' }}
              />
              <div className="flex flex-col w-full">
                <ButtonPrimary onClick={handleSubmit(onSubmit)}>Add New Customer</ButtonPrimary>
              </div>
            </form>
          </FormProvider>
        </div>
      </main>
    </>
  )
}

export default AddCustomer
