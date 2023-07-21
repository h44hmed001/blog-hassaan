import React from 'react'
import styles from "./page.module.css"
import Image from 'next/image'
import Link from 'next/link'
const Card = ({img,title,desc,link}) => {
  const truncate=(str,num=8)=>{
    return str.split(" ").splice(0,10).join(" ")+"..."
  }
  return (
    <Link href={`/blog/${link}`} className={styles.link}>
    <div className={styles.container}>
     <div className={styles.imgContainer}>
        <Image fill={true} className={styles.img} src={img}/>
     </div>
     <div className={styles.textBlock}>
        <h3 className={styles.title}>{title}</h3>
        <span className={(styles.desc)}>{truncate(desc)}</span>
     </div>
    </div>
    </Link>
  )
}

export default Card
