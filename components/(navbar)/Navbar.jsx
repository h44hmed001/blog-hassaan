"use client"
import React, { useEffect } from 'react'
import styles from "./page.module.css"
import Link from 'next/link'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
const Navbar = () => {
  const {signOut,authUser,isLoading}=useAuth()
  const router=useRouter()
  useEffect(()=>{
    if(!authUser&&!isLoading){
      router.push("/login")
    }
  },[authUser,isLoading])
  return !authUser?<div></div>: (

    <div className={styles.container}>
      <Link className={styles.link} href="/"><span className={styles.title}>Hassaan</span><div className={styles.dot}/></Link>
        <ul className={styles.items}>
            <Link className={styles.link} href="/about"><li className={styles.item}>About</li></Link>
            <Link className={styles.link} href="/contact"><li className={styles.item}>Contact</li></Link>
            <Link className={styles.link} href="/dashboard"><li className={styles.item}>Dashboard</li></Link>
            <div className={styles.logout} onClick={signOut}><LogoutOutlinedIcon/></div>
        </ul>
    </div>
  )
}

export default Navbar
