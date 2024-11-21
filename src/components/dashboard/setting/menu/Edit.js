"use client"
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Select, SelectItem, Textarea } from '@nextui-org/react'
import React, { useEffect, useState, useRef, useMemo, forwardRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { BiEdit } from 'react-icons/bi';
import { fetchMenus } from '@/redux/slices/Menu';
import { MenuLokasi } from '@/utils/MenuLokasi';
// import parse from 'html-react-parser';

export default function Edit({ params }) {
  const dispatch = useDispatch()
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [title, setTitle] = useState(params.title)
  const [path, setPath] = useState(params.path);
  const [icon, setIcon] = useState(params.icon);
  const [lokasi, setLokasi] = useState(params.lokasi);
  const [urutan, setUrutan] = useState(params.urutan);


  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/menu/${params.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        path,
        icon,
        lokasi,
        urutan: parseInt(urutan),
      }),
    })
    if (res.ok) {
      toast.success('Berhasil edit menu')
      onOpenChange(close)
      dispatch(fetchMenus())
    } else {
      toast.error('Gagal edit menu')
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
              <ModalHeader className="flex flex-col gap-1">Edit menu</ModalHeader>
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
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <Input
                  isRequired
                  labelPlacement='outside'
                  className="font-bold"
                  color='primary'
                  label="Path"
                  placeholder="Path name"
                  variant="bordered"
                  name="path"
                  id="path"
                  value={path}
                  onChange={(e) => setPath(e.target.value)}
                />

                <Select
                  labelPlacement='outside'
                  className="font-bold"
                  color='primary'
                  label="Lokasi"
                  placeholder="Lokasi"
                  variant="bordered"
                  id="lokasi"
                  name="lokasi"
                  isRequired
                  selectedKeys={[lokasi]}
                  onSelectionChange={(e) => {
                    setLokasi(e.currentKey);
                  }}
                >
                  {Object.keys(MenuLokasi).map((item) => (
                    <SelectItem key={MenuLokasi[item].name}>
                      {MenuLokasi[item].name}
                    </SelectItem>
                  ))}
                </Select>
                <Input
                  labelPlacement='outside'
                  className="font-bold"
                  color='primary'
                  label="Icon"
                  placeholder="Icon name"
                  variant="bordered"
                  name="icon"
                  id="icon"
                  value={icon}
                  onChange={(e) => setIcon(e.target.value)}
                />
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
