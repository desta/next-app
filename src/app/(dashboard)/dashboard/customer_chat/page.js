import SidebarChat from '@/components/dashboard/customer_chat/SidebarChat';
import React from 'react'

export const metadata = {
    title: 'Dashboard | Chat room',
};

export default function page() {
    return (
        <div className='prose prose-indigo max-w-none '>
            <SidebarChat />
        </div>
    )
}
