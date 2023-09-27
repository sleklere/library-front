import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userActions } from "../../store/user-slice";

export default function AuthVerify({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = getAuthToken();

  useEffect(() => {
    async function logout() {
      // only necessary if using cookies in response
      // try {
      //   const res = await axios({
      //     method: "GET",
      //     url: `${process.env.REACT_APP_API_URL}/users/logout`,
      //   });

      //   console.log(res);
      // } catch (err) {
      //   console.log(err);
      // }

      dispatch(userActions.logout());
      navigate("/login");
    }

    if (!token) return;

    if (token === "EXPIRED") {
      logout();
    }

    const loginExpiration = getTokenDuration();

    setTimeout(() => {
      logout();
    }, loginExpiration);
  }, [dispatch, navigate, children, token]);

  return children;
}

export function getTokenDuration() {
  const expirationDate = new Date(localStorage.getItem("expiration"));
  const now = new Date();

  const duration = expirationDate.getTime() - now.getTime();

  return duration;
}

export function getAuthToken() {
  const token = localStorage.getItem("jwt");

  if (!token) return null;

  const tokenDuration = getTokenDuration();

  if (tokenDuration < 0) return "EXPIRED";

  return token;
}
