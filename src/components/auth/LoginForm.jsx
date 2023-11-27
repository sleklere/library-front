import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/user-slice";
import useInput from "../../hooks/useInput";
import authUserAPI from "../utils/authUserAPI";
import { getForm, notEmpty } from "../utils/form";
import LoaderSpinner from "../LoaderSpinner";
import Input from "../form/Input";

function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formBackError, setFormBackError] = useState("");
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  const [nameInputStates, nameProps] = useInput(notEmpty);
  const [passwordInputStates, passwordProps] = useInput(notEmpty);

  const { formIsValid, formReset } = getForm(nameInputStates, passwordInputStates);

  async function loginHandler(event) {
    event.preventDefault();
    setIsFormSubmitting(true);

    if (!formIsValid) {
      setIsFormSubmitting(false);
      return;
    }

    try {
      const { user, token } = await authUserAPI("login", {
        username: nameProps.value,
        password: passwordProps.value,
      });

      formReset();

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
      {formBackError.length > 0 && <p className="error-text">{formBackError}</p>}
      <form className="form" onSubmit={loginHandler}>
        <Input
          type="text"
          labelText="Usuario"
          placeholder="usuario123"
          errMsg="Please enter a username"
          {...nameProps}
        />
        <Input
          type="password"
          labelText="Contraseña"
          placeholder="************"
          errMsg="Please enter a password"
          {...passwordProps}
        />
        <button className="auth-submit" type="submit" disabled={!formIsValid}>
          {isFormSubmitting ? <LoaderSpinner /> : "Iniciar sesión"}
        </button>
        <Link to={"/register"}>
          <button className="auth-change">Registrarse</button>
        </Link>
      </form>
    </div>
  );
}

export default LoginForm;
