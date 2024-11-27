import apiClient from "../../../../../config/apiClient";
import { InvoiceModel } from '../../../../../model/InvoiceModel';

export const fetchInvoiceById = async (sysIdOrder: number): Promise<InvoiceModel> => {
  try {
    const response = await apiClient.get('/api/orders/find-by-sys-id-order', {
      params: { sysIdOrder }
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching invoice by ID:', error);
    throw error;
  }
};