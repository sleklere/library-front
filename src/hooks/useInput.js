import { useState } from "react";

const useInput = (validationScheme, initialValue) => {
  const [value, setValue] = useState(initialValue || "");
  const [touched, setTouched] = useState(false);

  const isValid = validationScheme(value);
  const isInvalid = !validationScheme(value) && touched;

  const onChange = (e) => {
    setTouched(true);
    setValue(e.target.value);
  };

  const onBlur = () => {
    setTouched(true);
  };

  const reset = () => {
    setValue("");
    setTouched(false);
  };

  const classes = isInvalid ? "form-input--invalid" : "";

  return [
    { isValid, reset },
    { value, isInvalid, onChange, onBlur, classes },
  ];
};

export default useInput;
