import { z } from "zod";
import { translate } from "@vitalets/google-translate-api";

const requestSchema = z.object({
  text: z.string().max(3900),
});
const defaultTranslateTo = "en";

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
    const translationData = await translate(body.text, {
      to: defaultTranslateTo,
    });
    return Response.json({ languageCode: translationData.raw.src });
  } catch {
    return Response.json({ message: "Failed to translate" }, { status: 500 });
  }
}
