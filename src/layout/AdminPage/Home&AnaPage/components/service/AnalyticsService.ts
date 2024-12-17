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

export const getRevenueVsProfit = async () => {
  const response = await apiClient.get("/api/analytics/revenue-vs-profit");
  if (response.data.status === "OK") {
    return response.data.data;
  } else {
    throw new Error("Failed to fetch revenue vs profit data");
  }
};

export const getMonthlyUserGrowth = async () => {
  const response = await apiClient.get("/api/analytics/monthly-user-growth");
  if (response.data.status === "OK") {
    return response.data.data;
  } else {
    throw new Error("Failed to fetch monthly user growth data");
  }
};