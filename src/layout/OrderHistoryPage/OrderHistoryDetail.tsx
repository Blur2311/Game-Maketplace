import { formatCurrency } from "../../utils/OtherUtils";
import { OrderHistoryDetailItem } from "./components/OrderHistoryItem";

export const OrderHistoryDetail = () => {
  return (
    <>
      <div className="pl-5">
        <div className="rounded bg-white p-10">
          <h1 className="text-3xl">Order Details #5841931</h1>
          <h6 className="mt-[15px] text-sm font-light">
            Display information about the products you have purchased
          </h6>
          <h5 className="mt-[30px] text-lg font-bold">Order Information</h5>
          <div className="mt-5 flex items-start">
            <div className="flex flex-1 flex-col gap-5">
              <div className="flex items-center">
                <p className="min-w-[150px] text-sm font-semibold">Order ID:</p>
                <p className="text-sm font-light">#5841931</p>
              </div>
              <div className="flex items-center">
                <p className="min-w-[150px] text-sm font-semibold">
                  Order Status:
                </p>
                <p className="text-sm font-light">Refunded</p>
              </div>
              <div className="flex items-center">
                <p className="min-w-[150px] text-sm font-semibold">
                  Total Product Value:
                </p>
                <p className="text-sm font-light">{formatCurrency(44910)}</p>
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-5">
              <div className="flex items-center">
                <p className="min-w-[150px] text-sm font-semibold">
                  Recipient:
                </p>
                <p className="text-sm font-light underline">
                  ph7569626@gmail.com
                </p>
              </div>
              <div className="flex items-center">
                <p className="min-w-[150px] text-sm font-semibold">
                  Date Created:
                </p>
                <p className="text-sm font-light">
                  November 16, 2022, 6:50:41 PM
                </p>
              </div>
              <div className="flex items-center">
                <p className="min-w-[150px] text-sm font-semibold">
                  Cash Reward:
                </p>
                <p className="text-sm font-light">
                  (1%) {formatCurrency(4910)}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 flex w-full flex-col gap-5">
            <OrderHistoryDetailItem
              img={"/darksoul.jpg"}
              name={"Dark Soul Remastered TM"}
              type={[
                { text: "Steam Game", url: "" },
                { text: "RPG", url: "" },
              ]}
              price={190000}
              quantity={1}
            />
            <OrderHistoryDetailItem
              img={"/assasin.webp"}
              name={"Assassin Creed"}
              type={[
                { text: "Steam Game", url: "" },
                { text: "RPG", url: "" },
              ]}
              price={190000}
              quantity={1}
            />
          </div>
        </div>
      </div>
    </>
  );
};
