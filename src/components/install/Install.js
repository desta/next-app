'use client';
import React, { useEffect, useState } from 'react';
import StepFinal from './StepFinal';
import Welcome from './Welcome';
import UserAdministrator from './UserAdministrator';
import Konfirmasi from './Konfirmasi';
import { Progress } from '@nextui-org/react';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import AppName from './AppName';

let validationSchema = yup.object().shape({
  username: yup.string().required("Tidak boleh kosong"),
});

const initialFormData = {
  namaapp: '',  
  email: '',
  name: '',
  username: '',
  password: '',
  homepage: '',
};

const stepsArray = ['A', 'B', 'C', 'D', 'Final'];

const Install = () => {

  const [step, setStep] = useState('A');
  const [formData, setFormData] = useState(initialFormData);

  const [value, setValue] = useState(0);

  const {
    setError,
    register,
    reset,
    handleSubmit,
    formState: { errors },
} = useForm({
    resolver: yupResolver(validationSchema),
});

  // We need a method to go to next step
  const handleNextStep = () => {
    if (step === 'A') {
      setStep('B');
      setValue(25)
    }
    else if (step === 'B') {
      setStep('C');
      setValue(50)
    }
    else if (step === 'C') {
      setStep('D');
      setValue(75)
    }
    else if (step === 'D') {
      setStep('Final');
    }

  };

  // We need a method to go to prev step
  const handlePrevStep = () => {
    if (step === 'Final') {
      setStep('D')
      setValue(75)
    }
    else if (step === 'D') {
      setStep('C');
      setValue(50)
    }
    else if (step === 'C') {
      setStep('B');
      setValue(25)
    }
    else if (step === 'B') {
      setStep('A');
      setValue(0)
    }
  };

  // We need a method to update our formData
  const handleChangeInput = (event) => {
    const fieldName = event.target?.name;
    let fieldValue;
    fieldValue = event.target?.value;

    setFormData({
      ...formData,
      [fieldName]: fieldValue,
    });
  };

  // We need a method to do final operation
  const handleSubmitFormData = async (event) => {
    const fieldName = event.target?.name;
    let fieldValue;
    fieldValue = event.target?.value;

    const res = await fetch('/api/install', {
      method: 'POST',
      body: JSON.stringify({
        ...formData,
        [fieldName]: fieldValue,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (res.ok) {
      setStep('Final');
      setValue(100)
    }
    else {
      alert('Instalasi gagal, username sudah ada.');
      // setError("errorMessage", { message: res.detail ?? "<-- duplikat username", type: "error" });
      setError("username", { message: res.detail ?? "Duplikat username", type: "error" });
    }
  };

  useEffect(() => {
    // console.log(formData);
    setValue(value)
  }, []);

  // Section for render StepNumbers
  const renderTopStepNumbers = () => {
    return (
      <div>
        <div className={`${stepsArray['0'] === step ? 'font-bold bg-primary-200 text-primary rounded-e-medium ' : 'text-gray-500'} pl-2 py-3`} /*onClick={() => setStep('A')}*/ >
          Mukadimah
        </div>
        <div className={`${stepsArray['1'] === step ? 'font-bold bg-primary-200 text-primary rounded-e-medium ' : 'text-gray-500'} pl-2 py-3`} /*onClick={() => setStep('B')}*/ >
          Setting App
        </div>
        <div className={`${stepsArray['2'] === step ? 'font-bold bg-primary-200 text-primary rounded-e-medium ' : 'text-gray-500'} pl-2 py-3`} /*onClick={() => setStep('C')}*/ >
          Setting User
        </div>
        <div className={`${stepsArray['3'] === step ? 'font-bold bg-primary-200 text-primary rounded-e-medium ' : 'text-gray-500'} pl-2 py-3`} /*onClick={() => setStep('D')}*/ >
          Konfirmasi
        </div>
        <div className={`${stepsArray['4'] === step ? 'font-bold bg-primary-200 text-primary rounded-e-medium ' : 'text-gray-500'} pl-2 py-3`} /*onClick={() => setStep('Final')}*/ >
          Selesai
        </div>
      </div>
    );
  };

  return (
    <div className='w-screen p-2'>
      <div className='max-w-[1000px] mx-auto'>
        <div className='w-full bg-white text-primary-foreground shadow-lg rounded-medium'>
          <div className="py-5 px-2">
            <p className="text-4xl font-bold">Instalasi</p>
            <p className="text-small text-default-500">App</p>
          </div>
            <Progress
              aria-label="Downloading..."
              size="sm"
              value={value}
              color="primary"
              className="w-full"
              radius='none'
            />
          <div className='pt-3'>
            <div className='flex w-full'>
              <div className='w-[40%] pr-8 pb-10 hidden md:block'>
                {renderTopStepNumbers()}
              </div>
              <div className='w-full pl-2 pr-2 md:pr-10  pb-2'>
                {step === 'A' ? (
                  <Welcome
                    handleNextStep={handleNextStep}
                  />
                ) : null}
                {step === 'B' ? (
                  <AppName
                    formData={formData}
                    handleChangeInput={handleChangeInput}
                    handlePrevStep={handlePrevStep}
                    handleNextStep={handleNextStep}
                  />
                ) : null}
                {step === 'C' ? (
                  <UserAdministrator
                    formData={formData}
                    handleChangeInput={handleChangeInput}
                    handlePrevStep={handlePrevStep}
                    handleNextStep={handleNextStep}
                    errors={errors}
                    register={register}
                  />
                ) : null}
                {step === 'D' ? (
                  <Konfirmasi
                    formData={formData}
                    handleSubmitFormData={handleSubmitFormData}
                    handleSubmit={handleSubmit}
                    handlePrevStep={handlePrevStep}
                    errors={errors}
                  />
                ) : null}
                {step === 'Final' ? <StepFinal /> : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Install;