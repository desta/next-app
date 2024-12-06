import DashboardPage from '@/components/dashboard/DashboardPage'
import Chat from '@/components/dashboard/chat/Chat';
import React from 'react'

export const metadata = {
  title: 'Dashboard',
};

export default function page() {
  return (
    <div><DashboardPage />
      <Chat />
    </div>
  )
}
