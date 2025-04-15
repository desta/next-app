import { prisma } from "@/libs/prisma"
import { saltAndHashPassword } from "@/utils/Utils";
import moment from "moment";

export async function POST(req) {
  const { id, namaapp, name, email, username, password, homepage } = await req.json()
  const year = moment().format("YYYY");
  const hashPassword = saltAndHashPassword(password);

  const install = await prisma.install.create({
    data: {
      app: {
        create: {
          namaapp,
          homepage,
        }
      },
      akses: {
        create: [
          { akses: 'Admin' },
          { akses: 'User' },
        ],
      },
      user: {
        create: {
          name,
          email,
          username,
          password: hashPassword,
          akses: {
            connectOrCreate: {
              where: {
                akses: "Administrator",
              },
              create: {
                akses: "Administrator",
              }
            },
          },
        }
      },
      menu: {
        create: [
          { title: 'Dashboard', path: '/dashboard', lokasi: 'Sidebar', icon: '<i class="bi bi-columns-gap"></i>', urutan: 1 },
          { title: 'Customer chat', path: '/dashboard/customer_chat', lokasi: 'Sidebar', icon: '<i class="bi bi-chat-dots"></i>', urutan: 2 },
          { title: 'Gallery', path: '/dashboard/gallery', lokasi: 'Sidebar', icon: '<i class="bi bi-card-image"></i>', urutan: 3 },
          { title: 'Article', path: '/dashboard/article', lokasi: 'Sidebar', icon: '<i class="bi bi-blockquote-left"></i>', urutan: 4 },
          { title: 'Product', path: '/dashboard/product', lokasi: 'Sidebar', icon: '<i class="bi bi-dribbble"></i>', urutan: 5 },
          { title: 'Media aplication', path: '/dashboard/media_aplication', lokasi: 'Sidebar', icon: '<i class="bi bi-app"></i>', urutan: 6 },
        ],
      },
      counter: {
        create: [
          {
            id: 1, counter: 0,
            bulan: {
              connectOrCreate: {
                where: {
                  bulan: 'jan'
                },
                create: {
                  bulan: 'jan',
                },
              },
            },
            tahun: {
              connectOrCreate: {
                where: {
                  tahun: parseInt(year)
                },
                create: {
                  tahun: parseInt(year),
                },
              },
            }
          },
          {
            id: 2, counter: 0,
            bulan: {
              connectOrCreate: {
                where: {
                  bulan: 'feb'
                },
                create: {
                  bulan: 'feb',
                },
              },
            },
            tahun: {
              connectOrCreate: {
                where: {
                  tahun: parseInt(year)
                },
                create: {
                  tahun: parseInt(year),
                },
              },
            }
          },
          {
            id: 3, counter: 0,
            bulan: {
              connectOrCreate: {
                where: {
                  bulan: 'mar'
                },
                create: {
                  bulan: 'mar',
                },
              },
            },
            tahun: {
              connectOrCreate: {
                where: {
                  tahun: parseInt(year)
                },
                create: {
                  tahun: parseInt(year),
                },
              },
            }
          },
          {
            id: 4, counter: 0,
            bulan: {
              connectOrCreate: {
                where: {
                  bulan: 'apr'
                },
                create: {
                  bulan: 'apr',
                },
              },
            },
            tahun: {
              connectOrCreate: {
                where: {
                  tahun: parseInt(year)
                },
                create: {
                  tahun: parseInt(year),
                },
              },
            }
          },
          {
            id: 5, counter: 0,
            bulan: {
              connectOrCreate: {
                where: {
                  bulan: 'may'
                },
                create: {
                  bulan: 'may',
                },
              },
            },
            tahun: {
              connectOrCreate: {
                where: {
                  tahun: parseInt(year)
                },
                create: {
                  tahun: parseInt(year),
                },
              },
            }
          },
          {
            id: 6, counter: 0,
            bulan: {
              connectOrCreate: {
                where: {
                  bulan: 'jun'
                },
                create: {
                  bulan: 'jun',
                },
              },
            },
            tahun: {
              connectOrCreate: {
                where: {
                  tahun: parseInt(year)
                },
                create: {
                  tahun: parseInt(year),
                },
              },
            }
          },
          {
            id: 7, counter: 0,
            bulan: {
              connectOrCreate: {
                where: {
                  bulan: 'jul'
                },
                create: {
                  bulan: 'jul',
                },
              },
            },
            tahun: {
              connectOrCreate: {
                where: {
                  tahun: parseInt(year)
                },
                create: {
                  tahun: parseInt(year),
                },
              },
            }
          },
          {
            id: 8, counter: 0,
            bulan: {
              connectOrCreate: {
                where: {
                  bulan: 'aug'
                },
                create: {
                  bulan: 'aug',
                },
              },
            },
            tahun: {
              connectOrCreate: {
                where: {
                  tahun: parseInt(year)
                },
                create: {
                  tahun: parseInt(year),
                },
              },
            }
          },
          {
            id: 9, counter: 0,
            bulan: {
              connectOrCreate: {
                where: {
                  bulan: 'sep'
                },
                create: {
                  bulan: 'sep',
                },
              },
            },
            tahun: {
              connectOrCreate: {
                where: {
                  tahun: parseInt(year)
                },
                create: {
                  tahun: parseInt(year),
                },
              },
            }
          },
          {
            id: 10, counter: 0,
            bulan: {
              connectOrCreate: {
                where: {
                  bulan: 'oct'
                },
                create: {
                  bulan: 'oct',
                },
              },
            },
            tahun: {
              connectOrCreate: {
                where: {
                  tahun: parseInt(year)
                },
                create: {
                  tahun: parseInt(year),
                },
              },
            }
          },
          {
            id: 11, counter: 0,
            bulan: {
              connectOrCreate: {
                where: {
                  bulan: 'nov'
                },
                create: {
                  bulan: 'nov',
                },
              },
            },
            tahun: {
              connectOrCreate: {
                where: {
                  tahun: parseInt(year)
                },
                create: {
                  tahun: parseInt(year),
                },
              },
            }
          },
          {
            id: 12, counter: 0,
            bulan: {
              connectOrCreate: {
                where: {
                  bulan: 'dec'
                },
                create: {
                  bulan: 'dec',
                },
              },
            },
            tahun: {
              connectOrCreate: {
                where: {
                  tahun: parseInt(year)
                },
                create: {
                  tahun: parseInt(year),
                },
              },
            }
          },
        ]
      }
    },
  })
  return Response.json(install)
}

export async function GET() {
  const install = await prisma.install.findUnique({
    where: {
      id: 0
    }
  })

  return Response.json(install)
}