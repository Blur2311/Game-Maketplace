import { useEffect, useState } from "react";
import apiClient from "../../../config/apiClient";
import { SaleCard, SaleCardProps } from "./SaleCard";

export const Sale = () => {
  const [sale, setSale] = useState<SaleCardProps[]>([
    {
      image: "image1.png",
      name: "Black Wukong",
      describe:
        "Save up to 85% - grab some of your favorite titles at huge savings.",
      buttonName: "Detail",
      url: "",
    },
    {
      image: "image1.png",
      name: "Black Wukong",
      describe:
        "Save up to 85% - grab some of your favorite titles at huge savings.",
      buttonName: "Detail",
      url: "",
    },
    {
      image: "image1.png",
      name: "Black Wukong",
      describe:
        "Save up to 85% - grab some of your favorite titles at huge savings.",
      buttonName: "Detail",
      url: "",
    },
  ]);

  useEffect(() => {
    fetchSale();
  }, []);

  const fetchSale = async () => {
    let requestParams = {
      page: 0,
      size: 3,
    };
    const result = await apiClient
      .get("/api/vouchers/p/all", { params: requestParams })
      .then((response) => {
        return response.data.data;
      })
      .catch((error) => {
        console.error(error);
      });
    const newItems = result.map((item: any) => {
      return {
        image: item.voucherBanner ?? "/image1.png",
        name: item.discountName,
        describe: item.description,
        buttonName: "Detail",
        url: `/voucher/${item.codeVoucher}`,
      };
    });
    setSale(newItems);
  };

  const renderSaleCard = () => {
    return sale.map((item, index) => {
      return (
        <SaleCard
          key={index}
          image={item.image}
          name={item.name}
          describe={item.describe}
          buttonName={item.buttonName}
          url={item.url}
        />
      );
    });
  };

  return (
    <>
      <div className="flex flex-col items-center justify-between gap-5 mt-16 sm:flex-row">
        {renderSaleCard()}
      </div>
    </>
  );
};
