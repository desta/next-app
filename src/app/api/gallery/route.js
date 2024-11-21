'use server'
import { auth } from "@/auth"
import { prisma } from "@/libs/prisma";
import mime from "mime";
import { join } from "path";
import { stat, mkdir, writeFile, unlink } from "fs/promises";
import _ from "lodash";

export async function GET() {
  const product = await prisma.gallery.findMany({
    orderBy: [
      {
        createdAt: 'asc',
      },
    ],
  })
  // const kirim = product.map((item) => {
  //   return {
  //     image: '/api/public' + item.image,
  //     description: item.description,
  //     categoryAsset: item.categoryAsset,
  //     name: item.name,
  //     alt: item.alt,
  //     createdAt: item.createdAt,
  //     updatedAt: item.updatedAt,
  //     deletedAt: item.deletedAt,
  //   }
  // })
  return Response.json(product)
}

export async function POST(req) {
  await auth()
  const formData = await req.formData();
  const images = formData.getAll("images");
  // console.log('img', images)
  if (images.length >= 1) {
    const arrayResult = [];
    images.map(async (image) => {
      const buffer = Buffer.from(await image.arrayBuffer());
      // const relativeUploadDir = `/gallery/${new Date(Date.now())
      //   .toLocaleDateString("id-ID", {
      //     day: "2-digit",
      //     month: "2-digit",
      //     year: "numeric",
      //   })
      //   .replace(/\//g, "-")}`;
      const relativeUploadDir = `/gallery`;
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

      try {
        const uniqueSuffix = `${new Date(Date.now())
          .toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
          .replace(/\//g, "-")}` + `${Math.round(Math.random() * 1e4)}`;
        const filename = `${image.name.replace(
          /\.[^/.]+$/,
          ""
        )}-${uniqueSuffix}.${mime.getExtension(image.type)}`;
        await writeFile(`${uploadDir}/${filename}`, buffer);
        const fileUrl = `${relativeUploadDir}/${filename}`;

        // Save to database
        const result = await prisma.gallery.create({
          data: {
            image: '/api/public' + fileUrl,
            // image: fileUrl,
            name: image.name,
          },
        });
        arrayResult.push = result;
      } catch (e) {
        console.error("Error while trying to upload a file\n", e);
        return Response.json(
          { error: "Something went wrong." },
          { status: 500 }
        );
      }
    })
    return Response.json({ data: arrayResult });
  }
}

export async function DELETE(req, { params }) {
  const data = await req.json();
  let removegallery;
  const arrayResult = data.imagesData.map((item) => {
    return item.id
  });
  const images = await prisma.gallery.findMany({
    where: {
      id: {
        in: arrayResult
      }
    }
  })
  if (images) {
    images.forEach(async (item) => {
      await unlink(join(process.cwd(), "public", item.image))
    })
  }


  if (data.imagesData.length === 1) {
    try {
      removegallery = await prisma.gallery.delete({
        where: {
          id: Number(data.imagesData[0].id)
        }
      })
      return Response.json(removegallery)
    } catch (error) {
      return Response.json(error.message)
    }
  } else if (data.imagesData.length > 1) {
    try {
      const arrayResult = data.imagesData.map((item) => {
        return item.id
      });
      removegallery = await prisma.gallery.deleteMany({
        where: {
          id: {
            in: arrayResult
          }
        }
      })
      return Response.json(removegallery)
    }
    catch (error) {
      return Response.json(error.message)
    }
  }
  console.log(removegallery)
  return Response.json(removegallery)
}