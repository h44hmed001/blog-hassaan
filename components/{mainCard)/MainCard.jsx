import React from 'react'
import styles from "./page.module.css"
import Image from 'next/image'
import Button from '../(button)/Button'
import Link from 'next/link'
const MainCard = ({title,desc,img,link}) => {
  return (
    <div className={styles.container}>
      
      <div className={styles.title}>
        <span className={styles.text}> Hassaan Entertaining</span>
        <span className={styles.text}>“Blog“</span>
        <span className={styles.desc}>Entertaining Blog by Hassaan</span>
      </div>
      <Link className={styles.link} href={`/blog/${link}`}>
      <div className={styles.contentBlock}>
        <div className={styles.imageCont}>
        <Image fill={true} src={img} className={styles.img}/>
        </div>
        
        <div className={styles.textBlock}>
        <div className={styles.imgTitle}>
          {title}
        </div>
        <div className={styles.desc}>
        {desc}
        </div>
        <Button text="See More"/>
        </div>

      </div>
      </Link>
      
    </div>
  )
}

export default MainCard
