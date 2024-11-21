import { prisma } from "@/libs/prisma"
import mime from "mime";
import { join } from "path";
import { stat, mkdir, writeFile, unlink } from "fs/promises";
import _ from "lodash";

export async function PUT (req, res) {
  const dataLama = await prisma.app.findUnique({
    where:{
      id: 0
    }
  })
  .catch(error => {
    return Response.json(
      { error: "Something data not keambil." },
      { status: 500 }
    );
  }) 

  console.log('Data dicari',dataLama)
  const imageLama = dataLama.logo
  unlink(join(process.cwd(), "public", imageLama), (err) => {
    if (err) throw err;
    console.log("file was deleted");
  })
  try {   
    const removeapp = await prisma.app.update({
      where: {
        id: 0
      },
      data: {
        logo: "",
      }      
    })
    return Response.json(removeapp)
  } catch (error) {
    return Response.json(error.message)
  }
}