import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
// import { Password } from "primereact/password";
import { Toast } from "primereact/toast";
import React, { useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../config/apiClient";
import {
  showErrorToast,
  showInfoToast,
  showSuccessToast,
} from "../../utils/ErrorHandlingUtils";
import { validateNewPasswordForm, validateRegisForm } from "../../utils/RegistrationUtils";
import { NewPasswordErrors, RegistrationErrors } from "../../model/RegistrationModel";
import { Link } from "react-router-dom";

export const NewPassword: React.FC = React.memo(() => {
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<NewPasswordErrors>({});
  const toast = useRef<Toast>(null);
  const navigate = useNavigate();

  const isFormValid = useCallback(() => {
    const newErrors = validateNewPasswordForm(
      email,
      password,
      confirmPassword,
    );
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      return true;
    } else {
      Object.values(newErrors).forEach((error) => {
        showErrorToast(toast, error);
      });
      return false;
    }
  }, [ password, confirmPassword]);

  const handleSubmit = useCallback(async () => {
    if (!isFormValid()) {
      return;
    }

    setIsSubmitting(true);

    showInfoToast(
      toast,
      "Hang tight while we reset your password.",
    );

    try {
      const response = await apiClient.put("/api/accounts/forgot-password/new-password", null, {
        params: {email: email, newPass: password},
      });

      if (response.status === 200) {
        localStorage.setItem("email", email);
        showSuccessToast(toast, response.data.message || "Reset password successful!");
        showInfoToast(toast, "Redirecting to sign-in page...");
        setTimeout(() => {
          navigate("/sign-in");
        }, 3000); // Redirect to sign-in page after 3 seconds
        toast
      } else {
        setIsSubmitting(false);
      }
    } catch (error) {
      showErrorToast(
        toast,
        (error as any)?.response?.data?.message ??
          "Something went wrong. Try again.",
      );
      setIsSubmitting(false);
    }
  }, [email, password, isFormValid, navigate]);

  return (
    <>
      <Toast ref={toast} position="top-right" />
      <div className="container flex justify-center h-full mx-auto sm:my-8 mt-[5rem]">
        <div className="flex h-full w-full flex-col items-center rounded-lg bg-gray300 px-5 pb-[60px] pt-[50px] text-white sm:h-fit sm:w-[470px] sm:px-14">
          <Link to={"/"}>
            <img src="/logo.png" alt="" className="mb-[60px] h-14" />
          </Link>
          <h6 className="mb-5 text-xl font-bold">RESET PASSWORD</h6>
          <p className="mb-6 max-w-[360px] text-justify text-[0.925rem] text-mainYellow hover:text-white">
            Type your new password below
          </p>
          <div className="flex flex-col items-center gap-6">
            <FloatLabel className="text-sm">
              <InputText
                id="Password"
                type={showPassword ? "text" : "password"} // Toggle password visibility
                className={`h-[50px] border border-grayBorder ${errors.password ? "border-red-500" : "border-grayBorder"} bg-transparent p-5 ps-[10px] first:w-[360px]`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-invalid={!!errors.password}
                aria-describedby="password-error"
              />
              <label htmlFor="Password">Password</label>
              <Button
                icon={showPassword ? "pi pi-eye-slash" : "pi pi-eye"}
                className="absolute top-0 right-0 h-full"
                onClick={() => setShowPassword(!showPassword)}
              />
            </FloatLabel>
            <FloatLabel className="text-sm">
              <InputText
                id="ConfirmPassword"
                type={showConfirmPassword ? "text" : "password"} // Toggle password visibility
                className={`h-[50px] border border-grayBorder ${errors.confirmPassword ? "border-red-500" : "border-grayBorder"} bg-transparent p-5 ps-[10px] first:w-[360px]`}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                aria-invalid={!!errors.confirmPassword}
                aria-describedby="confirm-password-error"
              />
              <label htmlFor="ConfirmPassword">Confirm Password</label>
              <Button
                icon={showConfirmPassword ? "pi pi-eye-slash" : "pi pi-eye"}
                className="absolute top-0 right-0 h-full"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            </FloatLabel>
            <Button
              label="RESET PASSWORD"
              size="large"
              className="w-full text-base font-bold h-14 bg-mainYellow text-slate-900"
              onClick={handleSubmit}
              disabled={isSubmitting}
            />
            <div className="text-sm mt-9">
              {"Already have an account? "}
              <Link
                to="/sign-in"
                className="font-medium underline hover:text-mainYellow"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});