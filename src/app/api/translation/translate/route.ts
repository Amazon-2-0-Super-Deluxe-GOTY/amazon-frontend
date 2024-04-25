import { z } from "zod";
import { translate } from "@vitalets/google-translate-api";

const requestSchema = z.object({
  to: z.string(),
  text: z.string().max(3900),
});

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
    const translationData = await translate(body.text, { to: body.to });
    return Response.json({ text: translationData.text });
  } catch {
    return Response.json({ message: "Failed to translate" }, { status: 500 });
  }
}
