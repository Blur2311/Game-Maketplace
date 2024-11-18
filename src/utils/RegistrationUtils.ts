// src/utils/formValidation.ts
import { NewPasswordErrors, RegistrationErrors } from "../model/RegistrationModel";
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
      "Email is required. Please enter your email address.";
  } else if (!validateEmail(email)) {
    newErrors.email =
      "Invalid email. Please enter a valid email address.";
  }

  if (!username) {
    newErrors.username =
      "Username is required. Please enter a username.";
  } else if (!validateUsername(username)) {
    newErrors.username =
      "Invalid username. Username must be at least 6 characters long and contain only letters, numbers, and underscores.";
  }

  if (!password) {
    newErrors.password =
      "Password is required. Please enter a password.";
  } else if (!validatePassword(password)) {
    newErrors.password =
      "Invalid password. Password must be at least 6 characters long and contain at least one letter and one number.";
  }

  if (password !== confirmPassword) {
    newErrors.confirmPassword =
      "Password confirmation does not match. Please re-enter your password.";
  }

  if (!isChecked) {
    newErrors.isChecked =
      "You must agree to the terms and conditions to continue.";
  }

  return newErrors;
};

export const validateNewPasswordForm = (
  email: string,
  password: string,
  confirmPassword: string,
): NewPasswordErrors => {
  const newErrors: NewPasswordErrors = {};

  if (!email) {
    newErrors.email =
      "Whoops! Something went wrong. Please try again.";
  } else if (!validateEmail(email)) {
    newErrors.email =
      "Invalid email. Please enter a valid email address.";
  }

  if (!password) {
    newErrors.password =
      "Password is required. Please enter a password.";
  } else if (!validatePassword(password)) {
    newErrors.password =
      "Invalid password. Password must be at least 6 characters long and contain at least one letter and one number.";
  }

  if (password !== confirmPassword) {
    newErrors.confirmPassword =
      "Password confirmation does not match. Please re-enter your password.";
  }

  return newErrors;
};
