"use client"
import { Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure, Select, SelectItem, ModalFooter, Input, Switch, Card, CardBody, Spinner, } from '@nextui-org/react'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { fetchProducts } from '@/redux/slices/product/Products';
import { useRouter } from 'next/navigation';
import { fetchProductTypes } from '@/redux/slices/product/ProductTypes';
import { fetchProductCategories } from '@/redux/slices/product/ProductCategories';
import { BiEdit, BiTrash } from 'react-icons/bi';
import { fetchGallery } from '@/redux/slices/gallery';
import ImageSelector from '@/components/imageSelector/ImageSelector';
import { hapusSelectedImage } from '@/redux/slices/imageSelectorRedux';
import { Editor } from '@/components/Editor';

export default function Edit({ params }) {
    const dispatch = useDispatch()
    const router = useRouter()
    const [title, setTitle] = useState(params.title)
    const [content, setContent] = useState(params.content)
    const [publish, setPublish] = useState(params.publish)
    const [productType, setProductType] = useState(params.productType.id)
    const [category, setCategory] = useState(params.category.map((item) => item.id))

    const productTypes = useSelector((state) => state.producttypes.data)
    const productCategories = useSelector((state) => state.productcategories.data)
    const selectedImageToAdd = useSelector((state) => state.imageSelectorRedux.selectedImageToAdd)

    const handleCategory = (e) => {
        setCategory(e.target.value);
    };

    const cleanup = () => {
        setTitle('')
        setPublish(true)
        setCategory([])
        setProductType('')
        dispatch(selectedImageToAdd([]))
    }
    const getData = () => {
        dispatch(fetchProductTypes())
        dispatch(fetchProductCategories())
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
        formData.append("productType", productType);
        formData.append("category", category);
        await selectedImageToAdd.map((item) => {
            formData.append('image', item.id);
        })

        const res = await fetch(`/api/product/${params.id}`, {
            method: 'PUT',
            body: formData,
        })
        if (res.ok) {
            toast.success('Berhasil edit product')
            dispatch(fetchProducts())
            onOpenChange(false)
        } else {
            toast.error('Gagal edit product')
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
                            <ModalHeader>Edit product</ModalHeader>
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
                                    <Select
                                        items={productTypes}
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
                                        onSelectionChange={(e) => setProductType(e.currentKey)}
                                    >
                                        {(productTypes) => <SelectItem>{productTypes.productType}</SelectItem>}
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