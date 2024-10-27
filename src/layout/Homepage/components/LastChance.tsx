import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import { TbExclamationCircle } from "react-icons/tb";
import { Link } from "react-router-dom";
import apiClient from "../../../config/apiClient";
import { formatDate } from "../../../utils/OtherUtils";

export const LastChance = () => {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    let requestParams = {
      page: 0,
      size: 3,
    };
    const result = await apiClient
      .get("/api/vouchers/p/top-limited-discount", { params: requestParams })
      .then((response) => {
        return response.data.data;
      })
      .catch((error) => {
        console.error(error);
      });
    const newItems = result.map((item: any) => {
      return {
        name: item.discountName,
        startDate: item.startDate,
        endDate: item.endDate,
        discription: item.description,
        image: item.voucherBanner ?? "/image1.png",
        url: `/voucher/${item.codeVoucher}`,
      };
    });
    setItems(newItems);
  };

  const renderItems = () => {
    return items.map((item, index) => {
      return (
        <div key={index} className="flex-1">
          <div className="relative overflow-hidden rounded-lg">
            <img
              src={item.image}
              alt=""
              className="transition duration-300 hover:brightness-125"
            />
            <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center h-6 bg-mainCyan">
              <Link to={item.url ?? "/"}>
                <p className="text-xs font-bold text-black">CHECK NOW</p>
              </Link>
            </div>
          </div>
          <div className="mt-[20px] flex flex-col gap-[5px] text-white">
            <p className="font-bold">{item.name}</p>
            <p className="font-light text-textType">
              {formatDate(item.startDate)} - {formatDate(item.endDate)}
            </p>
          </div>
        </div>
      );
    });
  };

  return (
    <>
      <div className="mt-16 rounded-xl bg-gray300 px-5 py-[30px] md:px-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-[14px] text-white">
            <TbExclamationCircle className="text-4xl" />
            <p className="text-xl font-bold">Last Chance</p>
          </div>
          <Button
            disabled
            label="View More"
            className="h-10 px-3 py-3 text-sm text-white bg-transparent border rounded-lg border-gray100 hover:border-white hover:bg-gray200 hover:bg-opacity-50"
          />
        </div>
        <div className="flex flex-col items-start justify-between gap-5 mb-2 sm:flex-row">
          {renderItems()}
        </div>
      </div>
    </>
  );
};
