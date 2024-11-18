import { Calendar } from "primereact/calendar";
import { FloatLabel } from "primereact/floatlabel";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { TiArrowLeft } from "react-icons/ti";
import { NavLink, useParams } from "react-router-dom";
import FileUploadComponent from "../GameManagePage/components/FileUpload";

export const DiscountCU = () => {
  const { id } = useParams<{ id?: string }>(); // Nhận tham số id tùy chọn
  const isUpdateMode = Boolean(id);
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);

  const handleFromDateChange = (e: { value: Date | null | undefined }) => {
    setFromDate(e.value || null); // Sets to null if value is undefined
  };

  const handleToDateChange = (e: { value: Date | null | undefined }) => {
    setToDate(e.value || null); // Sets to null if value is undefined
  };

  return (
    <>
      <div className="">
        <div className="mb-8 flex flex-col gap-6">
          <NavLink
            to={"/admin/customer/list"}
            className="flex items-center gap-2 text-sm hover:underline"
          >
            <TiArrowLeft className="text-xl" />
            Discounts
          </NavLink>
          <h3 className="text-[32px] font-medium">
            {isUpdateMode ? "Detail" : "Create"} discount
          </h3>
        </div>

        <div className="flex flex-col gap-8">
          <div className="rounded-[20px] px-6 pb-8 pt-4 shadow-adminBoxshadow">
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 sm:col-span-4">
                <h6 className="text-lg font-medium">Basic information</h6>
              </div>
              <div className="col-span-12 sm:col-span-8">
                <div className="grid grid-cols-12 gap-x-6 gap-y-8 sm:mt-4">
                  <FloatLabel className="col-span-12 text-sm">
                    <InputText
                      className="w-full rounded-lg border bg-transparent p-4 ps-[10px] shadow-adminInputShadow hover:border-black"
                      // value={gameName || ""}
                      // onChange={(e) => {
                      //   setGameName(e.target.value);
                      //   setError("");
                      // }}
                    />
                    <label>
                      Name <span className="text-red-500">*</span>
                    </label>
                    {/* {error && <p className="mt-1 text-xs text-red-500">{error}</p>} */}
                  </FloatLabel>

                  <FloatLabel className="col-span-12 text-sm">
                    <InputText
                      className="w-full rounded-lg border bg-transparent p-4 ps-[10px] shadow-adminInputShadow hover:border-black"
                      // value={gameName || ""}
                      // onChange={(e) => {
                      //   setGameName(e.target.value);
                      //   setError("");
                      // }}
                    />
                    <label>
                      Short description <span className="text-red-500">*</span>
                    </label>
                    {/* {error && <p className="mt-1 text-xs text-red-500">{error}</p>} */}
                  </FloatLabel>

                  <FloatLabel className="col-span-12 text-sm">
                    <InputNumber
                      className="w-full rounded-lg border bg-transparent p-4 ps-[10px] shadow-adminInputShadow hover:border-black"
                      inputClassName="focus:ring-0"
                      min={0}
                      // value={price || 0}
                      // onChange={(e) => {
                      //   setPrice(e.value);
                      //   setError("");
                      // }}
                    />
                    <label>
                      Discount percent <span className="text-red-500">*</span>
                    </label>
                    {/* {error && (
                      <p className="mt-1 text-xs text-red-500">{error}</p>
                    )} */}
                  </FloatLabel>

                  <FloatLabel className="col-span-12 text-sm">
                    <InputNumber
                      className="w-full rounded-lg border bg-transparent p-4 ps-[10px] shadow-adminInputShadow hover:border-black"
                      inputClassName="focus:ring-0"
                      min={0}
                      // value={price || 0}
                      // onChange={(e) => {
                      //   setPrice(e.value);
                      //   setError("");
                      // }}
                    />
                    <label>
                      Quantity <span className="text-red-500">*</span>
                    </label>
                    {/* {error && (
                      <p className="mt-1 text-xs text-red-500">{error}</p>
                    )} */}
                  </FloatLabel>

                  <FloatLabel className="col-span-12 text-sm">
                    <Calendar
                      value={fromDate}
                      onChange={handleFromDateChange}
                      dateFormat="MM dd, yy"
                      showIcon
                      className="custom-calendar-admin h-[54px] w-full rounded-lg border px-4 py-2 font-inter text-sm shadow-adminInputShadow"
                      inputClassName="shadow-none"
                    />
                    <label>
                      Start date <span className="text-red-500">*</span>
                    </label>
                    {/* {error && <p className="mt-1 text-xs text-red-500">{error}</p>} */}
                  </FloatLabel>

                  <FloatLabel className="col-span-12 text-sm">
                    <Calendar
                      value={toDate}
                      onChange={handleToDateChange}
                      dateFormat="MM dd, yy"
                      showIcon
                      className="custom-calendar-admin h-[54px] w-full rounded-lg border px-4 py-2 font-inter text-sm shadow-adminInputShadow"
                      inputClassName="shadow-none"
                    />
                    <label>
                      End date <span className="text-red-500">*</span>
                    </label>
                    {/* {error && <p className="mt-1 text-xs text-red-500">{error}</p>} */}
                  </FloatLabel>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[20px] px-6 pb-8 pt-4 shadow-adminBoxshadow">
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 sm:col-span-4">
                <h6 className="text-lg font-medium">Discount cover</h6>
              </div>
              <div className="col-span-12 sm:col-span-8">
                <FileUploadComponent />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
