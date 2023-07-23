import Navbar from '../../components/(navbar)/Navbar'
import {  AuthUserProvider } from '../../context/AuthContext'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Hassaan Blog',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthUserProvider>
        <Navbar/>
        {children}
        </AuthUserProvider>
        
        </body>
    </html>
  )
}
