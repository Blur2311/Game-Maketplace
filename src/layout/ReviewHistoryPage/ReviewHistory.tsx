import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { ReviewHistoryRow } from "./components/ReviewHistoryRow";

export const ReviewHistory = () => {
  const [dates, setDates] = useState<Date[] | null>(null);

  const handleDateChange = (e: any) => {
    setDates(e.value);
  };
  return (
    <>
      <div className="pl-5">
        <div className="rounded bg-white p-10">
          <h1 className="text-3xl">My Review</h1>
          <h6 className="mt-[15px] text-sm font-light">
            Reviews you have written.
          </h6>
          <div className="mt-[30px]">
            <div className="flex items-center justify-between">
              <FloatLabel className="text-sm">
                <InputText className="h-[50px] w-full border border-grayBorder bg-transparent p-5 ps-[10px]" />
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
                />
              </div>
            </div>
          </div>
          <div className="mt-5">
            <div className="">
              <div className="mb-5 rounded bg-[#F2F2F2] px-5 pb-5 shadow-sm">
                <table className="w-full rounded-xl">
                  <thead>
                    <tr className="text-left">
                      <th className="p-5 text-xs font-light">Date</th>
                      <th className="p-5 text-xs font-light">Game</th>
                      <th className="p-5 text-xs font-light">Description</th>
                      <th className="p-5 text-xs font-light">Rated</th>
                    </tr>
                  </thead>
                  <tbody>
                    <ReviewHistoryRow
                      date={"2/2/2024"}
                      game={"Assassin's Creed II"}
                      description={
                        "An epic story of family, vengeance and conspiracy set in the pristine, yet brutal, backdrop of a Renaissance Italy."
                      }
                      rated={5}
                    />
                    <ReviewHistoryRow
                      date={"2/2/2024"}
                      game={"Assassin's Creed II"}
                      description={
                        "An epic story of family, vengeance and conspiracy set in the pristine, yet brutal, backdrop of a Renaissance Italy."
                      }
                      rated={5}
                    />
                    <ReviewHistoryRow
                      date={"2/2/2024"}
                      game={"Assassin's Creed II"}
                      description={
                        "An epic story of family, vengeance and conspiracy set in the pristine, yet brutal, backdrop of a Renaissance Italy."
                      }
                      rated={5}
                    />
                    <ReviewHistoryRow
                      date={"2/2/2024"}
                      game={"Assassin's Creed II"}
                      description={
                        "An epic story of family, vengeance and conspiracy set in the pristine, yet brutal, backdrop of a Renaissance Italy."
                      }
                      rated={5}
                    />
                  </tbody>
                </table>
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
      </div>
    </>
  );
};