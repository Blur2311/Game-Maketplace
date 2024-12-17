import { FiTrendingUp } from "react-icons/fi";
import {
  PiArrowRight,
  PiBag,
  PiChartPie,
  PiGlobeHemisphereWest,
  PiReceipt,
  PiReceiptX,
  PiWarning,
} from "react-icons/pi";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { TbUsers } from "react-icons/tb";
import { formatCurrency } from "../../../utils/OtherUtils";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { NavLink } from "react-router-dom";
import { TopSaleItem } from "./components/TopSaleItemRow";
import MapChart from "./components/MapChart";
import SalesByCountry from "./components/SaleByCountry";
import { IoCartOutline } from "react-icons/io5";
import { useAuthCheck } from "../../../utils/AuthUtils";

export const HomeAdmin = () => {
  useAuthCheck(['ADMIN']);
  const options: ApexOptions = {
    series: [
      {
        name: "New customers",
        data: [28, 29, 33, 36, 32, 32, 33],
      },
      {
        name: "Number of Orders",
        data: [12, 11, 14, 18, 17, 13, 13],
      },
    ],
    chart: {
      height: 350,
      type: "line",
      dropShadow: {
        enabled: true,
        color: "#000",
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2,
      },
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    colors: ["#77B6EA", "#545454"],
    dataLabels: {
      enabled: true,
    },
    stroke: {
      curve: "smooth",
    },
    grid: {
      borderColor: "#e7e7e7",
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    markers: {
      size: 1,
    },
    xaxis: {
      categories: [
        "Nov 1",
        "Nov 5",
        "Nov 10",
        "Nov 15",
        "Nov 20",
        "Nov 25",
        "Nov 30",
      ],
      title: {
        text: "Days of the month",
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      floating: true,
      offsetY: -25,
      offsetX: -5,
    },
  };

  return (
    <>
      <div className="flex flex-col gap-8 px-6 py-16">
        <h3 className="text-[32px] font-medium">Overview</h3>

        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-4">
            <div className="rounded-[20px] shadow-adminBoxshadow">
              <div className="px-6 pt-4 pb-8">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full shadow-adminIconshadow">
                    <IoCartOutline size={24} />
                  </div>
                  <div className="">
                    <p className="font-light text-textSecond">Orders</p>
                    <h6 className="text-4xl font-medium">59</h6>
                  </div>
                </div>
              </div>

              <hr />

              <div className="p-4">
                <div className="flex gap-2">
                  <FiTrendingUp size={20} className="text-green-500" />
                  <p className="text-sm text-textSecond">
                    <span className="text-green-500"> 15% </span>
                    increase vs last month
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-12 md:col-span-4">
            <div className="rounded-[20px] shadow-adminBoxshadow">
              <div className="px-6 pt-4 pb-8">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full shadow-adminIconshadow">
                    <TbUsers size={24} />
                  </div>
                  <div className="">
                    <p className="font-light text-textSecond">Sign ups</p>
                    <h6 className="text-4xl font-medium">240</h6>
                  </div>
                </div>
              </div>

              <hr />

              <div className="p-4">
                <div className="flex gap-2">
                  <FiTrendingUp size={20} className="text-green-500" />
                  <p className="text-sm text-textSecond">
                    <span className="text-green-500"> 15% </span>
                    increase vs last month
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-12 md:col-span-4">
            <div className="rounded-[20px] shadow-adminBoxshadow">
              <div className="px-6 pt-4 pb-8">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full shadow-adminIconshadow">
                    <PiWarning size={24} />
                  </div>
                  <div className="">
                    <p className="font-light text-textSecond">issues</p>
                    <h6 className="text-4xl font-medium">17</h6>
                  </div>
                </div>
              </div>

              <hr />

              <div className="p-4">
                <div className="flex gap-2">
                  <FiTrendingUp size={20} className="text-green-500" />
                  <p className="text-sm text-textSecond">
                    <span className="text-green-500"> 15% </span>
                    increase vs last month
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[20px] px-6 shadow-adminBoxshadow">
          <div className="pt-8 pb-4">
            <p className="text-lg font-medium">Stats at a glance</p>
          </div>

          <div className="flex flex-col gap-6 pt-4 pb-8">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 md:col-span-6 xl:col-span-3">
                <div className="pb-4 border-b md:border-b-0 md:border-r md:pb-0">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center justify-center rounded-full h-14 w-14 shadow-adminIconshadow">
                      <PiChartPie size={24} />
                    </div>
                    <div className="">
                      <p className="text-xs leading-8 tracking-wider uppercase text-textSecond">
                        Payout balance
                      </p>
                      <h6 className="text-2xl font-medium">
                        {formatCurrency(1640000)}
                      </h6>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-span-12 md:col-span-6 xl:col-span-3">
                <div className="pb-4 border-b md:border-b-0 md:pb-0 xl:border-r">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center justify-center rounded-full h-14 w-14 shadow-adminIconshadow">
                      <RiMoneyDollarCircleLine size={24} />
                    </div>
                    <div className="">
                      <p className="text-xs leading-8 tracking-wider uppercase text-textSecond">
                        Today's revenue
                      </p>
                      <h6 className="text-2xl font-medium">
                        {formatCurrency(260000)}
                      </h6>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-span-12 md:col-span-6 xl:col-span-3">
                <div className="pb-4 border-b md:border-b-0 md:border-r md:pb-0">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center justify-center rounded-full h-14 w-14 shadow-adminIconshadow">
                      <PiReceipt size={24} />
                    </div>
                    <div className="">
                      <p className="text-xs leading-8 tracking-wider uppercase text-textSecond">
                        Expenses
                      </p>
                      <h6 className="text-2xl font-medium">
                        {formatCurrency(580000)}
                      </h6>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-span-12 md:col-span-6 xl:col-span-3">
                <div className="">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center justify-center rounded-full h-14 w-14 shadow-adminIconshadow">
                      <PiReceiptX size={24} />
                    </div>
                    <div className="">
                      <p className="text-xs leading-8 tracking-wider uppercase text-textSecond">
                        Refunds
                      </p>
                      <h6 className="text-2xl font-medium">
                        {formatCurrency(125000)}
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className="">
              <Chart
                options={options}
                series={options.series}
                type="line"
                height={350}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center w-full">
          <div className="w-full max-w-screen-lg">
            <div className="rounded-[20px] shadow-adminBoxshadow">
              <div className="flex items-center px-6 pt-8 pb-4">
                <div className="flex items-center justify-center w-10 h-10 mr-4 rounded-full shadow-adminIconshadow">
                  <PiBag className="text-2xl" />
                </div>
                <p className="flex-1 text-lg font-medium">Top selling</p>
                <NavLink
                  to={`/admin/customer/detail/1`}
                  className={
                    "flex items-center gap-2 rounded-lg p-2 text-sm hover:bg-gray-100"
                  }
                >
                  See all <PiArrowRight size={18} />
                </NavLink>
              </div>
              <div className="overflow-x-scroll">
                <table className="w-full text-nowrap">
                  <tbody>
                    <TopSaleItem
                      image={"/cat.jpeg"}
                      name={"Stray"}
                      type={"Steam Game"}
                      amount={5190000}
                      top={1}
                    />
                    <TopSaleItem
                      image={"/cat.jpeg"}
                      name={"Stray"}
                      type={"Steam Game"}
                      amount={4890000}
                      top={2}
                    />
                    <TopSaleItem
                      image={"/cat.jpeg"}
                      name={"Assasin Creed"}
                      type={"Steam Game"}
                      amount={3630000}
                      top={3}
                    />
                    <TopSaleItem
                      image={"/cat.jpeg"}
                      name={"Dark Soul"}
                      type={"Steam Game"}
                      amount={3190000}
                      top={4}
                    />
                    <TopSaleItem
                      image={"/cat.jpeg"}
                      name={"Wadafak"}
                      type={"Steam Game"}
                      amount={2620000}
                      top={5}
                    />
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};