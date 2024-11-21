"use client"
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Select, SelectItem, Textarea, Switch, Spinner } from '@nextui-org/react'
import React, { useEffect, useState, useRef, useMemo, forwardRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { BiEdit } from 'react-icons/bi';
import { fetchArticleCategory } from '@/redux/slices/article/ArticleCategory';
import { fetchArticle } from '@/redux/slices/article/Article';
import { Editor } from '@/components/Editor';

export default function Edit({ params }) {
  const dispatch = useDispatch()
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [title, setTitle] = useState(params.title)
  const [content, setContent] = useState(params.content);
  const [publish, setPublish] = useState(params.publish)
  const [category, setCategory] = useState(params.category.map((item) => item.id))

  const articleCategory = useSelector((state) => state.articlecategory.data)
  const articles = useSelector((state) => state.article.data)

  useEffect(() => {
    dispatch(fetchArticle())
    dispatch(fetchArticleCategory())
  }, [])

  const handleSelectionChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    let arr = [...category]
    let arr2 = arr.filter((item) => item !== ',')

    const res = await fetch(`/api/article/${params.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        content,
        publish,
        category: arr2
      }),
    })
    if (res.ok) {
      toast.success('Berhasil edit article')
      onOpenChange(close)
      dispatch(fetchArticle())
    } else {
      toast.error('Gagal edit article')
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
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='center' size='4xl'>
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handleSubmitForm}>
              <ModalHeader className="flex flex-col gap-1">Edit Region</ModalHeader>
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
                <Select
                  isRequired
                  items={articleCategory}
                  labelPlacement='outside'
                  selectionMode="multiple"
                  className="font-bold max-w-xs"
                  color='primary'
                  label="Category"
                  placeholder="Category"
                  variant="bordered"
                  id="category"
                  name="category"
                  selectedKeys={[...category]}
                  onChange={handleSelectionChange}
                >
                  {articleCategory.map((item) => (
                    <SelectItem key={item.id}>
                      {item.category}
                    </SelectItem>
                  ))}
                </Select>
                <Switch isSelected={publish} onValueChange={setPublish} size='sm'>
                  Edit article
                </Switch>
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
