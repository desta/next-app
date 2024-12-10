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

const saleses = [
  { key: "quotations", label: "Quotations", url: "/dashboard/sales_quotations" },
];

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

  const [sales, setSales] = React.useState(new Set(["Select"]));

  const salesValue = React.useMemo(
    () => Array.from(sales).join(", ").replaceAll("_", " "),
    [sales]
  );

  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["Select"]));

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  const handleClear = () => {
    setSales(new Set(["Select"]));
    setSelectedKeys(new Set(["Select"]));
  }

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

  const MenuHidden = ({ children, href }) => {
    const pathname = usePathname();
    const active = href === pathname;
    return (
      <>
        <Link
          href={href}
          className={` ${active
            ?
            "relative flex flex-row items-center h-9 focus:outline-none bg-white text-primary pl-4"
            :
            "relative flex pl-3 flex-row items-center h-9 focus:outline-none border-l-4 hover:border-primary-800 border-transparent pr-6 hover:bg-primary-200 hover:text-sidebar-hover text-sidebarcolor"
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
          className={active ? '' : ''}>
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
            <ActiveMenuLink href={menu.path} key={menu.id}>
              <Tooltip key={menu.id} content={menu.title} showArrow placement="right" isDisabled={!open}>
                <div className='flex-row flex items-center justify-between w-full' onClick={handleClear}>
                  <div className='flex-row ml-4 flex items-center'>
                    <span className='pr-1'>{parse(menu.icon)}</span>
                    <span className={`${open ? 'text-transparent' : 'text-nowrap'} transition-all duration-300 pl-2`}>{menu.title}</span>
                  </div>
                </div>
              </Tooltip>
            </ActiveMenuLink>
          )}

          {/* start sales =============================================== */}
          <Tooltip content='Sales' showArrow placement="right" isDisabled={!open}>
            <div className={`${open ? 'block' : 'hidden'} pl-0 pr-4 border-l-4 dropdown relative flex flex-row items-center h-9 focus:outline-none hover:border-primary-800 border-transparent hover:bg-primary-200 hover:text-sidebar-hover text-sidebarcolor hover:cursor-pointer my-1`}>
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    size='sm'
                    color="white"
                  >
                    <SiSalesforce className="w-5 h-5 -ml-3" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Settings"
                  variant="flat"
                  disallowEmptySelection
                  selectionMode="single"
                  selectedKeys={sales}
                  onSelectionChange={setSales}
                  items={saleses}
                >
                  {(item) => (
                    <DropdownItem
                      key={item.label}
                      onClick={() => setSelectedKeys(new Set(["Select"]))}
                    >
                      <MenuDrop href={item.url}><span className="w-full block">{item.label}</span></MenuDrop>
                    </DropdownItem>
                  )}
                </DropdownMenu>
              </Dropdown>
            </div>
          </Tooltip>

          <div className={`${open ? 'hidden' : 'block'} flex justify-between items-center pl-5 pr-2 py-[6px]`}>
            <div className="flex items-center">
              <SiSalesforce className="w-5 h-5" /><p className='pl-2'>Sales</p>
            </div>
            <Dropdown>
              <DropdownTrigger>
                <Button
                  variant="bordered"
                  size='sm'
                  color="white"
                  className="h-5"
                >
                  {salesValue}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Settings"
                variant="flat"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={sales}
                onSelectionChange={setSales}
                items={saleses}
              >
                {(item) => (
                  <DropdownItem
                    key={item.label}
                    onClick={() => setSelectedKeys(new Set(["Select"]))}
                  >
                    <MenuDrop href={item.url}><span className="w-full block">{item.label}</span></MenuDrop>
                  </DropdownItem>
                )}
              </DropdownMenu>
            </Dropdown>
          </div>
          {/* end sales ================ */}

          {/* start settings ================= */}
          <Tooltip content='Settings' showArrow placement="right" isDisabled={!open}>
            <div className={`${open ? 'block' : 'hidden'} pl-0 pr-4 border-l-4 dropdown relative flex flex-row items-center h-9 focus:outline-none hover:border-primary-800 border-transparent hover:bg-primary-200 hover:text-sidebar-hover text-sidebarcolor hover:cursor-pointer my-1`}>
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    size='sm'
                    color="white"
                  >
                    <IoSettings className="w-5 h-5 -ml-3" />
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
                      onClick={() => setSales(new Set(["Select"]))}
                    >
                      <MenuDrop href={item.url}><span className="w-full block">{item.label}</span></MenuDrop>
                    </DropdownItem>
                  )}
                </DropdownMenu>
              </Dropdown>
            </div>
          </Tooltip>

          <div className={`${open ? 'hidden' : 'block'} flex justify-between items-center pl-5 pr-2 py-[10px]`}>
            <div className="flex items-center">
              <IoSettings size={20} /><p className='pl-2'>Settings</p>
            </div>
            <Dropdown>
              <DropdownTrigger>
                <Button
                  variant="bordered"
                  size='sm'
                  color="white"
                  className="h-5"
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
                    onClick={() => setSales(new Set(["Select"]))}
                  >
                    <MenuDrop href={item.url}><span className="w-full block">{item.label}</span></MenuDrop>
                  </DropdownItem>
                )}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        {/* end settings =================== */}

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
