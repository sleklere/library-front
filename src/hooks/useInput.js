// import { useState } from "react";

// export default function useInput(validateFn) {
//   const [value, setValue] = useState("");
//   const [isTouched, setIsTouched] = useState(false);

//   const isValid = validateFn(value);
//   const hasError = !isValid && isTouched;

//   const changeHandler = (event) => setValue(event.target.value);

//   const blurHandler = (event) => setIsTouched(true);

//   const classes = hasError ? "form-input--invalid" : "";

//   const reset = () => {
//     setValue("");
//     setIsTouched(false);
//   };

//   return {
//     value,
//     isValid,
//     hasError,
//     changeHandler,
//     blurHandler,
//     classes,
//     reset,
//   };
// }

import { useState } from "react";

const useInput = (validationScheme) => {
  const [value, setValue] = useState("");
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
