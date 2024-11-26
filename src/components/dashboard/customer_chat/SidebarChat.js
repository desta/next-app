'use client'
import { Avatar, Input, Textarea } from '@nextui-org/react'
import React from 'react'

export default function SidebarChat() {
    return (
        <>
            <div className='flex flex-row gap-4'>
                <div className='w-64'>
                    <div className='w-64'>
                        <Input isClearable placeholder="Search or start new chat" color='primary' className='w-full' />
                    </div>
                    <div className='fixed w-64 h-[calc(100vh-250px)] overflow-y-auto p-4 bg-white mt-5'>
                        <div className='flex flex-col gap-4'>
                            <div className='flex flex-row gap-4 items-center'>
                                <Avatar isBordered radius="sm" src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                                <div className='flex flex-col'>
                                    <div className='font-bold'>ini adalah nama saya</div>
                                    <div className='text-xs text-gray-500'>Heheheh</div>
                                </div>
                            </div>
                            <div className='flex flex-row gap-4 items-center'>
                                <Avatar isBordered radius="sm" src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                                <div className='flex flex-col'>
                                    <div className='font-bold'>ini adalah nama saya</div>
                                    <div className='text-xs text-gray-500'>Heheheh</div>
                                </div>
                            </div>
                            <div className='flex flex-row gap-4 items-center'>
                                <Avatar isBordered radius="sm" src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                                <div className='flex flex-col'>
                                    <div className='font-bold'>ini adalah nama saya</div>
                                    <div className='text-xs text-gray-500'>Heheheh</div>
                                </div>
                            </div>
                            <div className='flex flex-row gap-4 items-center'>
                                <Avatar isBordered radius="sm" src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                                <div className='flex flex-col'>
                                    <div className='font-bold'>ini adalah nama saya</div>
                                    <div className='text-xs text-gray-500'>Heheheh</div>
                                </div>
                            </div>
                            <div className='flex flex-row gap-4 items-center'>
                                <Avatar isBordered radius="sm" src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                                <div className='flex flex-col'>
                                    <div className='font-bold'>ini adalah nama saya</div>
                                    <div className='text-xs text-gray-500'>Heheheh</div>
                                </div>
                            </div>
                            <div className='flex flex-row gap-4 items-center'>
                                <div className='w-14'>
                                    <Avatar isBordered radius="sm" src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                                </div>
                                <div className='flex flex-col'>
                                    <div className='font-bold line-clamp-1'>ini adalah nama saya wkowkowwok</div>
                                    <div className='text-xs text-gray-500'>Heheheh</div>
                                </div>
                            </div>
                            <div className='flex flex-row gap-4 items-center'>
                                <Avatar isBordered radius="sm" src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                                <div className='flex flex-col'>
                                    <div className='font-bold'>ini adalah nama saya</div>
                                    <div className='text-xs text-gray-500'>Heheheh</div>
                                </div>
                            </div>
                            <div className='flex flex-row gap-4 items-center'>
                                <Avatar isBordered radius="sm" src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                                <div className='flex flex-col'>
                                    <div className='font-bold'>ini adalah nama saya</div>
                                    <div className='text-xs text-gray-500'>Heheheh</div>
                                </div>
                            </div>
                            <div className='flex flex-row gap-4 items-center'>
                                <Avatar isBordered radius="sm" src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                                <div className='flex flex-col'>
                                    <div className='font-bold'>ini adalah nama saya</div>
                                    <div className='text-xs text-gray-500'>Heheheh</div>
                                </div>
                            </div>
                            <div className='flex flex-row gap-4 items-center'>
                                <Avatar isBordered radius="sm" src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                                <div className='flex flex-col'>
                                    <div className='font-bold'>ini adalah nama saya</div>
                                    <div className='text-xs text-gray-500'>Heheheh</div>
                                </div>
                            </div>
                            <div className='flex flex-row gap-4 items-center'>
                                <Avatar isBordered radius="sm" src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                                <div className='flex flex-col'>
                                    <div className='font-bold'>ini adalah nama saya</div>
                                    <div className='text-xs text-gray-500'>Heheheh</div>
                                </div>
                            </div>
                            <div className='flex flex-row gap-4 items-center'>
                                <Avatar isBordered radius="sm" src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                                <div className='flex flex-col'>
                                    <div className='font-bold'>ini adalah nama saya</div>
                                    <div className='text-xs text-gray-500'>Heheheh</div>
                                </div>
                            </div>
                            <div className='flex flex-row gap-4 items-center'>
                                <Avatar isBordered radius="sm" src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                                <div className='flex flex-col'>
                                    <div className='font-bold'>ini adalah nama saya</div>
                                    <div className='text-xs text-gray-500'>Heheheh</div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className='w-full'>
                    <div className='bg-slate-300 w-full'>
                        nama sya
                    </div>
                    <div className='flex flex-col justify-between w-full'>
                        <div className='mt-5 w-full'>
                            Chat body
                        </div>
                        <Textarea />
                    </div>
                </div>
            </div>
        </>
    )
}
