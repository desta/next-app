"use client"
import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import { BiEnvelope, BiUser } from "react-icons/bi";
import { GoEye, GoEyeClosed } from "react-icons/go";

const UserAdministrator = ({ formData, handleChangeInput, handlePrevStep, handleNextStep, errors, register }) => {

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  let disabled = true;
  if (formData.name && formData.email && formData.username && formData.password !== '') {
    disabled = false;
  }

  return (
    <>
      <div className="pb-5">
        <p className="text-2xl font-bold">Setting <span className="text-primary">app login</span></p>
        <p className="text-small text-default-500">Setting user dengan akses Administrator</p>
      </div>
      <div className='flex gap-3 flex-wrap pt-5'>
        <Input
          endContent={
            <BiUser className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }
          color="primary"
          placeholder="Nama Anda"
          labelPlacement="outside"
          label="Nama"
          variant="bordered"
          name="name"
          id="name"
          value={formData.name}
          onChange={(e) => handleChangeInput(e)}
          className="max-w-xs font-bold"
        />
        <Input
          endContent={
            <BiEnvelope className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }
          color="primary"
          placeholder="Email Anda"
          labelPlacement="outside"
          label="Email"
          variant="bordered"
          name="email"
          id="email"
          value={formData.email}
          onChange={(e) => handleChangeInput(e)}
          className="max-w-xs font-bold"
        />
        <Input
          endContent={
            <BiUser className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }
          color="primary"
          placeholder="Username Anda"
          labelPlacement="outside"
          label="Username"
          variant="bordered"
          name="username"
          id="username"
          isInvalid={!!errors.username}
          errorMessage={errors.username?.message}
          {...register("username")}
          value={formData.username}
          onChange={(e) => handleChangeInput(e)}
          className="max-w-xs font-bold"
        />

        <Input
          color="primary"
          labelPlacement="outside"
          label="Password"
          variant="bordered"
          name="password"
          id="password"
          placeholder="Password Anda"
          endContent={
            <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
              {isVisible ? (
                <GoEye className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <GoEyeClosed className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          type={isVisible ? "text" : "password"}
          className="max-w-xs font-bold"
          value={formData.password}
          onChange={(e) => handleChangeInput(e)}
        />
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

export default UserAdministrator;
