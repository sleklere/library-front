import { useDispatch } from "react-redux";
import useInput from "../../hooks/useInput";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import authUserAPI from "../utils/authUserAPI";
import { userActions } from "../../store/user-slice";
import LoaderSpinner from "../LoaderSpinner";

function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formBackError, setFormBackError] = useState("");
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  const {
    value: enteredUsername,
    isValid: usernameValid,
    hasError: usernameHasError,
    changeHandler: usernameChangeHandler,
    blurHandler: usernameBlurHandler,
    reset: resetUsernameInput,
    classes: usernameClasses,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredPassword,
    isValid: passwordValid,
    hasError: passwordHasError,
    changeHandler: passwordChangeHandler,
    blurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
    classes: passwordClasses,
  } = useInput((value) => value.trim() !== "");

  let validForm = false;

  if (usernameValid && passwordValid) {
    validForm = true;
  }

  async function loginHandler(event) {
    event.preventDefault();
    setIsFormSubmitting(true);

    if (!validForm) {
      setIsFormSubmitting(false);
      return;
    }

    try {
      const { user, token } = await authUserAPI("login", {
        username: enteredUsername,
        password: enteredPassword,
      });

      resetUsernameInput();
      resetPasswordInput();

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
      <h1>Iniciar Sesión</h1>
      {formBackError.length > 0 && (
        <p className="error-text">{formBackError}</p>
      )}
      <form onSubmit={loginHandler}>
        <label className={usernameClasses}>
          Usuario
          <input
            type="text"
            placeholder="username123"
            name="user"
            onChange={usernameChangeHandler}
            onBlur={usernameBlurHandler}
            value={enteredUsername}
          />
          {usernameHasError && (
            <p className="error-text">Please enter a valid username</p>
          )}
        </label>
        <label className={passwordClasses}>
          Contraseña
          <input
            type="password"
            placeholder="************"
            name="password"
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            value={enteredPassword}
          />
          {passwordHasError && (
            <p className="error-text">Please enter a password</p>
          )}
        </label>
        <button className="auth-submit" type="submit" disabled={!validForm}>
          {isFormSubmitting ? (
            // <FontAwesomeIcon icon={faSpinner} className="btn-spinner" />
            <LoaderSpinner />
          ) : (
            "Login"
          )}
        </button>
        <Link to={"/register"}>
          <button className="auth-change">Register</button>
        </Link>
      </form>
    </div>
  );
}

export default LoginForm;
