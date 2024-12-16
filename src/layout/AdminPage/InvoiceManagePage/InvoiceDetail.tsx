import { useState, useEffect, useRef } from "react";
import { TiArrowLeft } from "react-icons/ti";
import { NavLink, useParams } from "react-router-dom";
import {
  formatCurrency,
  formatDateFromLocalDate,
} from "../../../utils/OtherUtils";
import { InvoiceDetailRow } from "./components/InvoiceDetailRow";
import { Button } from "primereact/button";
import { fetchInvoiceById } from "./components/service/InvoiceDetailService";
import { InvoiceModel } from "../../../model/InvoiceModel";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useAuthCheck } from "../../../utils/AuthUtils";

export const InvoiceDetail = () => {
  useAuthCheck(['ADMIN']);
  const { id } = useParams<{ id: string }>();
  const [invoice, setInvoice] = useState<InvoiceModel | null>(null);
  const [status, setStatus] = useState<boolean | null>(null);
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchInvoiceById(Number(id));
        setInvoice(data);
        setStatus(data.paymentStatus);
      } catch (error) {
        console.error("Error fetching invoice:", error);
      }
    };

    fetchData();
  }, [id]);

  const downloadPDF = async () => {
    if (!printRef.current) return;

    const canvas = await html2canvas(printRef.current, { scale: 2 }); // Tăng tỷ lệ để cải thiện độ nét
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`invoice_${invoice?.orderCode}.pdf`);
  };

  if (!invoice) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="px-6 py-16">
        <div className="">
          <div className="flex flex-col gap-6 mb-8">
            <NavLink
              to={"/admin/invoice/list"}
              className="flex items-center gap-2 text-sm hover:underline"
            >
              <TiArrowLeft className="text-xl" />
              Invoices
            </NavLink>
            <div className="flex items-start justify-between gap-6">
              <div className="flex flex-col gap-2">
                <h3 className="text-[32px] font-medium">{invoice.orderCode}</h3>
                <div className="flex">
                  <div
                    className={`flex h-8 items-center justify-center rounded-full px-3 text-[13px] font-medium ${status ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}
                  >
                    <span>{status ? "Completed" : "Pending"}</span>
                  </div>
                </div>
              </div>

              <div className="">
                <Button
                  label="Download"
                  className={
                    "rounded-lg bg-mainYellow px-4 py-[10px] text-white transition duration-300 hover:brightness-105"
                  }
                  onClick={downloadPDF}
                />
              </div>
            </div>
          </div>
        </div>

        <div ref={printRef} className="rounded-[20px] p-12 shadow-adminBoxshadow">
          <div className="flex flex-col gap-12">
            <div className="flex items-start gap-6">
              <h6 className="flex-1 text-[32px] font-medium">Invoice</h6>
              <div className="">
                <img src="/logo.png" alt="" className="h-[40px]" />
              </div>
            </div>

            <div className="flex flex-col flex-1 gap-2">
              <div className="flex gap-4">
                <div className="flex-none basis-[150px] text-sm">Number:</div>
                <div className="text-sm font-light">{invoice.orderCode}</div>
              </div>
              <div className="flex gap-4">
                <div className="flex-none basis-[150px] text-sm">
                  Issue date:
                </div>
                <div className="text-sm font-light">
                  {formatDateFromLocalDate(invoice.orderDate)}
                </div>
              </div>
            </div>

            <div className="flex flex-col flex-1 gap-2">
              <h6 className="">Customer</h6>
              <div className="space-y-[5px] text-sm font-light">
                <p>{invoice.usersDTO.hoVaTen}</p>
                <p>{invoice.usersDTO.email}</p>
                <p>{invoice.usersDTO.phoneNumber}</p>
              </div>
            </div>

            {/* <p className="text-2xl">
              {formatCurrency(invoice.price)} due{" "}
              {formatDateFromLocalDate(invoice.orderDate)}
            </p> */}

            <div className="rounded-lg border bg-[#F2F2F2] px-5 pb-5">
              <div className="overflow-x-scroll">
                <table className="w-full text-nowrap rounded-xl">
                  <thead>
                    <tr className="text-left">
                      <th className="p-5 text-xs font-light">Name</th>
                      <th className="p-5 text-xs font-light">Unit Amount</th>
                      <th className="p-5 text-xs font-light">Qty</th>
                      <th className="p-5 text-xs font-light text-right">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <InvoiceDetailRow
                      item={invoice.gameDTO.gameName}
                      unitAmount={invoice.price}
                      qty={invoice.quantity}
                    />
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-end gap-4 font-light">
                <div className="flex-none basis-[150px]">Subtotal</div>
                <div className="flex-none basis-[100px]">
                  {formatCurrency(invoice.price * invoice.quantity)}
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
                  {formatCurrency(invoice.price * invoice.quantity + 1000)}
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