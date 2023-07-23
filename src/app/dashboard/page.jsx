"use client"
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import Button from "../../../components/(button)/Button";
import { collection, addDoc } from "firebase/firestore"; 
import { db, storage } from "../../../firebase/firebase";
import { ref,uploadBytesResumable, getDownloadURL  } from "firebase/storage";
import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";
const page = () => {
    const [image,setImage]=useState(null)
    const {authUser}=useAuth()
    const [per,setPer]=useState(null)
    const router=useRouter()
    const [data,setData]=useState({
        title:"",
        desc:"",
        content:"",
        image:"",
        authorId:"",
    })
    const [loading,setLoading]=useState(false)
    useEffect(()=>{
        const uploadFile=()=>{
            const name=new Date().getTime()+image?.name
            const storageRef = ref(storage, image.name);
            const uploadTask = uploadBytesResumable(storageRef, image);
uploadTask.on('state_changed', 
  (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    setPer(progress)
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
  }, 
  () => {
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      setData((prev)=>({...prev,image:downloadURL}))
    });
  }
);
        }
        image&&uploadFile()
    },[image])


    const handlePost=async()=>{
      setLoading(true)

        if(data.title!==""&&data.content!==""&&data.image&&data.desc){
        await addDoc(collection(db, "blogs"), {
            title:data.title,
            image:data.image,
            desc:data.desc,
            content:data.content,
            authorId:authUser.uid
          });

    }
    setLoading(false)
    router.push("/")

}

  return !authUser?<div className={styles.uploading}>Login or Register First</div>: loading?<div className={styles.uploading}>Uploading</div>: (
    <div className={styles.container}>
      <h1 className={styles.title}>Post</h1>
      <div className={styles.content}>
        
        <form onSubmit={(e)=>e.preventDefault()} className={styles.form}>
          <input onChange={(e)=>setData({...data,title:e.target.value})} required type="text" placeholder="Enter Title" className={styles.input} />
          <input onChange={(e)=>setData({...data,desc:e.target.value})} required type="text" placeholder="Enter Description" className={styles.input} />
          <textarea
          required
          onChange={(e)=>setData({...data,content:e.target.value})}
            className={styles.textArea}
            placeholder="Enter Content"
            cols="30"
            rows="10"
          ></textarea>
          <input required onChange={(e)=>setImage(e.target.files[0])} id="file" type="file" />
          <button disabled={per!==null&&per<100} onClick={handlePost} className={styles.button}>Post</button>
        </form>
      </div>
    </div>
  );
};

export default page;