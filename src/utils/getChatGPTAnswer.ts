import * as React from "react";
import axios from "axios";

const callChatGPTApiUrl = "/api/talkRoom";

export async function getChatGPTAnswer(
  setChatGPTAnswer: React.Dispatch<React.SetStateAction<string>>,
  textInput: string,
  answerType: string,
  defaultText: string
): Promise<void> {
  setChatGPTAnswer("(返事を考えているようです...)");

  const userInput = textInput === "" ? defaultText : textInput;
  await axios({
    url: callChatGPTApiUrl,
    method: "POST",
    data: { userInput, answerType },
    onDownloadProgress: async (progressEvent: any) => {
      const dataChunk = progressEvent.event.target.response;
      setChatGPTAnswer(dataChunk);
    },
  }).catch((err) => {
    setChatGPTAnswer("(今は返事をしたくないようです...)");
    console.log(err);
  });
}
