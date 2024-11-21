'use client'
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import 'chart.js/auto';
const Bar = dynamic(() => import('react-chartjs-2').then((mod) => mod.Bar), {
    ssr: false,
});
const Line = dynamic(() => import('react-chartjs-2').then((mod) => mod.Line), {
    ssr: false,
});

export default function HomeCounterGraph() {

    const [data, setData] = useState([])

    const setInterval = async () => {
        const api = await fetch(`/api/counter`)
        const res = await api.json()
        setData(res)
    }
    useEffect(() => {
        setInterval()
    }, [])

    const data2 = data.slice(data.length - 12).map(item => item.bulan)

    const counter = {
        labels: data2.map(item => {
            let bulan = item[0].bulan[0].toUpperCase() + item[0].bulan.slice(1, item[0].bulan.length)
            return bulan
        }),
        datasets: [
            {
                label: 'Visitor counter',
                data: data.slice(0, 12).map(item => item.counter),
                fill: false,
                borderColor: '#3f51b5',
                tension: 1,
            },
        ],
    };

    return (
        <>
            <div className='relative'>
                <div className='min-w-96 overflow-x-auto pb-3'>
                    <Line data={counter} />
                </div>
            </div>
        </>
    )
}
