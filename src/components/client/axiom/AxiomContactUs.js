'use client'
import { Button, Input, Textarea } from '@nextui-org/react'
import React from 'react'
import { toast } from 'react-hot-toast'

export default function AxiomContactUs() {
    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [subject, setSubject] = React.useState('')
    const [message, setMessage] = React.useState('')

    const handleSubmitForm = async () => {
        // Add to your backend here
        const res = await fetch('/api/contact_us', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({   
                name,             
                email,
                subject,
                message,
            }),
        })
        if (res.ok) {
            toast.success('Feedback berhasil dikirim')
            setName('')
            setEmail('')
            setSubject('')
            setMessage('')
        } else {
            toast.error('Feedback gagal terkirim')
        }

    }

    return (
        <div className=''>
            <p className='text-2xl font-bold pb-5 text-left'>Send feedback!</p>
            <form onSubmit={handleSubmitForm} className='flex flex-col gap-5'>
            <Input
                    isRequired
                    className="font-bold"
                    color='primary'
                    label="Name"
                    placeholder="Your name"
                    variant="bordered"
                    name="name"
                    id="name"
                    onChange={(e) => setName(e.target.value)}
                />
                <Input
                    isRequired
                    className="font-bold"
                    color='primary'
                    label="Email"
                    placeholder="Your email address"
                    variant="bordered"
                    name="email"
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    isRequired
                    className="font-bold"
                    color='primary'
                    label="Subject"
                    placeholder="Your email subject"
                    variant="bordered"
                    name="subject"
                    id="subject"
                    onChange={(e) => setSubject(e.target.value)}
                />
                <Textarea
                    isRequired
                    className="font-bold"
                    color='primary'
                    label="Message"
                    placeholder="Your message"
                    variant="bordered"
                    name="message"
                    id="message"
                    onChange={(e) => setMessage(e.target.value)}
                />
                <Button
                    className="font-bold"
                    color='secondary'
                    variant="solid"
                    type="submit"
                >
                    Send
                </Button>
            </form>
        </div>

    )
}
