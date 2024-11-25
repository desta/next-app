"use client"
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Select, SelectItem, Textarea, Spinner } from '@nextui-org/react'
import React, { useEffect, useState, useRef, useMemo, forwardRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { BiEdit } from 'react-icons/bi';
import { fetchComponents } from '@/redux/slices/website/Components';
import { Editor } from '@/components/Editor';
import { PagesList } from '@/utils/Pages';
import { fetchPages } from '@/redux/slices/pages/Pages';
import ImageSelector from '@/components/imageSelector/ImageSelector';
import { fetchGallery } from '@/redux/slices/gallery';
import { fetchApp } from '@/redux/slices/app';

export default function Edit({ params }) {
  const dispatch = useDispatch()
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [title, setTitle] = useState(params.title)
  const [content, setContent] = useState(params.content)
  const [page, setPage] = useState(params.page)
  const [regions, setRegions] = useState([])
  const [region, setRegion] = useState(params.region)
  const [urutan, setUrutan] = useState(params.urutan)
  const selectedImageToAdd = useSelector((state) => state.imageSelectorRedux.selectedImageToAdd)
  const app = useSelector((state) => state.app.data)

  const a = Object.keys(PagesList).filter((x) => {
    return PagesList[x].title === app.homepage
  })

  useEffect(() => {
    dispatch(fetchApp())
    dispatch(fetchPages())
    dispatch(fetchGallery())
    const res = Object.keys(PagesList[a].pages).filter((value) => {
      return PagesList[a].pages[value].title === page
    })
    setRegions(PagesList[a].pages[res].regions)
  }, [])

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", params.id);
    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", selectedImageToAdd.map((image) => image.id));
    formData.append("region", region);
    formData.append("page", page);
    formData.append("urutan", urutan);
    const res = await fetch(`/api/component/${params.id}`, {
      method: 'PUT',
      body: formData
    })
    if (res.ok) {
      toast.success('Berhasil edit component')
      onOpenChange(close)
      dispatch(fetchComponents())
    } else {
      toast.error('Gagal edit component')
    }
  }
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
            <form onSubmit={handleSubmitForm}>
              <ModalHeader className="flex flex-col gap-1">Edit Component</ModalHeader>
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
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <label className="text-primary text-small font-bold">Content</label>
                <Editor value={content} onChange={setContent} />
                <label className="text-primary text-small font-bold">Image</label>
                <ImageSelector what={"edit"} imageData={params.image} />
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
                    selectedKeys={[page]}
                    onChange={(e) => {
                      const res = Object.keys(PagesList[a].pages).filter((value) => {
                        return PagesList[a].pages[value].title === e.target.value
                      })
                      setRegions(PagesList[a].pages[res].regions)
                      setPage(e.target.value)
                    }}
                  >
                    {Object.keys(PagesList[a].pages).map((item) => (
                      <SelectItem key={PagesList[a].pages[item].title}>
                        {PagesList[a].pages[item].title}
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
                    selectedKeys={[region]}
                    onChange={(e) => setRegion(e.target.value)}
                  >
                    {Object.keys(regions).map((item) => (
                      <SelectItem key={regions[item].title}>
                        {regions[item].title}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
                <Input
                  labelPlacement='outside'
                  className="font-bold w-[70px]"
                  color='primary'
                  label="Urutan"
                  placeholder="Urutan"
                  variant="bordered"
                  name="urutan"
                  id="urutan"
                  value={urutan}
                  onChange={(e) => setUrutan(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Keluar
                </Button>
                <Button type='submit' color="secondary" onPress={onClose}>
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
