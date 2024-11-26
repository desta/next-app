"use client"
import { Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure, Select, SelectItem, ModalFooter, Input, Switch, Card, CardBody, Spinner, } from '@nextui-org/react'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { BiEdit, BiTrash } from 'react-icons/bi';
import { fetchGallery } from '@/redux/slices/gallery';
import ImageSelector from '@/components/imageSelector/ImageSelector';
import { hapusSelectedImage } from '@/redux/slices/imageSelectorRedux';
import { Editor } from '@/components/Editor';
import { fetchMediaAplication } from '@/redux/slices/media_aplication/MediaAplication';

export default function Edit({ params }) {
    const dispatch = useDispatch()
    const router = useRouter()
    const [title, setTitle] = useState(params.title)
    const [publish, setPublish] = useState(params.publish)
    const [content, setContent] = useState(params.content)
    const selectedImageToAdd = useSelector((state) => state.imageSelectorRedux.selectedImageToAdd)

   
    const cleanup = () => {
        setTitle('')
        setPublish(true)
        dispatch(selectedImageToAdd([]))
    }
    const getData = () => {
        dispatch(fetchGallery());
    }
    useEffect(() => {
        getData();
    }, [])
    const removeSelectedImage = (id) => {
        dispatch(hapusSelectedImage(id))
    }
    const handleSubmitForm = async (e) => {
        e.preventDefault()

        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("publish", publish);
        await selectedImageToAdd.map((item) => {
            formData.append('image', item.id);
        })

        const res = await fetch(`/api/media_aplication/${params.id}`, {
            method: 'PUT',
            body: formData,
        })
        if (res.ok) {
            toast.success('Berhasil edit media aplication')
            dispatch(fetchMediaAplication())
            router.refresh()
        } else {
            toast.error('Gagal edit media aplication')
        }
    }
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
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
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size='4xl' placement='center' scrollBehavior='outside'>
                <ModalContent>
                    {(onClose) => (
                        <form onSubmit={handleSubmitForm} className='flex flex-col gap-3'>
                            <ModalHeader>Edit Media Aplication</ModalHeader>
                            <ModalBody>
                                <div className='flex flex-col gap-2'>
                                    <Input
                                        isRequired
                                        labelPlacement='outside'
                                        className="font-bold"
                                        color='primary'
                                        label="Title"
                                        placeholder="Title name"
                                        variant="bordered"
                                        name="title"
                                        id="title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                    <label className="text-primary text-small font-bold">Content</label>
                                    <Editor value={content} onChange={setContent} />

                                    <label className="text-primary text-small font-bold">Image</label>
                                    <ImageSelector what={"edit"} imageData={params.image} />
                                  
                                    <Switch isSelected={publish} onValueChange={setPublish} size='sm' className='pt-3'>
                                        Publish product
                                    </Switch>

                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Keluar
                                </Button>
                                <Button type='submit' color="secondary">
                                    Simpan
                                </Button>
                            </ModalFooter>
                        </form>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}