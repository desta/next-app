"use client"
import { useTheme } from 'next-themes';
import React, { useEffect, useMemo, useState } from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem, Button, Avatar, Switch } from "@nextui-org/react";
import { IoMdLogOut } from "react-icons/io";
import { logout } from '@/app/actions/auth';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAccount } from '@/redux/slices/account';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { socket } from '@/socket';

export default function MenuAccount({ order, setOrder }) {
  const dispatch = useDispatch()
  const account = useSelector((state) => state.account.data)
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [selectedKeys, setSelectedKeys] = useState(new Set([theme]));

  const ActiveMenuLink = ({ children, href }) => {
    const pathname = usePathname();
    return (
      <>
        <Link href={href}>{children}
        </Link>
      </>
    );
  };

  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  const handleOut = () => {
    logout();
    socket.disconnect();
  }
  useEffect(() => {
    dispatch(fetchAccount())
    const userTheme = localStorage.getItem('theme');
    if (userTheme) {
      setMounted(true);
      setTheme(userTheme);
    } else {
      setMounted(true);
      setTheme('indigo');
    }
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Dropdown
      radius="sm"
    >
      <DropdownTrigger>
        <Avatar
          isBordered color="secondary"
          as="button"
          size="sm"
          className="transition-transform"
          src={account.image}
          name={account.name}
        />
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Menu account"
        className="p-3"
      >
        <DropdownSection aria-label="Profile & Theme">
          <DropdownItem
            isReadOnly
            key="profile"
            className="h-14 gap-2 opacity-100"
          >
            <ActiveMenuLink href="/dashboard/account">
            <div className='flex gap-3 items-center pl-1'>
              <Avatar
                as="button"
                size="sm"
                className="transition-transform"
                src={account.image}
                isBordered color="secondary"
              />
              <div>
                <p className='font-bold'>{account.name}</p>
                <p>{account.akses}</p>
              </div>
            </div>
            </ActiveMenuLink>
          </DropdownItem>
          <DropdownItem key="settings" showDivider>
            <ActiveMenuLink href="/dashboard/account"><span className="w-full block">Akun saya</span></ActiveMenuLink>
          </DropdownItem>
          <DropdownItem key="faq">
            <ActiveMenuLink href="/dashboard/account/faq"><span className="w-full block">FAQ</span></ActiveMenuLink>
          </DropdownItem>
          <DropdownItem key="support" showDivider>
            <ActiveMenuLink href="/dashboard/account/support"><span className="w-full block">Support</span></ActiveMenuLink>
          </DropdownItem>
          <DropdownItem
            isReadOnly
            key="theme"
            className="cursor-default"
            endContent={
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    variant="bordered"
                    className="capitalize"
                    size='sm'
                  >
                    {selectedValue}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Select theme"
                  variant="flat"
                  disallowEmptySelection
                  selectionMode="single"
                  selectedKeys={selectedKeys}
                  onSelectionChange={setSelectedKeys}
                >
                  <DropdownItem key="red" onClick={() => { setTheme('red'); localStorage.setItem('theme', 'red') }} className='text-red-600'>Red</DropdownItem>
                  <DropdownItem key="pink" onClick={() => { setTheme('pink'); localStorage.setItem('theme', 'pink') }} className='text-pink-600'>Pink</DropdownItem>
                  <DropdownItem key="Purple" onClick={() => { setTheme('purple'); localStorage.setItem('theme', 'purple') }} className='text-purple-600'>Purple</DropdownItem>
                  <DropdownItem key="deep_purple" onClick={() => { setTheme('deep_purple'); localStorage.setItem('theme', 'deep_purple') }} className='text-purple-800'>Deep Purple</DropdownItem>
                  <DropdownItem key="indigo" onClick={() => { setTheme('indigo'); localStorage.setItem('theme', 'indigo') }} className='text-indigo-600'>Indigo</DropdownItem>
                  <DropdownItem key="green" onClick={() => { setTheme('green'); localStorage.setItem('theme', 'green') }} className='text-green-600'>Green</DropdownItem>
                  <DropdownItem key="grey" onClick={() => { setTheme('grey'); localStorage.setItem('theme', 'grey') }} className='text-gray-600'>Grey</DropdownItem>
                  <DropdownItem key="blue" onClick={() => { setTheme('blue'); localStorage.setItem('theme', 'blue') }} className='text-blue-700'>Blue</DropdownItem>
                  <DropdownItem key="orange" onClick={() => { setTheme('orange'); localStorage.setItem('theme', 'orange') }} className='text-orange-600'>Orange</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            }
          >
            Tema
          </DropdownItem>
          <DropdownItem key="logout" color="danger" endContent={<IoMdLogOut className="text-large" />} onClick={handleOut}>Keluar</DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  )
}
