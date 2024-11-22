import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { MultiSelect } from "primereact/multiselect";
import { Paginator } from "primereact/paginator";
import { useState, useEffect } from "react";
import { VoucherRow } from "./components/VoucherRow";
import { getAllVouchers } from "./service/VoucherListService";
import { Voucher } from "../../../model/VoucherModel";

export const VoucherList = () => {
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [totalRecords, setTotalRecords] = useState(100);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState<any | null>("oldest");
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<any[]>([]);
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [filteredVouchers, setFilteredVouchers] = useState<Voucher[]>([]);

  const options: any[] = [
    { label: "Oldest", value: "oldest" },
    { label: "Newest", value: "newest" },
  ];

  const status: any[] = [
    { name: "Active", code: true },
    { name: "Inactive", code: false },
  ];

  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const data = await getAllVouchers();
        setVouchers(data);
        setFilteredVouchers(data);
        setTotalRecords(data.length);
      } catch (error) {
        console.error("Error fetching vouchers:", error);
      }
    };

    fetchVouchers();
  }, []);

  useEffect(() => {
    filterVouchers();
    localStorage.removeItem("selectedVoucher");
  }, [searchTerm, selectedStatus, fromDate, toDate, selectedOption]);

  const filterVouchers = () => {
    let filtered = vouchers;

    if (searchTerm) {
      filtered = filtered.filter((voucher) =>
        voucher.discountName.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (selectedStatus.length > 0) {
      const statusCodes = selectedStatus.map((status) => status.code);
      filtered = filtered.filter((voucher) =>
        statusCodes.includes(voucher.active),
      );
    }

    if (fromDate && toDate) {
      filtered = filtered.filter(
        (voucher) =>
          new Date(voucher.startDate) >= fromDate &&
          new Date(voucher.endDate) <= toDate,
      );
    } else if (fromDate) {
      filtered = filtered.filter(
        (voucher) => new Date(voucher.startDate) >= fromDate,
      );
    } else if (toDate) {
      filtered = filtered.filter(
        (voucher) => new Date(voucher.endDate) <= toDate,
      );
    }

    if (selectedOption === "newest") {
      filtered = filtered.sort(
        (a, b) =>
          new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
      );
    } else if (selectedOption === "oldest") {
      filtered = filtered.sort(
        (a, b) =>
          new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
      );
    }

    setFilteredVouchers(filtered);
    setTotalRecords(filtered.length);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusChange = (e: { value: any[] }) => {
    setSelectedStatus(e.value);
  };

  const handleFromDateChange = (e: { value: Date | null | undefined }) => {
    setFromDate(e.value || null); // Sets to null if value is undefined
  };

  const handleToDateChange = (e: { value: Date | null | undefined }) => {
    setToDate(e.value || null); // Sets to null if value is undefined
  };

  const handleOptionChange = (e: { value: any }) => {
    setSelectedOption(e.value);
  };

  const onPageChange = (event: any) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  return (
    <>
      <div className="flex flex-col gap-8 px-6 py-16">
        <div className="flex items-start justify-between gap-6">
          <h3 className="text-[32px] font-medium">Vouchers</h3>
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
                        placeholder="Search name"
                        className="w-full bg-transparent py-[17px] pl-10 pr-3 text-sm text-black focus:ring-0"
                        value={searchTerm}
                        onChange={handleSearchChange}
                      />
                    </div>
                  </div>

                  <div className="">
                    <MultiSelect
                      value={selectedStatus}
                      onChange={handleStatusChange}
                      options={status}
                      optionLabel="name"
                      placeholder="Select Status"
                      maxSelectedLabels={3}
                      className="w-full rounded-lg border border-gray150 px-4 py-2 font-inter text-sm shadow-adminInputShadow"
                      itemClassName="!font-inter"
                    />
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

                  <div className="">
                    <Dropdown
                      value={selectedOption}
                      options={options}
                      onChange={handleOptionChange}
                      className="custom-icon-color w-full min-w-36 rounded-lg border border-gray150 px-4 py-2 !font-inter text-sm shadow-adminInputShadow"
                      dropdownIcon="pi pi-chevron-down"
                      panelClassName="custom-dropdown-panel"
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
                        <th className="p-5 text-xs font-light">Name</th>
                        <th className="p-5 text-xs font-light">
                          Discount Percent
                        </th>
                        <th className="p-5 text-xs font-light">Start</th>
                        <th className="p-5 text-xs font-light">End</th>
                        <th className="p-5 text-xs font-light">Status</th>
                        <th className=""></th>
                      </tr>
                    </thead>
                    <tbody>
                    {filteredVouchers.slice(first, first + rows).map((voucher) => (
                        <VoucherRow
                          key={voucher.sysIdVoucher}
                          discountPercent={voucher.discountPercent}
                          sysIdVoucher={voucher.sysIdVoucher}
                          discountName={voucher.discountName}
                          startDate={voucher.startDate}
                          endDate={voucher.endDate}
                          active={voucher.active}
                          maxDiscount={voucher.maxDiscount}
                          codeVoucher={voucher.codeVoucher}
                          description={voucher.description}
                          quantity={voucher.quantity}
                          files={voucher.files}
                          voucherBanner={voucher.voucherBanner}
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
