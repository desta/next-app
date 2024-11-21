'use client'
import React from 'react'
import AOS from 'aos';
import { useEffect } from "react";
const images = [
    {
        original: 'https://picsum.photos/id/1024/1000/600/',
        thumbnail: 'https://picsum.photos/id/1024/250/150/',
    },
    {
        original: 'https://picsum.photos/id/1025/1000/600/',
        thumbnail: 'https://picsum.photos/id/1025/250/150/',
    },
    {
        original: 'https://picsum.photos/id/1026/1000/600/',
        thumbnail: 'https://picsum.photos/id/1026/250/150/',
    },
    {
        original: 'https://picsum.photos/id/1027/1000/600/',
        thumbnail: 'https://picsum.photos/id/1027/250/150/',
    },
];

export default function LayananKami() {
    useEffect(() => {
        AOS.init();
      }, [])
    return (
        <div className='py-10 text-center font-bold text-2xl' data-aos='fade-up'>
            Layanan Kami
            <div className='flex flex-wrap justify-center gap-5 mt-5 text-sm md:text-lg'>
                {images.map((item, index) =>
                    <div className='max-w-xs relative hover:scale-105 transition-all duration-300 cursor-pointer' key={index}>
                        <img src={item.original} className='rounded-lg' />
                        <div className='absolute bottom-5 left-5 text-white'>Layanan</div>
                    </div>
                )}
            </div>
        </div>
    )
}
