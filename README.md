# Next.js Serverless Project

This project is a boilerplate for Next.js applications with a complete set of development features.

## Features

- [Next.js](https://nextjs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) [(v3.0)](https://tailwindcss.com/blog/tailwindcss-v3)
- [eslint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Jest](https://jestjs.io/)
- [Testing Library](https://testing-library.com/)
- [Cypress](https://www.cypress.io/) (E2E testing)

#### Development tooling

- [husky](https://typicode.github.io/husky/#/) (GIT hooks)
- [lint-staged](https://github.com/okonet/lint-staged) (lint staged files)

## How to run the project

#### Prerequisites

- [Node.js 16](https://nodejs.org/en/) - recommended installation via [nvm](https://github.com/nvm-sh/nvm)
- [Yarn](https://classic.yarnpkg.com/en/docs/install)

#### Installation

_Mac OS users_: `xcode-select --install` to install build dependencies.

`yarn` to install dependencies.

`yarn dev` to build and start the Next.js server in development mode.

## How to run tests

The project uses Jest as a testing framework and Cypress as an E2E testing framework.

- To run Jest in watch mode: `yarn test`
- To run Cypress: `yarn e2e`

#### Pre-commit hook

Jest is run by husky on the pre-commit hook

#### CI

Both Jest and Cypress have npm scripts to run on a CI environment: `yarn test:ci` and `yarn e2e:headless`
