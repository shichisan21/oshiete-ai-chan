import { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";
import * as dotenv from "dotenv";
dotenv.config();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const chatAnswer = await requestChatGPT();
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.send(chatAnswer);
}

export async function requestChatGPT(): Promise<string> {
  const apiKey = process.env.CHAT_GPT_KEY;
  if (!apiKey) {
    throw new Error("API key not found");
  }

  const configuration = new Configuration({
    apiKey: apiKey,
  });

  try {
    const openai = new OpenAIApi(configuration);
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: "ChatGPT について教えて" }],
    });

    const chat = completion.data.choices[0].message?.content;
    if (!chat) {
      return "no data res";
    } else {
      console.log("process End", new Date());
      return chat;
    }
  } catch (err) {
    console.error(err);
    return " occured";
  }
}
