"use client"
import { fetchFaq } from '@/redux/slices/faq';
import { Button, useDisclosure } from '@nextui-org/react'
import React from 'react'
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import FormFaq from './FormFaq';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

let validationSchema = yup.object().shape({
  pertanyaan: yup.string().required("Tidak boleh kosong"),
  jawaban: yup.string().required("Tidak boleh kosong"),
});
export default function Tambah() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [pertanyaan, setPertanyaan] = React.useState('');
  const [jawaban, setJawaban] = React.useState('');
  const dispatch = useDispatch()
  const {setError, register, reset, handleSubmit,formState: { errors }} = useForm({resolver: yupResolver(validationSchema)});

  const handleSubmitForm = async () => {
    // Add to your backend here
    const res = await fetch('/api/faq', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pertanyaan,
        jawaban,
      }),
    })
    if(res.ok) {
      toast.success('Berhasil menambahkan FAQ')
      reset()
      dispatch(fetchFaq())
      onOpenChange(close)
    }
  }
  const title = 'Tambah FAQ'
  return (
    <>
      <Button onPress={onOpen} color='primary' className="text-primary-button">Tambah</Button>
      <FormFaq
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        handleSubmitForm={handleSubmitForm}
        pertanyaan={pertanyaan}
        setPertanyaan={setPertanyaan}
        jawaban={jawaban}
        setJawaban={setJawaban}
        handleSubmit={handleSubmit}
        errors={errors}
        register={register}
        title={title}
      />
    </>
  )
}
