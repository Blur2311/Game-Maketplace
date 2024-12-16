import apiClient from "../../../../../config/apiClient";
import { Analytics } from "../../../../../model/AnalyticsModel"

export const getAnalytics = async (): Promise<Analytics> => {
  const response = await apiClient.get("/api/orders/analytics-summary");
  if (response.data.status === "OK") {
    return response.data.data;
  } else {
    throw new Error("Failed to fetch analytics summary");
  }
};