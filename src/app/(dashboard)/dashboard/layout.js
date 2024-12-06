"use client"
import "./layout.css"
import NavBar from '@/components/dashboard/NavBar'
import React, { useEffect, useState } from 'react'
import Breadcrumb from '@/components/dashboard/Breadcrumb'
import Sidebar from '@/components/dashboard/Sidebar'

export default function layout({ children }) {

  const [open, setOpen] = useState()

  const getWindowSize = () => {
    let windowWidth;

    if (typeof window !== 'undefined') {
      windowWidth = window.innerWidth
    }

    if (windowWidth <= 768) {
      setOpen(true)
    } else {
      setOpen(false)
    }
  }

  useEffect(() => {
    getWindowSize()
  }, [])

  useEffect(() => {
    fetch("/api/socket"); // Initialize the WebSocket server
  }, []);

  return (
    <>
      <div className="flex flex-col min-h-screen bg-primary-50">
        <NavBar open={open} setOpen={setOpen} />
        <div className='flex mt-3'>
          <div className='rounded-se-lg flex fixed top-20 bottom-0 bg-sidebar text-sidebar-foreground shadow-lg z-40'>
            <Sidebar open={open} setOpen={setOpen} />
          </div>
          <div className={`${open ? 'pl-20 pr-4' : 'pl-2 pr-4 sm:pl-72'} flex flex-col w-full transition-all duration-300 pb-5`}>
            <Breadcrumb />
            <div className="z-10">{children}</div>
            {/* <ul className="bg-bubbles"> */}
            <ul className="circles">
              <li className="bg-primary-200"></li>
              <li className="bg-primary-200"></li>
              <li className="bg-primary-200"></li>
              <li className="bg-primary-200"></li>
              <li className="bg-primary-200"></li>
              <li className="bg-primary-200"></li>
              <li className="bg-primary-200"></li>
              <li className="bg-primary-200"></li>
              <li className="bg-primary-200"></li>
              <li className="bg-primary-200"></li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
