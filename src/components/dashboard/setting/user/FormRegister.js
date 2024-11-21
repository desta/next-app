"use client";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import React, { useState } from "react";
import { BiLock, BiUser } from "react-icons/bi";
import { MdAlternateEmail } from "react-icons/md";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, tambah } from "@/redux/slices/user";
import { usePathname } from "next/navigation";
import { AksesList } from "@/utils/AksesList";

let validationSchema = yup.object({
  username: yup.string().required("Tidak boleh kosong"),
  name: yup.string().required("Tidak boleh kosong"),
  email: yup.string().email("Email salah").required("Tidak boleh kosong"),
  // akses: yup.string().required("Tidak boleh kosong"),
  password: yup.string().required("Tidak boleh kosong"),
  ulangiPassword: yup
    .string()
    .required("Tidak boleh kosong")
    .oneOf([yup.ref("password"), null], "Passwords harus sama"),
});

export default function FormRegister({ onClose }) {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [akses, setAkses] = useState();
  const [password, setPassword] = useState("");
  const [ulangiPassword, setUlangiPassword] = useState("");
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
    const res = await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify({
        username,
        name,
        email,
        akses,
        password,
        image: ""
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(res);
    if (res.ok) {
      dispatch(fetchUser());
      toast.success("Registrasi berhasil");
      reset();
    } else {
      toast.error("Registrasi gagal");
      reset();
    }
  };
  const paths = usePathname();
  // const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <p className="text-2xl font-bold">Register <span className="text-primary">akun</span></p>
        <p className="text-xs pb-5">Isi form dibawah ini untuk membuat akun.</p>
        <div className="flex flex-col gap-2">
          <Input
            endContent={
              <BiUser className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
            labelPlacement='outside'
            className="font-bold"
            color='primary'
            label="Username"
            placeholder="Username"
            variant="bordered"
            name="username"
            id="username"
            {...register("username")}
            isInvalid={!!errors.username}
            errorMessage={errors.username?.message}
            onValueChange={setUsername}
          />
          <Input
            endContent={
              <BiUser className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
            labelPlacement='outside'
            className="font-bold"
            color='primary'
            label="Nama"
            placeholder="Nama"
            variant="bordered"
            name="name"
            id="name"
            {...register("name")}
            isInvalid={!!errors.name}
            errorMessage={errors.name?.message}
            onValueChange={setName}
          />
          <Input
            endContent={
              <MdAlternateEmail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
            labelPlacement='outside'
            className="font-bold"
            color='primary'
            label="Email"
            placeholder="Email"
            variant="bordered"
            name="email"
            id="email"
            {...register("email")}
            isInvalid={!!errors.email}
            errorMessage={errors.email?.message}
            onValueChange={setEmail}
          />
          <Select
            items={AksesList}
            labelPlacement='outside'
            className="font-bold"
            color='primary'
            label="Akses"
            placeholder="Akses"
            variant="bordered"
            name="akses"
            // {...register("akses")}
            // isInvalid={!!errors.akses}
            // errorMessage={errors.akses?.message}
            isRequired
            selectedKeys={[akses]}
            onChange={(e) => setAkses(e.target.value)}
          >
           {Object.keys(AksesList).map((item) => (
                    <SelectItem key={AksesList[item].akses}>
                      {AksesList[item].akses}
                    </SelectItem>
                  ))}
          </Select>
          <Input
            endContent={
              <BiLock className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
            labelPlacement='outside'
            className="font-bold"
            color='primary'
            label="Password"
            placeholder="Password Anda"
            type="password"
            variant="bordered"
            name="password"
            id="password"
            {...register("password")}
            isInvalid={!!errors.password}
            errorMessage={errors.password?.message}
            onValueChange={setPassword}
          />
          <Input
            endContent={
              <BiLock className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
            labelPlacement='outside'
            className="font-bold"
            color='primary'
            label="Ulangi password"
            placeholder="Ulangi password Anda"
            type="password"
            variant="bordered"
            name="ulangiPassword"
            id="ulangiPassword"
            {...register("ulangiPassword")}
            isInvalid={!!errors.ulangiPassword}
            errorMessage={errors.ulangiPassword?.message}
            onValueChange={setUlangiPassword}
          />
        </div>
        <div className="flex items-center justify-end gap-2 pt-5">
          {paths !== "/register" && (
            <Button color="danger" variant="light" onPress={onClose}>
              Tutup
            </Button>
          )}
          <Button type="submit" color="secondary" className="max-w-sm">
            Register
          </Button>
        </div>
      </form>
    </>
  );
}
