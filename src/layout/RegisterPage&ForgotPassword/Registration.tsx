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
import { validateRegisForm } from "../../utils/RegistrationUtils";
import { RegistrationErrors } from "../../model/RegistrationModel";
import { Link } from "react-router-dom";

export const Registration: React.FC = React.memo(() => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<RegistrationErrors>({});
  const toast = useRef<Toast>(null);
  const navigate = useNavigate();

  const isFormValid = useCallback(() => {
    const newErrors = validateRegisForm(
      email,
      username,
      password,
      confirmPassword,
      isChecked,
    );
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      showSuccessToast(toast, "Sign up successful!");
      return true;
    } else {
      Object.values(newErrors).forEach((error) => {
        showErrorToast(toast, error);
      });
      return false;
    }
  }, [email, username, password, confirmPassword, isChecked]);

  const handleSubmit = useCallback(async () => {
    if (!isFormValid()) {
      return;
    }

    setIsSubmitting(true);

    showInfoToast(
      toast,
      "Hang tight while we send a confirmation email.",
    );

    try {
      const response = await apiClient.post("/api/accounts/register", {
        email,
        username,
        hashPassword: password,
      });

      showSuccessToast(toast, response.data.message || "Sign up successful!");

      if (response.status === 200) {
        localStorage.setItem("email", email);
        navigate("/verify-otp");
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
  }, [email, username, password, isFormValid, navigate]);

  return (
    <>
      <Toast ref={toast} position="top-right" />
      <div className="container flex justify-center h-full mx-auto sm:my-8">
        <div className="flex h-full w-full flex-col items-center rounded-lg bg-gray300 px-5 pb-[60px] pt-[50px] text-white sm:h-fit sm:w-[470px] sm:px-14">
          <Link to={"/"}>
            <img src="/logo.png" alt="" className="mb-[60px] h-14" />
          </Link>
          <h6 className="mb-5 text-xl font-bold">CREATE ACCOUNT</h6>
          <p className="mb-6 max-w-[360px] text-justify text-[0.925rem] text-mainYellow hover:text-white">
            Sign up to track your orders, save favorite games, and get exclusive deals.
          </p>
          <div className="flex flex-col items-center gap-6">
            <FloatLabel className="w-full text-sm">
              <InputText
                id="Email"
                className={`h-[50px] w-full border ${errors.email ? "border-red-500" : "border-grayBorder"} bg-transparent p-5 ps-[10px]`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={!!errors.email}
                aria-describedby="email-error"
              />
              <label htmlFor="Email">Email Address</label>
            </FloatLabel>
            <FloatLabel className="w-full text-sm">
              <InputText
                id="Username"
                className={`h-[50px] w-full border ${errors.username ? "border-red-500" : "border-grayBorder"} bg-transparent p-5 ps-[10px]`}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                aria-invalid={!!errors.username}
                aria-describedby="username-error"
              />
              <label htmlFor="Username">Username</label>
            </FloatLabel>
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
            <div className="flex w-full align-items-center">
              <Checkbox
                inputId="Read"
                name="ReadPolicy"
                value="Read"
                onChange={(e) => setIsChecked(e.checked || false)}
                checked={isChecked}
                aria-invalid={!!errors.isChecked}
                aria-describedby="isChecked-error"
              />
              <label
                htmlFor="ReadPolicy"
                className="ml-2 text-sm text-slate-300"
              >
                {"I have read and agree to the "}
                <a
                  href="#"
                  className="font-medium underline hover:text-mainYellow"
                >
                  terms of service
                </a>
              </label>
            </div>
            <Button
              label="CREATE ACCOUNT"
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
            <div className="text-sm">
              <a
                href="#"
                className="font-medium underline hover:text-mainYellow"
              >
                Privacy policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});