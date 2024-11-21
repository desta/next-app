"use client";
import React, { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure, Input, Tooltip, Select, SelectItem, user, Tabs, Tab, Card, CardBody, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Switch } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { toast } from 'react-hot-toast';
import { BiEdit, BiLock, BiUser } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { edit, fetchUser } from "@/redux/slices/user";
import { fetchAccount } from "@/redux/slices/account";
import { MdAlternateEmail } from "react-icons/md";
import { AksesList } from "@/utils/AksesList";


let validationSchema = yup.object().shape({
  username: yup.string().required("Tidak boleh kosong"),
  name: yup.string().required("Tidak boleh kosong"),
  email: yup.string().email("Email salah").required("Tidak boleh kosong"),
  // akses: yup.string().required("Tidak boleh kosong"),
  image: yup.mixed()
    .test("profileType", "Profile must be an image.", (file) => {
      if (file) {
        file?.type === "image/jpeg" ||
          file?.type === "image/png" ||
          file?.type === "image/jpg" ||
          file?.type === "image/svg" ||
          file?.type === "image/webp";
      }
      return true;
    }),
  // .test("profileSize", "Profile must be less than 2 MB", (file) => {
  //   if (file){
  //     return bytesToMb(file?.size) >= 1;
  //   }
  //   return true;
  // }),
  password: yup.string(),
  ulangiPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords harus sama"),
});

export default function Edit({ params }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [username, setUsername] = useState(params.username);
  const [name, setName] = useState(params.name);
  const [email, setEmail] = useState(params.email);
  const [akses, setAkses] = useState(params.akses);
  // const [image, setImage] = useState(null);
  const [password, setPassword] = useState(null);
  const edit = useSelector((state) => state.edit);
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
    // const formData = new FormData();
    // formData.append("id", params.id);
    // formData.append("username", username);
    // formData.append("name", name);
    // formData.append("email", email);
    // formData.append("akses", akses);
    // if (password) {
    //   formData.append("password", password);
    // }
    // const res = await fetch(`/api/user/update`, {
    const res = await fetch(`/api/user/${params.id}`, {
      method: 'PUT',
      // body: formData
      body: JSON.stringify({
        username,
        name,
        email,
        akses,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (res.ok) {
      dispatch(fetchUser())
      toast.success('User berhasil diubah')
      onOpenChange(close)
    } else {
      setError("errorMessage", { message: res.detail ?? "Terdapat username atau email yang sama", type: "error" });
      setError('username', { message: res.detail, type: "error" });
      setError("email", { message: res.detail, type: "error" });
    }

  }

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Tooltip content="Ubah">
        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
          <Button
            isIconOnly
            size="sm"
            variant="light"
            color="default"
            aria-label="Edit"
            className="rounded-full"
            onPress={onOpen}
          >
            <BiEdit className="h-4 w-4" />
          </Button>
        </span>
      </Tooltip>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit akun
              </ModalHeader>
              <ModalBody>
                <form onSubmit={handleSubmit(handleSubmitForm)}>
                  <p className="text-tiny text-danger pb-2">
                    {errors.errorMessage?.message}
                  </p>
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
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
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
                      value={name}
                      onChange={(e) => setName(e.target.value)}
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Select
                      items={AksesList}
                      labelPlacement='outside'
                      className="font-bold"
                      color='primary'
                      label="Akses"
                      placeholder="Akses"
                      variant="bordered"
                      id="akses"
                      name="akses"
                      selectedKeys={[akses]}
                      isRequired
                      onSelectionChange={(e) => {
                        setAkses(e.currentKey);
                      }}
                    // {...register("akses")}
                    // isInvalid={!!errors.akses}
                    // errorMessage={errors.akses?.message}
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
                      placeholder="Password"
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
                      endContent={
                        <BiLock className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                      }
                      labelPlacement='outside'
                      className="font-bold"
                      color='primary'
                      placeholder="Ulangi password"
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
                  <div className="flex items-center justify-end gap-2 pt-5">
                    <Button
                      color="danger"
                      variant="light"
                      onClick={() => {
                        onClose();
                      }}
                    >
                      Tutup
                    </Button>
                    <Button type="submit" color="secondary" className="max-w-sm">
                      Simpan
                    </Button>
                  </div>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}