import * as React from "react";
import { getChatGPTAnswer } from "@/utils/getChatGPTAnswer";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "@/constants/ItemTypes";

interface Props {
  textInput: string;
  setChatGPTAnswer: React.Dispatch<React.SetStateAction<string>>;
  index: number;
  moveButton: (dragIndex: number, hoverIndex: number) => void;
}

export const ChatbotAnswerSection: React.FC<Props> = ({
  textInput,
  setChatGPTAnswer,
  index,
  moveButton,
}) => {
  const [isChatGPTAnserButtonDisabled, setIsChatGPTAnswerButtonDisabled] =
    React.useState(false);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.BUTTON,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop(() => ({
    accept: ItemTypes.BUTTON,
    hover(item: any, monitor: any) {
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      moveButton(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  }));
  const opacity = isDragging ? 0.5 : 1;

  return (
    <div ref={drop}>
      <Stack spacing={2} direction='column'>
        <Button
          ref={drag}
          id={`{button_${index}}`}
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
