import apiClient from "../../../../config/apiClient";

export const insertAccountUserAndRole = async (accountDTO: any) => {
  try {
    const response = await apiClient.post("/api/accounts/insert-account-user-role", accountDTO);
    return response.data;
  } catch (error) {
    console.error("Error inserting account user and role:", error);
    throw error;
  }
};

export const convertFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export const validateForm = (formData: any) => {
  const { username, email, hoVaTen, phoneNumber, password, rePassword } = formData;
  const newErrors: { [key: string]: string } = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{10}$/;

  if (!username) newErrors.username = "Username is required";
  if (!email) newErrors.email = "Email is required";
  else if (!emailRegex.test(email)) newErrors.email = "Invalid email format";
  if (!hoVaTen) newErrors.hoVaTen = "Full name is required";
  if (!phoneNumber) newErrors.phoneNumber = "Phone number is required";
  else if (!phoneRegex.test(phoneNumber)) newErrors.phoneNumber = "Phone number must be 10 digits";
  if (!password) newErrors.password = "Password is required";
  if (password !== rePassword) newErrors.rePassword = "Passwords do not match";
  return newErrors;
};