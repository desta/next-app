'use client'
import { fetchApp } from '@/redux/slices/app';
import React, { useEffect } from 'react'
import { SiFacebook, SiInstagram, SiYoutube } from 'react-icons/si'
import { useDispatch, useSelector } from 'react-redux';

export default function Footer() {
    const dispatch = useDispatch();
    const app = useSelector((state) => state.app.data);

    useEffect(() => {
        dispatch(fetchApp())
    }, [])

    return (
        <div className='pt-10 bg-black text-sm md:text-lg'>
            <main className='bg-transparent text-white'>
                <h1 className='text-3xl font-bold text-center'>{app.logo !== '' ? app.logo : app.namaapp}</h1>
                <p className='border-b-2 border-gray-500 w-full pt-10'></p>
                <div className='my-5 mt-5 flex flex-col md:flex-row xl:flex-row 2xl:flex-row gap-3'>
                    <div className='md:w-1/3 xl:w-1/5 pb-5'>
                        <p className='font-bold'>Information Contact</p>
                        <p>Rukan Graha Arteri Mas 2,</p>
                        <p>KebunJeruk, Jakarta Barat, Indonesia</p>
                        <p>Telepon: (021) 12345678</p>
                        <p>Email : info@markindo.co.id</p>
                        <p className='flex gap-2 pt-5'><SiInstagram className='h-8 w-8' /> <SiYoutube className='h-8 w-8' /> <SiFacebook className='h-8 w-8' /></p>
                    </div>
                    <div className='flex flex-col md:w-2/3 lg:flex-row xl:flex-row xl:w-4/5 2xl:flex-row gap-3'>
                        <div className='w-full xl:w-1/2 pb-5'>
                            <p className='font-bold'>Product</p>
                            <div className='flex flex-col sm:flex-row md:flex-row gap-3'>
                                <div className='w-full'>
                                    <p className='font-bold w-full'>Packaging Machine</p>
                                    <p>Search By Product</p>
                                    <p>Search By Model</p>
                                    <p>Search By Industries</p>
                                    <p>Search By Keyword</p>
                                </div>
                                <div className='w-full'>
                                    <p className='font-bold'>Coding Marking</p>
                                    <p>Search By Product</p>
                                    <p>Search By Model</p>
                                    <p>Search By Industries</p>
                                    <p>Search By Keyword</p>
                                </div>
                            </div>
                        </div>
                        <div className='w-full xl:w-1/2 '>
                            <div className='flex flex-col sm:flex-row xl:w-full gap-3'>
                                <div className='w-full'>
                                    <p className='font-bold'>Application</p>
                                    <p>Print on Bottles</p>
                                    <p>Print on Alumunium</p>
                                    <p>Print on Box</p>
                                    <p>Print on Packaging</p>
                                    <p>Print on Paperboard</p>
                                    <p>Print on Metal</p>
                                </div>
                                <div className='w-full'>
                                    <p className='font-bold'>Corporate Info</p>
                                    <p>About Us</p>
                                    <p>Who We Are</p>
                                    <p>How We Are</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <p className='text-center text-white bg-black p-2 border-t-2 border-gray-500 text-sm'>Copyright &copy; 2024, PT Markindo Rekateknik. All Rights Reserved.</p>
            </main>
        </div>
    )
}
