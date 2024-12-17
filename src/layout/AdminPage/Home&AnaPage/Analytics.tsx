import { useEffect, useState } from "react";
import { formatCurrency } from "../../../utils/OtherUtils";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { TbReportMoney, TbUserHexagon } from "react-icons/tb";
import { FiTrendingDown, FiTrendingUp } from "react-icons/fi";
import { getAnalytics } from "./components/service/AnalyticsService";
import { useAuthCheck } from "../../../utils/AuthUtils";

  
export const Analytics = () => {
  useAuthCheck(['ADMIN']);
  const [analyticsData, setAnalyticsData] = useState({
    totalRevenue: 0,
    totalItemsSold: 0,
    totalUsers: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAnalytics();
        setAnalyticsData(data);
      } catch (error) {
        console.error("Error fetching analytics summary:", error);
      }
    };

    fetchData();
  }, []);

  const revenueOptions: ApexOptions = {
    series: [
      {
        name: "Net Profit",
        data: [57, 56, 61, 58, 63, 60, 66, 69],
      },
      {
        name: "Revenue",
        data: [101, 98, 87, 105, 91, 114, 94, 96],
      },
    ],
    chart: {
      type: "bar",
      height: 350,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov"],
    },
    yaxis: {
      title: {
        text: "$ (thousands)",
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return "$ " + val + " thousands";
        },
      },
    },
  };

  const userOptions: ApexOptions = {
    chart: {
      type: "area",
      toolbar: { show: false },
    },
    stroke: { curve: "smooth" },
    xaxis: {
      categories: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov"],
    },
    colors: ["#F5BA13"],
  };

  const userSeries = [
    {
      name: "Registered Users",
      data: [440, 570, 560, 610, 580, 630, 600, 660],
    },
  ];

  return (
    <>
      <div className="flex flex-col gap-8 px-6 py-16">
        <h3 className="text-[32px] font-medium">Analytics</h3>

        <div className="rounded-[20px] p-6 shadow-adminBoxshadow">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-6 xl:col-span-4">
              <div className="flex flex-col gap-2 border-b pb-4 md:border-b-0 md:border-r md:pb-0">
                <p className="font-light text-textSecond">Total Revenue</p>
                <h6 className="text-4xl font-medium tracking-wide">
                  {formatCurrency(analyticsData.totalRevenue)}
                </h6>
                {/* <div className="flex gap-2">
                  <FiTrendingUp size={20} className="text-green-500" />
                  <p className="text-sm text-textSecond">
                    <span className="text-green-500"> 15% </span>
                    increase vs last month
                  </p>
                </div> */}
              </div>
            </div>

            <div className="col-span-12 md:col-span-6 xl:col-span-4">
              <div className="flex flex-col gap-2 border-b pb-4 md:border-b-0 md:pb-0 xl:border-r">
                <p className="font-light text-textSecond">Items sold</p>
                <h6 className="text-4xl font-medium tracking-wide">
                  {analyticsData.totalItemsSold}
                </h6>
                {/* <div className="flex gap-2">
                  <FiTrendingUp size={20} className="text-green-500" />
                  <p className="text-sm text-textSecond">
                    <span className="text-green-500"> 15% </span>
                    increase vs last month
                  </p>
                </div> */}
              </div>
            </div>

            <div className="col-span-12 md:col-span-6 xl:col-span-4">
              <div className="flex flex-col gap-2 border-b pb-4 md:border-b-0 md:border-r md:pb-0">
                <p className="font-light text-textSecond">Total User</p>
                <h6 className="text-4xl font-medium tracking-wide">
                  {analyticsData.totalUsers}
                </h6>
                {/* <div className="flex gap-2">
                  <FiTrendingUp size={20} className="text-green-500" />
                  <p className="text-sm text-textSecond">
                    <span className="text-green-500"> 15% </span>
                    increase vs last month
                  </p>
                </div> */}
              </div>
            </div>

            {/* <div className="col-span-12 md:col-span-6 xl:col-span-3">
              <div className="flex flex-col gap-2">
                <p className="font-light text-textSecond">Refund</p>
                <h6 className="text-4xl font-medium tracking-wide">
                  {formatCurrency(812390)}
                </h6>
                <div className="flex gap-2">
                  <FiTrendingDown size={20} className="text-red-500" />
                  <p className="text-sm text-textSecond">
                    <span className="text-red-500"> 15% </span>
                    decrease vs last month
                  </p>
                </div>
              </div>
            </div> */}

          </div>
        </div>

        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-6">
            <div className="rounded-[20px] px-6 py-8 shadow-adminBoxshadow">
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center justify-center w-10 h-10 rounded-full shadow-adminIconshadow">
                  <TbReportMoney size={24} />
                </div>
                <p className="text-lg font-medium">Revenue vs Profit</p>
              </div>
              <Chart
                options={revenueOptions}
                series={revenueOptions.series}
                type="bar"
                height={350}
              />
            </div>
          </div>
          <div className="col-span-12 lg:col-span-6">
            <div className="rounded-[20px] px-6 py-8 shadow-adminBoxshadow">
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center justify-center w-10 h-10 rounded-full shadow-adminIconshadow">
                  <TbUserHexagon size={24} />
                </div>
                <p className="text-lg font-medium">Monthly user growth</p>
              </div>
              <Chart
                options={userOptions}
                series={userSeries}
                type="area"
                height={350}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};