import React from 'react'

export default function KontakKami() {
    return (
        <div className='py-10 bg-black opacity-70 text-sm md:text-lg'>
            <main className='bg-transparent text-white'>
                <h1 className='text-3xl font-bold py-5'>Kontak Kami</h1>
                <p className='w-full md:w-1/2 py-5'>Punya pertanyaan tentang produk atau layanan kami? Hubungi kami kapan saja dan kami akan dengan senang hati membantu Anda.</p>
                <div className="py-5">
                    <a href="/contact" className="px-10 py-2 rounded-medium text-black bg-white font-bold ">Kontak Sekarang</a>
                </div>
            </main>
        </div>
    )
}
