"use client"
import { Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure, Input, Textarea, Select, SelectItem, ModalFooter, Spinner } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { fetchComponents } from '@/redux/slices/website/Components';
import Image from 'next/image';
import { pagesList } from '@/utils/pages';
import { Editor } from '@/components/Editor';
import { fetchPages } from '@/redux/slices/pages/Pages';
import ImageSelector from '@/components/imageSelector/ImageSelector';
import { fetchGallery } from '@/redux/slices/gallery';

export default function AddComponent() {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('');
  const [image, setImage] = useState([]);
  const [region, setRegion] = useState('')
  const [page, setPage] = useState('')
  const [regions, setRegions] = useState([])

  const selectedImageToAdd = useSelector((state) => state.imageSelectorRedux.selectedImageToAdd)

  useEffect(() => {
    // dispatch(fetchPages())
    dispatch(fetchGallery())
  }, [])

  const handleSubmitForm = async (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", selectedImageToAdd.map((image) => image.id));
    formData.append("region", region);
    formData.append("page", page);

    const res = await fetch('/api/website/component', {
      method: 'POST',
      body: formData
    })
    if (res.ok) {
      toast.success('Berhasil menambahkan component')
      dispatch(fetchComponents())
      onOpenChange(close)
      setContent('')
    } else {
      toast.error('Gagal menambahkan component')
    }
  }

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Button onPress={onOpen} color='primary' className="text-primary-button">Tambah</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size='4xl' placement='center' scrollBehavior='outside'>
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handleSubmitForm}>
              <ModalHeader className="flex flex-col gap-1">Tambah Component</ModalHeader>
              <ModalBody>
                <Input
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
                <div className="flex gap-3">
                  <Select
                    labelPlacement='outside'
                    className="font-bold"
                    color='primary'
                    label="Page"
                    placeholder="Page"
                    variant="bordered"
                    id="page"
                    name="page"
                    isRequired
                    onChange={(e) => {
                      const res = Object.keys(pagesList).filter((value) => {
                        return pagesList[value].page === e.target.value
                      })
                      setRegions(pagesList[res].regions)
                      setPage(e.target.value)
                    }}
                  >
                    {Object.keys(pagesList).map((item) => (
                      <SelectItem key={pagesList[item].page}>
                        {pagesList[item].page}
                      </SelectItem>
                    ))}
                  </Select>
                  <Select
                    labelPlacement='outside'
                    className="font-bold"
                    color='primary'
                    label="Region"
                    placeholder="Region"
                    variant="bordered"
                    id="region"
                    name="region"
                    isRequired
                    onChange={(e) => setRegion(e.target.value)}
                  >
                    {Object.keys(regions).map((item) => (
                      <SelectItem key={regions[item].region}>
                        {regions[item].region}
                      </SelectItem>
                    ))}
                  </Select>
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