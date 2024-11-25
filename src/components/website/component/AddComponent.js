"use client"
import { Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure, Input, Textarea, Select, SelectItem, ModalFooter, Spinner } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { fetchComponents } from '@/redux/slices/website/Components';
import { Editor } from '@/components/Editor';
import ImageSelector from '@/components/imageSelector/ImageSelector';
import { fetchGallery } from '@/redux/slices/gallery';
import { fetchApp } from '@/redux/slices/app';
import { PagesList } from '@/utils/PagesList';

export default function AddComponent() {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('');
  const [image, setImage] = useState([]);
  const [page, setPage] = useState('')
  const [region, setRegion] = useState('')
  const [regions, setRegions] = useState([])

  const app = useSelector((state) => state.app.data)
  const selectedImageToAdd = useSelector((state) => state.imageSelectorRedux.selectedImageToAdd)

  const a = Object.keys(PagesList).filter((x) => {
    return PagesList[x].title === app.homepage
  })

  console.log('a', app.homepage)
  useEffect(() => {
    dispatch(fetchApp())
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

    const res = await fetch('/api/component', {
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
                      const res = Object.keys(PagesList[a].pages).filter((item) => {
                        return PagesList[a].pages[item].title === e.target.value
                      })
                      setRegions(PagesList[a].pages[res].regions)
                      setPage(e.target.value)
                    }}
                  >
                    {Object.keys(PagesList[a].pages).map((item) => {
                      // console.log('item', item)
                      return <SelectItem key={PagesList[a].pages[item].title}>
                        {PagesList[a].pages[item].title}
                      </SelectItem>
                    })}
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
                    {Object.keys(regions).map((item) => {
                      return <SelectItem key={regions[item].title}>
                        {regions[item].title}
                      </SelectItem>
                    })}
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