export const onClickEvent = (
  sampleInput: number,
  setSampleInput: React.Dispatch<React.SetStateAction<number>>
): void => {
  console.log("button Click!!!!!!!");
  setSampleInput(sampleInput + 1);
};

export const onInputEvent = (
  setTextInput: React.Dispatch<React.SetStateAction<string>>,
  event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
): void => {
  setTextInput(event.target.value);
};
