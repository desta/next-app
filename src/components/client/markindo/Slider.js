'use client'
import { Navigation, Pagination, EffectFade, A11y, Autoplay } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/bundle';
import './Slider.css'

const images = [
    {
        image: '/asset/slide1.png',
        alt: 'Slide 1',
        content: 'ALL Pack Indonesia'
    },
    {
        image: '/asset/slide2.png',
        alt: 'Slide 2'
    },
    {
        image: '/asset/slide3.png',
        alt: 'Slide 3'
    },
];

export default function Slider() {
    return (
        <Swiper
            // install Swiper modules
            effect={'fade'}
            spaceBetween={0}
            centeredSlides={true}
            autoplay={{
                delay: 3500,
                disableOnInteraction: false,
            }}
            loop={true}
            pagination={{
                clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation, EffectFade]}
        >
            {images.map((item, index) => {
                return <SwiperSlide key={index}>
                    <div className='relative'>
                        <img src={item.image} alt={item.alt} />
                        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50'>{item.content}</div>
                    </div>
                </SwiperSlide>
            })}
        </Swiper>
    );
};