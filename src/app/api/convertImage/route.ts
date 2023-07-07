import Replicate from "replicate";
import GoogleCloudTranslate from "@google-cloud/translate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_KEY,
});
const translationClient = new GoogleCloudTranslate.v2.Translate({
  key: process.env.GOOGLE_KEY,
});

async function translateText(text: string) {
  const [response] = await translationClient.translate(text, "en");
  return response;
}

export async function POST(request: Request) {
  const { url, prompt } = await request.json();
  const engPrompt = await translateText(prompt);

  const [, output] = (await replicate.run(
    "jagilley/controlnet-depth2img:922c7bb67b87ec32cbc2fd11b1d5f94f0ba4f5519c4dbd02856376444127cc60",
    {
      input: {
        image: url,
        prompt: engPrompt,
      },
    }
  )) as string[];

  return new Response(JSON.stringify({ output }), {
    status: 200,
  });
}
