import apiClient from "../../../../config/apiClient";

export const createVoucher = async (voucherDTO: any) => {
  try {
    const response = await apiClient.post("/api/vouchers/create", voucherDTO);
    return response.data;
  } catch (error) {
    console.error("Error creating voucher:", error);
    throw error;
  }
};

export const updateVoucher = async (id: number, voucherDTO: any) => {
  try {
    const response = await apiClient.put(`/api/vouchers/update/${id}`, voucherDTO);
    return response.data;
  } catch (error) {
    console.error("Error updating voucher:", error);
    throw error;
  }
};

export const generateRandomString = (length: number) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const convertFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export const validateForm = (voucherData: any, isUpdateMode: boolean) => {
  const { discountName, description, discountPercent, quantity, maxDiscount, startDate, endDate, files } = voucherData;
  const newErrors: { [key: string]: string } = {};
  if (!discountName) newErrors.discountName = "Name is required";
  if (!description) newErrors.description = "Description is required";
  if (discountPercent === null || discountPercent < 0 || discountPercent > 100)
    newErrors.discountPercent = "Discount percent must be between 0 and 100";
  if (quantity === null || quantity <= 0)
    newErrors.quantity = "Quantity must be greater than 0";
  if (maxDiscount === null || maxDiscount < 0)
    newErrors.maxDiscount = "Max discount must be greater than or equal to 0";
  if (!startDate) newErrors.startDate = "Start date is required";
  if (!endDate) newErrors.endDate = "End date is required";
  if (startDate && endDate && startDate > endDate)
    newErrors.endDate = "End date must be greater than or equal to start date";
  if (files.length === 0 && !isUpdateMode)
    newErrors.files = "At least one file is required";
  if (files.some((file: any) => !(file instanceof File)) && !isUpdateMode)
    newErrors.files = "File must be of type File";
  return newErrors;
};