import apiClient from "../../../../../config/apiClient";
import { InvoiceModel } from '../../../../../model/InvoiceModel';

export const fetchInvoices = async (): Promise<InvoiceModel[]> => {
  try {
    const response = await apiClient.get('/api/orders/find-all');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching invoices:', error);
    throw error;
  }
};

export const filterInvoices = (
  invoices: InvoiceModel[],
  searchInvoiceID: string,
  searchCustomer: string,
  selectedStatus: boolean[],
  fromDate: Date | null,
  toDate: Date | null
): InvoiceModel[] => {
  return invoices.filter(invoice => {
    const matchesSearchInvoiceID = searchInvoiceID
      ? invoice.sysIdOrder.toString().includes(searchInvoiceID.trim().toLowerCase())
      : true;

    const matchesSearchCustomer = searchCustomer
      ? invoice.usersDTO.hoVaTen.toLowerCase().includes(searchCustomer.trim().toLowerCase())
      : true;

    const matchesStatus = selectedStatus.length > 0
      ? selectedStatus.includes(invoice.paymentStatus)
      : true;

    const matchesFromDate = fromDate
      ? new Date(invoice.orderDate) >= fromDate
      : true;

    const matchesToDate = toDate
      ? new Date(invoice.orderDate) <= toDate
      : true;

    return matchesSearchInvoiceID && matchesSearchCustomer && matchesStatus && matchesFromDate && matchesToDate;
  });
};