import apiClient from "../../../../config/apiClient";

export const getAllVouchers = async () => {
  try {
    const response = await apiClient.get("/api/vouchers/all");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching vouchers:", error);
    throw error;
  }
};