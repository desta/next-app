'use server'
import { auth } from "@/auth"
import { prisma } from "@/libs/prisma";
import { getErrorApi } from "@/utils/getResponseData";
import _ from "lodash";

export async function GET() {
  const product = await prisma.product.findMany({
    orderBy: [
      {
        urutan: 'asc',
      },
    ],
    include: {
      productType: true,
      category: true,
      createdBy: true,
      gallery: true,
    }
  })
  return Response.json(product)
}

export async function POST(req) {
  const session = await auth()
  const formData = await req.formData();
  const title = formData.get("title")
  const description = formData.get("description")
  const spesifications = formData.get("spesifications")
  const publish = formData.get("publish")
  const productType = formData.get("productType")
  const category = formData.getAll("category")
  const image = formData.getAll("image")
  let urutan;

  const noUrut = await prisma.urutan.findUnique({
    where: {
      nama: "product"
    }
  })

  if (!noUrut) {
    const urutan = await prisma.urutan.create({
      data: {
        nama: "product",
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
  console.log('categpry dari prodict api',category)
  console.log('arr dari prodict api', arr)
  let arr2 = image.map((item) => {
    return { id: parseInt(item) }
  });
  const dataToAdd = {
    data: {
      title,
      description,
      spesifications,
      urutan: urutan,
      // gallery: {
      //   connect: arr2,
      // },
      publish: Boolean(publish),
      productType: {
        connect: {
          id: Number(productType)
        }
      },
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
    const result = await prisma.product.create(dataToAdd).then(async (coy) => {
        const urutin = await prisma.urutan.update({
          where: {
            nama: "product"
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
      console.log('result from product add', hasil)
    return Response.json(result);
  } catch (e) {
    console.error("Error add product", e);
    const hasilError = getErrorApi(e.code, e.message);
    return Response.json(
      { error: hasilError },
      { status: 500 }
    );
  }
}