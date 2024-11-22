"use client"
import { Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure, Select, SelectItem, ModalFooter, Input, Switch, Card, CardBody, Spinner, } from '@nextui-org/react'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { fetchGallery } from '@/redux/slices/gallery';
import ImageSelector from '@/components/imageSelector/ImageSelector';
import { hapusSelectedImage, setSelectedImageRedux } from '@/redux/slices/imageSelectorRedux';
import { getResponseData } from '@/utils/getResponseData';
import { fetchPagesCategory } from '@/redux/slices/pages/PagesCategory';
import { fetchPages } from '@/redux/slices/pages/Pages';
import { LayoutList } from '@/utils/LayoutList';
import { fetchComponents } from '@/redux/slices/website/Components';
import { Editor } from '@/components/Editor';

export default function Tambah() {
    const dispatch = useDispatch()
    const router = useRouter()
    const [title, setTitle] = useState('')
    const [path, setPath] = useState('')
    const [layout, setLayout] = useState('')
    const [content, setContent] = useState('');
    const [publish, setPublish] = useState(true)
    const [category, setCategory] = useState([])
    const [preview, setPreview] = useState()

    useEffect(() => {
        dispatch(fetchComponents());
        if (layout === 'Layout 1') {
            setPreview('/asset/layout1.png')
        } else if (layout === 'Layout 2') {
            setPreview('/asset/layout2.png')
        } else if (layout === 'Layout 3') {
            setPreview('/asset/layout3.png')
        }
    }, [layout])

    const pagesCategory = useSelector((state) => state.PagesCategory.data)
    const selectedImageToAdd = useSelector((state) => state.imageSelectorRedux.selectedImageToAdd)

    const handleCategory = (e) => {
        console.log('handle category tambah product', e.target.value)
        setCategory(e.target.value);
    };

    const cleanup = () => {
        setTitle('')
        setContent('')
        setPublish(true)
        setCategory([])
        dispatch(setSelectedImageRedux([]))
    }
    const getData = () => {
        dispatch(fetchPagesCategory())
        dispatch(fetchGallery());
        dispatch(fetchPages())
    }
    useEffect(() => {
        cleanup();
        getData();
    }, [])

    const handleSubmitForm = async (e, closeFunc) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append("title", title);
        formData.append("path", path);
        formData.append("layout", layout);
        formData.append("content", content);
        formData.append("publish", publish);
        await selectedImageToAdd.map((item) => {
            formData.append('image', item.id);
        })
        await category.split(',').map((item) => {
            formData.append('category', item);
        });

        const res = await fetch('/api/pages', {
            method: 'POST',
            body: formData,
        })

        if (res.ok) {
            toast.success('Berhasil menambahkan page')
            dispatch(fetchPages())
            dispatch(setSelectedImageRedux([]))
            cleanup();
            closeFunc();
            onOpenChange(close)
            router.refresh()
        } else {
            const errorMsg = await getResponseData(res);
            dispatch(setSelectedImageRedux([]))
            dispatch(fetchPages())
            closeFunc();
            toast.error(errorMsg)
        }
    }
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Button onPress={onOpen} color='primary' className="text-primary-button">Add page</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='center' size='4xl' scrollBehavior='normal'>
                <ModalContent>
                    {(onClose) => (
                        <form onSubmit={(e) => {
                            handleSubmitForm(e, onClose)
                        }} className='flex flex-col gap-3'>
                            <ModalHeader className="flex flex-col gap-1">Add new page</ModalHeader>
                            <ModalBody>
                                <div className='max-h-[70vh] overflow-y-auto pr-2 flex flex-col gap-2'>
                                    <div className='flex gap-4'>
                                        <div className='w-full max-w-xs flex flex-col gap-2'>
                                            <Input
                                                isRequired
                                                labelPlacement='outside'
                                                className="font-bold max-w-xs"
                                                color='primary'
                                                label="Title"
                                                placeholder="Title name"
                                                variant="bordered"
                                                name="title"
                                                id="title"
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                            />
                                            <Input
                                                startContent={<span className='font-normal'>/</span>}
                                                isRequired
                                                labelPlacement='outside'
                                                className="font-bold max-w-xs"
                                                color='primary'
                                                label="Path name"
                                                placeholder="Path name"
                                                variant="bordered"
                                                name="path"
                                                id="path"
                                                value={path}
                                                onChange={(e) => setPath(e.target.value)}
                                            />
                                            <Select
                                                items={LayoutList}
                                                labelPlacement='outside'
                                                className="font-bold max-w-xs"
                                                color='primary'
                                                label="Layout"
                                                placeholder="Layout"
                                                variant="bordered"
                                                id="layout"
                                                name="layout"
                                                selectedKeys={[layout]}
                                                onSelectionChange={(e) => {
                                                    setLayout(e.currentKey);
                                                }}
                                            >
                                                {Object.keys(LayoutList).map((item) => (
                                                    <SelectItem key={LayoutList[item].layout}>
                                                        {LayoutList[item].layout}
                                                    </SelectItem>
                                                ))}
                                            </Select>
                                        </div>
                                        <div className='flex gap-1 items-center'>
                                            {layout !== '' &&
                                                <>
                                                    <p className='[writing-mode:vertical-rl] transform rotate-180 text-sm text-gray-500'>Layout preview</p>
                                                    <div>
                                                        <p className='text-sm text-gray-500 text-center'>Layout preview</p>
                                                        <img src={preview} alt="" className='h-44 w-auto pt-1 pl-1' />
                                                    </div>
                                                </>
                                            }
                                        </div>
                                    </div>
                                    <label className="text-primary text-small font-bold">Content</label>
                                    <Editor value={content} onChange={setContent} />

                                    <label className="text-primary text-small font-bold">Image</label>

                                    <ImageSelector imageData={selectedImageToAdd} />
                                    {/* <Select
                                        items={pagesCategory}
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
                                        {pagesCategory.map((item) => (
                                            <SelectItem key={item.id}>
                                                {item.category}
                                            </SelectItem>
                                        ))}
                                    </Select> */}
                                    <Switch isSelected={publish} onValueChange={setPublish} size='sm' className='pt-3'>
                                        Publish page
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