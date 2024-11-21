import React from 'react'
import parse from 'html-react-parser';

function Layout1({data}) {
    return (
        <>
            <div className='bg-red-500'>
                <h1>{data.title}</h1>
                {parse(data.content)}
            </div>
        </>

    )
}

export default Layout1