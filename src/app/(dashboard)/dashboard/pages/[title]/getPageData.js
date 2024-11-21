'use server';
export async function requestPageData(path) {
    const getPageData = async () => {
      const res = await prisma.pages.findMany({
        where: {
          publish: true,
          path: await path
        },
        include: {
          category: true,
          gallery: true,
        }
      })
      return res;
    }
    const data = await getPageData();
    console.log(data)
    return data;
  }