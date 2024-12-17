const SalesByCountry = () => {
  const salesData = [
    {
      country: "Viet Nam",
      percentage: 70,
      color: "bg-mainYellow",
      src: "https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Vietnam.svg",
      alt: "Cờ Việt Nam",
    },
    {
      country: "China",
      percentage: 15,
      color: "bg-mainCyan",
      src: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Flag_of_the_People%27s_Republic_of_China.svg",
      alt: "Cờ Trung Quốc",
    },
    {
      country: "United States",
      percentage: 9,
      color: "bg-mainCyan",
      src: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg",
      alt: "Cờ Hoa Kỳ",
    },
    {
      country: "Thailand",
      percentage: 4,
      color: "bg-mainCyan",
      src: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Flag_of_Thailand.svg",
      alt: "Cờ Thái Lan",
    },
    {
      country: "Canada",
      percentage: 2,
      color: "bg-mainCyan",
      src: "https://upload.wikimedia.org/wikipedia/commons/c/cf/Flag_of_Canada.svg",
      alt: "Cờ Canada",
    },
  ];

  return (
    <div className="w-64">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <p className="text-textSecond">Total</p>
          <h1 className="text-[32px] font-medium">$152K</h1>
        </div>

        <div className="flex flex-col gap-4">
          {salesData.map((data) => (
            <div key={data.country} className="flex items-center gap-2">
              <div className={`h-6 w-6 overflow-hidden rounded-full`}>
                <img
                  src={data.src}
                  alt={data.alt}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h6 className="text-sm font-medium">{data.country}</h6>
                <div className="flex items-center gap-4">
                  <div className="h-2 flex-1 rounded-full bg-gray-200">
                    <div
                      className={`h-2 rounded-full ${data.color}`}
                      style={{ width: `${data.percentage}%` }}
                    ></div>
                  </div>
                  <span>{data.percentage}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SalesByCountry;
