import React from 'react'
import styles from "./page.module.css"
import Link from 'next/link'
const Navbar = () => {
  return (
    <div className={styles.container}>
      <Link className={styles.link} href="/"><span className={styles.title}>Hassaan</span><div className={styles.dot}/></Link>
        <ul className={styles.items}>
            <Link className={styles.link} href="/about"><li className={styles.item}>About</li></Link>
            <Link className={styles.link} href="/contact"><li className={styles.item}>Contact</li></Link>
        </ul>
    </div>
  )
}

export default Navbar
