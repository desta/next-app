"use client"
import { Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure, Select, SelectItem, ModalFooter, Input, Switch, Card, CardBody, Spinner, } from '@nextui-org/react'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { fetchGallery } from '@/redux/slices/gallery';
import ImageSelector from '@/components/imageSelector/ImageSelector';
import { setSelectedImageRedux } from '@/redux/slices/imageSelectorRedux';
import { getResponseData } from '@/utils/getResponseData';
import { Editor } from '@/components/Editor';
import SuggestProduct from '../product/SuggestProduct';
import { fetchProducts, setSelectedProduct } from '@/redux/slices/product/Products';
import { fetchMediaAplication } from '@/redux/slices/media_aplication/MediaAplication';

export default function Tambah() {
    const dispatch = useDispatch()
    const router = useRouter()
    const [title, setTitle] = useState('')
    const [publish, setPublish] = useState(true)
    const [content, setContent] = useState('')
    const [suggestProduct, setSuggestProduct] = useState([])
    const selectedImageToAdd = useSelector((state) => state.imageSelectorRedux.selectedImageToAdd)
    const selectedProduct = useSelector((state) => state.products.selectedProduct);

    console.log('select', selectedProduct)
    console.log('image', selectedImageToAdd)

    const cleanup = () => {
        setTitle('')
        setPublish(true)
        dispatch(setSelectedImageRedux([]))
        dispatch(setSelectedProduct([]))
    }
    const getData = () => {
        dispatch(fetchGallery());
        dispatch(fetchProducts())
    }
    useEffect(() => {
        cleanup();
        getData();
    }, [])

    const handleSubmitForm = async (e, closeFunc) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append("title", title);
        formData.append("publish", publish);
        formData.append("content", content);
        formData.append("image", selectedImageToAdd.map((image) => image.id));
        formData.append("suggestProduct", selectedProduct.map((product) => product.id));

        const res = await fetch('/api/media_aplication', {
            method: 'POST',
            body: formData,
        })

        if (res.ok) {
            toast.success('Berhasil menambahkan media aplication')
            dispatch(setSelectedImageRedux([]))
            dispatch(setSelectedProduct([]))
            dispatch(fetchMediaAplication())
            cleanup();
            closeFunc();
            router.refresh()
        } else {
            const errorMsg = await getResponseData(res);
            dispatch(setSelectedImageRedux([]))
            dispatch(setSelectedProduct([]))
            closeFunc();
            toast.error(errorMsg)
        }
    }
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Button onPress={onOpen} color='primary' className="text-primary-button">Add content</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size='4xl' placement='center' scrollBehavior='outside'>
                <ModalContent>
                    {(onClose) => (
                        <form onSubmit={(e) => {
                            handleSubmitForm(e, onClose)
                        }} className='flex flex-col gap-3'>
                            <ModalHeader className="flex flex-col gap-1">Add new media aplication</ModalHeader>
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
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                    <label className="text-primary text-small font-bold">Content</label>
                                    <Editor value={content} onChange={setContent} />

                                    <label className="text-primary text-small font-bold">Image</label>

                                    <ImageSelector imageData={selectedImageToAdd} />

                                    <SuggestProduct dataProduct={selectedProduct} />

                                    <Switch isSelected={publish} onValueChange={setPublish} size='sm' className='pt-3'>
                                        Publish product
                                    </Switch>

                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={() => {
                                    dispatch(setSelectedProduct([]))
                                    onClose()
                                }}>
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