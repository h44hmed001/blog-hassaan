"use client"
import React, { useEffect, useState } from 'react'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Button from '../../../components/(button)/Button';
import styles from "./page.module.css"
import Link from 'next/link';
import { auth } from '../../../firebase/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useAuth } from '../../../context/AuthContext';
import { useRouter } from 'next/navigation';
const page = () => {
  const [username,setUsername]=useState(null)
  const [email,setEmail]=useState(null)
  const [password,setPassword]=useState(null)
  const {authUser,isLoading,setAuthUser}=useAuth()
  const router=useRouter()
  const handleSubmit=async()=>{
    if(!username||!email||!password) return;
    try{
      const user=await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(auth.currentUser,{displayName:username})
      setAuthUser({
        uid: user.uid,
            email: user.email,
            username,
      })
      
    }
    catch(error){
      console.log(error)
    }
  
  }

  useEffect(()=>{
    if(authUser&&!isLoading){
      router.push("/")
    }

  },[authUser,isLoading])

  return (
    <div className={styles.container}>
    <div className={styles.logo}><AccountCircleOutlinedIcon sx={{ fontSize: 40 }}/></div>
    <div className={styles.textBlock}>
      <span className={styles.title}>Welcome!</span>
      <span className={styles.text}>Register or <Link className={styles.link} href="/login">Login</Link></span>
    </div>
    <form onSubmit={(e)=>e.preventDefault()} className={styles.form}>
      <input onChange={(e)=>setUsername(e.target.value)} placeholder='Enter your name' className={styles.input} type='text'/>
      <input onChange={(e)=>setEmail(e.target.value)} required placeholder='Enter your email' className={styles.input} type='text'/>
      <input onChange={(e)=>setPassword(e.target.value)} placeholder='Enter Password' className={styles.input} type='text'/>
      <button onClick={handleSubmit} className={styles.button}>Register</button>
    </form>
  </div>
)
  
}

export default page
