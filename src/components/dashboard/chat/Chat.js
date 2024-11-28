'use client'
import { Button } from '@nextui-org/react'
import React from 'react'

export default function Chat() {
    const [showChat, setShowChat] = React.useState(true)
    return (
        <div className={`${showChat ? 'h-10' : 'h-[400px] mb-12'} absolute bottom-0 left-1/2 -translate-x-1/2 w-80 z-40 duration-400 ease-out`}>
            <div className='w-full text-center'>
                <button onClick={() => setShowChat(!showChat)} className='w-fit bg-secondary text-white p-2 rounded-md' color='secondary'>Chat</button>
            </div>
            <div className={`${showChat ? 'hidden' : 'block'} bg-white h-full`}>
                biji
            </div>
        </div>
    )
}
