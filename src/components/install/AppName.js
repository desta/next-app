import { pagesList } from "@/utils/pages";
import { Button, Divider, Input, Select, SelectItem } from "@nextui-org/react";
import { useState } from "react";
import { MdDashboard } from "react-icons/md";

const AppName = ({ formData, handleChangeInput, handlePrevStep, handleNextStep }) => {

  let disabled = true;
  if (formData.namaapp !== '') {
    disabled = false;
  }

  return (
    <>
      <div className="pb-5">
        <p className="text-2xl font-bold">Setting <span className="text-primary">APP</span></p>
        <p className="text-small text-default-500">Nama APP bisa apapun</p>
      </div>

      <div className='flex gap-3 flex-wrap pt-5'>
        <Input
          endContent={
            <MdDashboard className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }
          color="primary"
          placeholder="App"
          labelPlacement="outside"
          label="Nama App"
          variant="bordered"
          name="namaapp"
          id="namaapp"
          value={formData.namaapp}
          onChange={(e) => handleChangeInput(e)}
          className="max-w-xs font-bold"
        />
        <Select
          labelPlacement='outside'
          className="max-w-xs font-bold"
          color='primary'
          label="Homepage"
          placeholder="Homepage"
          variant="bordered"
          id="homepage"
          name="homepage"
          isRequired
          onChange={(e) => handleChangeInput(e)}
        >
          {Object.keys(pagesList).map((item) => (
            <SelectItem key={pagesList[item].page}>
              {pagesList[item].page}
            </SelectItem>
          ))}
        </Select>
      </div>

      <div className='pt-10 pb-5 flex justify-between items-center'>
        <Button variant='ghost' color="secondary" onClick={handlePrevStep}>
          Kembali
        </Button>

        <Button variant='solid' color="secondary" isDisabled={disabled} onClick={handleNextStep}>
          Selanjutnya
        </Button>
      </div>
    </>
  );
};

export default AppName;