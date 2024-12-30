'use client'
import { fetchAccount } from '@/redux/slices/account'
import moment from 'moment/moment';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { today, getLocalTimeZone } from "@internationalized/date";
import dynamic from 'next/dynamic';
import { Spinner } from '@nextui-org/react';
import Clock from "react-live-clock"

// const Clock = dynamic(() => import("react-live-clock"), {
//     ssr: false, loading: () => <div className="flex gap-2 items-center"><Spinner size="sm" /><p>Loading...</p></div>,
//   });

function getGreetingTime(m) {
    let g = null; //return g

    if (!m || !m.isValid()) { return; } //if we can't find a valid or filled moment, we return.

    let pagi = 4
    let siang = 10
    let sore = 15
    let malam = 20
    let currentHour = parseFloat(m.format("HH"));

    if (currentHour >= pagi && currentHour < siang) {
        g = "pagi";
    } else if (currentHour >= siang && currentHour < sore) {
        g = "siang";
    } else if (currentHour >= sore && currentHour < malam) {
        g = "sore";
    } else {
        g = "malam";
    }

    return g;
}

export default function Greeting() {
    const dispatch = useDispatch()
    const account = useSelector((state) => state.account.data)

    useEffect(() => {
        dispatch(fetchAccount())
    }, [])

    let defaultDate = today(getLocalTimeZone());
    return (
        <div className='pb-5 flex justify-between z-10 items-center'>
            <div className='w-full'>
                <p className='text-lg lg:text-2xl font-bold'>Selamat {getGreetingTime(moment())},</p>
                <p className='text-gray-500'>Anda login sebagai <span className='font-bold text-primary'>{account.name}</span></p>
            </div>
            <div className='w-[400px] hidden md:flex gap-2 items-center z-10 text-sm  overflow-x-hidden lg:text-xl justify-end'>
                <div className='font-bold text-primary whitespace-nowrap'><Clock format={'D MMMM YYYY, kk:mm:ss'} ticking={true} locale='id-ID' /></div>
            </div>
        </div>
    )
}

// 'use client'
// import { fetchAccount } from '@/redux/slices/account'
// import moment from 'moment/moment';
// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import Clock from 'react-live-clock';
// import { Calendar, Accordion, AccordionItem } from "@nextui-org/react";
// import { today, getLocalTimeZone } from "@internationalized/date";
// import { useLocale } from "@react-aria/i18n";

// function getGreetingTime(m) {
//     let g = null; //return g

//     if (!m || !m.isValid()) { return; } //if we can't find a valid or filled moment, we return.

//     let pagi = 4
//     let siang = 10
//     let sore = 15
//     let malam = 20
//     let currentHour = parseFloat(m.format("HH"));

//     if (currentHour >= pagi && currentHour < siang) {
//         g = "pagi";
//     } else if (currentHour >= siang && currentHour < sore) {
//         g = "siang";
//     } else if (currentHour >= sore && currentHour < malam) {
//         g = "sore";
//     } else {
//         g = "malam";
//     }

//     return g;
// }

// export default function Greeting() {
//     const dispatch = useDispatch()
//     const [dateState, setDateState] = useState(new Date());
//     const account = useSelector((state) => state.account.data)

//     useEffect(() => {
//         dispatch(fetchAccount())
//     }, [])

//     let defaultDate = today(getLocalTimeZone());
//     let [value, setValue] = React.useState(defaultDate);
//     let { locale } = useLocale();

//     return (
//         <div className='pb-5 flex justify-between z-10'>
//             <div>
//                 <p className='text-2xl font-bold pb-1'>Selamat {getGreetingTime(moment())},</p>
//                 <p className='text-gray-500'>Anda login sebagai <span className='font-bold text-primary'>{account.name}</span>.</p>
//             </div>
//             <div className='relative hidden md:block z-10'>
//                 <div className='w-[300px] absolute right-0'>
//                     <Accordion variant="shadow" >
//                         <AccordionItem key="1" aria-label="Accordion 1" title={<span className='font-bold text-primary'><Clock format={'D MMMM YYYY, kk:mm:ss'} ticking={true} locale='id-ID' /></span>}>
//                             <div className='text-center'>
//                                 <Calendar
//                                     aria-label="Date (Controlled)"
//                                     value={value}
//                                     // onChange={setValue}
//                                     // onFocusChange={setValue}
//                                     locale={locale}
//                                     color='secondary'
//                                 />
//                             </div>
//                         </AccordionItem>
//                     </Accordion>
//                 </div>
//             </div>
//         </div>
//     )
// }
