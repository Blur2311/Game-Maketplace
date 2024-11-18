import { Button } from "primereact/button";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { useState, useEffect, ChangeEvent } from "react";
import { getUsernameFromToken } from "../../utils/AuthUtils";
import apiClient from "../../config/apiClient";
import axios, { AxiosResponse, AxiosError } from "axios";
import Swal from "sweetalert2";  // Đảm bảo đã cài SweetAlert2



export const ChangePW = () => {

  interface FormData {
    username: string | null;
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  }

  interface ErrorData {
    oldPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
  }


  const username = getUsernameFromToken();

  const [formData, setFormData] = useState<FormData>({
    username: username, // Lấy từ token
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [newError, setNewError] = useState<ErrorData>({});

  const validation = (): boolean => {
    const errors: ErrorData = {};

    // Kiểm tra trường oldPassword
    if (!formData.oldPassword) {
      errors.oldPassword = "Current password is required.";
    }

    // Kiểm tra trường newPassword
    if (!formData.newPassword) {
      errors.newPassword = "New password is required.";
    } else if (formData.newPassword.length < 7) {
      errors.newPassword = "Password must be at least 7 characters long.";
    } else if (!/[A-Za-z]/.test(formData.newPassword)) {
      errors.newPassword = "Password must contain at least one letter.";
    } else if (!/[0-9]/.test(formData.newPassword)) {
      errors.newPassword = "Password must contain at least one number.";
    } else if (/\s/.test(formData.newPassword)) {
      errors.newPassword = "Password must not contain spaces.";
    }

    // Kiểm tra confirmPassword
    if (!formData.confirmPassword) {
      errors.confirmPassword = "Please confirm your new password.";
    } else if (formData.newPassword !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }

    setNewError(errors);
    return Object.keys(errors).length === 0; // Nếu không có lỗi, trả về true
  };



  const handleChangePassword = async () => {
    if (!validation()) {
      console.log(newError);
      return;
    }

    try {
      // Gửi dữ liệu tới API
      const response = await apiClient.post("/api/accounts/change-password", {
        username: formData.username,
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
      });

      // Xử lý phản hồi thành công
      console.log("Password changed successfully:", response.data.message);
      Swal.fire({
        icon: "success",
        title: "Password changed successfully!",
        text: response.data.message,
      });
    } catch (error) {
      // Xử lý lỗi
      if (axios.isAxiosError(error)) {
        console.error("Error changing password:", error.response?.data?.message);
        Swal.fire({
          icon: "error",
          title: "Error changing password",
          text: error.response?.data?.message || "An error occurred while changing password.",
        });
      } else {
        console.error("Unexpected error:", error);
        Swal.fire({
          icon: "error",
          title: "Unexpected error",
          text: "An unexpected error occurred.",
        });
      }
    }
  };


  return (
    <>
      <div className="pl-5">
        <div className="rounded bg-white p-10">
          <h1 className="text-3xl">Change Your Password</h1>
          <h6 className="mt-[15px] text-sm font-light">
            For your security, we highly recommend that you choose a unique
            password that you don't use for any other online account.
          </h6>
          <div className="mt-[50px]">
            <div className="">
              <h5 className="text-sm font-bold">Current Password</h5>
              <div className="mt-[25px]">
                <FloatLabel className="text-sm">
                  <Password
                    // toggleMask
                    inputClassName="border-grayBorder h-[50px] border bg-transparent p-5 ps-[10px] w-[360px]"
                    // value={password}
                    onChange={(e) => setFormData({ ...formData, oldPassword: e.target.value })}
                  // aria-invalid={!!error}
                  // aria-describedby="password-error"
                  />
                  <label>Current Password</label>
                </FloatLabel>
                {newError.oldPassword && (
                  <p className="text-red-500 text-sm">{newError.oldPassword}</p>
                )}
              </div>
            </div>
            <div className="">
              <h5 className="mt-10 text-sm font-bold">New Password</h5>
              <div className="mt-[25px]">
                <FloatLabel className="text-sm">
                  <Password
                    // toggleMask
                    inputClassName="border-grayBorder h-[50px] border bg-transparent p-5 ps-[10px] w-[360px]"
                    // value={password}
                    onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                  // aria-invalid={!!error}
                  // aria-describedby="password-error"
                  />
                  <label>New Password</label>
                </FloatLabel>
                {newError.newPassword && (
                  <p className="text-red-500 text-sm">{newError.newPassword}</p>
                )}
              </div>
            </div>
            <div className="mt-4 max-w-[360px] rounded-md bg-gray250 py-4 ps-10 font-light">
              <ul className="list-disc text-sm">
                <li>Avoid using any of your last 5 passwords</li>
                <li>Use 7+ characters</li>
                <li>Use at least 1 letter</li>
                <li>Use at least 1 number</li>
                <li>No spaces</li>
              </ul>
            </div>
            <div className="mt-10">
              <FloatLabel className="text-sm">
                <Password
                  // toggleMask
                  inputClassName="border-grayBorder h-[50px] border bg-transparent p-5 ps-[10px] w-[360px]"
                  // value={password}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                // aria-invalid={!!error}
                // aria-describedby="password-error"
                />
                <label>Retype New Password</label>
              </FloatLabel>
              {newError.confirmPassword && (
                <p className="text-red-500 text-sm">{newError.confirmPassword}</p>
              )}
            </div>
            <Button
              label="SAVE CHANGES"
              size="large"
              className="mt-5 h-[50px] w-[150px] bg-mainYellow text-xs font-bold text-slate-900"
              onClick={handleChangePassword}
            // disabled={isLockedOut}
            />
          </div>
          <div className="">
            <h5 className="mt-20 text-lg font-bold">
              Two-Factor Authentication
            </h5>
            <h6 className="mt-5 text-sm font-light">
              Using two-factor authentication helps secure your account,
              preventing unauthorized transactions.
            </h6>
            <div className="mt-10">
              <h5 className="text-sm font-bold">Payment authentication</h5>
              <div className="mt-[25px]">
                <FloatLabel className="text-sm">
                  <InputText
                    // toggleMask
                    className="h-[50px] w-[360px] border border-grayBorder bg-transparent p-5 ps-[10px]"
                  // value={password}
                  // onChange={(e) => setPassword(e.target.value)}
                  // aria-invalid={!!error}
                  // aria-describedby="password-error"
                  />
                  <label>Do not use OTP</label>
                </FloatLabel>
              </div>
            </div>
            <div className="mt-10">
              <h5 className="text-sm font-bold">Login authentication</h5>
              <div className="mt-[25px]">
                <FloatLabel className="text-sm">
                  <InputText
                    // toggleMask
                    className="h-[50px] w-[360px] border border-grayBorder bg-transparent p-5 ps-[10px]"
                  // value={password}
                  // onChange={(e) => setPassword(e.target.value)}
                  // aria-invalid={!!error}
                  // aria-describedby="password-error"
                  />
                  <label>Do not use OTP</label>
                </FloatLabel>
              </div>
            </div>
            <Button
              label="SET UP"
              size="large"
              className="mt-5 h-[50px] w-[150px] bg-gray250 text-xs font-bold text-slate-900"
            // onClick={handleLogin}
            // disabled={isLockedOut}
            />
          </div>
        </div>
      </div>
    </>
  );
};
