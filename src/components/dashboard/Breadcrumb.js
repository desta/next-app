'use client'

import React from 'react'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { HiChevronRight } from 'react-icons/hi'
import Greeting from './Greeting'

const Breadcrumb = () => {
  const capitalizeLinks = true
  const paths = usePathname()
  const pathNames = paths.split('/').filter(path => path)
  const containerClasses = 'flex items-center gap-1'
  const listClasses = 'hover:underline'
  const activeClasses = 'text-primary'
  return (
    <div className='z-20'>
      {paths !== ('/dashboard') ?
        pathNames.map((link, index) => {
          let itemLink = link[0].toUpperCase() + link.slice(1, link.length).replaceAll("%20", " ").replaceAll("_", " ")
          if (pathNames.length === index + 1) {
            return (
              <div key={index} className='pb-2 z-20'>
                <span className='text-2xl'>{itemLink}</span>
              </div>
            )
          }
        })
        :
        <Greeting />
      }

      {
        paths !== ('/dashboard') &&
        <div className='pb-5 z-20'>

          <div className='border rounded-medium px-3 py-1'>
            <ul className={containerClasses}>
              <li className={listClasses}><Link href={'/'}>Home</Link></li>
              {pathNames.length > 0 && <HiChevronRight />}
              {
                pathNames.map((link, index) => {
                  let href = `/${pathNames.slice(0, index + 1).join('/')}`
                  let itemClasses = paths === href ? `${listClasses} ${activeClasses}` : listClasses
                  let itemLink = capitalizeLinks ? link[0].toUpperCase() + link.slice(1, link.length).replaceAll("%20", " ").replaceAll("_", " ") : link
                  return (
                    <React.Fragment key={index}>
                      <li className={itemClasses} >
                        <Link href={href}>{itemLink}</Link>
                      </li>
                      {pathNames.length !== index + 1 && <HiChevronRight />}
                    </React.Fragment>
                  )
                })
              }
            </ul>
          </div>
        </div>
      }
    </div>
  )
}

export default Breadcrumb