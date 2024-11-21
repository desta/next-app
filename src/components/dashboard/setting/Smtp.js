"use client"
import { Button, Input } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from 'react-hot-toast';
import { encrypt } from '@/utils/ChiperText';

let validationSchema = yup.object().shape({
    alamatemail: yup.string().required("Tidak boleh kosong"),
    password: yup.string().required(),
    dashboardemail: yup.string().required("Tidak boleh kosong"),
    host: yup.string().required("Tidak boleh kosong"),
    port: yup.number("Hanya boleh angka")
});

export default function Smtp({ params }) {
    const [alamatemail, setAlamatemail] = useState(params?.alamatemail)
    const [password, setPassword] = useState(params?.password)
    const [dashboardemail, setDashboardemail] = useState(params?.dashboardemail)
    const [host, setHost] = useState(params?.host)
    const [port, setPort] = useState(params?.port)
    const {
        setError,
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const handleSubmitForm = async () => {
        const data = await fetch("/api/smtp")
        const isi = await data.json()
        const hash = encrypt(password)
        if (isi.length === 0) {
            const res = await fetch("/api/smtp", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    alamatemail: alamatemail,
                    password: hash,
                    dashboardemail: dashboardemail,
                    host: host,
                    port: port
                })
            })
            toast.success('Berhasil Menambah SMTP')

        } else {
            const res = await fetch(`/api/smtp/${data.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    alamatemail: alamatemail,
                    password: password,
                    dashboardemail: dashboardemail,
                    host: host,
                    port: port
                })
            })
            toast.success('Berhasil Mengubah SMTP')
        }
    }

    const handleTestEmail = async () => {
        const res = await fetch(`/api/email/test`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                alamatemail: alamatemail,
                password: password,
                dashboardemail: dashboardemail,
                host: host,
                port: port
            })
        })
        if (res.status === 200) {
            toast.success('Setting SMTP sukses')
        } else {
            toast.error('Setting SMTP gagal')
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit(handleSubmitForm)} className='pb-3'>
                <div className='font-bold pb-3'>Email pengirim</div>
                <div className='flex flex-wrap gap-2'>
                    <Input
                        labelPlacement='outside'
                        color='primary'
                        label="Alamat email"
                        placeholder="Alamat email"
                        variant="bordered"
                        name="alamatemail"
                        isInvalid={!!errors.alamatemail}
                        errorMessage={errors.alamatemail?.message}
                        {...register("alamatemail")}
                        value={alamatemail}
                        // onChange={(e) => setAlamatemail(e.target.value)}
                        onValueChange={setAlamatemail}
                        className="font-bold border-primary max-w-xs"
                    />
                    <Input
                        labelPlacement='outside'
                        color='primary'
                        label="Password"
                        placeholder="Password email"
                        variant="bordered"
                        name="password"
                        type='password'
                        isInvalid={!!errors.password}
                        errorMessage={errors.password?.message}
                        {...register("password")}
                        // onChange={(e) => setPassword(e.target.value)}
                        onValueChange={setPassword}
                        className="font-bold border-primary max-w-xs"
                    />
                    <Input
                        labelPlacement='outside'
                        color='primary'
                        label="Dashboard email"
                        placeholder="Alamat dashboard email"
                        variant="bordered"
                        name="dashboardemail"
                        isInvalid={!!errors.dashboardemail}
                        errorMessage={errors.dashboardemail?.message}
                        {...register("dashboardemail")}
                        value={dashboardemail}
                        // onChange={(e) => setDashboardemail(e.target.value)}
                        onValueChange={setDashboardemail}
                        className="font-bold border-primary max-w-xs"
                    />
                </div>
                <div className='font-bold py-3'>Server email pengirim</div>
                <div className='flex flex-wrap gap-2 pb-3'>
                    <Input
                        labelPlacement='outside'
                        color='primary'
                        label="Host"
                        placeholder="Host server email"
                        variant="bordered"
                        name="host"
                        isInvalid={!!errors.host}
                        errorMessage={errors.host?.message}
                        {...register("host")}
                        value={host}
                        // onChange={(e) => setHost(e.target.value)}
                        onValueChange={setHost}
                        className="font-bold border-primary max-w-xs"
                    />
                    <Input
                        labelPlacement='outside'
                        color='primary'
                        label="Port"
                        placeholder="Port server email"
                        variant="bordered"
                        name="port"
                        isInvalid={!!errors.port}
                        errorMessage={errors.port?.message}
                        {...register("port")}
                        defaultValue="465"
                        onValueChange={setPort}
                        className="font-bold border-primary max-w-xs"
                    />
                </div>
                <div className="flex gap-2">
                    <Button type="submit" color="secondary" className="max-w-xs">
                        Simpan
                    </Button>
                    <Button color="secondary" variant='ghost' className="max-w-xs" onClick={handleTestEmail}>
                        Tes koneksi
                    </Button>
                </div>
            </form>
        </>
    )
}
