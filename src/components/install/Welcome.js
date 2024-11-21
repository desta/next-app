import { Button } from "@nextui-org/react";

const Welcome = ({ handleNextStep }) => {
  return (
    <div>
      <h1 className='text-2xl font-bold mb-2'>
        Selamat <span className="text-primary">datang!</span>
      </h1>
      <p>Merupakan suatu kebanggaan tersendiri bagi kami atas berkenannya menggunakan aplikasi ini, semoga aplikasi ini menunjang segala bentuk kebutuhan Anda.</p>
      <br></br>
      <p>Terima kasih.</p>
      <div className='pt-10 pb-5 flex justify-end items-center'>
        <Button variant='solid' color="secondary" onClick={handleNextStep}>
          Selanjutnya
        </Button>
      </div>
    </div>
  );
};

export default Welcome;