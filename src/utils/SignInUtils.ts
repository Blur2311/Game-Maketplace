export const LOCKOUT_THRESHOLD = 5;
export const LOCKOUT_DURATION = 30 * 60 * 1000;

export const getLoginAttempts = () => {
  return parseInt(localStorage.getItem("loginAttempts") || "0", 10);
};

export const getLastFailedLoginTime = () => {
  return parseInt(localStorage.getItem("lastFailedLoginTime") || "0", 10);
};

export const setLoginAttempts = (attempts: number) => {
  localStorage.setItem("loginAttempts", attempts.toString());
};

export const setLastFailedLoginTime = (time: number) => {
  const timeDifference = time - getLastFailedLoginTime();

  if (timeDifference > LOCKOUT_DURATION) {
    setLoginAttempts(1);
  }
  localStorage.setItem("lastFailedLoginTime", time.toString());
};