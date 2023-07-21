"use client"
import React from "react";
import styles from "./page.module.css";
import Image from "next/image";
import Button from "../../../components/(button)/Button";

const Contact = () => {
    const handleSubmit=(e)=>{
        e.preventDefault()
    }
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Let's Get in Touch</h1>
      <div className={styles.content}>
        
        <form onSubmit={(e)=>handleSubmit(e)} className={styles.form}>
          <input type="text" placeholder="name" className={styles.input} />
          <input type="text" placeholder="email" className={styles.input} />
          <textarea
            className={styles.textArea}
            placeholder="message"
            cols="30"
            rows="10"
          ></textarea>
          <Button url="#" text="Send"/>
        </form>
      </div>
    </div>
  );
};

export default Contact;