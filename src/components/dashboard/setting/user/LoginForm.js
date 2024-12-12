"use client";
import { Button, Card, Divider, Input } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { BiUser } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { toast } from 'react-hot-toast';
import { GoEye, GoEyeClosed } from "react-icons/go";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccount } from "@/redux/slices/account";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { fetchApp } from "@/redux/slices/app";
import { socket } from "@/socket";

let validationSchema = yup.object().shape({
  username: yup.string().required("Tidak boleh kosong"),
  password: yup.string().required("Tidak boleh kosong"),
});

export default function LoginForm() {
  const router = useRouter();
  let usernameAlreadySelected = false;
  const dispatch = useDispatch()
  const app = useSelector((state) => state.app.data);
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    setError,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    dispatch(fetchApp())
  }, [])

  const onUsernameSelection = (username) => {
    usernameAlreadySelected = true;
    socket.auth = { username };
    socket.connect();
  }

  const handleSubmitForm = async (data) => {
    setLoading(true);
    const res = await signIn("credentials", {
      username: data.username,
      password: data.password,
      redirect: false,
    });
    setLoading(false);
    // console.log('ini dari login res', res);
    if (res?.error) {
      // setError("errorMessage", { message: res.detail ?? "Username atau password salah", type: "error" });
      toast.error("Username atau password salah");
      setError("username", { message: res.detail, type: "error" });
      setError("password", { message: res.detail, type: "error" });
    } else {
      dispatch(fetchAccount())
      router.push('/dashboard');
      // toast.success('Selamat datang!!');
      onUsernameSelection(data.username);
    }
  };
  return (
    <div className='flex flex-col gap-2 items-center justify-center h-screen bg-primary'>
      <Card className="min-w-[380px] max-w-md p-5 shadow-lg">
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <p className="text-2xl font-bold">Log <span className="text-primary">in</span></p>
          <p className="text-xs pb-5">Isi form dibawah ini untuk masuk.</p>
          <p className="text-tiny text-danger pb-2">
            {errors.errorMessage?.message}
          </p>
          <div className="flex flex-col gap-2">
            <Input
              labelPlacement='outside'
              color='primary'
              endContent={
                <BiUser className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              }
              label="Username"
              placeholder="Username"
              variant="bordered"
              name="username"
              isInvalid={!!errors.username}
              errorMessage={errors.username?.message}
              {...register("username", { required: "Tidak boleh kosong" })}
              value={username}
              onValueChange={setUsername}
              className="font-bold border-primary"
              isDisabled={loading}
            />
            <Input
              labelPlacement='outside'
              color='primary'
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
              label="Password"
              placeholder="Enter your password"
              variant="bordered"
              name="password"
              id="password"
              isInvalid={!!errors.password}
              errorMessage={errors.password?.message}
              {...register("password", { required: "Tidak boleh kosong" })}
              value={password}
              onValueChange={setPassword}
              className="font-bold"
              isDisabled={loading}
            />
          </div>
          <div className="flex items-center justify-end pt-5">
            {loading ? (
              <Button type="submit" color="secondary" className="font-bold" fullWidth isLoading>
                Login in...
              </Button>
            ) : (
              <Button type="submit" color="secondary" className="font-bold" fullWidth>
                Log in
              </Button>)}
          </div>
        </form>
        {app.googleLogin === true &&
          <>
            <div className="text-center p-3 flex items-center justify-center gap-2"><Divider />atau<Divider /></div>
            <Button color="secondary" variant="ghost" className="font-bold" fullWidth onClick={() => signIn('google')}>
              <FcGoogle /> Login Google
            </Button>
          </>
        }
      </Card>
    </div>
  );
}
