"use client"
import React, { useEffect } from "react";
import { Button, Image, Navbar, NavbarContent, NavbarItem } from "@nextui-org/react";
import MenuAccount from "./MenuAccount";
import { useDispatch, useSelector } from "react-redux";
import { fetchApp } from "@/redux/slices/app";
import Link from "next/link";
import Agenda from "./agenda/Agenda";

export default function NavBar() {
  const dispatch = useDispatch()
  const app = useSelector((state) => state.app.data)

  useEffect(() => {
    dispatch(fetchApp())
  }, [])

  return (
    <Navbar maxWidth="full" className="z-50">
      <NavbarContent justify='start'>
        {app.logo !== "" &&
        <Image src={app.logo} alt="logo" height={0} width={0} className="w-auto max-h-12" radius="none" />
        }
        <div className="flex flex-col">
          <p className="font-bold text-lg hidden sm:block">{app.namaapp}</p>
          <p className="text-xs hidden sm:block">{app.deskripsi}</p>
        </div>
      </NavbarContent>
      <NavbarContent justify="end">
        <Link href={"/"}><Button color="secondary">Homepage</Button></Link>
        <Agenda />
        <MenuAccount />
      </NavbarContent>
    </Navbar>
  );
}
