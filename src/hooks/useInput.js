import { useState } from "react";

export default function useInput(validateFn) {
  const [value, setValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const isValid = validateFn(value);
  const hasError = !isValid && isTouched;

  const changeHandler = (event) => setValue(event.target.value);

  const blurHandler = (event) => setIsTouched(true);

  const classes = hasError ? "form-input--invalid" : "";

  const reset = () => {
    setValue("");
    setIsTouched(false);
  };

  return {
    value,
    isValid,
    hasError,
    changeHandler,
    blurHandler,
    classes,
    reset,
  };
}
