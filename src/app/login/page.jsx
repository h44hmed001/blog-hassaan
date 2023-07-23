"use client"
import React, { useEffect, useState } from 'react'
import styles from "./page.module.css"
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import Button from '../../../components/(button)/Button';
import Link from 'next/link';
import { useAuth } from '../../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { auth } from '../../../firebase/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
const Login = () => {
  const [email,setEmail]=useState(null) 
  const [password,setPassword]=useState(null)
  const {authUser,isLoading}=useAuth()
  const router=useRouter()
  useEffect(() => {
    if (!isLoading && authUser) {
        router.push("/");
    }
}, [authUser, isLoading]);
  const handleLogin=async()=>{
    if(!email || !password) return;
    try{
    await signInWithEmailAndPassword(auth, email, password)
    
    }
    catch(error){
      console.log(error)
    }
  }
  
  console.log(authUser)
  
  return (
    <div className={styles.container}>
      <div className={styles.logo}><LoginOutlinedIcon sx={{ fontSize: 40 }}/></div>
      <div className={styles.textBlock}>
        <span className={styles.title}>Welcome!</span>
        <span className={styles.text}>Sign in to your account or <Link className={styles.link} href="/register">Register</Link></span>
      </div>
      <form onSubmit={(e)=>e.preventDefault()} className={styles.form}>
        <input onChange={(e)=>setEmail(e.target.value)} required placeholder='Enter your email' className={styles.input} type='email'/>
        <input onChange={(e)=>setPassword(e.target.value)} placeholder='Enter Password' className={styles.input} type='text'/>
        <button onClick={handleLogin} className={styles.button}>Login</button>
      </form>
    </div>
  )
}

export default Login
