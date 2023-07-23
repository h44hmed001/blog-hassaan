"use client"
import React, { useEffect, useState } from 'react'
import styles from "./page.module.css"
import Image from 'next/image'
import { db } from '../../../../firebase/firebase'
import { deleteDoc, doc,getDoc } from 'firebase/firestore'
import {BarLoader} from "react-spinners"
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useAuth } from '../../../../context/AuthContext'
import { useRouter } from 'next/navigation'
const page = ({params}) => {
  const [blog,setBlog]=useState(null)
  const {authUser}=useAuth()
  const router=useRouter()
  useEffect(()=>{
    const unsubscribe=async()=>{
      const arr=[]
      const docRef = doc(db, "blogs", params.slug);
      const docSnap = await getDoc(docRef);
      setBlog(docSnap.data())
    }
    unsubscribe()
  },[params.slug])

  const handleDelete=async(id)=>{
    
    await deleteDoc(doc(db, "blogs", id));
     router.push("/")
    
   

  }
  return !blog?<BarLoader
  className={styles.barLoader}
  color="rgba(42, 114, 207, 0.966);"
  height={6}
  width={300}
/>:(
    <div className={styles.container}>
      {blog.authorId==authUser.uid&&<button onClick={()=>{handleDelete(params.slug)}} className={styles.button}>Delete This Post</button>}
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
