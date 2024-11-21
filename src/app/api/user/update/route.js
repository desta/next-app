"use server"
import { prisma } from "@/libs/prisma";
import mime from "mime";
import { join } from "path";
import { stat, mkdir, writeFile, unlink } from "fs/promises";
import _ from "lodash";
import { saltAndHashPassword } from "@/components/Utils";

export async function PUT(req, res) {
  // let data = await req.json()
  let formData = await req.formData();
  const id = formData.get("id");
  // const username = formData.get("username");
  // const name = formData.get("name");
  // const email = formData.get("email");
  // const akses = formData.get("akses");
  const password = formData.get("password");
  const image = formData.get("image");
  let fileUrl;

  console.log("dari form data", formData);

  if (image) {
    const dataLama = await prisma.user.findUnique({
      where: {
        id: String(id)
      }
    }).catch(error => {
      return Response.json(
        { error: "Something data not keambil." },
        { status: 500 }
      );
    })

    console.log('Data dicari', dataLama)
    const imageLama = dataLama.image


    const buffer = Buffer.from(await image.arrayBuffer());
    const relativeUploadDir = `/asset/${new Date(Date.now())
      .toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .replace(/\//g, "-")}`;

    const uploadDir = join(process.cwd(), "public", relativeUploadDir);
    try {
      await stat(uploadDir).then(() => {
        console.log("unlink nih", join(process.cwd(), imageLama))
        if (imageLama !== "") {
          unlink(join(process.cwd(), "public", imageLama), (err) => {
            if (err) throw err;
            console.log("file was deleted");
          })
        }
      })
    } catch (e) {
      if (e.code === "ENOENT") {
        // This is for checking the directory is exist (ENOENT : Error No Entry)
        await mkdir(uploadDir, { recursive: true })
      } else {
        console.error(
          "Error while trying to create directory when uploading a file\n",
          e
        );
        return Response.json(
          { error: "Something went wrong." },
          { status: 500 }
        );
      }
    }
    try {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const filename = `${image.name.replace(
        /\.[^/.]+$/,
        ""
      )}-${uniqueSuffix}.${mime.getExtension(image.type)}`;
      await writeFile(`${uploadDir}/${filename}`, buffer);
      fileUrl = `${relativeUploadDir}/${filename}`;
    } catch (error) {
      console.error(
        "Error while trying to create name when uploading a file\n",
        e
      );
      return Response.json(
        { error: "Something went wrong." },
        { status: 500 }
      );
    }
  }

  console.log('ni gambar cok', formData)
  // console.log('ini buffer',buffer)
  try {
    let data = {}
    let hashPassword;
    // Save to database
    if (password) {
      hashPassword = saltAndHashPassword(password);
      data['password'] = hashPassword;
    }

    if (fileUrl) {
      data['image'] = fileUrl;
    }

    data['username'] = formData.get("username");
    data['name'] = formData.get("name");
    data['email'] = formData.get("email");
    data['akses'] = formData.get("akses");

    const result = await prisma.user.update({
      where: {
        id: id
      },
      data,
    });
    return Response.json({ user: result });
  } catch (e) {
    console.error("Error while trying to upload a file\n", e);
    return Response.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}