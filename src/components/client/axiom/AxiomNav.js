'use client'
import { logout } from "@/app/actions/auth";
import { useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { HiMenu } from "react-icons/hi";

export default function AxiomNav({ params, session }) {
    const [open, setOpen] = useState(false);
    return (
        <>
            <nav className="fixed w-full z-50 px-4 py-4 flex justify-between items-center bg-[#1e52db]">
                <a className="text-2xl font-bold leading-none flex gap-2 items-center text-white" href="/">
                    {params.logo !== '' && <img src={`/api/public${params.logo}`} alt="Logo" className="h-8 w-8" />}
                    {params.namaapp !== '' && params.namaapp}
                </a>
                <div className="flex items-center gap-6">
                    <ul className="hidden lg:flex lg:mx-auto lg:items-end lg:w-auto lg:space-x-6">
                        <li><a className="text-sm text-white hover:text-gray-500" href="/">Home</a></li>
                        <li className="text-gray-300">|</li>
                        <li><a className="text-sm text-white hover:text-gray-500" href="#about">About</a></li>
                        <li className="text-gray-300">|</li>
                        <li><a className="text-sm text-white hover:text-gray-500" href="#solutions">Solutions</a></li>
                        <li className="text-gray-300">|</li>
                        <li><a className="text-sm text-white hover:text-gray-500" href="#services">Services</a></li>
                        <li className="text-gray-300">|</li>
                        <li><a className="text-sm text-white hover:text-gray-500" href="#product">Product</a></li>
                        <li className="text-gray-300">|</li>
                        <li><a className="text-sm text-white hover:text-gray-500" href="/article">Article</a></li>
                        <li className="text-gray-300">|</li>
                        <li><a className="text-sm text-white hover:text-gray-500" href="#contact">Contact</a></li>
                    </ul>
                    <div>
                        <button className="flex items-center text-white p-3 lg:hidden" onClick={() => setOpen(!open)}>
                            <HiMenu />
                        </button>
                        {session === null ?
                            <>
                                <a className="hidden lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold  rounded-xl transition duration-200" href="/login">Sign In</a>
                                <a className="hidden lg:inline-block py-2 px-6 bg-blue-500 hover:bg-blue-600 text-sm text-white font-bold rounded-xl transition duration-200" href="#">Sign up</a>
                            </>
                            :
                            <>
                                <a className="hidden lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 bg-success hover:bg-gray-100 text-white text-sm hover:text-gray-900 font-bold  rounded-xl transition duration-200" href="/dashboard">Dashboard</a>
                                <button className="hidden lg:inline-block py-2 px-6 bg-danger hover:bg-danger-300 text-sm text-white font-bold rounded-xl transition duration-200 hover:cursor-pointer" onClick={() => logout()}>Log out</button>
                            </>

                        }
                    </div>
                </div>
            </nav>
            <div className={`${open ? 'block' : 'hidden'} navbar-menu relative z-50 `}>
                <div className="navbar-backdrop fixed inset-0 bg-gray-900 opacity-25" onClick={() => setOpen(!open)}></div>
                <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm p-5 bg-white border-r overflow-y-auto">
                    <div className="flex items-center mb-8">
                        <a className="mr-auto text-3xl font-bold leading-none" href="#">
                            {params.logo !== '' ? params.logo : params.namaapp}
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
                        <div className="pt-6">
                            {session === null ?
                                <>
                                    <a className="block px-4 py-3 mb-3 text-xs text-center font-semibold leading-none bg-gray-50 hover:bg-gray-100 rounded-xl" href="/login">Sign in</a>
                                    <a className="block px-4 py-3 mb-2 leading-loose text-xs text-center text-white font-semibold bg-blue-600 hover:bg-blue-700  rounded-xl" href="#">Sign Up</a>
                                </>
                                :
                                <>
                                    <a className="block px-4 py-3 mb-3 text-xs text-center font-semibold leading-none bg-gray-50 hover:bg-gray-100 rounded-xl" href="/dahboard">Dashboard</a>
                                    <a className="block px-4 py-3 mb-2 leading-loose text-xs text-center text-white font-semibold bg-blue-600 hover:bg-blue-700  rounded-xl" onClick={() => logout()}>Log out</a>
                                </>

                            }
                        </div>
                        <p className="my-4 text-xs text-center text-gray-400">
                            <span>Copyright © 2021</span>
                        </p>
                    </div>
                </nav>
            </div>
        </>

    );
}