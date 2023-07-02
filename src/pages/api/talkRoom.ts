import { NextRequest, NextResponse } from "next/server";
import { OpenAIStream } from "../../utils/openAIStream";

export const config = {
  runtime: "edge",
};

export default async function handler(
  req: NextRequest,
  res: NextResponse
): Promise<Response> {
  const { userInput, answerType } = (await req.json()) as {
    userInput?: string;
    answerType?: string;
  };

  let definitionText = "";

  console.log(userInput, answerType);

  switch (answerType) {
    case "shizuka":
      definitionText = `物静かな年上の女性アニメキャラクターのように返答して`;
      break;

    case "genki":
      definitionText = `元気な幼馴染の女の子のアニメキャラクターのように返答して`;
      break;

    case "tereya":
      definitionText = `引っ込み思案な女の子のアニメキャラクターのように返答して`;
      break;

    default:
      break;
  }

  const payload = {
    model: "gpt-4",
    messages: [
      { role: "assistant", content: definitionText },
      { role: "user", content: userInput },
    ],
    temperature: 0.9,
    max_tokens: 300,
    stream: true,
  };
  const stream = await OpenAIStream(payload);

  return new Response(stream);
}
