export const notEmpty = val => val.trim() !== "";

export const emailValidation = val => {
  return /.{3,}@.{3,}\.com/.test(val);
};

// it receives the states destructured from the 'use-input' hook
export const getForm = (...inputStates) => {
  const formIsValid = inputStates.reduce(
    (prev, curr) => prev && curr.isValid,
    true
  );
  const formReset = () => {
    for (let inputState of inputStates) {
      inputState.reset();
    }
  };
  return { formIsValid, formReset };
};
