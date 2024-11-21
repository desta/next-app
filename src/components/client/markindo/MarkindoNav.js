'use client'
import "./MarkindoNav.css"
import Link from "next/link";
import { Button } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { HiMenu } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { fetchApp } from "@/redux/slices/app";
import { useSession } from "next-auth/react";

export default function MarkindoNav() {
    const dispatch = useDispatch();
    const session = useSession()
    const app = useSelector((state) => state.app.data);
    console.log('app', app)

    useEffect(() => {
        dispatch(fetchApp())
    }, [])

    const [open, setOpen] = useState(false);
    const MenuLink = ({ children, href }) => {
        const pathname = usePathname();
        const active = href === pathname;
        return (
            <>
                <Link
                    href={href}
                    className={` ${active
                        ? 'bg-blue-800 text-white'
                        : 'hover:bg-blue-800 hover:text-white'
                        } flex text-sm font-bold my-3 p-3`}>
                    {children}
                </Link>
            </>
        );
    };

    const MegaLink = ({ children, href }) => {
        const pathname = usePathname();
        const active = href === pathname;
        return (
            <>
                <Link
                    href={href}
                    className={` ${active
                        ? 'bg-blue-800 text-white'
                        : 'hover:bg-blue-800 hover:text-white p-3'
                        } flex text-sm font-bold`}>
                    {children}
                </Link>
            </>
        );
    };
    return (
        <>
            <nav className="fixed w-full z-50 px-4 flex justify-between items-center shadow-md glass">
                <div className="container flex items-center justify-between mx-auto">
                    <a className="text-2xl font-bold leading-none flex gap-2 items-center text-black" href="/">
                        {app.logo}
                        {app.namaapp}
                    </a>
                    <div className="flex">
                        <ul className="hidden lg:flex lg:mx-auto lg:w-auto lg:items-center gap-1">
                            <li><MenuLink href="/" >Home</MenuLink></li>
                            <li><MenuLink href="/product">Product</MenuLink></li>
                            {/* {menu.filter(item => {
                                // console.log('xxx', item.lokasi === MenuLokasi.navbar.name, item)
                                return item.lokasi === MenuLokasi.navbar.name
                            }).map(menu =>
                            (menu.Submenu?.length > 0 ?
                                (
                                    <li className="hoverable" key={menu.id}><MegaLink href={menu.path}>{menu.title}</MegaLink>
                                        <div className="container absolute p-6 mega-menu mb-16 sm:mb-0 shadow-xl bg-blue-800 w-[800px]">
                                            <div className="flex w-full flex-col">
                                                {menu.Submenu.map(sub =>
                                                    sub.title
                                                )}
                                            </div>
                                        </div>
                                    </li>
                                )
                                :
                                (
                                    <li key={menu.id}><MenuLink href={menu.path}>{menu.title}</MenuLink></li>
                                )
                            )
                            )} */}
                            <li className="hoverable hover:bg-blue-800 hover:text-white mt-3">
                                <a href="#" className="relative block px-3 pt-3 pb-6 text-sm font-bold hover:bg-blue-800 hover:text-white">Hover</a>
                                <div className="p-6 mega-menu mb-16 sm:mb-0 shadow-xl bg-blue-800">
                                    <div className="w-full flex flex-wrap justify-between">
                                        <div className="w-full text-white mb-8">
                                            <h2 className="font-bold text-2xl">Main Hero Message for the menu section</h2>
                                            <p>Sub-hero message, not too long and not too short. Make it just right!</p>
                                        </div>
                                        <ul className="px-4 w-full sm:w-1/2 lg:w-1/4 border-gray-600 border-b sm:border-r lg:border-b-0 pb-6 pt-6 lg:pt-3">
                                            <div className="flex items-center">
                                                <svg className="h-8 mb-3 mr-3 fill-current text-white"
                                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                    <path d="M3 6c0-1.1.9-2 2-2h8l4-4h2v16h-2l-4-4H5a2 2 0 0 1-2-2H1V6h2zm8 9v5H8l-1.67-5H5v-2h8v2h-2z" />
                                                </svg>
                                                <h3 className="font-bold text-xl text-white text-bold mb-2">Heading 1</h3>
                                            </div>
                                            <p className="text-gray-100 text-sm">Quarterly sales are at an all-time low create spaces to explore the accountable talk and blind vampires.</p>
                                            <div className="flex items-center py-3">
                                                <svg className="h-6 pr-3 fill-current text-blue-300"
                                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                    <path d="M20 10a10 10 0 1 1-20 0 10 10 0 0 1 20 0zm-2 0a8 8 0 1 0-16 0 8 8 0 0 0 16 0zm-8 2H5V8h5V5l5 5-5 5v-3z" />
                                                </svg>
                                                <a href="#" className="text-white bold border-b-2 border-blue-300 hover:text-blue-300">Find out more...</a>
                                            </div>
                                        </ul>
                                        <ul className="px-4 w-full sm:w-1/2 lg:w-1/4 border-gray-600 border-b sm:border-r-0 lg:border-r lg:border-b-0 pb-6 pt-6 lg:pt-3">
                                            <div className="flex items-center">
                                                <svg className="h-8 mb-3 mr-3 fill-current text-white"
                                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                    <path d="M4.13 12H4a2 2 0 1 0 1.8 1.11L7.86 10a2.03 2.03 0 0 0 .65-.07l1.55 1.55a2 2 0 1 0 3.72-.37L15.87 8H16a2 2 0 1 0-1.8-1.11L12.14 10a2.03 2.03 0 0 0-.65.07L9.93 8.52a2 2 0 1 0-3.72.37L4.13 12zM0 4c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4z" />
                                                </svg>
                                                <h3 className="font-bold text-xl text-white text-bold mb-2">Heading 2</h3>
                                            </div>
                                            <p className="text-gray-100 text-sm">Prioritize these line items game-plan draw a line in the sand come up with something buzzworthy UX upstream selling.</p>
                                            <div className="flex items-center py-3">
                                                <svg className="h-6 pr-3 fill-current text-blue-300"
                                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                    <path d="M20 10a10 10 0 1 1-20 0 10 10 0 0 1 20 0zm-2 0a8 8 0 1 0-16 0 8 8 0 0 0 16 0zm-8 2H5V8h5V5l5 5-5 5v-3z" />
                                                </svg>
                                                <a href="#" className="text-white bold border-b-2 border-blue-300 hover:text-blue-300">Find out more...</a>
                                            </div>
                                        </ul>
                                        <ul className="px-4 w-full sm:w-1/2 lg:w-1/4 border-gray-600 border-b sm:border-b-0 sm:border-r md:border-b-0 pb-6 pt-6 lg:pt-3">
                                            <div className="flex items-center">
                                                <svg className="h-8 mb-3 mr-3 fill-current text-white"
                                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                    <path d="M2 4v14h14v-6l2-2v10H0V2h10L8 4H2zm10.3-.3l4 4L8 16H4v-4l8.3-8.3zm1.4-1.4L16 0l4 4-2.3 2.3-4-4z" />
                                                </svg>
                                                <h3 className="font-bold text-xl text-white text-bold mb-2">Heading 3</h3>
                                            </div>
                                            <p className="text-gray-100 text-sm">This proposal is a win-win situation which will cause a stellar paradigm shift, let's touch base off-line before we fire the new ux experience.</p>
                                            <div className="flex items-center py-3">
                                                <svg className="h-6 pr-3 fill-current text-blue-300"
                                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                    <path d="M20 10a10 10 0 1 1-20 0 10 10 0 0 1 20 0zm-2 0a8 8 0 1 0-16 0 8 8 0 0 0 16 0zm-8 2H5V8h5V5l5 5-5 5v-3z" />
                                                </svg>
                                                <a href="#" className="text-white bold border-b-2 border-blue-300 hover:text-blue-300">Find out more...</a>
                                            </div>
                                        </ul>
                                        <ul className="px-4 w-full sm:w-1/2 lg:w-1/4 border-gray-600 pb-6 pt-6 lg:pt-3">
                                            <div className="flex items-center">
                                                <svg className="h-8 mb-3 mr-3 fill-current text-white"
                                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                    <path d="M9 12H1v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-8v2H9v-2zm0-1H0V5c0-1.1.9-2 2-2h4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v6h-9V9H9v2zm3-8V2H8v1h4z" />
                                                </svg>
                                                <h3 className="font-bold text-xl text-white text-bold mb-2">Heading 4</h3>
                                            </div>
                                            <p className="text-gray-100 text-sm">This is a no-brainer to wash your face, or we need to future-proof this high performance keywords granularity.</p>
                                            <div className="flex items-center py-3">
                                                <svg className="h-6 pr-3 fill-current text-blue-300"
                                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                    <path d="M20 10a10 10 0 1 1-20 0 10 10 0 0 1 20 0zm-2 0a8 8 0 1 0-16 0 8 8 0 0 0 16 0zm-8 2H5V8h5V5l5 5-5 5v-3z" />
                                                </svg>
                                                <a href="#" className="text-white bold border-b-2 border-blue-300 hover:text-blue-300">Find out more...</a>
                                            </div>
                                        </ul>
                                    </div>
                                </div>
                            </li>
                            <li><MenuLink href="/profile" >Corporate Profile</MenuLink></li>
                            <li><MenuLink href="/contact">Contact</MenuLink></li>
                            {session !== null &&
                                <Link href={'/dashboard'}><Button color='warning' radius="none" className="h-11 font-bold">Dashboard</Button></Link>
                            }
                        </ul>
                        <div>
                            <button className="flex items-center text-black px-3 py-6 text-sm lg:hidden" onClick={() => setOpen(!open)}>
                                <HiMenu className="text-2xl" />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
            {/* =============================== Mobile menu =============================== */}
            <div className={`${open ? 'block' : 'hidden'} navbar-menu relative z-50 `}>
                <div className="navbar-backdrop fixed inset-0 bg-gray-900 opacity-25" onClick={() => setOpen(!open)}></div>
                <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm p-5 bg-white border-r overflow-y-auto">
                    <div className="flex items-center mb-8">
                        <a className="mr-auto text-2xl font-bold leading-none" href="#">
                            {app.logo !== '' ? app.logo : app.namaapp}
                        </a>
                        <button className="navbar-close" onClick={() => setOpen(!open)}>
                            <FaXmark />
                        </button>
                    </div>
                    <div>
                        <ul>
                            <li className="mb-1">
                                <a className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded" href="/">Home</a>
                            </li>
                            <li className="mb-1">
                                <a className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded" href="#">About</a>
                            </li>
                            <li className="mb-1">
                                <a className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded" href="#">Solutions</a>
                            </li>
                            <li className="mb-1">
                                <a className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded" href="#">Services</a>
                            </li>
                            <li className="mb-1">
                                <a className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded" href="/product">Product</a>
                            </li>
                            <li className="mb-1">
                                <a className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded" href="/article">Article</a>
                            </li>
                            <li className="mb-1">
                                <a className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded" href="#">Contact</a>
                            </li>
                        </ul>
                    </div>
                    <div className="mt-auto">
                        <p className="my-4 text-xs text-center text-gray-400">
                            <span>Copyright © 2021</span>
                        </p>
                    </div>
                </nav>
            </div>
        </>

    );
}