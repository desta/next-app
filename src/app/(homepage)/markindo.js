import './markindo.css'
import React from 'react'
import { prisma } from "@/libs/prisma";
import parse from 'html-react-parser';
import { auth } from "@/auth";
import News from '@/components/client/markindo/News';
import Aplikasi from '@/components/client/markindo/Aplikasi';
import ProdukRekomendasi from '@/components/client/markindo/ProdukRekomendasi';
import LayananKami from '@/components/client/markindo/LayananKami';
import KontakKami from '@/components/client/markindo/KontakKami';
import Footer from '@/components/client/markindo/Footer';
import MarkindoNav from '@/components/client/markindo/MarkindoNav';
import HomeCounter from '@/components/dashboard/counter/HomeCounter';
import Slider from '@/components/client/markindo/Slider';

export default function markindo() {

    return (
        <div className='text-sm md:text-lg'>
            <HomeCounter />
            <MarkindoNav />
            <div className='pt-[68px] max-w-[1440px] mx-auto'>
                <Slider />
            </div>
            <main>
                <div className='py-5'>
                    <p className='pb-5 text-2xl font-bold'>Butuh Informasi Lebih tentang Markindo?</p>
                    <p className='pb-5'>Ketahui lebih jauh mengenai perusahaan kami.</p>
                    <div className='flex gap-4 flex-col sm:flex-row'>
                        <a href="#" className='bg-blue-800 text-white px-4 py-2 rounded-md text-center'>Butuh Informasi Lainnya</a>
                        <a href="#" className='bg-blue-800 text-white px-4 py-2 rounded-md text-center'>Sudah Mengetahui Markindo</a>
                    </div>
                </div>
                <News />
                <Aplikasi />
                <ProdukRekomendasi />
                <LayananKami />
            </main>
            <KontakKami />
            <Footer />
        </div>
    )
}
