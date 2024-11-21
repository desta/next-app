'use server'
import { prisma } from "@/libs/prisma";
import mime from "mime";
import { join } from "path";
import { stat, mkdir, writeFile, unlink } from "fs/promises";
import _ from "lodash";


export async function PUT(req, res) {
  let formData = await req.formData();
  const id = formData.get("id")
  const namaapp = formData.get("namaapp")
  const deskripsi = formData.get("deskripsi")
  const googleLogin = formData.get("googleLogin")
  const logo = formData.get("logo")
  const favicon = formData.get("favicon")
  const homepage = formData.get("homepage")

  let fileUrl;
  const logoLama = await prisma.app.findUnique({
    where: {
      id: Number(id)
    },
    select: {
      logo: true
    }
  })

  if (logoLama.logo !== "") {
    await unlink(join(process.cwd(), "public", logoLama.logo))
  }
  if (logo !== '') {
    const buffer = Buffer.from(await logo.arrayBuffer());
    const relativeUploadDir = `/asset/${new Date(Date.now())
      .toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .replace(/\//g, "-")}`;

    const uploadDir = join(process.cwd(), "public", relativeUploadDir);

    try {
      await stat(uploadDir);
    } catch (e) {
      if (e.code === "ENOENT") {
        // This is for checking the directory is exist (ENOENT : Error No Entry)
        await mkdir(uploadDir, { recursive: true });
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
    const uniqueSuffix = `${new Date(Date.now())
      .toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .replace(/\//g, "-")}-${Math.round(Math.random() * 1e9)}`;
    const filename = `${logo.name.replace(
      /\.[^/.]+$/,
      ""
    )}-${uniqueSuffix}.${mime.getExtension(logo.type)}`;
    await writeFile(`${uploadDir}/${filename}`, buffer);
    fileUrl = `/api/public${relativeUploadDir}/${filename}`;
  }

  let fileUrl2;
  const logoLama2 = await prisma.app.findUnique({
    where: {
      id: Number(id)
    },
    select: {
      favicon: true
    }
  })

  if (logoLama2.favicon !== "") {
    await unlink(join(process.cwd(), "public", logoLama2.favicon))
  }

  if (favicon) {
    const buffer = Buffer.from(await favicon.arrayBuffer());
    const relativeUploadDir = `/asset/${new Date(Date.now())
      .toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .replace(/\//g, "-")}`;

    const uploadDir = join(process.cwd(), "public", relativeUploadDir);

    try {
      await stat(uploadDir);
    } catch (e) {
      if (e.code === "ENOENT") {
        // This is for checking the directory is exist (ENOENT : Error No Entry)
        await mkdir(uploadDir, { recursive: true });
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
    const uniqueSuffix = `${new Date(Date.now())
      .toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .replace(/\//g, "-")}-${Math.round(Math.random() * 1e9)}`;
    const filename = `${favicon.name.replace(
      /\.[^/.]+$/,
      ""
    )}-${uniqueSuffix}.${mime.getExtension(favicon.type)}`;
    await writeFile(`${uploadDir}/${filename}`, buffer);
    fileUrl2 = `/api/public${relativeUploadDir}/${filename}`;
  }
  // Save to database
  let switcher;
  if (googleLogin === "true") {
    switcher = 1
  } else {
    switcher = 0
  }

  const result = await prisma.app.update({
    where: { id: Number(id) },
    data: {
      namaapp,
      deskripsi,
      googleLogin: Boolean(switcher),
      logo: fileUrl,
      favicon: fileUrl2,
      homepage,
    },
  });
  return Response.json(result);
}