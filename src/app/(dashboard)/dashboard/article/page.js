import ArticlePage from '@/components/website/article/ArticlePage'
import React from 'react'

export const metadata = {
  title: 'Dashboard | Article',
};

export default function page() {
  return (
    <div className='p-2 rounded-medium bg-white'>
      <ArticlePage />
    </div>
  )
}
