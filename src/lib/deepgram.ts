import { createClient } from "@deepgram/sdk";

export async function transcribeURL(url: string) {
  // const apikey = "5e663a5808edab5d44a5007395b23fff91f57384";
  const deepgram = createClient(process.env.DEPEGRAM_API_KEY!);
  const { result, error } = await deepgram.listen.prerecorded.transcribeUrl(
    { url },
    { smart_format: true, model: "nova-2", language: "en-US" }
  );

  if (error) throw error;
  if (!error) return result;
}
