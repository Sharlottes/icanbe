import Replicate from "replicate";
import { NextResponse } from "next/server";

const replicate = new Replicate({
  auth: process.env.REPLICATE_KEY,
});

export async function POST(request: Request) {
  const { url, prompt } = await request.json();

  const [, output] = await replicate.run(
    "jagilley/controlnet-depth2img:922c7bb67b87ec32cbc2fd11b1d5f94f0ba4f5519c4dbd02856376444127cc60",
    {
      input: {
        image: url,
        prompt,
      },
    }
  ) as string[];

  return NextResponse.json({
    output
  })
}
