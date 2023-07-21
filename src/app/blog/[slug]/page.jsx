"use client"
import React, { useEffect, useState } from 'react'
import styles from "./page.module.css"
import Image from 'next/image'
import { db } from '../../../../firebase/firebase'
import { doc,getDoc } from 'firebase/firestore'
import {BarLoader} from "react-spinners"
const page = ({params}) => {
  const [blog,setBlog]=useState(null)
  
  useEffect(()=>{
    const unsubscribe=async()=>{
      const arr=[]
      const docRef = doc(db, "blogs", params.slug);
      const docSnap = await getDoc(docRef);
      setBlog(docSnap.data())
    }
    unsubscribe()
  },[params.slug])
  return !blog?<BarLoader
  className={styles.barLoader}
  color="rgba(42, 114, 207, 0.966);"
  height={6}
  width={300}
/>:(
    <div className={styles.container}>
      <h2 className={styles.title}>{blog.title}</h2>
      <div className={styles.imgContainer}>
        <Image className={styles.img} alt="" fill={true} src={blog.image}/>
      </div>
      <div className={styles.textBlock}>
        <div className={styles.desc}>{blog.desc}</div>
        <div className={styles.content}>{blog.content}</div>

      </div>
    </div>
  )
}

export default page
