import fs from "fs"

export async function GET(request, { params }) {
    const slug = (await params).slug;
    const fileUrl = slug.join("/")
    const publicDir = __dirname.split(".next")[0] + "public/"
    return new Response(fs.createReadStream(`${publicDir + fileUrl}`));
}