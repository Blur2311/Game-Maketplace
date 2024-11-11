import { Button } from "primereact/button";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { useEffect, useMemo, useRef, useState } from "react";
import { FaStar } from "react-icons/fa";
import { PiStarFourFill } from "react-icons/pi";
import apiClient from "../../config/apiClient";
import { getCurrentUser, useAuthCheck, User } from "../../utils/AuthUtils";
import { Order, paymentOptions } from "../../utils/CheckOutUtils";
import {
  showErrorToast,
  showInfoToast,
  showSuccessToast,
} from "../../utils/ErrorHandlingUtils";
import { formatCurrency } from "../../utils/OtherUtils";
import { getImage } from "../../utils/ProductUtils";
import "./CartPage.css";
import { PaymentOption } from "./components/PaymentOption";
import { SummaryItem } from "./components/SummaryItem";
import { useCart } from "./hooks/useCart";
import { useNavigate } from "react-router-dom";

export const Checkout: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  useAuthCheck([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const { games, cartItems } = useCart();
  const [{ total, subTotal, afterTaxes }, setTotal] = useState({
    total: 0,
    subTotal: 0,
    afterTaxes: 0,
  });
  const [tax, setTax] = useState(2);
  const [{ discountPercent, discountAmount, usedDiscountCode }, setDiscount] =
    useState({ discountPercent: 0, discountAmount: 0, usedDiscountCode: "" });
  const [discountCode, setDiscountCode] = useState<string>("");
  const navigate = useNavigate();
  const toast = useRef<Toast>(null);

  useEffect(() => {
    getCurrentUser().then((user) => {
      setCurrentUser(user);
      handleAfterPayment();
    });
  }, []);

  useEffect(() => {
    let subTotal = 0;
    cartItems.forEach((item) => {
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
  }, [cartItems, games]);

  const handleAfterPayment = () => {
    let href = window.location.href;
    if (href.includes("/checkout?success")) {
      showSuccessToast(
        toast,
        "Payment successful, redirecting to inventory...",
      );
      localStorage.removeItem("cart");
      setTimeout(() => {
        window.location.href = "/profile";
      }, 2500);
    } else if (href.includes("/checkout?error")) {
      showErrorToast(toast, "Payment failed");
    } else if (href.includes("/checkout?recharge=success")) {
      showSuccessToast(toast, "Recharge successful");
    } else if (href.includes("/checkout?recharge=error")) {
      showErrorToast(toast, "Recharge failed");
    }
  };

  const checkDiscountCode = async () => {
    try {
      const response = await apiClient.post(
        `/api/vouchers/validate/${discountCode}`,
      );
      if (response.data.status === "OK") {
        const voucher = response.data.data;
        const discountPercent = voucher.discountPercent;
        let discountAmount = subTotal * (discountPercent / 100);
        discountAmount =
          discountAmount > voucher.maxDiscount
            ? voucher.maxDiscount
            : discountAmount;
        const newTotal = subTotal - discountAmount;
        const afterTaxes = Math.round(newTotal * (1 + tax / 100));
        setDiscount({
          discountPercent,
          discountAmount,
          usedDiscountCode: discountCode,
        });
        setTotal({ total: newTotal, subTotal, afterTaxes: afterTaxes });
        showSuccessToast(
          toast,
          "Discount code applied - " +
            discountPercent +
            "% off, capped at " +
            formatCurrency(voucher.maxDiscount),
        );
      } else {
        resetVoucher();
        showErrorToast(toast, "Invalid discount code");
      }
    } catch (error) {
      resetVoucher();
      showErrorToast(toast, "Failed to apply discount code");
    }
  };

  const renderCartItems = useMemo(() => {
    if (cartItems.length === 0) {
      return (
        <div className="p-4 text-center text-gray-500">Your cart is empty</div>
      );
    }
    return cartItems.map((item) => {
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
  }, [cartItems, games]);

  const resetVoucher = () => {
    setDiscount({
      discountPercent: 0,
      discountAmount: 0,
      usedDiscountCode: "",
    });
    setTotal({ total: subTotal, subTotal, afterTaxes });
  };

  const handleSelectedOptionChange = (option: string) => {
    if (option === "currentBalance") {
      if ((currentUser?.balance ?? 0) < afterTaxes) {
        // console.log(currentUser?.balance, afterTaxes);
        
        confirmDialog({
          message:
            "Your balance is insufficient. Would you like to recharge to continue?",
          header: "Insufficient Balance",
          icon: "pi pi-exclamation-triangle",
          acceptClassName: "custom-accept-button",
          rejectClassName: "custom-reject-button",
          accept: () => {
            recharge();
          },
          reject: () => {
            setSelectedOption(selectedOption);
          },
        });
      } else {
        setSelectedOption(option);
      }
    } else if (paymentOptions.find((o) => o.value === option)) {
      // if (option !== "creditCard") {
        showInfoToast(toast, "This payment method is coming soon");
      // } else setSelectedOption(option);
    }
  };

  const recharge = async () => {
    let amount = Math.round(afterTaxes - (currentUser?.balance ?? 0));
    // console.log(afterTaxes, currentUser?.balance, amount);

    let payload = {
      amount: amount,
      bankCode: "NCB",
      name: currentUser?.username,
      successUrl: window.location.href + "?recharge=success",
      errorUrl: window.location.href + "?recharge=error",
    };
    // console.log(payload);

    const response = await apiClient.post(`/api/transactions/vn-pay`, payload);
    window.location.href = response.data;
  };

  const handleUserBalancePayment = async () => {
    try {
      const currentISODateTime = new Date().toISOString();
      let payload: Order = {
        orderCode: currentUser?.username + currentISODateTime, // Replace with actual order code
        orderDate: currentISODateTime,
        totalPayment: afterTaxes,
        voucherCode: usedDiscountCode,
        username: currentUser?.username ?? "",
        userId: currentUser?.sysIdUser ?? 0,
        orders: cartItems
      };
      const response = await apiClient.post(`/api/orders/handle-payment`, payload);
      if (response.data.status === "OK") {
        showSuccessToast(toast, "Payment successful, redirecting to inventory...");
        showInfoToast(toast, "Game keys will be sent to your email");
        localStorage.removeItem("cart");
        setTimeout(() => {
          navigate("/profile");
        }, 5000);
      } else {
        showErrorToast(toast, "Payment failed");
      }
    } catch (error) {
      showErrorToast(toast, "Payment failed");
    }
  }
  

  const handleCreditCardPayment = async () => {
    let amount = Math.round(afterTaxes);
    // console.log(afterTaxes, currentUser?.balance, amount);

    let payload = {
      amount: amount,
      bankCode: "NCB",
      name: currentUser?.username,
      successUrl: window.location.href + "?success",
      errorUrl: window.location.href + "?error",
    };
    // console.log(payload);

    const response = await apiClient.post(`/api/transactions/vn-pay`, payload);
    window.location.href = response.data;
  };

  const handlePlaceOrder = () => {
    if (selectedOption === "currentBalance") {
      handleUserBalancePayment();
    } else if (selectedOption === "creditCard") {
      handleCreditCardPayment();
    }
  }

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
                      // value={username}
                      onChange={(e) => setDiscountCode(e.target.value)}
                      // aria-invalid={!!error}
                      // aria-describedby="username-error"
                    />
                    <label>Enter discount code</label>
                  </FloatLabel>
                  <Button
                    label="APPLY"
                    size="small"
                    className="h-10 mt-2 text-xs font-bold bg-mainYellow text-slate-900"
                    disabled={!discountCode}
                    onClick={checkDiscountCode}
                  />
                  <Button
                    label="PLACE ORDER"
                    size="large"
                    className="w-full mt-2 text-xs font-bold h-14 bg-mainYellow text-slate-900"
                    onClick={handlePlaceOrder}
                    disabled={!selectedOption}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ConfirmDialog />
    </>
  );
};
