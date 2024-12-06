"use client";
import React, { useEffect } from "react";
import { BiBookAdd, BiNote, BiUser, } from "react-icons/bi";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger, Select, SelectItem, Tooltip } from "@nextui-org/react";
import { LiaExchangeAltSolid } from "react-icons/lia";
import { IoSettings } from "react-icons/io5";
import { MdDashboard, MdEmail } from "react-icons/md";
import { FaAngleRight, FaUsersViewfinder } from "react-icons/fa6";
import { MdRequestQuote } from "react-icons/md";
import { SiSalesforce } from "react-icons/si";
import { useDispatch, useSelector } from "react-redux";
import { fetchMenus } from "@/redux/slices/Menu";
import parse from "html-react-parser"
import { MenuLokasi } from "@/utils/MenuLokasi";
import { TbWorldWww } from "react-icons/tb";

const settings = [
  { key: "app", label: "App", url: "/dashboard/setting_app" },
  { key: "user", label: "User", url: "/dashboard/setting_user" },
  { key: "faq", label: "FAQ", url: "/dashboard/setting_faq" },
  { key: "ticket", label: "Ticket", url: "/dashboard/setting_ticket" },
  { key: "smtp", label: "SMTP", url: "/dashboard/setting_smtp" },
  { key: "customers", label: "Customers", url: "/dashboard/setting_customers" },
  { key: "website", label: "Website", url: "/dashboard/website" },
];

export default function Sidebar({ open, setOpen }) {
  const dispatch = useDispatch()
  const menus = useSelector((state) => state.menu.data);


  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["Select"]));

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );


  useEffect(() => {
    dispatch(fetchMenus())
  }, [])

  const ActiveMenuLink = ({ children, href }) => {
    const pathname = usePathname();
    const active = href === pathname;
    return (
      <>
        <Link
          href={href}
          className={` ${active ?
            "relative flex flex-row items-center h-9 focus:outline-none bg-white text-primary my-1 pl-1"
            :
            "relative flex flex-row items-center h-9 focus:outline-none border-l-4 hover:border-primary-800 border-transparent hover:bg-primary-200 hover:text-sidebar-hover text-sidebarcolor my-1"
            }`}
        >
          {children}
        </Link>
      </>
    );
  };
  const MenuDrop = ({ children, href }) => {
    const pathname = usePathname();
    const active = href === pathname;
    return (
      <>
        <Link
          href={href}
          className={active ? '':''}>
          {children}
        </Link>
      </>
    );
  };
  return (
    <>
      <div className={`${open ? "w-14" : "w-64"} flex flex-col w-14 justify-between transition-all duration-300`}>
        <div className="pt-5">
          {menus.filter(a => a.lokasi === MenuLokasi.sidebar.name).map((menu) =>
            <ActiveMenuLink href={menu.path} key={menu.id} set>
              <Tooltip key={menu.id} content={menu.title} showArrow placement="right" isDisabled={!open}>
                <div className='flex-row flex items-center justify-between w-full'>
                  <div className='flex-row ml-4 flex items-center'>
                    <span className='pr-1'>{parse(menu.icon)}</span>
                    <span className={`${open ? 'hidden' : 'block'} pl-2`}>{menu.title}</span>
                  </div>
                </div>
              </Tooltip>
            </ActiveMenuLink>
          )}

          {/* =============== Dropdown menu sales =============== */}
          <div className='pl-0 pr-4 border-l-4 dropdown relative flex flex-row items-center h-9 focus:outline-none hover:border-primary-800 border-transparent hover:bg-primary-200 hover:text-sidebar-hover text-sidebarcolor hover:cursor-pointer my-1'>
            <div className='flex-row flex items-center justify-between w-full'>
              <div className='flex-row flex items-center ml-4'>
                <span className='pr-2'><SiSalesforce className="w-5 h-5" stroke="currentColor" /></span>
                <span className={`${open ? 'hidden' : 'block'}`}>Sales</span>
              </div>
              <div className={`${open ? 'ml-2' : 'mr-2'} text-sm tracking-wide truncate`}>
                <FaAngleRight />
              </div>
            </div>
            <div className='dropdown-content pr-1 min-w-52 bg-sidebar text-sidebar-foreground py-1 -mt-1 rounded-se-lg'>
              <MenuDrop href="/dashboard/sales_quotations"><MdRequestQuote /><span className='pl-2'>Quotations</span></MenuDrop>
            </div>
          </div>
          <Divider className="bg-white mx-2 w-auto" />
          {/* =============== Dropdown menu setting =============== */}
          <div className='pl-0 pr-4 border-l-4 dropdown relative flex flex-row items-center h-9 focus:outline-none hover:border-primary-800 border-transparent hover:bg-primary-200 hover:text-sidebar-hover text-sidebarcolor hover:cursor-pointer my-1 z-30'>
            <div className='flex-row flex items-center justify-between w-full'>
              <div className='flex-row flex items-center ml-4'>
                <span className='pr-2'><IoSettings className="w-5 h-5" stroke="currentColor" /></span>
                <span className={`${open ? 'hidden' : 'block'}`}>Setting</span>
              </div>
              <div className={`${open ? 'ml-2' : 'mr-2'} text-sm tracking-wide truncate`}>
                <FaAngleRight />
              </div>
            </div>
            <div className='dropdown-content pr-1 min-w-52 bg-sidebar text-sidebar-foreground py-1 -mt-1 rounded-se-lg'>
              <MenuDrop href="/dashboard/setting_app"><MdDashboard /><span className='pl-2'>App</span></MenuDrop>
              <MenuDrop href="/dashboard/setting_user"><BiUser /><span className='pl-2'>User</span></MenuDrop>
              <MenuDrop href="/dashboard/setting_faq"><BiNote /><span className='pl-2'>FAQ</span></MenuDrop>
              <MenuDrop href="/dashboard/setting_ticket"><BiBookAdd /><span className='pl-2'>Ticket</span></MenuDrop>
              <MenuDrop href="/dashboard/setting_smtp"><MdEmail /><span className='pl-2'>SMTP</span></MenuDrop>
              <MenuDrop href="/dashboard/setting_customers"><FaUsersViewfinder /><span className='pl-2'>Customers</span></MenuDrop>
              <MenuDrop href="/dashboard/website"><TbWorldWww /><span className='pl-2'>Website</span></MenuDrop>
            </div>
          </div>
          <div className="flex justify-between items-center pl-5 pr-2">
            <div className="flex items-center">
              <IoSettings size={20} /><p className='pl-2'>Settings</p>
            </div>
            <Dropdown>
              <DropdownTrigger>
                <Button
                  variant="bordered"
                  size='sm'
                  color="white"
                >
                  {selectedValue}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Settings"
                variant="flat"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={selectedKeys}
                onSelectionChange={setSelectedKeys}
                items={settings}
              >
                {(item) => (
                  <DropdownItem
                    key={item.label}
                  >
                    <MenuDrop href={item.url}><span className="w-full block">{item.label}</span></MenuDrop>
                  </DropdownItem>
                )}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className="-right-5 absolute top-3/4 z-20">
          <Button
            isIconOnly
            color="primary"
            variant="solid"
            onClick={() => {
              setOpen(!open);
            }}
            className={`${open ? "" : ""
              } cursor-pointer transition-all duration-300 text-navbar-foreground hover:bg-white hover:text-primary`}
          >
            <LiaExchangeAltSolid className="h-4 w-4" />
          </Button>
        </div>
        <p className={`${open ? 'hidden' : 'block'} text-center text-sm text-gray-300 pb-3`}>App v1 &copy; 2024</p>
      </div>
    </>
  );
}
