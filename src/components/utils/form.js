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
