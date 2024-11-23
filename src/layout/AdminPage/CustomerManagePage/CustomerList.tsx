import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Paginator } from "primereact/paginator";
import { MdAddBox } from "react-icons/md";
import { RightSideButton } from "../../../components/RightSideButton";
import { useState, useEffect } from "react";
import { CustomerRow } from "./components/CustomerRow";
import { getAllUsers, filterAndSortUsers } from "./service/CustomerListService";
import { User } from "../../../model/UsersModel";

export const CustomerList = () => {
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [totalRecords, setTotalRecords] = useState(100);
  const [selectedOption, setSelectedOption] = useState<any | null>("oldest");
  const [customers, setCustomers] = useState<User[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllUsers();
        setCustomers(data);
        setTotalRecords(data.length);
        setFilteredCustomers(filterAndSortUsers(data, searchTerm, selectedOption));
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setFilteredCustomers(filterAndSortUsers(customers, searchTerm, selectedOption));
  }, [searchTerm, selectedOption, customers]);

  const options: any[] = [
    { label: "Oldest", value: "oldest" },
    { label: "Newest", value: "newest" },
  ];

  const onPageChange = (event: any) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <div className="px-6 py-16">
        <div className="flex items-start justify-between gap-6">
          <h3 className="text-[32px] font-medium">Customers</h3>
          <RightSideButton Icon={MdAddBox} link={"/admin/customer/create"} />
        </div>
        <div className="mt-8">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12">
              <div className="rounded-[20px] px-6 py-4 shadow-adminBoxshadow">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="w-full sm:w-auto">
                    <div className="flex flex-wrap items-center justify-start gap-4">
                      <div className="flex-1">
                        <div className="relative w-full min-w-[211px] rounded-lg border border-gray150 bg-transparent shadow-adminInputShadow hover:border-black">
                          <i className="pi pi-search absolute left-3 top-1/2 -translate-y-1/2 transform text-gray100"></i>
                          <InputText
                            placeholder="Search by name"
                            className="w-full bg-transparent py-[17px] pl-10 pr-3 text-sm text-black focus:ring-0"
                            value={searchTerm}
                            onChange={handleSearchChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full sm:w-auto">
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
            <div className="col-span-12">
              <div className="mb-5 rounded-[20px] bg-[#F2F2F2] px-5 pb-5 shadow-adminBoxshadow">
                <div className="overflow-x-scroll">
                  <table className="w-full text-nowrap rounded-xl">
                    <thead>
                      <tr className="text-left">
                        <th className="p-5 text-xs font-light">Name</th>
                        <th className="p-5 text-xs font-light">Email</th>
                        <th className="p-5 text-xs font-light">Created At</th>
                        <th className=""></th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCustomers.slice(first, first + rows).map((customer) => (
                        <CustomerRow key={customer.sysIdUser} user={customer} />
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