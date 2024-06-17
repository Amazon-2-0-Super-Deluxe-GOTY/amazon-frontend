import { z } from "zod";
import { translate } from "@vitalets/google-translate-api";
import { getReviewByIdServer } from "@/api/server";

// this route will be deleted anyway, it just emulates real route behavior

const requestSchema = z.object({
  to: z.string(),
  reviewId: z.string(),
});

const maxTextSize = 3900;

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
    const review = await getReviewByIdServer(body.reviewId);

    if (review.status !== 200) {
      return Response.json({ message: "Review not found" }, { status: 404 });
    }

    // if (review.language === body.to) {
    //   return Response.json({
    //     title: review.title,
    //     text: review.text,
    //   });
    // }

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

    const reviewData = review.data;

    if (reviewData.title && !reviewData.text) {
      const translationDataTitle = await translate(reviewData.title, {
        to: body.to,
      });
      return Response.json({
        title: translationDataTitle.text,
        text: null,
      });
    }

    if (!reviewData.title && reviewData.text) {
      const translationDataTitle = await translate(reviewData.text, {
        to: body.to,
      });
      return Response.json({
        title: null,
        text: translationDataTitle.text,
      });
    }

    const translationData = await translateMultiple({ to: body.to }, [
      review.data.title!,
      review.data.text!,
    ]);

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
