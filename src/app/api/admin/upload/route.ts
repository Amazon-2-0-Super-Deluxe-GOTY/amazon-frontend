export async function POST(req: Request) {
  const body = await req.formData();
  const files = body.getAll("files[]") as File[];

  const images = files.map(async (img) => {
    const buffer = Buffer.from(await img.arrayBuffer());
    return {
      id: (Math.random() * 10000).toFixed(0),
      imageUrl: "data:" + img.type + ";base64," + buffer.toString("base64"),
    };
  });
  const data = await Promise.all(images);

  return Response.json({ status: 200, data }, { status: 200 });
}

function imageToURL(image: File) {
  return new Promise((resolve) => {
    let reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(image);
  });
}
