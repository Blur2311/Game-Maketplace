import "primeicons/primeicons.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { NavFooterPage } from "./layout/Nav&Footer/Nav&FooterPage";
import { BrowserPage } from "./layout/BrowserPage/Browser";
import { Homepage } from "./layout/Homepage/Homepage";
import { SignIn } from "./layout/SignInPage/SignIn";
import { Registration } from "./layout/RegisterPage/Registration";
import { VerifyOTP } from "./layout/RegisterPage/VerifyOTP";
import { ProductDetai } from "./layout/ProductDetailPage/ProductDetail";
import { UserProfile } from "./layout/UserProfilePage/UserProfile";
import { AdminSignIn } from "./layout/SignInPage/AdminSignIn";

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

            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/verify-otp" element={<VerifyOTP />} />
            <Route path="/admin/sign-in" element={<AdminSignIn />} />

            {/* Chuyển hướng tất cả các route không hợp lệ về "home" */}
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
