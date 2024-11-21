"use client"
import { Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure, Input, Textarea, Select, SelectItem, ModalFooter, Switch } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { MenuLokasi } from '@/utils/MenuLokasi';
import { fetchMenus } from '@/redux/slices/Menu';

export default function AddMenu() {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [path, setPath] = useState('');
  const [icon, setIcon] = useState('');
  const [lokasi, setLokasi] = useState('')
  const [subMenu, setSubmenu] = useState('')
  const [isSelected, setIsSelected] = React.useState(false);

  const menus = useSelector((state) => state.menu.data);

  useEffect(() => {
    dispatch(fetchMenus())
  }, [])

  const handleSubmitForm = async (e) => {
    e.preventDefault()
    if (isSelected === false) {
      const res = await fetch('/api/menu', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          path,
          icon,
          lokasi,
        }),
      })
      if (res.ok) {
        toast.success('Berhasil menambahkan menu')
        onOpenChange(close)
        dispatch(fetchMenus())
      } else {
        toast.error('Gagal menambahkan menu')
      }
    }else{
      const res = await fetch('/api/menu/submenu', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          path,
          icon,
          subMenu,
          lokasi,
        }),
      })
      if (res.ok) {
        toast.success('Berhasil menambahkan menu')
        onOpenChange(close)
        dispatch(fetchMenus())
      } else {
        toast.error('Gagal menambahkan menu')
      }
    }

  }

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Button onPress={onOpen} color='primary' className="text-primary-button">Tambah</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='center' size='4xl' scrollBehavior='outside'>
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handleSubmitForm}>
              <ModalHeader className="flex flex-col gap-1">Tambah menu</ModalHeader>
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
                <Switch isSelected={isSelected} onValueChange={setIsSelected} size="sm">Sebagai sub menu</Switch>
                {isSelected === true &&
                  <Select
                    items={menus}
                    labelPlacement='outside'
                    className="font-bold max-w-xs"
                    color='primary'
                    label="Parent menu"
                    placeholder="Parent menu"
                    variant="bordered"
                    id="submenu"
                    name="submenu"
                    selectedKeys={[subMenu]}
                    onSelectionChange={(e) => setSubmenu(e.currentKey)}
                  >
                    {(menus) => <SelectItem>{menus.title}</SelectItem>}
                  </Select>
                }
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
                  onChange={(e) => setPath(e.target.value)}
                />
                {isSelected === false &&
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
                    onChange={(e) => setLokasi(e.target.value)}
                  >
                    {Object.keys(MenuLokasi).map((item) => (
                      <SelectItem key={MenuLokasi[item].name}>
                        {MenuLokasi[item].name}
                      </SelectItem>
                    ))}
                  </Select>
                }
                <Input
                  labelPlacement='outside'
                  description='Only bootstrap icon e.g. <i class="bi bi-hand-thumbs-up"></i>'
                  className="font-bold"
                  color='primary'
                  label="Icon"
                  placeholder="Icon name"
                  variant="bordered"
                  name="icon"
                  id="icon"
                  onChange={(e) => setIcon(e.target.value)}
                />
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