export function GET() {
  return Response.json(
    {
      data: {
        name: "111",
        code: "1111111111111",
        categoryId: "15",
        images: [
          {
            id: "1570",
            imageUrl:
              "https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/package.png",
          },
        ],
        price: 1,
        discount: 1,
        quantity: 2,
        productDetails: [
          {
            name: "1",
            text: "1",
          },
          {
            name: "1",
            text: "1",
          },
          {
            name: "1",
            text: "1",
          },
        ],
        aboutProduct: [
          {
            name: "2",
            text: "2",
          },
          {
            name: "2",
            text: "2",
          },
          {
            name: "2",
            text: "2",
          },
        ],
      },
    },
    { status: 200 }
  );
}
