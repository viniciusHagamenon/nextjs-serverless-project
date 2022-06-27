import { faker } from '@faker-js/faker'

export const createCustomer = () => ({
  Id: Number(faker.random.numeric(10)),
  Name: faker.company.companyName(),
  Email: faker.internet.email(),
  Vat: faker.random.numeric(10),
  Phone: faker.phone.number(),
  Country: faker.address.country(),
  Website: faker.internet.url(),
  Image: faker.image.avatar(),
})
