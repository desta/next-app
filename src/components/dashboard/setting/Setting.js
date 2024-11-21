"use client"
import React from 'react'
import { Tab, Tabs } from '@nextui-org/react'
import TabelUser from '@/components/dashboard/setting/user/TabelUser'
import { useSession } from 'next-auth/react'
import TabelFaq from './faq/TabelFaq'
import Smtp from './smtp/Smtp'
import App from './App'

export default function Setting({ params, smtp }) {
  const { data: session } = useSession()
  return (
    <>
      <div className="flex w-full flex-col">
        <Tabs aria-label="Options" color='secondary' variant='bordered'>
            <Tab key="User" title="User">
              <TabelUser />
            </Tab>
            <Tab key="dashboard" title="Dashboard">
              <App params={params} />
            </Tab>
            <Tab key="faq" title="FAQ">
              <TabelFaq />
            </Tab>
            <Tab key="smtp" title="SMTP">
              <Smtp params={smtp} />
            </Tab>
        </Tabs>
      </div>
    </>
  )
}