import { z } from "zod";
import { translate } from "@vitalets/google-translate-api";

// this route will be deleted anyway, it just emulates real route behavior

const requestSchema = z.object({
  to: z.string(),
  reviewId: z.string(),
});

const maxTextSize = 3900;

const reviews = [
  {
    id: "1",
    title: "Pumiey long sleeve",
    text: "Obsessed with these long sleeves! Definitely big girl friendly, holds everything in but still feels breathable. Very thick material, not see-through.",
    language: "en",
  },
  {
    id: "2",
    title: "Girls, GET. THIS.",
    text: "Ok, I got this in the color sage to try to recreate a Pinterest outfit I saw and omg it’s so good.\nThe fabric is soft and comfy while still being fitted + It’s double lined so you can go braless. The color is so pretty too, this with some low rise baggy jeans would be even cuter but I didn’t have any anyway get this you won’t regret it!!!! I’ll update after a few washes to see if it holds up.",
    language: "en",
  },
  {
    id: "3",
    title: "Great Shirt, unfortunately returned due to stains",
    text: "Shirt feels amazing, super soft and stretchy. Would love to have kept it if it wasn’t stained.",
    language: "en",
  },
  {
    id: "4",
    title: "Love",
    text: "I do love this top and I enjoy wearing it! Although I am going to say something negative about it on a personal level, something that I wasn't thinking about and as you can see it's got nothing to do with how I rated the product. On me the arms are a little tight, or perhaps I should say snug, and I seem to be pulling on the sleeves a lot. Although by doing that the material has a tendency to grab my hair on my arms and give it a discomfort feeling. It doesn't hurt and it does not pitch and I think it's just indicative to any kind of material that fits snug around the arms.\nMaybe I'm just being a big sissy, although I think I'm going to trim my hair on my arms just a little bit before I wear it the next time. Anyhow I had the same problem with a pair of underfarmer compression top that I had. Anyhow just something to think about, all in all I give it a thumbs up, the material is nice and soft and it has a four-way stretch.",
    language: "en",
  },
  {
    id: "5",
    title: "Me encantan",
    text: "Me gusta mucho la calidad de esta marca para sus playeras. La talla es tal cual.",
    language: "es",
  },
];

export async function POST(request: Request) {
  let bodyParsed;

  try {
    bodyParsed = await request.json();
  } catch {
    return Response.json(
      { message: "Request body is invalid" },
      { status: 400 }
    );
  }

  const validationResult = requestSchema.safeParse(bodyParsed);

  if (!validationResult.success) {
    return Response.json(
      { message: "Request body is invalid" },
      { status: 400 }
    );
  }

  try {
    const body = validationResult.data;
    const review = reviews.find((r) => r.id === body.reviewId);

    if (!review) {
      return Response.json({ message: "Review not found" }, { status: 404 });
    }

    if (review.language === body.to) {
      return Response.json({
        title: review.title,
        text: review.text,
      });
    }

    // const translationDataTitle = await translate(review.title, {
    //   from: review.language,
    //   to: body.to,
    // });
    // const translationDataText = await translate(review.text, {
    //   from: review.language,
    //   to: body.to,
    // });

    // return Response.json({
    //   title: translationDataTitle.text,
    //   text: translationDataText.text,
    // });
    const translationData = await translateMultiple(
      { from: review.language, to: body.to },
      [review.title, review.text]
    );

    return Response.json({
      title: translationData.texts[0],
      text: translationData.texts[1],
    });
  } catch {
    return Response.json({ message: "Failed to translate" }, { status: 500 });
  }
}

const defaultSeparator = "|";
async function translateMultiple(
  { from, to }: { from?: string; to: string },
  texts: string[]
) {
  let separator = defaultSeparator;

  while (texts.some((t) => t.includes(separator))) {
    separator += defaultSeparator;
  }

  const text = texts.join(separator);
  const translation = await translate(text, { from, to });

  return {
    texts: translation.text.split(separator).map((t) => t.trim()),
    raw: translation.raw,
  };
}
