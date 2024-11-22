import { useEffect, useState } from "react";
import apiClient from "../../config/apiClient";
import { OrderDetailDTO } from "../../model/TransactionHistoryModel";
import { formatCurrency, formatDate } from "../../utils/OtherUtils";
import { getImage } from "../../utils/ProductUtils";
import { OrderHistoryDetailItem } from "./components/OrderHistoryItem";

export const OrderHistoryDetail = () => {
  const orderCode = window.location.href.split("/").pop();
  const [orderDetail, setOrderDetail] = useState<OrderDetailDTO | null>(null);
  const [{ discountPercent, discountAmount, taxes }, setCal] = useState({
    discountPercent: 0,
    discountAmount: 0,
    taxes: 0,
  });

  const fetchOrderDetail = async () => {
    try {
      const response = await apiClient.get(
        `/api/transactions/get-order-detail?orderCode=${orderCode}`,
      );
      setOrderDetail(response.data.data);
      calculate(response.data.data);
    } catch (error) {
      console.error("Failed to fetch order details", error);
    }
  };

  const calculate = (data: OrderDetailDTO) => {
    const afterTaxes = Math.abs(data.transactionHistoryDTO.amount);
    const tax = (afterTaxes / 102) * 2;
    let total = 0;
    data.ordersDTOS.forEach((order) => {
      total += order.price;
    });
    const discount = total - afterTaxes / 1.02;
    const percent = (discount / total) * 100;
    setCal({
      discountPercent: Math.round(percent),
      discountAmount: discount,
      taxes: tax,
    });
  };

  useEffect(() => {
    fetchOrderDetail();
  }, [orderCode]);

  if (!orderDetail) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="pl-5">
        <div className="p-10 bg-white rounded">
          <h1 className="text-3xl">
            Order Details #{orderDetail.transactionHistoryDTO.sysIdPayment}
          </h1>
          <h6 className="mt-[15px] text-sm font-light">
            Display information about the products you have purchased
          </h6>
          <h5 className="mt-[30px] text-lg font-bold">Order Information</h5>
          <div className="flex items-start mt-5">
            <div className="flex flex-col flex-1 gap-5">
              <div className="flex items-center">
                <p className="min-w-[150px] text-sm font-semibold">Order ID:</p>
                <p className="text-sm font-light">
                  #{orderDetail.transactionHistoryDTO.sysIdPayment}
                </p>
              </div>
              <div className="flex items-center">
                <p className="min-w-[150px] text-sm font-semibold">
                  Order Status:
                </p>
                <p className="text-sm font-light">
                  {orderDetail.transactionHistoryDTO.status
                    ? "Finished"
                    : "Pending"}
                </p>
              </div>
              <div className="flex items-center">
                <p className="min-w-[150px] text-sm font-semibold">
                  Date Created:
                </p>
                <p className="text-sm font-light">
                  {formatDate(orderDetail.transactionHistoryDTO.paymentTime)}
                </p>
              </div>
            </div>
            <div className="flex flex-col flex-1 gap-5">
              <div className="flex items-center">
                <p className="min-w-[150px] text-sm font-semibold">
                  {`Discount (${discountPercent ?? 0}%):`}
                </p>
                <p className="text-sm font-light text-green-600">
                  {formatCurrency(discountAmount)}
                </p>
              </div>
              <div className="flex items-center">
                <p className="min-w-[150px] text-sm font-semibold">
                  Taxes (2%):
                </p>
                <p className="text-sm font-light text-red-600">
                  {formatCurrency(taxes)}
                </p>
              </div>
              <div className="flex items-center">
                <p className="min-w-[150px] text-sm font-semibold">
                  Total Payment:
                </p>
                <p className="text-sm font-light">
                  {formatCurrency(
                    Math.abs(orderDetail.transactionHistoryDTO.amount),
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col w-full gap-5 mt-10">
            {orderDetail.ordersDTOS.map((order) => (
              <OrderHistoryDetailItem
                key={order.sysIdOrder}
                img={getImage(order.gameDTO, "thumbnail")}
                type={
                  order.gameDTO?.features
                    ? order.gameDTO.features
                        .split("\n")
                        .map((feature: string) => ({ text: feature, url: "" }))
                    : []
                }
                name={order.gameName}
                quantity={order.quantity}
                price={order.price / order.quantity}
                slug={order.gameDTO?.slug || ""}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
