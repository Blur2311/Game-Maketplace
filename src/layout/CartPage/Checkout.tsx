import { Button } from "primereact/button";
import { confirmDialog } from "primereact/confirmdialog";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { useEffect, useMemo, useRef, useState } from "react";
import { FaStar } from "react-icons/fa";
import { PiStarFourFill } from "react-icons/pi";
import { useLocation, useNavigate } from "react-router-dom";
import { getCurrentUser, useAuthCheck, User } from "../../utils/AuthUtils";
import { CartItem } from "../../utils/CartUtils";
import {
  checkDiscountCode,
  handleAfterPayment,
  handleCreditCardPayment,
  handlePlaceOrder,
  handleUserBalancePayment,
  paymentOptions,
  recharge,
} from "../../utils/CheckOutUtils";
import {
  showErrorToast,
  showInfoToast,
  showSuccessToast,
} from "../../utils/ErrorHandlingUtils";
import {
  formatCurrency,
  manageButtonStateDuringApiCall,
} from "../../utils/OtherUtils";
import { getImage } from "../../utils/ProductUtils";
import "./CartPage.css";
import { PaymentOption } from "./components/PaymentOption";
import { SummaryItem } from "./components/SummaryItem";
import { useCart } from "./hooks/useCart";

export const Checkout: React.FC<{ cartItem?: CartItem[] }> = ({ cartItem }) => {
  useAuthCheck([]);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [isButtonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const { games, cartItems, fetchGameDetails } = useCart();
  const location = useLocation();
  const initialCartItems = cartItem ?? location.state?.cartItem ?? cartItems;
  const [checkOutItems] = useState<CartItem[]>(initialCartItems);
  const [{ total, subTotal, afterTaxes }, setTotal] = useState({
    total: 0,
    subTotal: 0,
    afterTaxes: 0,
  });
  const [tax] = useState(2);
  const [{ discountPercent, discountAmount, usedDiscountCode }, setDiscount] =
    useState({ discountPercent: 0, discountAmount: 0, usedDiscountCode: "" });
  const [discountCode, setDiscountCode] = useState<string>("");
  const navigate = useNavigate();
  const toast = useRef<Toast>(null);

  useEffect(() => {
    getCurrentUser().then((user) => {
      setCurrentUser(user);
      handleAfterPayment(toast);
    });
  }, []);

  const handleCheckOutItems = async () => {
    if (checkOutItems.length === 0) {
      checkOutItems.push(...cartItems);
    }
    await fetchGameDetails(checkOutItems);
  };

  useEffect(() => {
    handleCheckOutItems();
  }, [checkOutItems]);

  useEffect(() => {
    let subTotal = 0;
    checkOutItems.forEach((item) => {
      const game = games.get(item.slug);
      if (game) {
        const price =
          game.price * (1 - game.discountPercent / 100) * item.quantity;
        subTotal += price;
      }
    });
    setTotal({
      total: subTotal - discountAmount,
      subTotal,
      afterTaxes: Math.round(subTotal * (1 + tax / 100)),
    });
  }, [games]);

  const renderCartItems = useMemo(() => {
    if (checkOutItems.length === 0) {
      checkOutItems.push(...cartItems);
    }
    if (checkOutItems.length === 0) {
      return (
        <div className="p-4 text-center text-gray-500">Your cart is empty</div>
      );
    }
    return checkOutItems.map((item) => {
      const game = games.get(item.slug);
      if (!game) return null;
      const image = getImage(game, "thumbnail") ?? "/assasin.webp";
      const price =
        game.price * (1 - game.discountPercent / 100) * item.quantity;
      return (
        <SummaryItem
          key={item.slug}
          imageUrl={image}
          title={game.gameName}
          publisher={game.developer ?? "Steam Game"}
          price={price}
          quantity={item.quantity}
        />
      );
    });
  }, [checkOutItems, games]);

  const handleSelectedOptionChange = (option: string) => {
    if (option === "currentBalance") {
      if ((currentUser?.balance ?? 0) < afterTaxes) {
        confirmDialog({
          message:
            "Your balance is insufficient. Would you like to recharge to continue?",
          header: "Insufficient Balance",
          icon: "pi pi-exclamation-triangle",
          acceptClassName: "custom-accept-button",
          rejectClassName: "custom-reject-button",
          accept: () => {
            if (currentUser) {
              recharge(afterTaxes, currentUser);
            } else {
              showErrorToast(toast, "User not logged in");
            }
          },
          reject: () => {
            setSelectedOption(selectedOption);
          },
        });
      } else {
        setSelectedOption(option);
      }
    } else if (paymentOptions.find((o) => o.value === option)) {
      showInfoToast(toast, "This payment method is coming soon");
    }
  };

  const handlePlaceOrderClick = () => {
    manageButtonStateDuringApiCall(
      () =>
        handlePlaceOrder(
          selectedOption,
          () => {
            if (currentUser) {
              handleUserBalancePayment(
                currentUser,
                afterTaxes,
                usedDiscountCode,
                checkOutItems,
                toast,
                navigate,
              );
            } else {
              showErrorToast(toast, "User not logged in");
            }
          },
          () => {
            if (currentUser) {
              handleCreditCardPayment(currentUser, afterTaxes);
            } else {
              showErrorToast(toast, "User not logged in");
            }
          },
        ),
      setButtonDisabled,
      () => showSuccessToast(toast, "Order placed successfully"),
      (error: any) =>
        showErrorToast(
          toast,
          error.response.data.message ?? "Failed to place order",
        ),
    );
  };

  return (
    <>
      <Toast ref={toast} />
      <div className="mb-10">
        <h1 className="mb-12 text-4xl font-black text-white">Checkout</h1>
        <div className="flex items-start">
          <div className="flex-1">
            <div className="flex flex-col gap-8 text-white">
              <div className="">
                <p className="mb-4 text-sm font-light uppercase">Balance</p>
                <PaymentOption
                  label="Pay with current balance: "
                  IconComponent={PiStarFourFill}
                  amount={currentUser?.balance}
                  value="currentBalance"
                  selectedOption={selectedOption}
                  onChange={handleSelectedOptionChange}
                />
              </div>
              <div className="">
                <p className="mb-4 text-sm font-light uppercase">
                  Other Payment Methods
                </p>
                <div className="flex flex-col gap-4">
                  {paymentOptions.map((option) => (
                    <PaymentOption
                      key={option.value}
                      label={option.label}
                      IconComponent={option.IconComponent}
                      value={option.value}
                      selectedOption={selectedOption}
                      onChange={handleSelectedOptionChange}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="text-white ml-9">
            <div className="flex flex-col gap-4">
              <p className="text-sm uppercase">Order Summary</p>
              <div className="flex flex-col p-4 bg-gray-100 rounded-lg shadow-md">
                {renderCartItems}
                <div className="flex flex-col gap-1 mt-5">
                  <div className="flex items-center justify-between text-sm font-light text-textSidebar">
                    <p>Price</p>
                    <p>{formatCurrency(subTotal)}</p>
                  </div>
                  <div className="flex items-center justify-between text-sm font-light text-textSidebar">
                    <p>
                      Sale Discount{" "}
                      {discountPercent ? "(" + discountPercent + "%)" : ""}
                    </p>
                    <p>-{formatCurrency(subTotal - total)}</p>
                  </div>
                  <div className="flex items-center justify-between text-sm font-light text-textSidebar">
                    <p>Taxes ({tax}%)</p>
                    <p>{formatCurrency(subTotal * (tax / 100))}</p>
                  </div>
                  <hr />
                  <div className="flex items-center justify-between text-sm font-bold text-textSidebar">
                    <p>Total</p>
                    <p>{formatCurrency(afterTaxes)}</p>
                  </div>
                  <div className="flex items-center max-w-md gap-2 p-4 mt-2 font-medium text-black rounded-lg bg-gradient-to-r from-green-200 to-yellow-200">
                    <div className="flex items-center justify-center w-6 h-6 text-white bg-black rounded-full">
                      <FaStar size={12} />
                    </div>
                    <span className="text-sm">
                      Earn{" "}
                      <span className="font-bold">
                        {formatCurrency(afterTaxes / 100)}
                      </span>{" "}
                      with VIP Silver.
                    </span>
                  </div>
                  <FloatLabel className="w-full text-sm mt-7">
                    <InputText
                      className="h-[50px] w-full border border-grayBorder bg-transparent p-5 ps-[10px] text-black"
                      onChange={(e) => setDiscountCode(e.target.value)}
                    />
                    <label>Enter discount code</label>
                  </FloatLabel>
                  <Button
                    label="APPLY"
                    size="small"
                    className="h-10 mt-2 text-xs font-bold bg-mainYellow text-slate-900"
                    disabled={!discountCode}
                    onClick={() =>
                      checkDiscountCode(
                        discountCode,
                        subTotal,
                        tax,
                        toast,
                        setDiscount,
                        setTotal,
                      )
                    }
                  />
                  <Button
                    label="PLACE ORDER"
                    size="large"
                    className="w-full mt-2 text-xs font-bold h-14 bg-mainYellow text-slate-900"
                    onClick={handlePlaceOrderClick}
                    disabled={!selectedOption || isButtonDisabled}
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
