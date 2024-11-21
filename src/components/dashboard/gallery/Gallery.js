'use client'
import { fetchGallery } from '@/redux/slices/gallery';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Card, CardBody, Chip, Input } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { BiSearch, BiTrash } from 'react-icons/bi';
import { FaCheck, FaX } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';

export default function Gallery() {
    const dispatch = useDispatch();
    const router = useRouter();
    const [image, setImage] = useState([])
    const [selectedImage, setSelectedImage] = useState([])
    const [selectedImageToAdd, setSelectedImageToAdd] = useState([])
    const gallery = useSelector((state) => state.gallery.data);

    const cleanupAndgetData = () => {
        setImage([]);
        setSelectedImageToAdd([]);
        setSelectedImage([]);
        dispatch(fetchGallery());
    }
    const getData = () => {
        dispatch(fetchGallery());
    }
    useEffect(() => {
        getData();
    }, [])

    const handleFile = (e) => {
        let file = e.target.files;
        for (let i = 0; i < file.length; i++) {
            const fileType = file[i]['type'];
            const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
            if (validImageTypes.includes(fileType)) {
                setImage(prev => {
                    return [...prev, file[i]]
                });
            } else {
                toast.error('File harus berupa gambar')
            }
        }
    };
    const fileUpload = useRef(null);

    const removeImage = (i) => {
        setImage(image.filter(x => x.name !== i));
    }

    const removeAllImage = () => {
        setImage([]);
    }

    const handleSubmitForm = async (e) => {
        e.preventDefault()

        const formData = new FormData();

        image.map((item, index) => {
            formData.append('images', item, item.name);
        })

        const res = await fetch('/api/gallery', {
            method: 'POST',
            body: formData,
        })
        if (res.ok) {
            toast.success('Berhasil menambahkan gallery')
            cleanupAndgetData();
            router.refresh();
        } else {
            toast.error('Gagal menambahkan gallery')
        }
    }
    const handleImageClick = (img) => {
        if (!selectedImage.includes(img.image)) {
            setSelectedImage(prev => {
                return [...prev, img.image]
            });
            setSelectedImageToAdd(prev => {
                return [...prev, img]
            });
        } else if (selectedImage.includes(img.image)) {
            setSelectedImage(prev => prev.filter(item => item !== img.image));
            setSelectedImageToAdd(prev => prev.filter(item => item !== img));
        }
    }
    const handleDelete = async (e) => {
        e.preventDefault()
        const res = await fetch(`/api/gallery`, {
            method: 'DELETE',
            body: JSON.stringify({ imagesData: selectedImageToAdd })
        })
        if (res.ok) {
            cleanupAndgetData();
            toast.success('Berhasil hapus image')
        }
    }
    const unselectAll = () => {
        setSelectedImage([]);
        setSelectedImageToAdd([]);
    }
    const selectAll = () => {
        setSelectedImage([]);
        setSelectedImageToAdd([])
        gallery.map((img) => {
            setSelectedImage(prev => {
                return [...prev, img.image]
            });
            setSelectedImageToAdd(prev => {
                return [...prev, img]
            });
        })
    }
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    return (
        <>
            <div className="flex w-full flex-col gap-4">
                <form onSubmit={handleSubmitForm} className='flex flex-col gap-3'>
                    <Card>
                        <CardBody>
                            {image.length !== 0 &&
                                <div className="flex flex-wrap gap-2 pb-3">
                                    {image.map((file, key) => {
                                        return (
                                            <div key={key} className="overflow-hidden relative">
                                                <Button onClick={() => { removeImage(file.name) }} className="absolute right-0 bottom-0 cursor-pointer" size='sm' color="secondary" isIconOnly><BiTrash className='w-4 h-4' /></Button>
                                                <img className="h-24 w-24 rounded-md border border-primary p-2" src={URL.createObjectURL(file)} />
                                            </div>
                                        )
                                    })}
                                </div>
                            }
                            <div className='flex gap-2 items-center'>
                                <p className="text-primary text-small font-bold">Add new image</p>
                                <Button color='secondary' size='sm' className='max-w-[100px]'>
                                    <input type="file" onChange={handleFile} ref={fileUpload} className="opacity-0 z-10 absolute hover:cursor-pointer" multiple="multiple" name="files[]" />
                                    <span>Insert image</span>
                                </Button>
                            </div>
                            {image.length !== 0 &&
                                <div className='flex gap-2 justify-end pt-5'>
                                    <Button color="danger" variant='bordered' onClick={removeAllImage} >
                                        Clear
                                    </Button>
                                    <Button type='submit' color="secondary">
                                        Upload
                                    </Button>
                                </div>
                            }
                        </CardBody>
                    </Card>
                </form>
                {gallery.length > 0 &&
                    <Card>
                        <CardBody>
                            <div className="flex flex-col md:flex-row gap-2 relative">
                                <div className='flex gap-2 flex-col w-full'>
                                    <div className='flex justify-between items-center w-full'>
                                        <Input
                                            isClearable
                                            className="max-w-xs"
                                            placeholder="Search by title..."
                                            startContent={<BiSearch />}
                                            // value={filterValue}
                                            // onClear={() => onClear()}
                                            // onValueChange={onSearchChange}
                                            color='primary'
                                        />
                                        {selectedImage.length >= 1 ?
                                            <p className='text-sm italic text-nowrap'>Selected {selectedImage.length} / {gallery.length}</p>
                                            :
                                            <p className='text-sm italic text-nowrap'>Total {gallery.length} image.</p>
                                        }
                                    </div>
                                    <div className='flex gap-2 flex-wrap max-h-[calc(100vh-300px)] overflow-y-scroll'>
                                        {gallery.map((img, key) => {
                                            return (
                                                <div className='block' key={key}>
                                                    <div className="relative hover:cursor-pointer" onClick={() => handleImageClick(img)}>
                                                        <img className={selectedImage.includes(img.image) ? 'h-24 w-24 border border-transparent rounded-md p-2 bg-primary-300' : 'h-24 w-24 rounded-md border border-default-200 p-2'} src={img.image} alt={img.alt} />
                                                    </div>
                                                    <p className='w-24 text-center text-xs px-1 truncate ...'>{img.name}</p>
                                                </div>

                                            )
                                        })}
                                    </div>
                                </div>

                                <div className={`${selectedImage.length >= 1 ? 'block' : 'hidden'} md:relative w-full bottom-0 md:max-w-[250px]`}>
                                    {selectedImage.length === 1 && (
                                        <div className='bg-primary-200 p-2 rounded-medium'>
                                            <p className='pb-2'>Detail image:</p>
                                            <div className='flex flex-wrap gap-1'>
                                                <Input
                                                    className="font-bold"
                                                    radius='none'
                                                    color='primary'
                                                    label="Name"
                                                    placeholder="Image name"
                                                    variant="underlined"
                                                    name="name"
                                                    id="name"
                                                    value={selectedImage[0].name}
                                                />
                                                <Input
                                                    className="font-bold"
                                                    radius='none'
                                                    color='primary'
                                                    label="Description"
                                                    placeholder="description image"
                                                    variant="underlined"
                                                    name="description"
                                                    id="description"
                                                />
                                                <Input
                                                    className="font-bold"
                                                    radius='none'
                                                    color='primary'
                                                    label="Alt"
                                                    placeholder="Alt image"
                                                    variant="underlined"
                                                    name="alt"
                                                    id="alt"
                                                />
                                            </div>
                                            <div className='flex gap-2 justify-end pt-2'>
                                                <Button color="secondary" onClick={removeAllImage} >
                                                    Edit
                                                </Button>
                                                <Button color="danger" onClick={handleDelete} >
                                                    Delete
                                                </Button>
                                            </div>
                                        </div>
                                    )}

                                    {selectedImage.length > 1 && (
                                        <>
                                            <div className='bg-primary-200 p-2 rounded-medium'>
                                                <p className='pb-2'>Selected image:</p>
                                                <div className='flex gap-2'>
                                                    <Chip
                                                        startContent={<FaX />}
                                                        variant="solid"
                                                        color="danger"
                                                        onClick={unselectAll}
                                                        className='hover:cursor-pointer'
                                                    >
                                                        Clear selected
                                                    </Chip>

                                                    <Chip
                                                        startContent={<FaCheck />}
                                                        variant="solid"
                                                        color="secondary"
                                                        onClick={selectAll}
                                                        className='hover:cursor-pointer'
                                                    >
                                                        Select all
                                                    </Chip>
                                                </div>
                                            </div>
                                            <div className='flex gap-2 items-center bg-primary-200 p-2 rounded-medium mt-2'>
                                                <p>Delete selected image:</p>
                                                <Button color="danger" onPress={onOpen}>
                                                    Delete
                                                </Button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                }
            </div>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='center'>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Delete selected image</ModalHeader>
                            <ModalBody>
                                Are you sure to delete all selected image in this gallery?
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="secondary" onPress={onClose} onClick={handleDelete}>
                                    Yes sure!
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}