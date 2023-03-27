import { NextApiRequest, NextApiResponse } from "next";
import { WebClient } from "@slack/web-api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const token = process.env.BOT_TOKEN;
  // #チャンネル名 of @ユーザー名
  const channel = "general";
  // メッセージ
  const text = "*Hello World*";

  const client = new WebClient(token);
  const response = await client.chat.postMessage({ channel, text });

  // 投稿に成功すると `ok` フィールドに `true` が入る。
  console.log(response.ok);
  // => true
  res.status(200).send("Sended");
}
