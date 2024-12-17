import apiClient from "../../../../../config/apiClient";
import { Analytics } from "../../../../../model/AnalyticsModel";

export interface MonthlyData {
  month: string;
  amount: number;
}

export interface UserGrowthData {
  month: string;
  newUsers: number;
}

export const getAnalytics = async (): Promise<Analytics> => {
  const response = await apiClient.get("/api/orders/analytics-summary");
  if (response.data.status === "OK") {
    return response.data.data;
  } else {
    throw new Error("Failed to fetch analytics summary");
  }
};

export const getRevenueVsProfit = async (): Promise<{ revenue: MonthlyData[], profit: MonthlyData[] }> => {
  const response = await apiClient.get("/api/orders/revenue-vs-profit");
  if (response.data) {
    console.log(response.data);
    return response.data;
    
  } else {
    throw new Error("Failed to fetch revenue vs profit data");
  }
};

export const getMonthlyUserGrowth = async (): Promise<{ userGrowth: UserGrowthData[] }> => {
  const response = await apiClient.get("/api/orders/monthly-user-growth");
  if (response.data) {
    console.log(response.data);
    return response.data;
  } else {
    throw new Error("Failed to fetch monthly user growth data");
  }
};