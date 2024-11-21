"use client"
import { Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure, Input, Switch, Select, SelectItem, ModalFooter, Spinner } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { fetchArticle } from '@/redux/slices/article/Article';
import { fetchArticleCategory } from '@/redux/slices/article/ArticleCategory';
import { Editor } from '@/components/Editor';


export default function Tambah() {
  const dispatch = useDispatch()
  const [title, setTitle] = useState()
  const [content, setContent] = useState();
  const [publish, setPublish] = useState(true)
  const [category, setCategory] = useState([])
  const [image, setImage] = useState()
  const articleCategory = useSelector((state) => state.articlecategory.data)
  const articles = useSelector((state) => state.article.data)

  useEffect(() => {
    dispatch(fetchArticle())
    dispatch(fetchArticleCategory())
  }, [])

  const handleSubmitForm = async (e) => {
    e.preventDefault()
    let arr = [...category]
    let arr2 = arr.filter((item) => item !== ',')

    const res = await fetch('/api/article', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        content,
        publish,
        image,
        category: arr2
      }),
    })
    if (res.ok) {
      toast.success('Berhasil menambahkan article')
      dispatch(fetchArticle())
      onOpenChange(close)
      setTitle('')
      setContent('')
      setPublish(true)
      setCategory([])
    } else {
      toast.error('Gagal menambahkan component')
    }
  }

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Button onPress={onOpen} color='primary' className="text-primary-button">Tambah</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='center' size='4xl'>
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handleSubmitForm}>
              <ModalHeader className="flex flex-col gap-1">Tambah article</ModalHeader>
              <ModalBody>
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
                <Input
                  isRequired
                  labelPlacement='outside'
                  className="font-bold"
                  color='primary'
                  label="Image"
                  placeholder="Image name"
                  variant="bordered"
                  name="image"
                  id="image"
                  onChange={(e) => setImage(e.target.value)}
                />

                <Select
                  labelPlacement='outside'
                  selectionMode="multiple"
                  className="font-bold max-w-xs"
                  color='primary'
                  label="Category"
                  placeholder="Category"
                  variant="bordered"
                  id="category"
                  name="category"
                  isRequired
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {articleCategory.map((item) => (
                    <SelectItem key={item.id}>
                      {item.category}
                    </SelectItem>
                  ))}
                </Select>
                <Switch isSelected={publish} onValueChange={setPublish} size='sm'>
                  Publish article
                </Switch>
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