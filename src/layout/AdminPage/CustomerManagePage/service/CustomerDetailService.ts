import apiClient from "../../../../config/apiClient";

export const findOrdersByUsername = async (username: string) => {
  try {
    const response = await apiClient.get("/api/orders/find-order-by-username", {
      params: { username },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching orders by username:", error);
    throw error;
  }
};

export const fetchOrders = async (username: string) => {
  try {
    const ordersData = await findOrdersByUsername(username);
    return ordersData;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};