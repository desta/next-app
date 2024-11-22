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
        <>
            <section className="py-10 bg-white text-gray-600">
                <div className="max-w-7xl mx-auto px-2 py-16">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
                        <p className="text-gray-600 mb-8">Have any questions or need assistance? Get in touch with us.</p>
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="w-full md:w-1/2">
                                <p className='text-2xl font-bold pb-5 text-left'>LET'S CONNECT WITH US!</p>
                                Bellezza BSA 1st Floor Unit 106, Jl. Letjen Soepeno, Kebayoran Lama Jakarta Selatan 12210
                                021-5890-5002
                                0821-1700-2040
                                sales@axiom.co.id
                            </div>
                            <div className="w-full md:w-1/2">
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
                        </div>
                    </div>
                </div>
            </section>
            <footer className="bg-gray-100 p-5 text-center">
                <div className="max-w-7xl mx-auto">
                    Copyright © 2024. All rights reserved. Designed by Axiom
                </div>
            </footer>
        </>
    )
}
