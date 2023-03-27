import { NextRequest, NextResponse } from "next/server";
import { OpenAIStream } from "../../utils/openAIStream";

const token = process.env.BOT_TOKEN;

export const config = {
  runtime: "edge",
};

export default async function handler(
  req: NextRequest,
  res: NextResponse
): Promise<Response> {
  console.log("Enter", new Date());

  // const requestSlack =

  await req.json().then((val) => {
    console.log(val);
    sendSlackMessage(val);
  });

  // const headers = request.event.headers;
  // const event_type = request.event.type;
  // const incomingMessage = request.event.text;
  // const channel = request.event.channel;

  console.log("testttttttttt");
  // sendSlackMessage(requestSlack);

  // switch (event_type) {
  //   case "app_mention":
  //     const payload = {
  //       model: "gpt-3.5-turbo",
  //       messages: [
  //         {
  //           role: "assistant",
  //           content: "元気な女の子のアニメキャラクターっぽく返答してください",
  //         },
  //         { role: "user", content: incomingMessage },
  //       ],
  //       temperature: 0.9,
  //       max_tokens: 100,
  //       stream: true,
  //     };

  //     const stream = await OpenAIStream(payload);
  //     const reader = stream.getReader();
  //     const decoder = new TextDecoder("utf-8");
  //     let text = "";

  //     while (true) {
  //       const { done, value } = await reader.read();
  //       if (done) {
  //         break;
  //       }
  //       text += decoder.decode(value);
  //     }

  //     const message = {
  //       channel: channel,
  //       text: text,
  //     };

  //     const url = "https://slack.com/api/chat.postMessage";
  //     const response = await fetch(url, {
  //       method: "post",
  //       headers: {
  //         "Content-Type": "application/json; charset=utf-8",
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify(message),
  //     });
  //     console.log("レスポンス", response);
  //     return new Response("OK");

  //     break;
  //   default:
  //     break;
  // }
  console.log("ラスト", new Date());
  return new Response("OK");
}

async function sendSlackMessage(requestSlack: any) {
  // const headers = requestSlack.event.headers;
  // const event_type = requestSlack.event.type;
  // const incomingMessage = requestSlack.event.text;
  // const channel = requestSlack.event.channel;

  const headers = requestSlack.event.headers;
  const event_type = "app_mention";
  const incomingMessage = "こんにちは！";
  const channel = "general";

  console.log(requestSlack.event);

  switch (event_type) {
    case "app_mention":
      console.log("mention");
      const payload = {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "assistant",
            content: "元気な女の子のアニメキャラクターっぽく返答してください",
          },
          { role: "user", content: incomingMessage },
        ],
        temperature: 0.9,
        max_tokens: 100,
        stream: true,
      };

      console.log("mention2");

      const stream = await OpenAIStream(payload);
      const reader = stream.getReader();
      const decoder = new TextDecoder("utf-8");
      let text = "";

      console.log("mention3");

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }
        text += decoder.decode(value);
      }

      const message = {
        channel: channel,
        text: text,
      };

      const url = "https://slack.com/api/chat.postMessage";
      const response = await fetch(url, {
        method: "post",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(message),
      });
      // return new Response("OK");
      console.log("mention4", response);

      break;
    default:
      break;
  }
}
