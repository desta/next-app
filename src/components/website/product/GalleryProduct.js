'use client'
import React from 'react'
import ImageGallery from 'react-image-gallery';

export default function GalleryProduct({ images }) {
    return (
        <div className="image-gallery-wrapper not-prose">
            <ImageGallery items={images} autoPlay={false} />
        </div>
    )
}
