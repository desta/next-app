import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const StepFinal = () => {
  const router = useRouter()
    return (
      <div className="flex flex-col items-center justify-center gap-5 h-full">
        <h1 className='text-2xl font-bold mb-2'>
          Selesai!
        </h1>
        <p className="pb-5">Instalasi app Anda sudah selesai, silahkan log in untuk memulai.</p>
        <Link href='/login'>
          <Button variant='solid' color="secondary">
            Log in
          </Button>
        </Link>
      </div>
    );
  };
  
  export default StepFinal;