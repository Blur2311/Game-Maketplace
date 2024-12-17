import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { formatCurrency } from "../../../utils/OtherUtils";
import { ApexOptions } from "apexcharts";
import { TbReportMoney, TbUserHexagon } from "react-icons/tb";
import { getAnalytics, getRevenueVsProfit, getMonthlyUserGrowth, MonthlyData, UserGrowthData } from "./components/service/AnalyticsService";
import { useAuthCheck } from "../../../utils/AuthUtils";

export const Analytics = () => {
  useAuthCheck(['ADMIN']);
  const [analyticsData, setAnalyticsData] = useState({
    totalRevenue: 0,
    totalItemsSold: 0,
    totalUsers: 0,
  });

  const [revenueSeries, setRevenueSeries] = useState<MonthlyData[]>([]);
  const [profitSeries, setProfitSeries] = useState<MonthlyData[]>([]);
  const [userSeries, setUserSeries] = useState<UserGrowthData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const analyticsSummary = await getAnalytics();
        setAnalyticsData(analyticsSummary);

        const revenueVsProfitData = await getRevenueVsProfit();
        setRevenueSeries(revenueVsProfitData.revenue);
        setProfitSeries(revenueVsProfitData.profit);

        const monthlyUserGrowthData = await getMonthlyUserGrowth();
        setUserSeries(monthlyUserGrowthData.userGrowth);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      }
    };

    fetchData();
  }, []);

  const revenueOptions: ApexOptions = {
    series: [
      {
        name: "Revenue",
        data: revenueSeries.map(item => item.amount),
      },
      {
        name: "Net Profit",
        data: profitSeries.map(item => item.amount),
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
      categories: revenueSeries.map(item => item.month),
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
      categories: userSeries.map(item => item.month),
    },
    yaxis: {
      title: {
        text: "Users",
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + " users";
        },
      },
    },
    colors: ["#F5BA13"],
  };

  const userSeriesData = [
    {
      name: "Registered Users",
      data: userSeries.map(item => item.newUsers),
    },
  ];

  console.log("User Series Data:", userSeriesData); // Thêm logging để kiểm tra dữ liệu

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
              </div>
            </div>

            <div className="col-span-12 md:col-span-6 xl:col-span-4">
              <div className="flex flex-col gap-2 border-b pb-4 md:border-b-0 md:pb-0 xl:border-r">
                <p className="font-light text-textSecond">Items sold</p>
                <h6 className="text-4xl font-medium tracking-wide">
                  {analyticsData.totalItemsSold}
                </h6>
              </div>
            </div>

            <div className="col-span-12 md:col-span-6 xl:col-span-4">
              <div className="flex flex-col gap-2 border-b pb-4 md:border-b-0 md:pb-0">
                <p className="font-light text-textSecond">Total User</p>
                <h6 className="text-4xl font-medium tracking-wide">
                  {analyticsData.totalUsers}
                </h6>
              </div>
            </div>
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
                series={userSeriesData}
                type="bar"
                height={350}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};