"use client"
import { Button, Image, Input, Select, SelectItem, Switch, cn } from '@nextui-org/react';
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from 'react-hot-toast';
import { BiNote, BiTrash } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { MdDashboard } from 'react-icons/md';
import { fetchApp } from '@/redux/slices/app';
import { pagesList } from '@/utils/pages';

let validationSchema = yup.object().shape({
  namaapp: yup.string(),
});

export default function App({ params }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const app = useSelector((state) => state.app.data);
  const [namaapp, setnamaapp] = useState(params.namaapp);
  const [homepage, setHomepage] = useState(params.homepage);
  const [deskripsi, setDeskripsi] = useState(params.deskripsi);
  const [logo, setLogo] = useState(null);
  const [favicon, setFavicon] = useState(null);
  const [googleLogin, setGoogleLogin] = useState(params.googleLogin);

  const refresh = () => {
    window.location.reload();
  }

  const {
    setError,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  // This function will be triggered when the file field change
  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setLogo(e.target.files[0]);
    }
  };

  const faviconChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFavicon(e.target.files[0]);
    }
  };

  const handleDelete = async () => {
    const formData = new FormData();
    formData.append("id", params.id);
    formData.append("logo", logo);
    const res = await fetch(`/api/app/delete`, {
      method: 'PUT',
      body: formData,
    })
    setLogo("");
    dispatch(fetchApp())
    toast.success('Berhasil hapus logo')
  }

  const deleteFavicon = async () => {
    const formData = new FormData();
    formData.append("id", params.id);
    formData.append("favicon", favicon);
    const res = await fetch(`/api/app/delete/favicon`, {
      method: 'PUT',
      body: formData,
    })
    setFavicon("");
    dispatch(fetchApp())
    toast.success('Berhasil hapus favicon')
  }

  const handleSubmitForm = async () => {
    const formData = new FormData();
    formData.append("id", params.id);
    formData.append("namaapp", namaapp);
    formData.append("deskripsi", deskripsi);
    formData.append("googleLogin", googleLogin);
    formData.append("homepage", homepage);
    if (logo) {
      formData.append("logo", logo);
    }
    if (favicon) {
      formData.append("favicon", favicon);
    }
    const res = await fetch(`/api/app/update`, {
      method: 'PUT',
      body: formData,
    })
    if (res.ok) {
      // refresh()
      dispatch(fetchApp(params.id))
      toast.success('Berhasil diubah')
      // reset()
    } else {
      // setError("errorMessage", { message: res.detail ?? "Terdapat username atau email yang sama", type: "error" });
      // setError('username', {message: res.detail, type: "error"});
      // setError("email", {message: res.detail, type: "error" });
      toast.error('Gagal diubah')
    }
  }

  return (
    <>
      {/* <Image alt="Account" src={userImage} className='user-image shadow-sm rounded-lg bg-gray-400 p-1' /> */}
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <p className='text-2xl font-bold pb-2'>App</p>
        <div className="flex flex-col md:flex-row gap-3 pb-3 pt-3">
          <div>
            <div className="wrapper border-2 border-default-200 rounded-medium p-2">
              {logo ? (
                <Image height={0} width={0}
                  src={URL.createObjectURL(logo)}
                  alt="logo"
                  className='max-h-[100px]'
                />
              ) :
                app.logo !== "" && <Image height={0} width={0} alt="logo" src={app.logo} className='max-h-[100px]' />
              }
              {app.logo !== "" && (
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
              )
              }
            </div>
            <div className='pt-3'>
              <Input labelPlacement='outside'
                color='primary' label="Logo app"
                placeholder="Upload logo app"
                variant="bordered" type="file" name="logo" id="logo" accept="image/*"
                className="w-[300px] font-bold"
                onChange={imageChange}
              />
            </div>
          </div>

          {/* --------------- */}
          <div>
            <div className="wrapper border-2 border-default-200 rounded-medium p-2">
              {favicon ? (
                <Image height={0} width={0}
                  src={URL.createObjectURL(favicon)}
                  alt="favicon"
                  className='max-h-[100px]'
                />
              ) :
                app.favicon !== "" && <Image height={0} width={0} alt="favicon" src={app.favicon} className='max-h-[100px]' />
              }
              {app.favicon !== "" && (
                <>
                  <div className="file-delete bg-sidebar text-sidebar-foreground hover:cursor-pointer">
                    <Button
                      isIconOnly
                      size="sm"
                      color="secondary"
                      aria-label="Edit"
                      className="rounded-full"
                      onClick={deleteFavicon}
                    >
                      <BiTrash className="h-4 w-4" />
                    </Button>
                  </div>
                </>
              )
              }
            </div>
            <div className='pt-3'>
              <Input labelPlacement='outside'
                color='primary' label="Favicon"
                placeholder="Upload favicon"
                variant="bordered" type="file" name="favicon" id="favicon" accept="image/*"
                className="w-[300px] font-bold"
                onChange={faviconChange}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 pb-3 pt-3">
          <Input
            labelPlacement='outside'
            color='primary'
            endContent={
              <MdDashboard className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
            label="Nama app"
            placeholder="Nama app"
            variant="bordered"
            name="namaapp"
            id="namaapp"
            {...register("namaapp")}
            isInvalid={!!errors.namaapp}
            errorMessage={errors.namaapp?.message}
            value={namaapp}
            onChange={(e) => setnamaapp(e.target.value)}
            className="w-[300px] font-bold"
          />
          <Input
            labelPlacement='outside'
            color='primary'
            endContent={
              <BiNote className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
            label="Deskripsi"
            placeholder="Deskripsi"
            variant="bordered"
            name="deskripsi"
            id="deskripsi"
            {...register("deskripsi")}
            isInvalid={!!errors.deskripsi}
            errorMessage={errors.deskripsi?.message}
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
            className="w-[300px] font-bold"
          />
          <Select
            labelPlacement='outside'
            className="max-w-xs font-bold"
            color='primary'
            label="Homepage"
            placeholder="Homepage"
            variant="bordered"
            id="homepage"
            name="homepage"
            isRequired
            selectedKeys={[homepage]}
            onChange={(e) => setHomepage(e.target.value)}
          >
            {Object.keys(pagesList).map((item) => (
              <SelectItem key={pagesList[item].page}>
                {pagesList[item].page}
              </SelectItem>
            ))}
          </Select>
        </div>
        <p className='text-2xl font-bold pb-2 pt-5'>General setting</p>
        <div className='flex flex-nowrap gap-3 pb-5'>
          <Switch
            name='googleLogin'
            isSelected={googleLogin}
            onChange={(e) => setGoogleLogin(e.target.checked)}
            // onValueChange={setGoogleLogin}
            className='max-w-xs'
            classNames={{
              base: cn(
                "inline-flex flex-row-reverse w-full max-w-md bg-content1 hover:bg-content2 items-center",
                "justify-between cursor-pointer rounded-lg gap-2 p-2 border-2 border-transparent",
                "data-[selected=true]:border-primary",
              ),
              wrapper: "p-0 h-4 overflow-visible",
              thumb: cn("w-6 h-6 border-2 shadow-lg",
                "group-data-[hover=true]:border-primary",
                //selected
                "group-data-[selected=true]:ml-6",
                // pressed
                "group-data-[pressed=true]:w-7",
                "group-data-[selected]:group-data-[pressed]:ml-4",
              ),
            }}
          >
            <div className="flex flex-col gap-1">
              <p className="text-medium">Tombol login Google</p>
              {googleLogin === true ?

                <p className="text-tiny text-default-400">Login Google diaktifkan, pastikan GoogleID sudah disetting pada file .env agar berfungsi.</p>
                :
                <p className="text-tiny text-default-400">Login google dinonaktifkan.</p>

              }
            </div>
          </Switch>
        </div>
        <Button type="submit" color="primary" className="max-w-sm text-primary-button">
          Simpan
        </Button>
      </form >
    </>
  )
}
