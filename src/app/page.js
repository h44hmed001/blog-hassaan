"use client"
import Image from 'next/image'
import styles from './page.module.css'
import MainCard from '../../components/{mainCard)/MainCard'
import Card from '../../components/(card)/Card'
import { doc,collection, getDocs } from "firebase/firestore";
import { db } from '../../firebase/firebase';
import { useEffect, useState } from 'react';


export default function Home() {
  const [blogs,setBlogs]=useState([])
useEffect(()=>{
  const unsubscribe=async()=>{
    const arr=[]
      const querySnapshot = await getDocs(collection(db, "blogs"));
      querySnapshot.forEach((doc) => {
        arr.push({...doc.data(),id:doc.id})
        setBlogs(arr)
      });
    }
  unsubscribe()
},[])
  
  
  return (
    <>
    {blogs&&blogs.map((blog,i)=>blog.featured&&<MainCard key={i} link={blog.id} title={blog.title} desc={blog.desc} img={blog.image}/>)}
    <div className={styles.blogs}>
      {blogs&&blogs.map((blog,i)=>!blog.featured&&<Card key={i} link={blog.id} title={blog.title} desc={blog.desc} img={blog.image}/>)}
    </div>
    </>
  )
}