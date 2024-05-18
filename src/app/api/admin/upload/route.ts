export async function POST(req: Request) {
  const body = await req.formData();
  const files = body.getAll("files[]");

  return Response.json(
    files.map(() => ({
      id: (Math.random() * 10000).toFixed(0),
      imageUrl:
        "https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/package.png",
    })),
    { status: 200 }
  );
}
