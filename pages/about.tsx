import type { NextPage } from 'next'
import Link from 'next/link'

import styles from '../styles/about.module.css'

const About: NextPage = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1>About Page</h1>
        <p className={styles.description}>
          <Link href="/">
            <a>&larr; Go Back</a>
          </Link>
        </p>
      </main>
    </div>
  )
}

export default About
