import { Outlet } from "react-router-dom";
import AuthVerify from "./components/auth/AuthVerify";

function MainLayout() {
  return (
    <>
      <AuthVerify>
        <Outlet />
      </AuthVerify>
    </>
  );
}

export default MainLayout;
