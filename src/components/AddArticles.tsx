import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import axios from "axios";

const callChatGPTApiUrl = "/api/talkRoom";

interface Props {
  textInput: string;
  setChatGPTAnswer: React.Dispatch<React.SetStateAction<string>>;
}

export const AddArticles: React.FC<Props> = ({
  textInput,
  setChatGPTAnswer,
}) => {
  const [isChatGPTAnserButtonDisabled, setIsChatGPTAnserButtonDisabled] =
    React.useState(false);
  return (
    <div>
      <Stack spacing={2} direction='column'>
        <Button
          size='medium'
          variant='outlined'
          type='button'
          disabled={isChatGPTAnserButtonDisabled}
          onClick={async () => {
            setIsChatGPTAnserButtonDisabled(true);
            setChatGPTAnswer("(返事を考えているようです...)");
            const userInput = textInput === "" ? "ごきげんよう" : textInput;
            const answerType = "shizuka";
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
              setIsChatGPTAnserButtonDisabled(false);
            });
            setIsChatGPTAnserButtonDisabled(false);
          }}
        >
          物静かな女性に聞いてみる?
        </Button>
        <Button
          size='medium'
          variant='outlined'
          type='button'
          disabled={isChatGPTAnserButtonDisabled}
          onClick={async () => {
            setIsChatGPTAnserButtonDisabled(true);
            setChatGPTAnswer("(返事を考えているようです...)");
            const userInput = textInput === "" ? "おはよう！" : textInput;
            const answerType = "genki";
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
              setIsChatGPTAnserButtonDisabled(false);
            });
            setIsChatGPTAnserButtonDisabled(false);
          }}
        >
          元気な幼馴染に聞いてみる？
        </Button>
      </Stack>
    </div>
  );
};
