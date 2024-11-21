"use client"
import { Button, Input, Textarea, useDisclosure } from '@nextui-org/react'
import React from 'react'
import { toast } from 'react-hot-toast';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

let validationSchema = yup.object().shape({
    nama: yup.string().required("Tidak boleh kosong"),
    email: yup.string().email().required("Tidak boleh kosong"),
    judul: yup.string().required("Tidak boleh kosong"),
    pesan: yup.string().required("Tidak boleh kosong"),
});
export default function Support() {
    const [nama, setNama] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [judul, setJudul] = React.useState('')
    const [pesan, setPesan] = React.useState('')

    const { setError, register, reset, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(validationSchema) });

    const handleSubmitForm = async () => {
        // Add to your backend here
        const res = await fetch('/api/email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nama,
                email,
                judul,
                pesan,
            }),
        })
        if (res.ok) {
            toast.success('Berhasil mengirim pesan')
            reset()
        } else {
            toast.error('Gagal mengirim pesan')
        }

    }
    return (
        <form onSubmit={handleSubmit(handleSubmitForm)}>
            <div className='flex flex-wrap sm:flex-nowrap  gap-3 pb-3'>
                <Input
                    labelPlacement='outside'
                    color='primary'
                    label="Nama"
                    placeholder="Nama"
                    variant="bordered"
                    name="nama"
                    isInvalid={!!errors.nama}
                    errorMessage={errors.nama?.message}
                    {...register("nama")}
                    value={nama}
                    onValueChange={setNama}
                    className="font-bold border-primary max-w-[282px]"
                />
                <Input
                    labelPlacement='outside'
                    color='primary'
                    label="Email"
                    placeholder="Email"
                    variant="bordered"
                    name="email"
                    isInvalid={!!errors.email}
                    errorMessage={errors.email?.message}
                    {...register("email")}
                    value={email}
                    onValueChange={setEmail}
                    className="font-bold border-primary max-w-[282px]"
                />
                </div>
                <div className="flex flex-col gap-2 pb-3">
                <Input
                    labelPlacement='outside'
                    color='primary'
                    label="Judul"
                    placeholder="Judul"
                    variant="bordered"
                    name="judul"
                    isInvalid={!!errors.judul}
                    errorMessage={errors.judul?.message}
                    {...register("judul")}
                    value={judul}
                    onValueChange={setJudul}
                    className="font-bold border-primary max-w-xl"
                />
                <Textarea
                    labelPlacement='outside'
                    color='primary'
                    label="Isi pesan"
                    placeholder="Isi pesan"
                    variant="bordered"
                    name="pesan"
                    isInvalid={!!errors.pesan}
                    errorMessage={errors.pesan?.message}
                    {...register("pesan")}
                    value={pesan}
                    onValueChange={setPesan}
                    className="font-bold border-primary max-w-xl"
                />
                </div>
            <Button type="submit" color="secondary">
                Kirim
            </Button>
        </form>
    )
}
