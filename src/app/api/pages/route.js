'use server'
import { auth } from "@/auth"
import { prisma } from "@/libs/prisma";
import { getErrorApi } from "@/utils/getResponseData";
import _ from "lodash";

export async function GET() {
  const pages = await prisma.pages.findMany({
    orderBy: [
      {
        urutan: 'asc',
      },
    ],
    include: {
      category: true,
      createdBy: true,
      gallery: true,
    }
  })
  return Response.json(pages)
}

export async function POST(req) {
  const session = await auth()
  const formData = await req.formData();
  const title = formData.get("title")
  const path = formData.get("path");
  const layout = formData.get("layout");
  const content = formData.get("content")
  const publish = formData.get("publish")
  const category = formData.getAll("category")
  const image = formData.getAll("image")
  let urutan;

  const noUrut = await prisma.urutan.findUnique({
    where: {
      nama: "pages"
    }
  })

  if (!noUrut) {
    const urutan = await prisma.urutan.create({
      data: {
        nama: "pages",
        urutan: 1
      }
    })
    return Response.json(urutan);
  } else if (noUrut) {
    urutan = noUrut.urutan;
  }
  let arr = category.map((item) => {
    return { id: parseInt(item) }
  });
  
  // category.map((item) => item.split(","));
  // arr.map((item, index) => {
  //   item.map((item) => {
  //     arr[index] = parseInt(item)
  //   })
  // })

  let arr2 = image.map((item) => {
    return { id: parseInt(item) }
  });
  const dataToAdd = {
    data: {
      title,
      path,
      layout,
      content,
      urutan: urutan,
      publish: Boolean(publish),
      category: {
        connect: arr,
      },
      createdBy: {
        connect: {
          id: session.user.id
        }
      }
    }
  }
  if (arr2){
    dataToAdd.data.gallery = {
      connect: arr2,
    }
  }
  try {
    // Save to database
    const result = await prisma.pages.create(dataToAdd).then(async (coy) => {
        const urutin = await prisma.urutan.update({
          where: {
            nama: "pages"
          },
          data: {
            urutan: urutan + 1
          }
        })
        if(urutin){
          return Response.json(coy);
        }
      })
      const hasil = await result.json();   
      // console.log('result from pages add', hasil)
    return Response.json(result);
  } catch (e) {
    console.error("Error add pages", e);
    const hasilError = getErrorApi(e.code, e.message);
    return Response.json(
      { error: hasilError },
      { status: 500 }
    );
  }
}