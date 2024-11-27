import { MdAddBox } from "react-icons/md";
import { RightSideButton } from "../../../components/RightSideButton";
import { InputText } from "primereact/inputtext";
import { Paginator } from "primereact/paginator";
import { useState, useEffect } from "react";
import { formatCurrency } from "../../../utils/OtherUtils";
import { TbCheck, TbClockHour3, TbInvoice } from "react-icons/tb";
import { Dropdown } from "primereact/dropdown";
import { InvoiceRow } from "./components/InvoiceRow";
import { MultiSelect } from "primereact/multiselect";
import { Calendar } from "primereact/calendar";
import { fetchInvoices, filterInvoices } from "./components/service/InvoiceListService";
import { InvoiceModel } from "../../../model/InvoiceModel";

export const InvoiceList = () => {
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [searchInvoiceID, setSearchInvoiceID] = useState("");
  const [searchCustomer, setSearchCustomer] = useState("");
  const [selectedOption, setSelectedOption] = useState<any | null>("oldest");
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<boolean[]>([]);
  const [invoices, setInvoices] = useState<InvoiceModel[]>([]);
  const [filteredInvoices, setFilteredInvoices] = useState<InvoiceModel[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchInvoices();
        setInvoices(data);
        setFilteredInvoices(data);
        setTotalRecords(data.length);
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filtered = filterInvoices(invoices, searchInvoiceID, searchCustomer, selectedStatus, fromDate, toDate);
    setFilteredInvoices(filtered);
    setTotalRecords(filtered.length);
  }, [searchInvoiceID, searchCustomer, selectedStatus, fromDate, toDate, invoices]);

  const options: any[] = [
    { label: "Oldest", value: "oldest" },
    { label: "Newest", value: "newest" },
  ];

  const statusOptions = [
    { label: "Completed", value: true },
    { label: "Pending", value: false },
  ];

  const handleFromDateChange = (e: { value: Date | null | undefined }) => {
    setFromDate(e.value || null); // Sets to null if value is undefined
  };

  const handleToDateChange = (e: { value: Date | null | undefined }) => {
    setToDate(e.value || null); // Sets to null if value is undefined
  };

  const handleSearchInvoiceIDChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInvoiceID(e.target.value);
  };

  const handleSearchCustomerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchCustomer(e.target.value);
  };

  const onPageChange = (event: any) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  return (
    <>
      <div className="flex flex-col gap-8 px-6 py-16">
        <div className="flex items-start justify-between gap-6">
          <h3 className="text-[32px] font-medium">Invoices</h3>
        </div>

        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 rounded-[20px] px-6 pb-8 pt-4 shadow-adminBoxshadow md:col-span-4">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full shadow-adminIconshadow">
                <TbInvoice className="text-2xl" />
              </div>
              <div className="">
                <p className="text-sm text-textSecond">Total</p>
                <h6 className="text-lg font-medium">
                  {formatCurrency(filteredInvoices.reduce((total, invoice) => total + invoice.price, 0))}
                </h6>
                <p className="text-sm text-textSecond">from {filteredInvoices.length} invoices</p>
              </div>
            </div>
          </div>
          <div className="col-span-12 rounded-[20px] px-6 pb-8 pt-4 shadow-adminBoxshadow md:col-span-4">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full shadow-adminIconshadow">
                <TbCheck className="text-2xl" />
              </div>
              <div className="">
                <p className="text-sm text-textSecond">Paid</p>
                <h6 className="text-lg font-medium">
                  {formatCurrency(filteredInvoices.filter(invoice => invoice.paymentStatus).reduce((total, invoice) => total + invoice.price, 0))}
                </h6>
                <p className="text-sm text-textSecond">from {filteredInvoices.filter(invoice => invoice.paymentStatus).length} invoices</p>
              </div>
            </div>
          </div>
          <div className="col-span-12 rounded-[20px] px-6 pb-8 pt-4 shadow-adminBoxshadow md:col-span-4">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full shadow-adminIconshadow">
                <TbClockHour3 className="text-2xl" />
              </div>
              <div className="">
                <p className="text-sm text-textSecond">Pending</p>
                <h6 className="text-lg font-medium">
                  {formatCurrency(filteredInvoices.filter(invoice => !invoice.paymentStatus).reduce((total, invoice) => total + invoice.price, 0))}
                </h6>
                <p className="text-sm text-textSecond">from {filteredInvoices.filter(invoice => !invoice.paymentStatus).length} invoices</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Dropdown
            value={selectedOption}
            options={options}
            onChange={(e) => setSelectedOption(e.value)}
            className="custom-icon-color min-w-36 rounded-lg border border-gray150 px-4 py-2 !font-inter text-sm shadow-adminInputShadow"
            dropdownIcon="pi pi-chevron-down"
            panelClassName="custom-dropdown-panel"
          />
        </div>

        <div className="">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-4">
              <div className="rounded-[20px] px-6 pb-8 pt-4 shadow-adminBoxshadow">
                <div className="flex flex-col gap-6">
                  <h6 className="text-2xl font-medium">Filters</h6>

                  <div className="">
                    <div className="relative w-full rounded-lg border border-gray150 bg-transparent hover:border-black">
                      <i className="pi pi-search absolute left-3 top-1/2 -translate-y-1/2 transform text-gray100"></i>
                      <InputText
                        placeholder="Search invoice ID"
                        className="w-full bg-transparent py-[17px] pl-10 pr-3 text-sm text-black focus:ring-0"
                        value={searchInvoiceID}
                        onChange={handleSearchInvoiceIDChange}
                      />
                    </div>
                  </div>

                  <div className="">
                    <MultiSelect
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.value)}
                      options={statusOptions}
                      optionLabel="label"
                      placeholder="Select Status"
                      maxSelectedLabels={3}
                      className="w-full rounded-lg border border-gray150 px-4 py-2 font-inter text-sm shadow-adminInputShadow"
                      itemClassName="!font-inter"
                    />
                  </div>

                  <div className="">
                    <div className="relative w-full rounded-lg border border-gray150 bg-transparent hover:border-black">
                      <i className="pi pi-search absolute left-3 top-1/2 -translate-y-1/2 transform text-gray100"></i>
                      <InputText
                        placeholder="Search customer"
                        className="w-full bg-transparent py-[17px] pl-10 pr-3 text-sm text-black focus:ring-0"
                        value={searchCustomer}
                        onChange={handleSearchCustomerChange}
                      />
                    </div>
                  </div>

                  <div>
                    <Calendar
                      value={fromDate}
                      onChange={handleFromDateChange}
                      dateFormat="MM dd, yy"
                      showIcon
                      className="custom-calendar-admin h-[54px] w-full rounded-lg border border-gray150 px-4 py-2 font-inter text-sm shadow-adminInputShadow"
                      inputClassName="shadow-none"
                      placeholder="From"
                    />
                  </div>
                  <div>
                    <Calendar
                      value={toDate}
                      onChange={handleToDateChange}
                      dateFormat="MM dd, yy"
                      showIcon
                      className="custom-calendar-admin h-[54px] w-full rounded-lg border border-gray150 px-4 py-2 font-inter text-sm shadow-adminInputShadow"
                      inputClassName="shadow-none"
                      placeholder="To"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-8">
              <div className="mb-5 rounded-[20px] bg-[#F2F2F2] px-5 pb-5 shadow-adminBoxshadow">
                <div className="overflow-x-scroll">
                  <table className="w-full text-nowrap rounded-xl">
                    <thead>
                      <tr className="text-left">
                        <th className="p-5 text-xs font-light">
                          ID & Customer
                        </th>
                        <th className="p-5 text-xs font-light">Amount</th>
                        <th className="p-5 text-xs font-light">Issued</th>
                        <th className="p-5 text-xs font-light">Due</th>
                        <th className="p-5 text-xs font-light">Status</th>
                        <th className=""></th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredInvoices.slice(first, first + rows).map((invoice) => (
                        <InvoiceRow
                          key={invoice.sysIdOrder}
                          amount={invoice.price}
                          id={invoice.sysIdOrder}
                          name={invoice.usersDTO.hoVaTen}
                          avatar={invoice.usersDTO.avatar || "/default-avatar.png"}
                          status={invoice.paymentStatus}
                          date={invoice.orderDate}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-3">
                  <div className="flex items-center justify-end gap-4">
                    <Paginator
                      first={first} // bắt đầu từ đâu
                      rows={rows} // bao nhiêu cột hiển thị
                      totalRecords={totalRecords} // Độ dài dữ liệu
                      template={{
                        layout: "CurrentPageReport PrevPageLink NextPageLink",
                        CurrentPageReport: (options: any) => (
                          <span
                            style={{
                              color: "var(--text-color)",
                              userSelect: "none",
                              width: "120px",
                              textAlign: "center",
                            }}
                          >
                            {options.first} - {options.last} of{" "}
                            {options.totalRecords}
                          </span>
                        ),
                      }}
                      onPageChange={onPageChange}
                      className="custom-pagi-cate bg-transparent text-gray150"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};