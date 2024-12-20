import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import apiClient from "../../config/apiClient";
import { TransactionHistoryDTO } from "../../model/TransactionHistoryModel";
import { getUsernameFromToken } from "../../utils/AuthUtils";
import { formatDateToDDMMYYYY, isDateValid } from "../../utils/OtherUtils";
import { OrderHistoryRow } from "./components/OrderHistoryRow";

export const OrderHistory = () => {
  const [description, setDescription] = useState<string>("");
  const [dates, setDates] = useState<Date[] | null>(null);
  const [selectedDates, setSelectedDates] = useState<Date[] | null>(null);
  const [transactions, setTransactions] = useState<TransactionHistoryDTO[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<
    TransactionHistoryDTO[]
  >([]);
  const [length, setLength] = useState<number>(5);

  const handleDateChange = (e: any) => {
    setDates(e.value);
  };

  const fetchTransactions = async () => {
    const username = getUsernameFromToken();
    if (!username) return;
    try {
      const response = await apiClient.get(
        `/api/transactions/get-orders-transaction?username=${username}`,
      );
      setTransactions(response.data.data);
      setFilteredTransactions(response.data.data);
    } catch (error) {
      console.error("Failed to fetch transactions", error);
    }
  };

  const filterTransactions = () => {
    if (!dates) return setFilteredTransactions(transactions);
    const filtered = transactions.filter((transaction) => {
      return (
        isDateValid(transaction.paymentTime.toString(), dates[0], dates[1]) &&
        transaction.description.includes(description)
      );
    });
    setSelectedDates(dates);
    setFilteredTransactions(filtered);
  };

  const handleDescriptionChange = (e: any) => {
    setDescription(e.target.value);
    const filtered = transactions.filter((transaction) => {
      let isMatch = transaction.description.includes(e.target.value);
      if (selectedDates) {
        isMatch =
          isMatch &&
          isDateValid(
            transaction.paymentTime.toString(),
            selectedDates[0],
            selectedDates[1],
          );
      }
      return isMatch;
    });
    setFilteredTransactions(filtered);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <>
      <div className="rounded bg-white p-10">
        <h1 className="text-3xl">Order History</h1>
        <h6 className="mt-[15px] text-sm font-light">
          Display the information of the products you have purchased.
        </h6>
        <div className="mt-[30px]">
          <div className="flex flex-col justify-between gap-2 sm:flex-row lg:items-center">
            <FloatLabel className="text-sm">
              <InputText
                onChange={(e) => handleDescriptionChange(e)}
                className="h-[50px] w-full border border-grayBorder bg-transparent p-5 ps-[10px]"
              />
              <label>Description</label>
            </FloatLabel>
            <div className="flex flex-col gap-2 sm:flex-row lg:items-center">
              <FloatLabel className="text-sm">
                <Calendar
                  value={dates}
                  selectionMode="range"
                  onChange={handleDateChange}
                  className="h-[50px] w-full min-w-52 rounded border border-grayBorder bg-transparent px-[10px]"
                  readOnlyInput
                />
                <label>Date Range</label>
              </FloatLabel>
              <Button
                icon="pi pi-filter"
                size="large"
                className="h-[50px] w-[50px] bg-mainYellow text-base font-bold text-slate-900"
                onClick={filterTransactions}
              />
            </div>
          </div>
        </div>
        <div className="mt-5">
          <div className="">
            <div className="mb-5 rounded bg-[#F2F2F2] px-5 pb-5 shadow-sm">
              <div className="overflow-x-scroll">
                <table className="w-full text-nowrap rounded-xl">
                  <thead>
                    <tr className="text-left">
                      <th className="p-5 text-xs font-light">Date</th>
                      <th className="p-5 text-xs font-light">ID</th>
                      <th className="p-5 text-xs font-light">Description</th>
                      <th className="p-5 text-right text-xs font-light">
                        Price
                      </th>
                      <th className="p-5 text-xs font-light">Status</th>
                      <th className=""></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTransactions
                      .slice(0, length)
                      .map((transaction) => (
                        <OrderHistoryRow
                          key={transaction.sysIdPayment}
                          id={transaction.sysIdPayment.toString()}
                          date={formatDateToDDMMYYYY(
                            transaction.paymentTime.toString(),
                          )}
                          description={transaction.description}
                          price={transaction.amount}
                          status={transaction.status ? "Finish" : "Pending"}
                        />
                      ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-3 flex justify-center">
                <Button
                  hidden={
                    filteredTransactions.length <= 5 ||
                    length >= filteredTransactions.length
                  }
                  label={"SHOW MORE"}
                  size="large"
                  className="mt-5 h-[50px] w-[150px] bg-gray250 text-xs font-bold text-slate-900"
                  onClick={() => setLength(length + 5)}
                />
                <Button
                  hidden={length <= 5}
                  label={"SHOW LESS"}
                  size="large"
                  className="mt-5 h-[50px] w-[150px] bg-gray250 text-xs font-bold text-slate-900"
                  onClick={() => setLength(length - 5)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
