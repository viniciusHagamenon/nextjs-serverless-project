import type { AppProps } from 'next/app'
import Link from 'next/link'

import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="flex min-h-screen flex-col items-center pt-8">
      <Component {...pageProps} />
      <footer className="flex mt-8 h-24 w-full items-center justify-center border-t">
        <Link href="/about">About Page &rarr;</Link>
      </footer>
    </div>
  )
}

export default MyApp
