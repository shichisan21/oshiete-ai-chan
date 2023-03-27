import React, { useState, useRef } from "react";
import { onInputEvent } from "./ButtonComponent";
import { AddArticles } from "./AddArticles";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import { Noto_Sans_JP } from "next/font/google";
const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: "400",
});

const TalkRoomComponent: React.FC = () => {
  const [textInput, setTextInput] = useState("");
  const [chatGPTAnswer, setChatGPTAnswer] =
    useState("ここに返事が表示されます。");
  const inputRef = useRef<HTMLInputElement>();

  const handleFocus = () => {
    if (inputRef.current && inputRef.current.value === "") {
      inputRef.current.value = textInput;
      console.log("こっちか？");
    } else if (inputRef.current) {
      inputRef.current.value = "";
      setTextInput(inputRef.current.value);
      console.log("こっち？");
    }
  };

  const handleBlur = () => {
    if (inputRef.current && inputRef.current.value === "") {
      inputRef.current.value = textInput;
    }
  };

  return (
    <>
      <h3 className={notoSansJP.className}>教えて！AIちゃん！</h3>
      <Box
        component='form'
        sx={{
          "& > :not(style)": { m: 1, width: "30ch" },
        }}
        noValidate
        autoComplete='off'
      >
        <TextField
          inputRef={inputRef}
          id='standard-basic'
          placeholder='お話する？'
          variant='standard'
          multiline
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={textInput}
          onChange={(event) => {
            onInputEvent(setTextInput, event);
          }}
        />
      </Box>
      <AddArticles textInput={textInput} setChatGPTAnswer={setChatGPTAnswer} />
      <p>{chatGPTAnswer}</p>
    </>
  );
};

export default TalkRoomComponent;
