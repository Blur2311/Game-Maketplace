import { useState } from "react";
import { TiArrowLeft } from "react-icons/ti";
import { NavLink } from "react-router-dom";
import {
  formatCurrency,
  formatDateFromLocalDate,
} from "../../../utils/OtherUtils";
import { InvoiceDetailRow } from "./components/InvoiceDetailRow";
import { Button } from "primereact/button";

export const InvoiceDetail = () => {
  const [status] = useState(true);

  return (
    <>
      <div className="px-6 py-16">
        <div className="">
          <div className="mb-8 flex flex-col gap-6">
            <NavLink
              to={"/admin/invoice/list"}
              className="flex items-center gap-2 text-sm hover:underline"
            >
              <TiArrowLeft className="text-xl" />
              Invoices
            </NavLink>
            <div className="flex items-start justify-between gap-6">
              <div className="flex flex-col gap-2">
                <h3 className="text-[32px] font-medium">INVOICE-01</h3>
                <div className="flex">
                  <div
                    className={`flex h-8 items-center justify-center rounded-full px-3 text-[13px] font-medium ${status != null ? (status ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700") : "bg-yellow-100 text-yellow-700"}`}
                  >
                    <span>
                      {status != null
                        ? status
                          ? "Completed"
                          : "Refunded"
                        : "Pending"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="">
                <Button
                  label="Download"
                  className={
                    "rounded-lg bg-mainYellow px-4 py-[10px] text-white transition duration-300 hover:brightness-105"
                  }
                />
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[20px] p-12 shadow-adminBoxshadow">
          <div className="flex flex-col gap-12">
            <div className="flex items-start gap-6">
              <h6 className="flex-1 text-[32px] font-medium">Invoice</h6>
              <div className="">
                <img src="/logo.png" alt="" className="h-[40px]" />
              </div>
            </div>

            <div className="flex flex-1 flex-col gap-2">
              <div className="flex gap-4">
                <div className="flex-none basis-[150px] text-sm">Number:</div>
                <div className="text-sm font-light">INVOICE-01</div>
              </div>
              <div className="flex gap-4">
                <div className="flex-none basis-[150px] text-sm">
                  Issue date:
                </div>
                <div className="text-sm font-light">
                  {formatDateFromLocalDate("2024-01-01")}
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-none basis-[150px] text-sm">Due date:</div>
                <div className="text-sm font-light">
                  {formatDateFromLocalDate("2024-01-07")}
                </div>
              </div>
            </div>

            <div className="flex flex-1 flex-col gap-2">
              <h6 className="">Customer</h6>
              <div className="space-y-[5px] text-sm font-light">
                <p>Huy Pham</p>
                <p> huydz12@gmail.com</p>
                <p>TP HCM - District 1</p>
                <p>(+84) 123456789</p>
              </div>
            </div>

            <p className="text-2xl">
              {formatCurrency(129000)} due{" "}
              {formatDateFromLocalDate("2024-01-07")}
            </p>

            <div className="rounded-lg border bg-[#F2F2F2] px-5 pb-5">
              <div className="overflow-x-scroll">
                <table className="w-full text-nowrap rounded-xl">
                  <thead>
                    <tr className="text-left">
                      <th className="p-5 text-xs font-light">Name</th>
                      <th className="p-5 text-xs font-light">Unit Amount</th>
                      <th className="p-5 text-xs font-light">Qty</th>
                      <th className="p-5 text-right text-xs font-light">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <InvoiceDetailRow
                      item={"Assasin's Creed"}
                      unitAmount={129000}
                      qty={1}
                    />
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-end gap-4 font-light">
                <div className="flex-none basis-[150px]">Subtotal</div>
                <div className="flex-none basis-[100px]">
                  {formatCurrency(129000)}
                </div>
              </div>
              <div className="flex items-center justify-end gap-4 font-light">
                <div className="flex-none basis-[150px]">Tax</div>
                <div className="flex-none basis-[100px]">
                  {formatCurrency(1000)}
                </div>
              </div>
              <div className="flex items-center justify-end gap-4 text-lg">
                <div className="flex-none basis-[150px]">Total</div>
                <div className="flex-none basis-[100px]">
                  {formatCurrency(130000)}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <h6 className="text-lg">Notes</h6>
              <p className="text-sm font-light text-textSecond">
                Please review the details carefully before making the payment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
