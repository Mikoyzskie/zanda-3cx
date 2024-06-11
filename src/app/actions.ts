"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { transcribe } from "@/lib/directus";
import { transcribeURL } from "@/lib/deepgram";

export async function Transcribe(
  prevState: {
    error: string;
  },
  formData: FormData
) {
  const schema = z.object({
    callURL: z.string().min(1),
    callID: z.string().min(1),
  });

  const parse = schema.safeParse({
    callURL: formData.get("callURL"),
    callID: formData.get("callID"),
  });

  const initialData = {
    callURL: "",
    callID: "",
  };

  if (!parse.success) {
    return {
      error: `Failed to parse`,
      initialData,
    };
  }

  const data = parse.data;

  const { callURL, callID } = data;

  const formValues = {
    callURL,
    callID,
  };

  try {
    const data = await transcribeURL(callURL);
    if (!data) {
      revalidatePath("/");
      return {
        error: `error on deepgram`,
        initialData,
      };
    }

    await transcribe(
      callID,
      data.results.channels[0].alternatives[0].paragraphs!.transcript
    );
    revalidatePath("/");
    return {
      error: `no errors`,
      initialData,
    };
  } catch (error) {
    return {
      error: `${error}`,
      formValues,
    };
  }
}
