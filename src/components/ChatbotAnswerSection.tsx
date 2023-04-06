import * as React from "react";
import { getChatGPTAnswer } from "@/utils/getChatGPTAnswer";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import { DragSourceHookSpec, useDrag, useDrop } from "react-dnd";
import { DragObjectWithType } from "react-dnd";

interface Props {
  textInput: string;
  setChatGPTAnswer: React.Dispatch<React.SetStateAction<string>>;
}

const [{ canDrop, isOver }, drop] = useDrop({
  accept: "BUTTON",
  drop: (item: DragObjectWithType, monitor: DropTargetMonitor) => {
    const didDrop = monitor.didDrop();
    if (didDrop) {
      return;
    }
    // ...
  },
  collect: (monitor) => ({
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  }),
});

const buttonsource: DragSourceHookSpec<string, any, any> = {
  beginDrag: (props) => {
    return { id: props.id };
  },
};

const drop = (item: any, monitor: any) => {
  const didDrop = monitor.didDrop();
  if (didDrop) {
    return;
  }
  return { name: "ChatbotAnswerSection" };
};

export const ChatbotAnswerSection: React.FC<Props> = ({
  textInput,
  setChatGPTAnswer,
}) => {
  const [isChatGPTAnserButtonDisabled, setIsChatGPTAnswerButtonDisabled] =
    React.useState(false);

  return (
    <div>
      <Stack spacing={2} direction='column'>
        <div ref={drop} style={{ opacity: buttonsource.isDragging ? 0.5 : 1 }}>
          <Button
            {...buttonsource}
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
        </div>
      </Stack>
    </div>
  );
};
