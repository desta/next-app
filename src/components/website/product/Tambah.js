"use client"
import { Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure, Select, SelectItem, ModalFooter, Input, Switch, Card, CardBody, Spinner, } from '@nextui-org/react'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { fetchProducts } from '@/redux/slices/product/Products';
import { useRouter } from 'next/navigation';
import { fetchProductTypes } from '@/redux/slices/product/ProductTypes';
import { fetchProductCategories } from '@/redux/slices/product/ProductCategories';
import { fetchGallery } from '@/redux/slices/gallery';
import ImageSelector from '@/components/imageSelector/ImageSelector';
import { hapusSelectedImage, setSelectedImageRedux } from '@/redux/slices/imageSelectorRedux';
import {  getResponseData } from '@/utils/getResponseData';
import { Editor } from '@/components/Editor';

export default function Tambah() {
    const dispatch = useDispatch()
    const router = useRouter()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [publish, setPublish] = useState(true)
    const [productType, setProductType] = useState('')
    const [category, setCategory] = useState([])

    const productTypes = useSelector((state) => state.producttypes.data)
    const productCategories = useSelector((state) => state.productcategories.data)
    const selectedImageToAdd = useSelector((state) => state.imageSelectorRedux.selectedImageToAdd)

    const handleProductType = (e) => {
        setProductType(e.target.value);
    };
    const handleCategory = (e) => {
        console.log('handle category tambah product',e.target.value)
        setCategory(e.target.value);
    };

    const cleanup = () => {
        setTitle('')
        setContent('')
        setPublish(true)
        setCategory([])
        setProductType('')
        dispatch(setSelectedImageRedux([]))
    }
    const getData = () => {
        dispatch(fetchProductTypes())
        dispatch(fetchProductCategories())
        dispatch(fetchGallery());
    }
    useEffect(() => {
        cleanup();
        getData();
    }, [])

    const handleSubmitForm = async (e, closeFunc) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("publish", publish);
        formData.append("productType", productType);
        formData.append("image", selectedImageToAdd.map((image) => image.id));
        await category.split(',').map((item) => {
            formData.append('category', item);
        });

        const res = await fetch('/api/product', {
            method: 'POST', 
            body: formData,
        })

        if (res.ok) {
            toast.success('Berhasil menambahkan product')
            dispatch(fetchProducts())
            dispatch(setSelectedImageRedux([]))
            cleanup();
            closeFunc();
            router.refresh()
        } else {
            const errorMsg = await getResponseData(res);
            dispatch(setSelectedImageRedux([]))
            dispatch(fetchProducts())
            closeFunc();
            toast.error(errorMsg)
        }
    }
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Button onPress={onOpen} color='primary' className="text-primary-button">Add product</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size='4xl' placement='center' scrollBehavior='outside'>
                <ModalContent>
                    {(onClose) => (
                        <form onSubmit={(e)=>{
                            handleSubmitForm(e, onClose)}} className='flex flex-col gap-3'>
                            <ModalHeader className="flex flex-col gap-1">Add new product</ModalHeader>
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
                                    
                                    <Select
                                        items={productType}
                                        labelPlacement='outside'
                                        className="font-bold max-w-xs"
                                        color='primary'
                                        label="Product type"
                                        placeholder="Product type"
                                        variant="bordered"
                                        id="productType"
                                        name="productType"
                                        isRequired
                                        selectedKeys={[productType]}
                                        onChange={handleProductType}

                                    >
                                        {productTypes.map((item) => (
                                            <SelectItem key={item.id}>
                                                {item.productType}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                    <Select
                                        items={productCategories}
                                        selectionMode="multiple"
                                        labelPlacement='outside'
                                        className="font-bold max-w-xs"
                                        color='primary'
                                        label="Category"
                                        placeholder="Product category"
                                        variant="bordered"
                                        id="category"
                                        name="category"
                                        isRequired
                                        selectedKeys={[...category]}
                                        onChange={handleCategory}
                                    >
                                        {productCategories.filter((item) => item.productTypeId == productType).map((item) => (
                                            <SelectItem key={item.id}>
                                                {item.category}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                    <Switch isSelected={publish} onValueChange={setPublish} size='sm' className='pt-3'>
                                        Publish product
                                    </Switch>

                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={() => {
                                    dispatch(setSelectedImageRedux([]))
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