"use client"
import { Avatar, Button, Image, Input, Select, SelectItem } from '@nextui-org/react';
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from 'react-hot-toast';
import { BiEdit, BiEnvelope, BiLock, BiTrash, BiUser } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { fetchAccount } from '@/redux/slices/account';

let validationSchema = yup.object().shape({
  username: yup.string().required("Tidak boleh kosong"),
  name: yup.string().required("Tidak boleh kosong"),
  email: yup.string().email("Email salah").required("Tidak boleh kosong"),
  akses: yup.string().required("Tidak boleh kosong"),
  password: yup.string(),
  ulangiPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords harus sama"),
});

export default function GetAccount({ user }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const account = useSelector((state) => state.account.data)
  const [username, setUsername] = useState(user.username);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [akses, setAkses] = useState(user.akses);
  const [image, setImage] = useState(null);
  const [password, setPassword] = useState();
  const {
    setError,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const access = [
    { key: "Administrator", label: "Administrator" },
    { key: "Admin", label: "Admin" },
    { key: "User", label: "User" },
  ];

  // This function will be triggered when the file field change
  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleDelete = async () => {
    const formData = new FormData();
    formData.append("id", user.id);
    formData.append("image", image);
    const res = await fetch(`/api/user/delete`, {
      method: 'PUT',
      body: formData
    })
    dispatch(fetchAccount())
    setImage("");
    toast.success('Avatar berhasil dihapus')
  }

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", user.id);
    formData.append("username", username);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("akses", akses);
    if (image) {
      formData.append("image", image);
    }
    if (password) {
      formData.append("password", password);
    }
    const res = await fetch(`/api/user/update`, {
      method: 'PUT',
      body: formData
    })
    if (res.ok) {
      dispatch(fetchAccount())
      toast.success('User berhasil diubah')
      reset()
    } else {
      setError("errorMessage", { message: res.detail ?? "Terdapat username atau email yang sama", type: "error" });
      setError('username', { message: res.detail, type: "error" });
      setError("email", { message: res.detail, type: "error" });
    }
  }
  return (
    <>
      {/* <Image alt="Account" src={userImage} className='user-image shadow-sm rounded-lg bg-gray-400 p-1' /> */}
      <div className='flex'>
        <form onSubmit={handleSubmitForm}>
          <div className="wrapper p-2">
            {/* <img alt="avatar" src={user.image || picture} /> */}
            {image ? (
              <Avatar
                src={URL.createObjectURL(image)}
                alt="avatar"
                size="lg"
                color='primary'
                isBordered
                className="transition-transform text-white"
              />
            ) : <Avatar size="lg" color='primary' isBordered className="transition-transform text-white" name={account.name} src={account.image} />
            }
            {account.image !== "" && (
              <div className="file-delete bg-sidebar text-sidebar-foreground hover:cursor-pointer">
                <Button
                  isIconOnly
                  size="sm"
                  color="secondary"
                  aria-label="Edit"
                  className="rounded-full"
                  onClick={handleDelete}
                >
                  <BiTrash className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          <div className='py-3'>
            <Input labelPlacement='outside'
              color='primary' label="Avatar"
              placeholder="Avatar"
              variant="bordered" type="file" name="image" id="image" accept="image/*"
              className="max-w-xs font-bold"
              onChange={imageChange}
            />
          </div>

          <p className="text-tiny text-danger">
            {errors.errorMessage?.message}
          </p>
          <div className="flex flex-wrap gap-3 pb-3">
            <Input
              labelPlacement='outside'
              color='primary'
              className="max-w-xs font-bold"
              endContent={
                <BiUser className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              }
              label="Username"
              placeholder="Username"
              variant="bordered"
              name="username"
              id="username"
              {...register("username")}
              isInvalid={!!errors.username}
              errorMessage={errors.username?.message}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              labelPlacement='outside'
              color='primary'
              className="max-w-xs font-bold"
              endContent={
                <BiUser className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              }
              label="Nama"
              placeholder="Nama"
              variant="bordered"
              name="name"
              id="name"
              {...register("name")}
              isInvalid={!!errors.name}
              errorMessage={errors.name?.message}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              labelPlacement='outside'
              color='primary'
              className="max-w-xs font-bold"
              endContent={
                <BiEnvelope className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              }
              label="Email"
              placeholder="Email"
              variant="bordered"
              name="email"
              id="email"
              {...register("email")}
              isInvalid={!!errors.email}
              errorMessage={errors.email?.message}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {/* <Select
              labelPlacement='outside'
              color='primary'
              className="max-w-xs font-bold"
              items={access}
              label="Akses"
              placeholder="Akses"
              variant="bordered"
              id="akses"
              name="akses"
              // renderValue={akses}
              selectedKeys={[akses]}
              onSelectionChange={(e) => {
                // console.log(access[e.currentKey].label)
                setAkses(e.currentKey);
              }}
              {...register("akses")}
              isInvalid={!!errors.akses}
              errorMessage={errors.akses?.message}
            >
              {(access) => <SelectItem>{access.label}</SelectItem>}
            </Select> */}
            <Input
              labelPlacement='outside'
              color='primary'
              className="max-w-xs font-bold"
              endContent={
                <BiLock className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              }
              label="Password"
              placeholder="Password Anda"
              type="password"
              variant="bordered"
              name="password"
              id="password"
              {...register("password")}
              isInvalid={!!errors.password}
              errorMessage={errors.password?.message}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              labelPlacement='outside'
              color='primary'
              className="max-w-xs font-bold"
              endContent={
                <BiLock className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              }
              label="Ulangi password"
              placeholder="Ulangi password Anda"
              type="password"
              variant="bordered"
              name="ulangiPassword"
              id="ulangiPassword"
              {...register("ulangiPassword")}
              isInvalid={!!errors.ulangiPassword}
              errorMessage={errors.ulangiPassword?.message}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type='submit' color="primary" className="max-w-sm text-primary-button">
            Simpan
          </Button>
        </form>
      </div>
    </>
  )
}
