import { useDispatch } from "react-redux";
import LoaderSpinner from "../LoaderSpinner";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import useInput from "../../hooks/useInput";
import authUserAPI from "../utils/authUserAPI";
import { userActions } from "../../store/user-slice";

function RegisterForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formBackError, setFormBackError] = useState("");
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  const {
    value: username,
    blurHandler: usernameBlur,
    changeHandler: usernameChange,
    hasError: usernameErr,
    isValid: usernameValid,
    classes: usernameClasses,
    reset: resetUsername,
  } = useInput((value) => value.trim() !== "");

  const {
    value: firstName,
    blurHandler: firstNameBlur,
    changeHandler: firstNameChange,
    hasError: firstNameErr,
    isValid: firstNameValid,
    classes: firstNameClasses,
    reset: resetFirstName,
  } = useInput((value) => value.trim() !== "");

  const {
    value: lastName,
    blurHandler: lastNameBlur,
    changeHandler: lastNameChange,
    hasError: lastNameErr,
    isValid: lastNameValid,
    classes: lastNameClasses,
    reset: resetLastName,
  } = useInput((value) => value.trim() !== "");

  const {
    value: email,
    blurHandler: emailBlur,
    changeHandler: emailChange,
    hasError: emailErr,
    isValid: emailValid,
    classes: emailClasses,
    reset: resetEmail,
  } = useInput((value) => value.includes("@"));

  const {
    value: password,
    blurHandler: psswdBlur,
    changeHandler: psswdChange,
    hasError: psswdErr,
    isValid: psswdValid,
    classes: psswdClasses,
    reset: resetPsswd,
  } = useInput((value) => value.trim() !== "");

  const {
    value: passwordConfirm,
    blurHandler: psswdConfirmBlur,
    changeHandler: psswdConfirmChange,
    hasError: psswdConfirmErr,
    isValid: psswdConfirmValid,
    classes: psswdConfirmClasses,
    reset: resetPsswdConfirm,
  } = useInput((value) => value.trim() === password);

  let validForm;

  if (
    usernameValid &&
    firstNameValid &&
    lastNameValid &&
    emailValid &&
    psswdValid &&
    psswdConfirmValid
  )
    validForm = true;

  async function registerHandler(event) {
    event.preventDefault();

    setIsFormSubmitting(true);

    if (!validForm) {
      setIsFormSubmitting(false);
      return;
    }

    try {
      const { user, token } = authUserAPI("signup", {
        firstName,
        lastName,
        username,
        email,
        password,
        passwordConfirm,
      });

      resetFirstName();
      resetLastName();
      resetUsername();
      resetEmail();
      resetPsswd();
      resetPsswdConfirm();

      dispatch(userActions.login({ user, token }));

      setIsFormSubmitting(false);

      navigate("/home");
    } catch (err) {
      console.log(err.response);
      setIsFormSubmitting(false);
      setFormBackError(err.response.data.message);
    }
  }

  return (
    <div className="form-container">
      <h1>Creá tu Cuenta</h1>
      {formBackError.length > 0 && <p>{formBackError}</p>}
      <form onSubmit={registerHandler}>
        <div className="name-lastName">
          <label className={firstNameClasses}>
            Nombre
            <input
              type="text"
              placeholder="Juan"
              name="firstName"
              value={firstName}
              onBlur={firstNameBlur}
              onChange={firstNameChange}
            />
            {firstNameErr && (
              <p className="error-text">Please enter a valid first name</p>
            )}
          </label>
          <label className={lastNameClasses}>
            Apellido
            <input
              type="text"
              placeholder="Rodriguez"
              name="lastName"
              value={lastName}
              onBlur={lastNameBlur}
              onChange={lastNameChange}
            />
            {lastNameErr && (
              <p className="error-text">Please enter a valid last name</p>
            )}
          </label>
        </div>
        <label className={emailClasses}>
          E-mail
          <input
            type="email"
            placeholder="user@email.com"
            name="email"
            value={email}
            onBlur={emailBlur}
            onChange={emailChange}
          />
          {emailErr && <p className="error-text">Please enter a valid email</p>}
        </label>
        <label className={usernameClasses}>
          Usuario
          <input
            type="text"
            placeholder="username123"
            name="user"
            value={username}
            onBlur={usernameBlur}
            onChange={usernameChange}
          />
          {usernameErr && (
            <p className="error-text">Please enter a valid username</p>
          )}
        </label>
        <label className={psswdClasses}>
          Contraseña
          <input
            type="password"
            placeholder="************"
            name="password"
            value={password}
            onBlur={psswdBlur}
            onChange={psswdChange}
          />
          {psswdErr && <p className="error-text">Please enter a password</p>}
        </label>
        <label className={psswdConfirmClasses}>
          Repetir Contraseña
          <input
            type="password"
            placeholder="************"
            name="passwordConfirm"
            value={passwordConfirm}
            onBlur={psswdConfirmBlur}
            onChange={psswdConfirmChange}
          />
          {psswdConfirmErr && (
            <p className="error-text">Passwords must match</p>
          )}
        </label>
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
