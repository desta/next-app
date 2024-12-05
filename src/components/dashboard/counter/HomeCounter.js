'use client'
import { useEffect } from "react";
import moment from 'moment';

export default function HomeCounter() {
    const month = moment().format("MMM").toLowerCase();
    const year = moment().format("YYYY");

    const setInterval = async () => {
        const data = await fetch(`/api/counter`)
        const res = await data.json()

        const a = res.filter(item => item.bulan[0].bulan === month)
        const b = a.filter(item => item.tahun[0].tahun === parseInt(year))
        
        console.log('a',a)
        console.log('b',b)
        const getVisit = Number(localStorage.getItem("visitCounter"));

        if (b.length === 0) {
            const count = await fetch(`/api/counter`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    counter: 1,
                    bulan: month,
                    tahun: year
                })
            })
            localStorage.setItem("visitCounter", 1);
        }
        else if (b.length > 0 && getVisit === 0) {
            const count = await fetch(`/api/counter`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: b[0].id,
                    counter: b[0].counter + 1,
                })
            })
            localStorage.setItem("visitCounter", 1);
        }
    }

    useEffect(() => {
        setInterval()
    }, []);
}