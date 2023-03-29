import * as React from "react";
import { getChatGPTAnswer } from "@/utils/getChatGPTAnswer";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

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

            const answerType = "shizuka";
            const defaultText = "ごきげんよう";
            getChatGPTAnswer(
              setChatGPTAnswer,
              textInput,
              answerType,
              defaultText
            );
            setIsChatGPTAnserButtonDisabled(false);
          }}
        >
          物静かな女性に聞く?
        </Button>

        <Button
          size='medium'
          variant='outlined'
          type='button'
          disabled={isChatGPTAnserButtonDisabled}
          onClick={async () => {
            setIsChatGPTAnserButtonDisabled(true);

            const answerType = "genki";
            const defaultText = "おはよう！";
            getChatGPTAnswer(
              setChatGPTAnswer,
              textInput,
              answerType,
              defaultText
            );
            setIsChatGPTAnserButtonDisabled(false);
          }}
        >
          元気な幼馴染に聞く？
        </Button>

        <Button
          size='medium'
          variant='outlined'
          type='button'
          disabled={isChatGPTAnserButtonDisabled}
          onClick={async () => {
            setIsChatGPTAnserButtonDisabled(true);

            const answerType = "tereya";
            const defaultText = "おはよう！";
            getChatGPTAnswer(
              setChatGPTAnswer,
              textInput,
              answerType,
              defaultText
            );
            setIsChatGPTAnserButtonDisabled(false);
          }}
        >
          照れ屋な女の子に聞く？
        </Button>
      </Stack>
    </div>
  );
};
