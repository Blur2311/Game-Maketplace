import "primeicons/primeicons.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import {
  NavFooterPage,
  NavSidebarPage,
} from "./layout/Nav&Footer/Nav&FooterPage";
import { BrowserPage } from "./layout/BrowserPage/Browser";
import { Homepage } from "./layout/Homepage/Homepage";
import { SignIn } from "./layout/SignInPage/SignIn";
import { Registration } from "./layout/RegisterPage/Registration";
import { VerifyOTP } from "./layout/RegisterPage/VerifyOTP";
import { ProductDetai } from "./layout/ProductDetailPage/ProductDetail";
import { UserProfile } from "./layout/UserProfilePage/UserProfile";
import { AdminLayout } from "./layout/AdminPage/AdminLayout";
import { CategoryList } from "./layout/AdminPage/CategoryManagePage/CategoryList";
import { CategoryCU } from "./layout/AdminPage/CategoryManagePage/CategoryCU";
import { GameList } from "./layout/AdminPage/GameManagePage/GameList";
import { GameCU } from "./layout/AdminPage/GameManagePage/GameCU";
import { ChangePW } from "./layout/ChangePWPage/ChangePW";
import Forbidden from "./layout/ErrorPage/Forbidden";
import { Checkout } from "./layout/CartPage/Checkout";
import { CartPage } from "./layout/CartPage/CartPage";
import { QRscan } from "./layout/CartPage/QRscan";
import { TransactionList } from "./layout/TransactionPage/TransactionList";
import { ReviewHistory } from "./layout/ReviewHistoryPage/ReviewHistory";
import { OrderHistory } from "./layout/OrderHistoryPage/OrderHistory";
import { OrderHistoryDetail } from "./layout/OrderHistoryPage/OrderHistoryDetail";
import { Wishlist } from "./layout/WishlistPage/Wishlist";
import { News } from "./layout/NewsPage/News";
import { NewsDetail } from "./layout/NewsPage/NewsDetail";
import { SignInAdmin } from "./layout/AdminPage/SignIn&ForgotPage/SignInAdmin";
import { ForgotPWAdmin } from "./layout/AdminPage/SignIn&ForgotPage/ForgotPWAdmin";
import { ResetPWAdmin } from "./layout/AdminPage/SignIn&ForgotPage/ResetPWAdmin";
import { VerifyOTPAdmin } from "./layout/AdminPage/SignIn&ForgotPage/VerifyOTPAdmin";
import { AdminAccInfo } from "./layout/AdminPage/AdminAccInfoPage/AdminAccInfo";
import { AdminSetting } from "./layout/AdminPage/AdminSettingPage/AdminSetting";

function App() {
  return (
    <>
      <div className="">
        <BrowserRouter>
          <Routes>
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="category/list" element={<CategoryList />} />
              <Route path="category/create" element={<CategoryCU />} />
              <Route path="category/detail/:id" element={<CategoryCU />} />
              <Route path="game/list" element={<GameList />} />
              <Route path="game/create" element={<GameCU />} />
              <Route path="game/detail/:id" element={<GameCU />} />

              <Route path="account-info" element={<AdminAccInfo />} />
              <Route path="settings" element={<AdminSetting />} />
            </Route>

            <Route path="/admin/sign-in" element={<SignInAdmin />} />
            <Route path="/admin/forgot-password" element={<ForgotPWAdmin />} />
            <Route path="/admin/verify-otp" element={<VerifyOTPAdmin />} />
            <Route path="/admin/reset-password" element={<ResetPWAdmin />} />

            <Route path="/" element={<NavFooterPage />}>
              {/* Route mặc định là "home" */}
              <Route index element={<Homepage />} />
              <Route path="home" element={<Homepage />} />
              <Route path="browser" element={<BrowserPage />} />
              <Route path="product" element={<ProductDetai />} />
              <Route path="cart" element={<CartPage />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="qr-scan" element={<QRscan />} />
              <Route path="wishlist" element={<Wishlist />} />
              <Route path="news" element={<News />} />
              <Route path="news/detail/:id" element={<NewsDetail />} />
            </Route>

            <Route path="/setting" element={<NavSidebarPage />}>
              <Route path="user-info" element={<UserProfile />} />
              <Route path="order-history" element={<OrderHistory />} />
              <Route
                path="order-history/detail/:id"
                element={<OrderHistoryDetail />}
              />

              <Route path="transaction" element={<TransactionList />} />
              <Route path="security" element={<ChangePW />} />
              <Route path="review-history" element={<ReviewHistory />} />
            </Route>

            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/verify-otp" element={<VerifyOTP />} />
            <Route path="/403" element={<Forbidden />} />

            {/* Chuyển hướng tất cả các route không hợp lệ về "home" */}
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
