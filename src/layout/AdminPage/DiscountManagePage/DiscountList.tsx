import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { MultiSelect } from "primereact/multiselect";
import { Paginator } from "primereact/paginator";
import { useState } from "react";
import { TbInvoice, TbCheck, TbClockHour3 } from "react-icons/tb";
import { formatCurrency } from "../../../utils/OtherUtils";
import { DiscountRow } from "./components/DiscountRow";

export const DiscountList = () => {
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [totalRecords, setTotalRecords] = useState(100);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState<any | null>("oldest");
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);

  const options: any[] = [
    { label: "Oldest", value: "oldest" },
    { label: "Newest", value: "newest" },
  ];

  const handleFromDateChange = (e: { value: Date | null | undefined }) => {
    setFromDate(e.value || null); // Sets to null if value is undefined
  };

  const handleToDateChange = (e: { value: Date | null | undefined }) => {
    setToDate(e.value || null); // Sets to null if value is undefined
  };

  const onPageChange = (event: any) => {
    setFirst(event.first);
    setRows(event.rows);
    //  fetchCategories(event.first, event.rows, searchTerm);
  };
  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="flex items-start justify-between gap-6">
          <h3 className="text-[32px] font-medium">Discounts</h3>
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
                        // onChange={handleSearchChange}
                      />
                    </div>
                  </div>

                  <div className="">
                    <MultiSelect
                      // value={selectedStatus}
                      // onChange={(e) => setSelectedStatus(e.value)}
                      // options={status}
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
                      placeholder="To"
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
                      placeholder="From"
                    />
                  </div>

                  <div className="">
                    <Dropdown
                      value={selectedOption}
                      options={options}
                      onChange={(e) => setSelectedOption(e.value)}
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
                        <th className="p-5 text-xs font-light">Amount</th>
                        <th className="p-5 text-xs font-light">Start</th>
                        <th className="p-5 text-xs font-light">End</th>
                        <th className="p-5 text-xs font-light">Status</th>
                        <th className=""></th>
                      </tr>
                    </thead>
                    <tbody>
                      <DiscountRow
                        amount={0}
                        id={"12"}
                        name={"Fallout Day Sale"}
                        dateStart={"2024-11-11"}
                        dateEnd={"2024-12-01"}
                      />
                      <DiscountRow
                        amount={0}
                        id={"12"}
                        status={true}
                        name={"Fallout Day Sale"}
                        dateStart={"2024-11-11"}
                        dateEnd={"2024-12-01"}
                      />
                      <DiscountRow
                        amount={0}
                        id={"12"}
                        status={false}
                        name={"Fallout Day Sale"}
                        dateStart={"2024-11-11"}
                        dateEnd={"2024-12-01"}
                      />
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
