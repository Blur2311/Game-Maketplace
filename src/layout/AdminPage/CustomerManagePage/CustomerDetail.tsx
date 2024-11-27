import { Button } from "primereact/button";
import { Paginator } from "primereact/paginator";
import { useState, useEffect } from "react";
import { FiUser } from "react-icons/fi";
import { IoWarningOutline } from "react-icons/io5";
import { PiPencilSimple, PiShoppingCartSimple } from "react-icons/pi";
import { TiArrowLeft } from "react-icons/ti";
import { NavLink } from "react-router-dom";
import { PaymentRow } from "./components/PaymentRow";
import { formatCurrency } from "../../../utils/OtherUtils";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { MultiSelect } from "primereact/multiselect";
import { fetchOrders } from "./service/CustomerDetailService";

export const CustomerDetail = () => {
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [totalRecords, setTotalRecords] = useState(100);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState<any | null>("oldest");
  const [selectedStatus, setSelectedStatus] = useState<any[]>([]);

  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<any[]>([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("selectedUser");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      fetchOrdersData(parsedUser.username);
    }
  }, []);

  const fetchOrdersData = async (username: string) => {
    try {
      const ordersData = await fetchOrders(username);
      setOrders(ordersData);
      setFilteredOrders(ordersData);
      setTotalRecords(ordersData.length);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    filterAndSortOrders();
  }, [searchTerm, selectedOption, selectedStatus, orders]);

  const filterAndSortOrders = () => {
    let filtered = orders;

    if (searchTerm) {
      filtered = filtered.filter((order) =>
        order.totalPayment.toString().includes(searchTerm)
      );
    }

    if (selectedStatus.length > 0) {
      filtered = filtered.filter((order) =>
        selectedStatus.some((status) => status.code === order.paymentStatus)
      );
    }

    if (selectedOption === "oldest") {
      filtered.sort((a, b) => new Date(a.orderDate).getTime() - new Date(b.orderDate).getTime());
    } else if (selectedOption === "newest") {
      filtered.sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime());
    }

    setFilteredOrders(filtered);
    setTotalRecords(filtered.length);
  };

  const options: any[] = [
    { label: "Oldest", value: "oldest" },
    { label: "Newest", value: "newest" },
  ];

  const status = [
    { name: "Completed", code: true },
    { name: "Pending", code: false },
  ];

  const onPageChange = (event: any) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="px-6 py-16">
        <div className="mb-8 flex flex-col gap-6">
          <NavLink
            to={"/admin/customer/list"}
            className="flex items-center gap-2 text-sm hover:underline"
          >
            <TiArrowLeft className="text-xl" />
            Customers
          </NavLink>
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full">
              <img src={user.avatar || "/default-avatar.png"} alt="" className="" />
            </div>
            <div className="">
              <h4 className="text-[32px] font-medium">{user.hoVaTen}</h4>
              <p className="font-light text-textSecond">{user.email}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-4">
            <div className="flex flex-col gap-8">
              <div className="rounded-[20px] shadow-adminBoxshadow">
                <div className="">
                  <div className="mb-4 flex items-center px-6 py-8">
                    <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full shadow-adminIconshadow">
                      <FiUser className="text-2xl" />
                    </div>
                    <p className="flex-1 text-lg font-medium">Basic details</p>
                    <NavLink
                      to={`/admin/customer/detail/${user.sysIdUser}`}
                      className={"rounded-lg p-2 hover:bg-gray-100"}
                    >
                      {/* <PiPencilSimple size={24} /> */}
                    </NavLink>
                  </div>
                  <div className="flex flex-col">
                    <div className="grid gap-2 px-6 py-3">
                      <div className="">
                        <p className="text-sm text-textSecond">Customer ID</p>
                      </div>
                      <div className="flex">
                        <div className="flex h-5 items-center rounded-full bg-[#f0f4f8] px-2 text-xs">
                          {user.sysIdUser}
                        </div>
                      </div>
                    </div>
                    <hr />

                    <div className="grid gap-2 px-6 py-3">
                      <div className="">
                        <p className="text-sm text-textSecond">Name</p>
                      </div>
                      <div className="">
                        <p className="text-sm font-medium">{user.hoVaTen}</p>
                      </div>
                    </div>
                    <hr />

                    <div className="grid gap-2 px-6 py-3">
                      <div className="">
                        <p className="text-sm text-textSecond">Username</p>
                      </div>
                      <div className="">
                        <p className="text-sm font-medium">{user.username}</p>
                      </div>
                    </div>
                    <hr />

                    <div className="grid gap-2 px-6 py-3">
                      <div className="">
                        <p className="text-sm text-textSecond">Email</p>
                      </div>
                      <div className="">
                        <p className="text-sm font-medium">{user.email}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="rounded-[20px] shadow-adminBoxshadow">
                <div className="px-6 py-8">
                  <div className="mb-8 flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full shadow-adminIconshadow">
                      <IoWarningOutline className="text-2xl" />
                    </div>
                    <p className="text-lg font-medium">Security</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="">
                      <Button
                        label="Delete account"
                        className="rounded-lg bg-red-500 px-4 py-[10px] text-sm font-medium text-white hover:brightness-105"
                      />
                    </div>
                    <p className="text-sm text-textSecond">
                      A deleted customer cannot be restored. All data will be
                      permanently removed.
                    </p>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
          <div className="col-span-12 md:col-span-8">
            <div className="rounded-[20px] shadow-adminBoxshadow">
              <div className="px-6 py-8">
                <div className="mb-8 flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full shadow-adminIconshadow">
                    <PiShoppingCartSimple className="text-2xl" />
                  </div>
                  <p className="text-lg font-medium">Payments</p>
                </div>

                <div className="flex flex-col gap-6">
                  <div className="rounded-lg border">
                    <div className="flex flex-col justify-between gap-6 p-4 sm:flex-row">
                      
                      <div className="flex-1">
                        <p className="text-xs uppercase leading-loose tracking-wider text-textSecond">
                          Total orders
                        </p>
                        <h6 className="text-lg font-medium">{filteredOrders.length}</h6>
                      </div>

                      <div className="border-[0.5px]"></div>

                      <div className="flex-1">
                        <p className="text-xs uppercase leading-loose tracking-wider text-textSecond">
                          Orders value
                        </p>
                        <h6 className="text-lg font-medium">
                          {formatCurrency(
                            filteredOrders.reduce((total, order) => total + order.price, 0)
                          )}
                        </h6>
                      </div>

                      {/* <div className="border-[0.5px]"></div> */}

                      {/* <div className="">
                        <p className="text-xs uppercase leading-loose tracking-wider text-textSecond">
                          Refunds
                        </p>
                        <h6 className="text-lg font-medium">
                          {formatCurrency(
                            filteredOrders.filter((order) => !order.paymentStatus).reduce((total, order) => total + order.totalPayment, 0)
                          )}
                        </h6>
                      </div> */}
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="relative w-full min-w-[211px] rounded-lg border border-gray150 bg-transparent shadow-adminInputShadow hover:border-black">
                          <i className="pi pi-search absolute left-3 top-1/2 -translate-y-1/2 transform text-gray100"></i>
                          <InputText
                            placeholder="Search"
                            className="w-full bg-transparent py-[17px] pl-10 pr-3 text-sm text-black focus:ring-0"
                            value={searchTerm}
                            onChange={handleSearchChange}
                          />
                        </div>
                      </div>
                      <div className="flex flex-grow flex-wrap items-center justify-between gap-4">
                        <div className="flex-1">
                          <MultiSelect
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.value)}
                            options={status}
                            optionLabel="name"
                            placeholder="Select Status"
                            maxSelectedLabels={2}
                            className="w-full rounded-lg border border-gray150 px-4 py-2 font-inter text-sm shadow-adminInputShadow"
                            itemClassName="!font-inter"
                          />
                        </div>
                        <div className="flex-1">
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

                  <div className="rounded-lg border bg-[#F2F2F2] px-5 pb-5">
                    <div className="overflow-x-scroll">
                      <table className="w-full rounded-xl">
                        <thead>
                          <tr className="text-left">
                            <th className="p-5 text-xs font-light">Amount</th>
                            <th className="p-5 text-xs font-light">Status</th>
                            <th className="p-5 text-xs font-light">
                              Invoice ID
                            </th>
                            <th className="p-5 text-xs font-light">Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredOrders.slice(first, first + rows).map((order) => (
                            <PaymentRow
                              key={order.sysIdOrder}
                              amount={order.price}
                              id={order.sysIdOrder}
                              orderCode={order.orderCode}
                              status={order.paymentStatus}
                              date={order.orderDate}
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
                            layout:
                              "CurrentPageReport PrevPageLink NextPageLink",
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
        </div>
      </div>
    </>
  );
};