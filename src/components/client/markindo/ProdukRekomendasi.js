'use client'
import 'react-image-gallery/styles/css/image-gallery.css';
import React from 'react'
import ImageGallery from 'react-image-gallery';
// import AOS from 'aos';
// import { useEffect } from "react";
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
    {
        original: 'https://picsum.photos/id/1029/1000/600/',
        thumbnail: 'https://picsum.photos/id/1029/250/150/',
    },
];

export default function ProdukRekomendasi() {
    // useEffect(() => {
    //     AOS.init();
    //   }, [])
    return (
        <div data-aos='fade-up'>
            <div className='py-5'>
                <p className='text-2xl font-bold my-5 text-center'>Produk Rekomendasi</p>
                <p className="text-center text-lg">Produk unggulan dari Markindo Rekateknik untuk Pelanggan dan Konsumen</p>
            </div>
            <div className="text-xl font-bold my-5 text-center">Produk Rekomendasi Coding Marking</div>
            <div className='max-w-2xl text-center mx-auto my-5'>
                <div className="image-gallery-wrapper">
                    <ImageGallery items={images} autoPlay={true} />
                </div>
            </div>
            <div className="text-xl font-bold my-5 text-center">Produk Rekomendasi Packaging</div>
            <div className='max-w-2xl text-center mx-auto my-5'>
                <div className="image-gallery-wrapper">
                    <ImageGallery items={images} autoPlay={true} />
                </div>
            </div>
        </div>

    );
}