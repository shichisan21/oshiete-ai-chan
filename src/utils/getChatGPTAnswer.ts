import * as React from "react";
import axios from "axios";

const callChatGPTApiUrl = "/api/talkRoom";

export async function getChatGPTAnswer(
  setIsChatGPTAnswerButtonDisabled: React.Dispatch<
    React.SetStateAction<boolean>
  >,
  setChatGPTAnswer: React.Dispatch<React.SetStateAction<string>>,
  textInput: string,
  answerType: string,
  defaultText: string
): Promise<void> {
  setIsChatGPTAnswerButtonDisabled(true);
  setChatGPTAnswer("(返事を考えているようです...)");

  const userInput = textInput === "" ? defaultText : textInput;

  await axios({
    url: callChatGPTApiUrl,
    method: "POST",
    data: { userInput, answerType },
    timeout: 10000, // 10秒でタイムアウト
    onDownloadProgress: async (progressEvent: any) => {
      const dataChunk = progressEvent.event.target.response;
      setChatGPTAnswer(dataChunk);
    },
  })
    .catch((err) => {
      setChatGPTAnswer("(今は忙しくて返事ができないようです...)");
      console.log(err);
    })
    .finally(() => {
      setIsChatGPTAnswerButtonDisabled(false);
    });
}
