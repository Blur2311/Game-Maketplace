import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { TransactionRow } from "./components/TransactionRow";

export const TransactionList = () => {
  const [dates, setDates] = useState<Date[] | null>(null);

  const handleDateChange = (e: any) => {
    setDates(e.value);
  };
  return (
    <>
      <div className="rounded bg-white p-10">
        <h1 className="text-3xl">Transactions</h1>
        <h6 className="mt-[15px] text-sm font-light">
          Your account payment details, transactions.
        </h6>
        <div className="mt-[30px]">
          <div className="flex flex-col justify-between gap-2 sm:flex-row lg:items-center">
            <FloatLabel className="text-sm">
              <InputText className="h-[50px] w-full border border-grayBorder bg-transparent p-5 ps-[10px]" />
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
                      <th className="p-5 text-xs font-light">Description</th>
                      <th className="p-5 text-xs font-light">Amount</th>
                      <th className="p-5 text-xs font-light">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    <TransactionRow
                      date={"2/2/2024"}
                      description={"Doors - Paradox"}
                      amount={100000}
                      balance={190000}
                      withdraw={false}
                    />
                    <TransactionRow
                      date={"2/2/2024"}
                      description={"Doors - Paradox"}
                      amount={100000}
                      balance={90000}
                      withdraw={true}
                    />
                    <TransactionRow
                      date={"2/2/2024"}
                      description={"Doors - Paradox"}
                      amount={190000}
                      balance={190000}
                      withdraw={false}
                    />
                  </tbody>
                </table>
              </div>
              <div className="mt-3 flex justify-center">
                <Button
                  label="SHOW MORE"
                  size="large"
                  className="mt-5 h-[50px] w-[150px] bg-gray250 text-xs font-bold text-slate-900"
                  // onClick={handleLogin}
                  // disabled={isLockedOut}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
