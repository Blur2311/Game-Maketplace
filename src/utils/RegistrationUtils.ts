// src/utils/formValidation.ts
import { RegistrationErrors } from "../model/RegistrationModel";
import {
  validateEmail,
  validateUsername,
  validatePassword,
} from "./ValidationUtils";

//VALIDATE REGISTRATION
export const validateRegisForm = (
  email: string,
  username: string,
  password: string,
  confirmPassword: string,
  isChecked: boolean,
): RegistrationErrors => {
  const newErrors: RegistrationErrors = {};

  if (!email) {
    newErrors.email =
      "Email không được để trống. Vui lòng nhập địa chỉ email hợp lệ.";
  } else if (!validateEmail(email)) {
    newErrors.email =
      "Email không hợp lệ. Vui lòng nhập địa chỉ email đúng định dạng (ví dụ: example@domain.com).";
  }

  if (!username) {
    newErrors.username =
      "Tên người dùng không được để trống. Vui lòng nhập tên người dùng.";
  } else if (!validateUsername(username)) {
    newErrors.username =
      "Tên người dùng không hợp lệ. Tên người dùng phải có ít nhất 4 ký tự và chỉ chứa chữ cái, số, dấu gạch dưới (_) và dấu gạch ngang (-).";
  }

  if (!password) {
    newErrors.password =
      "Mật khẩu không được để trống. Vui lòng nhập mật khẩu.";
  } else if (!validatePassword(password)) {
    newErrors.password =
      "Mật khẩu không hợp lệ. Mật khẩu phải có ít nhất 6 ký tự, bao gồm ít nhất một chữ cái và một số.";
  }

  if (password !== confirmPassword) {
    newErrors.confirmPassword =
      "Mật khẩu xác nhận không khớp. Vui lòng nhập lại mật khẩu.";
  }

  if (!isChecked) {
    newErrors.isChecked =
      "Bạn phải đồng ý với điều khoản dịch vụ. Vui lòng đánh dấu vào ô đồng ý.";
  }

  return newErrors;
};
