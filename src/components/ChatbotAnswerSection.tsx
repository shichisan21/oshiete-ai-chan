import * as React from "react";
import { getChatGPTAnswer } from "@/utils/getChatGPTAnswer";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import { DragSourceHookSpec, useDrag, useDrop } from "react-dnd";

interface Props {
  textInput: string;
  setChatGPTAnswer: React.Dispatch<React.SetStateAction<string>>;
}

export const DnDItems = {
  Todo: "Todo",
} as const;
export type DnDItems = typeof DnDItems[keyof typeof DnDItems];

const buttonItem = {
  type: DnDItems.Todo,
} as const;

type ButtonItem = typeof buttonItem;

const buttonSource: DragSourceHookSpec<
  ButtonType,
  unknown,
  { isDragging: boolean }
> = {
  item: buttonItem,
  collect: (monitor) => ({
    isDragging: monitor.isDragging(),
  }),
};

const [{ isOver }, drop] = useDrop(() => ({
  accept: DnDItems.Todo,
  drop: () => ({
    name: "ChatbotAnswerSection",
  }),
  collect: (monitor) => ({
    isOver: monitor.isOver(),
  }),
}));

export const ChatbotAnswerSection: React.FC<Props> = ({
  textInput,
  setChatGPTAnswer,
}) => {
  const [isChatGPTAnserButtonDisabled, setIsChatGPTAnswerButtonDisabled] =
    React.useState(false);

  return (
    <div>
      <Stack spacing={2} direction='column'>
        <Button
          ref={drop}
          id='button_01'
          draggable='true'
          size='medium'
          variant='outlined'
          type='button'
          disabled={isChatGPTAnserButtonDisabled}
          onClick={async () => {
            const answerType = "shizuka";
            const defaultText = "ごきげんよう";
            getChatGPTAnswer(
              setIsChatGPTAnswerButtonDisabled,
              setChatGPTAnswer,
              textInput,
              answerType,
              defaultText
            );
          }}
        >
          物静かな女性に聞く?
        </Button>

        <Button
          id='button_02'
          draggable='true'
          size='medium'
          variant='outlined'
          type='button'
          disabled={isChatGPTAnserButtonDisabled}
          onClick={async () => {
            const answerType = "genki";
            const defaultText = "おはよう！";
            getChatGPTAnswer(
              setIsChatGPTAnswerButtonDisabled,
              setChatGPTAnswer,
              textInput,
              answerType,
              defaultText
            );
          }}
        >
          元気な幼馴染に聞く？
        </Button>

        <Button
          id='button_03'
          draggable='true'
          size='medium'
          variant='outlined'
          type='button'
          disabled={isChatGPTAnserButtonDisabled}
          onClick={async () => {
            const answerType = "tereya";
            const defaultText = "おはよう！";
            getChatGPTAnswer(
              setIsChatGPTAnswerButtonDisabled,
              setChatGPTAnswer,
              textInput,
              answerType,
              defaultText
            );
          }}
        >
          照れ屋な女の子に聞く？
        </Button>
      </Stack>
    </div>
  );
};
