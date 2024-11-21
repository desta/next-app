import { prisma } from "@/libs/prisma"
import { join } from "path";
import { stat, mkdir, writeFile, unlink } from "fs/promises";
import _ from "lodash";

export async function PUT (req, res) {
  const formData = await req.formData();
  const id = formData.get("id");
  let image = formData.get("image");

  const dataLama = await prisma.user.findUnique({
    where:{
      id: id    
    }
  })
  .catch(error => {
    return Response.json(
      { error: "Something data not keambil." },
      { status: 500 }
    );
  }) 

  console.log('Data dicari',dataLama)
  image = dataLama.image
  unlink(join(process.cwd(), "public", image), (err) => {
    if (err) throw err;
    console.log("file was deleted");
  })
  try {   
    const removeImage = await prisma.user.update({
      where: {
        id: id
      },
      data: {
        image: "",
      }      
    })
    return Response.json(removeImage)
  } catch (error) {
    return Response.json(error.message)
  }
}