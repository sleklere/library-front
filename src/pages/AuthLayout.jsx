import { Fragment } from "react";
import useSetPageTitle from "../hooks/useSetPageTitle";
import RegisterForm from "../components/auth/RegisterForm";
import LoginForm from "../components/auth/LoginForm";

function AuthLayout(props) {
  useSetPageTitle(props.pageTitle);

  return (
    <Fragment>
      <main className="auth-main">
        <div className="auth-container">
          <div
            className="image-side"
            style={{
              backgroundImage: `${
                props.register
                  ? "url('register-background.jpg')"
                  : "url('login-background.jpg')"
              }`,
            }}
          ></div>
          <div className="form-side">
            {props.register && <RegisterForm title={"Register"} />}
            {props.login && <LoginForm title={"Login"} />}
          </div>
        </div>
      </main>
    </Fragment>
  );
}

export default AuthLayout;
