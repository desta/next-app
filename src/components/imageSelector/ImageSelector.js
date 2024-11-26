import { fetchGallery } from '@/redux/slices/gallery';
import { addCurrentSelection, addSelectedImage, hapusCurrentSelection, hapusSelectedImage, setCurrentSelectionRedux, setSelectedImageRedux } from '@/redux/slices/imageSelectorRedux';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Card, CardBody, Input } from '@nextui-org/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { BiTrash } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';

function ImageSelector({ what, imageData }) {
    const dispatch = useDispatch();
    const gallery = useSelector((state) => state.gallery.data);
    const selectedImageToAdd = useSelector((state) => state.imageSelectorRedux.selectedImageToAdd)
    const currentSelection = useSelector((state) => state.imageSelectorRedux.currentSelection)

    const handleImageClick = (img) => {
        if (!currentSelection.includes(img)) {
            dispatch(addCurrentSelection(img))
        } else if (currentSelection.includes(img)) {
            dispatch(hapusCurrentSelection(img.id))
        }

    }
    const removeSelectedImage = (id) => {
        dispatch(hapusSelectedImage(id))
    }
    const getData = () => {
        dispatch(fetchGallery());
    }
    const addImageFunc = (runFunc) => {
        dispatch(setSelectedImageRedux(currentSelection));
        dispatch(setCurrentSelectionRedux([]));
        runFunc()
    }
    const getStates = () => {
        if (what === 'edit') {
            dispatch(setSelectedImageRedux(imageData))
        } else {
            dispatch(setSelectedImageRedux([]))
        }
    }
    useEffect(() => {
        getData();
        getStates();
    }, [])

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    return (
        <div className='p-2 rounded-medium border-medium border-default-200'>
            {selectedImageToAdd.length !== 0 &&
                <>
                    <div className="flex flex-wrap gap-1 pb-2">
                        {selectedImageToAdd.map((file, key) => {
                            return (
                                <div className='block' key={key}>
                                    <div className="overflow-hidden relative w-24">
                                        <Button onClick={() => { removeSelectedImage(file.id) }} className="absolute right-0 bottom-0 cursor-pointer" size='sm' color="secondary" isIconOnly><BiTrash className='w-4 h-4' /></Button>
                                        <img className="h-24 w-24 rounded-md border border-default-200 p-2" src={file.image} />
                                    </div>
                                    <p className='w-24 text-center text-xs px-1 truncate ...'>{file.name}</p>
                                </div>
                            )
                        })}
                    </div>
                </>
            }
            <Button onPress={() => {
                dispatch(setCurrentSelectionRedux(selectedImageToAdd));
                onOpen()
            }} size='sm' color='secondary'>Insert image</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='center' size='4xl' scrollBehavior='normal' isKeyboardDismissDisabled={true}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Insert image</ModalHeader>
                            <ModalBody>
                                {gallery.length > 0 ?
                                    <div className="flex gap-2 relative">
                                        <div className='flex gap-2 flex-col w-full'>
                                            <div className='flex justify-between items-center'>
                                                <Input
                                                    labelPlacement='outside-left'
                                                    className="font-bold"
                                                    color='primary'
                                                    label="Search"
                                                    placeholder="Search image"
                                                    variant="bordered"
                                                    name="search"
                                                    id="search"
                                                />
                                                <div className='w-full text-right'>
                                                    {currentSelection.length >= 1 ?
                                                        <span className='text-sm italic'>Selected {currentSelection.length} / {gallery.length}</span>
                                                        :
                                                        <span className='text-sm italic'>Total {gallery.length} image.</span>
                                                    }
                                                </div>
                                            </div>
                                            <div className='flex gap-2 flex-wrap max-h-[calc(100vh-300px)] overflow-y-scroll'>
                                                {gallery.map((img, key) => {
                                                    return (
                                                        <div key={key} className="w-24 hover:cursor-pointer" onClick={() => handleImageClick(img)}>
                                                            <img className={currentSelection.includes(img) ? 'h-24 w-24 border border-transparent rounded-md p-2 bg-primary-300' : 'h-24 w-24 rounded-md border border-default-200 p-2'} src={img.image} />
                                                            <p className='text-center text-xs px-1 truncate ...'>{img.name}</p>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <div className='flex justify-center flex-col w-full text-center'>
                                        <p className='pb-2'>No images found, please add image in gallery.</p>
                                        <Link href='/dashboard/gallery'>
                                            <Button color='secondary'>Go to gallery</Button>
                                        </Link>
                                    </div>
                                }
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" onPress={() => {
                                    dispatch(setCurrentSelectionRedux([]));
                                    onClose()
                                }}>
                                    Close
                                </Button>
                                {gallery.length !== 0 &&
                                    <Button color="secondary" onPress={() => addImageFunc(onClose)}>
                                        Add image
                                    </Button>}
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>)
}

export default ImageSelector