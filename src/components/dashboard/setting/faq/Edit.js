"use client"
import { Button, useDisclosure } from '@nextui-org/react'
import React from 'react'
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import FormFaq from './FormFaq';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { BiEdit } from 'react-icons/bi';
import { fetchIzin } from '@/redux/slices/izin';

let validationSchema = yup.object().shape({
  pertanyaan: yup.string().required("Tidak boleh kosong"),
  jawaban: yup.string().required("Tidak boleh kosong"),
});
export default function Edit({ params }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [edituser, setEdituser] = React.useState(params.edituser);
  const dispatch = useDispatch()
  const { setError, register, reset, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(validationSchema) });

  const handleSubmitForm = async () => {
    // Add to your backend here
    const res = await fetch(`/api/izin/userizin`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        edituser
      }),
    })
    if (res.ok) {
      toast.success('Berhasil edit FAQ')
      onOpenChange(close)
      dispatch(fetchIzin())
    }
  }
  const title = 'Edit FAQ'
  return (
    <>
      <Button
        isIconOnly
        size="sm"
        variant="light"
        color="default"
        aria-label="Edit"
        className="rounded-full"
        onPress={onOpen}
      >
        Izin
      </Button>
        Edit user
      <Switch isSelected={edituser} onValueChange={setEdituser}>
      </Switch>  
    </>
  )
}
