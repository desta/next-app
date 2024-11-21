import React from 'react'
import parse from 'html-react-parser';

function Layout3({ data }) {
    return (
        <>
            <div className='w-full bg-red-500 mb-4'>
                component
            </div>
            <div className='flex flex-col md:flex-row gap-4'>
                <div className='w-full md:w-1/4 bg-blue-500'>
                component                    
                </div>
                <div className='w-full md:w-9/12 bg-red-500'>
                    <h1>{data.title}</h1>
                    {parse(data.content)}
                </div>
            </div>
            <div className='w-full bg-red-500 mt-4'>
                component
            </div>
        </>

    )
}

export default Layout3