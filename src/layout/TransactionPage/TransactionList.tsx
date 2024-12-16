import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { useState, useEffect } from "react";
import { TransactionRow } from "./components/TransactionRow";
import { getUsernameFromToken } from "../../utils/AuthUtils";
import apiClient from "../../config/apiClient";

const username = getUsernameFromToken();

export const TransactionList = () => {
  const [dates, setDates] = useState<Date[] | null>(null);
  const [description, setDescription] = useState<string>("");
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    // Fetch tất cả giao dịch khi load trang
    fetchTransactions();
  }, []);

  const fetchTransactions = async (startDate?: string, endDate?: string, des?: string) => {
    try {
      const params: any = { username };
      if (startDate && endDate) {
        params.startDate = startDate;
        params.endDate = endDate;
      }
      if (des) {
        params.des = des;
      }

      const response = await apiClient.get("/api/transactions/find-transaction", { params });
      setTransactions(response.data.data || []);
      console.log("Fetched transactions:", response.data.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const handleDateChange = (e: any) => {
    setDates(e.value);
  };

  const handleFilter = () => {
    const startDate = dates && dates[0] ? dates[0].toISOString() : undefined;
    const endDate = dates && dates[1] ? dates[1].toISOString() : undefined;
    fetchTransactions(startDate, endDate, description);
  };

  return (
    <div className="pl-5">
      <div className="rounded bg-white p-10">
        <h1 className="text-3xl">Transactions</h1>
        <h6 className="mt-[15px] text-sm font-light">
          Your account payment details, transactions.
        </h6>
        <div className="mt-[30px]">
          <div className="flex items-center justify-between">
            <FloatLabel className="text-sm">
              <InputText
                className="h-[50px] w-full border border-grayBorder bg-transparent p-5 ps-[10px]"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <label>Description</label>
            </FloatLabel>
            <div className="flex items-center gap-2">
              <FloatLabel className="text-sm">
                <Calendar
                  value={dates}
                  selectionMode="range"
                  onChange={handleDateChange}
                  className="h-[50px] min-w-52 rounded border border-grayBorder bg-transparent px-[10px]"
                  readOnlyInput
                />
                <label>Date Range</label>
              </FloatLabel>
              <Button
                icon="pi pi-filter"
                size="large"
                className="h-[50px] w-[50px] bg-mainYellow text-base font-bold text-slate-900"
                onClick={handleFilter}
              />
            </div>
          </div>
        </div>
        <div className="mt-5">
          <div>
            <div className="mb-5 rounded bg-[#F2F2F2] px-5 pb-5 shadow-sm">
              <table className="w-full rounded-xl">
                <thead>
                  <tr className="text-left">
                    <th className="p-5 text-xs font-light">Date</th>
                    <th className="p-5 text-xs font-light">Description</th>
                    <th className="p-5 text-xs font-light">Amount</th>
                    <th className="p-5 text-xs font-light">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.length > 0 ? (
                    transactions.map((transaction, index) => (
                      <TransactionRow
                        key={index}
                        date={transaction.paymentTime}
                        description={transaction.description}
                        amount={transaction.amount}
                        balance={transaction.userBalance}
                        withdraw={transaction.status}
                      />
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="p-5 text-center">
                        No transactions found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              {/* <div className="mt-3 flex justify-center">
                <Button
                  label="SHOW MORE"
                  size="large"
                  className="mt-5 h-[50px] w-[150px] bg-gray250 text-xs font-bold text-slate-900"
                />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
