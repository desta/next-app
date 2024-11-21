import { Button } from "@nextui-org/react";

const Konfirmasi = ({
  formData,
  handlePrevStep,
  handleSubmit,
  handleSubmitFormData,
  errors
}) => {
  return (
    <>
      <div className="pb-5">
        <p className="text-2xl font-bold">Konfirmasi</p>
        <p className="text-small text-default-500">Konfirmasi input data</p>
      </div>

      <div className='pt-5 '>
        <table>
          <tbody>
            <tr>
              <td>Nama app</td>
              <td className="pl-2">: <span className="font-bold text-primary">{formData.namaapp}</span></td>
            </tr>
            <tr>
              <td>Homepage</td>
              <td className="pl-2">: <span className="font-bold text-primary">{formData.homepage}</span></td>
            </tr>
            <tr>
              <td>Nama user</td>
              <td className="pl-2">: <span className="font-bold text-primary">{formData.name} </span></td>
            </tr>
            <tr>
              <td>Email</td>
              <td className="pl-2">: <span className="font-bold text-primary">{formData.email} </span></td>
            </tr>
            <tr>
              <td>Username</td>
              <td className="pl-2">: <span className="font-bold text-primary">{formData.username}</span>
              </td>
            </tr>
            <tr>
              <td>Password</td>
              <td className="pl-2">: <span className="font-bold text-primary">{formData.password}</span></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className='pt-10 pb-5 flex justify-between items-center'>
        <Button variant='ghost' color="secondary" onClick={handlePrevStep}>
          Kembali
        </Button>

        <Button variant='solid' color="secondary" onClick={handleSubmit(handleSubmitFormData)}>
          Simpan
        </Button>
      </div>
    </>
  );
};

export default Konfirmasi;
