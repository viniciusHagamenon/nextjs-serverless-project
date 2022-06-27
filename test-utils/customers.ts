import { faker } from '@faker-js/faker'

export const createCustomer = () => ({
  id: faker.datatype.uuid(),
  name: faker.company.companyName(),
  email: faker.internet.email(),
  vat: faker.random.numeric(10),
  phone: faker.phone.number(),
  country: faker.address.country(),
  website: faker.internet.url(),
  image: faker.image.avatar(),
})
