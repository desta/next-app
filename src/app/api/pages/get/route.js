'use server'
import { auth } from "@/auth"
import { prisma } from "@/libs/prisma";
import { getErrorApi } from "@/utils/getResponseData";
import _ from "lodash";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const where = searchParams.get('where')
  console.log('where get route page', where);
  let data = {};
    if (where) {
      data = {
        orderBy: [
          {
            urutan: 'asc',
          },
        ],
        include: {
          category: true,
          createdBy: true,
          gallery: true,
          component: true,
        }
      }
    }else{
      data = {
        where: {
          title: where},
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
      }
    }
  const pages = await prisma.pages.findMany(data)
  return Response.json(pages)
}

export async function POST(req) {
  const data = await req.json();
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
  console.log('pages from pages api',pages);
  console.log('data from pages api', data)
  return Response.json(data)
}