import "primeicons/primeicons.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { NavFooterPage } from "./layout/Nav&Footer/Nav&FooterPage";
import { BrowserPage } from "./layout/BrowserPage/BrowserPage";
import { Homepage } from "./layout/Homepage/Homepage";
import { SignIn } from "./layout/SignInPage/SignIn";
import { Registration } from "./layout/RegisterPage/Registration";
import { VerifyOTP } from "./layout/RegisterPage/VerifyOTP";

function App() {
  return (
    <>
      <div className="mx-auto max-w-[1440px]">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<NavFooterPage />}>
              {/* Route mặc định là "home" */}
              <Route index element={<Homepage />} />
              <Route path="home" element={<Homepage />} />
              <Route path="browser" element={<BrowserPage />} />
            </Route>

            {/* Chuyển hướng tất cả các route không hợp lệ về "home" */}
            <Route path="/sign-in" element={<SignIn />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
