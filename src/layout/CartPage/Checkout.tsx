import { useState } from "react";
import { PaymentOption } from "./components/PaymentOption";
import { PiStarFourFill } from "react-icons/pi";
import { FaCreditCard, FaStar } from "react-icons/fa";
import { SummaryItem } from "./components/SummaryItem";
import { formatCurrency } from "../../utils/OtherUtils";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Button } from "primereact/button";

export const Checkout: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>("");

  return (
    <>
      <div className="mb-10">
        <h1 className="mb-12 text-4xl font-black text-white">Checkout</h1>
        <div className="flex items-start">
          <div className="flex-1">
            <div className="flex flex-col gap-8 text-white">
              <div className="">
                <p className="mb-4 text-sm font-light uppercase">Balance</p>
                <PaymentOption
                  label="Pay With Current Balance"
                  IconComponent={PiStarFourFill}
                  amount={165000}
                  value="currentBalance"
                  selectedOption={selectedOption}
                  onChange={setSelectedOption}
                />
              </div>
              <div className="">
                <p className="mb-4 text-sm font-light uppercase">
                  Other Payment Methods
                </p>
                <div className="flex flex-col gap-4">
                  <PaymentOption
                    label="Credit Card"
                    IconComponent={FaCreditCard}
                    value="creditCard"
                    selectedOption={selectedOption}
                    onChange={setSelectedOption}
                  />
                  <PaymentOption
                    label="MOMO"
                    IconComponent={"/momo.png"}
                    value="MOMO"
                    selectedOption={selectedOption}
                    onChange={setSelectedOption}
                  />
                  <PaymentOption
                    label="VNPAY"
                    IconComponent={"/vnpay.jpg"}
                    value="VNPAY"
                    selectedOption={selectedOption}
                    onChange={setSelectedOption}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="ml-9 text-white">
            <div className="flex flex-col gap-4">
              <p className="text-sm uppercase">Order Summary</p>
              <div className="flex flex-col rounded-lg bg-gray-100 p-4 shadow-md">
                <SummaryItem
                  imageUrl={"/assasin.webp"}
                  title={"Assassin Creed Remasted Version 2"}
                  publisher={"Steam Game"}
                  price={190000}
                  quantity={1}
                />
                <SummaryItem
                  imageUrl={"/assasin.webp"}
                  title={"Assassin Creed Remasted Version 2"}
                  publisher={"Steam Game"}
                  price={190000}
                  quantity={1}
                />
                <div className="mt-5 flex flex-col gap-1">
                  <div className="text-textSidebar flex items-center justify-between text-sm font-light">
                    <p>Price</p>
                    <p>{formatCurrency(190000)}</p>
                  </div>
                  <div className="text-textSidebar flex items-center justify-between text-sm font-light">
                    <p>Sale Discount</p>
                    <p>-{formatCurrency(190000)}</p>
                  </div>
                  <div className="text-textSidebar flex items-center justify-between text-sm font-light">
                    <p>Taxes</p>
                    <p>1%</p>
                  </div>
                  <hr />
                  <div className="text-textSidebar flex items-center justify-between text-sm font-bold">
                    <p>Total</p>
                    <p>{formatCurrency(190000)}</p>
                  </div>
                  <div className="mt-2 flex max-w-md items-center gap-2 rounded-lg bg-gradient-to-r from-green-200 to-yellow-200 p-4 font-medium text-black">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-black text-white">
                      <FaStar size={12} />
                    </div>
                    <span className="text-sm">
                      Earn{" "}
                      <span className="font-bold">{formatCurrency(1900)}</span>{" "}
                      with VIP Silver.
                    </span>
                  </div>
                  <FloatLabel className="mt-7 w-full text-sm">
                    <InputText
                      className="h-[50px] w-full border border-grayBorder bg-transparent p-5 ps-[10px]"
                      // value={username}
                      // onChange={(e) => setUsername(e.target.value)}
                      // aria-invalid={!!error}
                      // aria-describedby="username-error"
                    />
                    <label>Enter discount code</label>
                  </FloatLabel>
                  <Button
                    label="PLACE ORDER"
                    size="large"
                    className="mt-2 h-14 w-full bg-mainYellow text-xs font-bold text-slate-900"
                    // onClick={handleLogin}
                    // disabled={isLockedOut}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
