
import CustomerChat from '@/components/dashboard/customer_chat/CustomerChat';
import React from 'react'

export const metadata = {
    title: 'Dashboard | Chat room',
};

export default function page() {
    return (
        <div className='prose prose-indigo max-w-none '>
            <CustomerChat />
        </div>
    )
}
