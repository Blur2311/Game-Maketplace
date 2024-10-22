// src/utils/validation.ts
export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateUsername = (username: string) => {
  const usernameRegex = /^[a-zA-Z0-9_-]{4,}$/;
  return usernameRegex.test(username);
};

export const validatePassword = (password: string) => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
  return passwordRegex.test(password);
};