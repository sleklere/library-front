import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/user-slice";
import useInput from "../../hooks/useInput";
import authUserAPI from "../utils/authUserAPI";
import { emailValidation, getForm, notEmpty } from "../utils/form";
import Input from "../form/Input";
import LoaderSpinner from "../LoaderSpinner";

function RegisterForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formBackError, setFormBackError] = useState("");
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  const [usernameInputStates, usernameProps] = useInput(notEmpty);
  const [firstNameInputStates, firstNameProps] = useInput(notEmpty);
  const [lastNameInputStates, lastNameProps] = useInput(notEmpty);
  const [emailInputStates, emailProps] = useInput(emailValidation);
  const [psswdInputStates, psswdProps] = useInput(notEmpty);
  const [psswdConfInputStates, psswdConfProps] = useInput((val) => val.trim() === psswdProps.value);

  const { formIsValid, formReset } = getForm(
    usernameInputStates,
    firstNameInputStates,
    lastNameInputStates,
    emailInputStates,
    psswdInputStates,
    psswdConfInputStates
  );

  async function registerHandler(event) {
    event.preventDefault();

    setIsFormSubmitting(true);

    if (!formIsValid) {
      setIsFormSubmitting(false);
      return;
    }

    try {
      const { user, token } = await authUserAPI("signup", {
        firstName: firstNameProps.value,
        lastName: lastNameProps.value,
        username: usernameProps.value,
        email: emailProps.value,
        password: psswdProps.value,
        passwordConfirm: psswdConfProps.value,
      });

      formReset();

      console.log(user);

      dispatch(userActions.login({ user, token }));

      setIsFormSubmitting(false);

      navigate("/home");
    } catch (err) {
      console.log(err.response);
      setIsFormSubmitting(false);
      setFormBackError(err.response?.data.message);
    }
  }

  return (
    <div className="form-container">
      <h1>Creá tu Cuenta</h1>
      {formBackError?.length > 0 && <p className="error-text">{formBackError}</p>}
      <form className="form" onSubmit={registerHandler}>
        <Input
          type="text"
          labelText="Nombre"
          placeholder="Juan"
          errMsg="Please enter a valid first name"
          {...firstNameProps}
        />
        <Input
          type="text"
          labelText="Apellido"
          placeholder="Gonzalez"
          errMsg="Please enter a valid last name"
          {...lastNameProps}
        />

        <Input
          type="text"
          labelText="Email"
          placeholder="user@email.com"
          errMsg="Please enter a valid email"
          {...emailProps}
        />
        <Input
          type="text"
          labelText="Usuario"
          placeholder="username123"
          errMsg="Please enter a valid username"
          {...usernameProps}
        />
        <Input
          type="password"
          labelText="Contraseña"
          placeholder="************"
          errMsg="Please enter a password"
          {...psswdProps}
        />
        <Input
          type="password"
          labelText="Repetir Contraseña"
          placeholder="************"
          errMsg="Passwords must match"
          {...psswdConfProps}
        />
        <button className={`btn auth-submit`} type="submit">
          {isFormSubmitting ? <LoaderSpinner /> : "Register"}
        </button>
        <Link to={"/login"}>
          <button className="auth-change">Login</button>
        </Link>
      </form>
    </div>
  );
}

export default RegisterForm;
