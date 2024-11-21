'use client'
import React from 'react'
import ImageGallery from 'react-image-gallery';

export default function GalleryProduct({ images }) {
    return (
        <div className='max-w-2xl text-center mx-auto my-5'>
            <div className="image-gallery-wrapper">
                <ImageGallery items={images} autoPlay={false} />
            </div>
        </div>
    )
}
