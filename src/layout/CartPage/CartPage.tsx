import { confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import React from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../config/apiClient";
import { isTokenValid } from "../../utils/AuthUtils";
import { showErrorToast } from "../../utils/ErrorHandlingUtils";
import "./CartPage.css";
import CartItem from "./components/CartItem";
import CartSummary from "./components/CartSummary";
import LoadingSpinner from "./components/LoadingSpinner";
import { useCart } from "./hooks/useCart";
import { FaFaceSadTear } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

export const CartPage: React.FC = () => {
  const {
    cartItems,
    games,
    loading,
    error,
    removeItem,
    updateQuantity,
    fetchGameDetails,
  } = useCart();
  const navigate = useNavigate();
  const toast = React.useRef<Toast>(null);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">{error}</div>;
  }

  const calc = (): { total: number; discount: number } => {
    return cartItems.reduce(
      (result, item) => {
        const game = games.get(item.slug);
        if (game) {
          const { price, discountPercent = 0 } = game;
          const { quantity } = item;
          const discount = price * (discountPercent / 100);

          result.total += price * quantity;
          result.discount += discount * quantity;
        }
        return result;
      },
      { total: 0, discount: 0 },
    );
  };

  const handleRemoveItem = (slug: string) => {
    confirmDialog({
      message: "Are you sure you want to remove this item from your cart?",
      header: "Confirm Removal",
      icon: "pi pi-exclamation-triangle",
      acceptClassName: "custom-accept-button",
      rejectClassName: "custom-reject-button",
      accept: () => {
        removeItem(slug);
      },
    });
  };

  const renderCartItems = () => {
    if (cartItems.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center text-white">
          <FaFaceSadTear size={60} className="mb-10" />
          <p className="text-center text-5xl font-bold">Your cart is empty.</p>
          <NavLink
            to={"/home"}
            className={
              "mt-3 rounded-md bg-mainCyan px-3 py-1 text-sm font-medium text-black hover:text-white hover:brightness-110"
            }
          >
            Back to Home
          </NavLink>
        </div>
      );
    }

    return cartItems.map((item) => {
      const game = games.get(item.slug);
      if (!game) return null;
      return (
        <CartItem
          key={item.slug}
          item={item}
          game={game}
          onRemove={handleRemoveItem}
          onQuantityChange={updateQuantity}
        />
      );
    });
  };

  const handleCheckOut = async () => {
    if (!isTokenValid()) {
      showErrorToast(toast, "Please login to proceed to checkout");
      return;
    }
    await apiClient
      .post(`/api/games/valid-cart-items`, cartItems)
      .then((response) => {
        let res = response.data;
        if (!res || res.data.length === 0) {
          fetchGameDetails(cartItems);
          navigate("/checkout");
        } else {
          showErrorToast(
            toast,
            res.message
              ? res.message
              : "Some of the items in your cart are no longer available. Please remove them before proceeding to checkout.",
          );
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <Toast ref={toast} />
      <div className="pb-[90px]">
        <h1 className="mb-[50px] text-[40px] font-black text-white">My Cart</h1>
        <div className="grid grid-cols-12">
          <div
            className={`col-span-12 mb-8 ${renderCartItems() == null && "lg:col-span-8 lg:mb-0"}`}
          >
            {renderCartItems()}
          </div>

          {renderCartItems() == null && (
            <div className="col-span-12 lg:col-span-4 lg:ml-9">
              <CartSummary
                cal={calc()}
                cartItemsCount={cartItems.length}
                onCheckOut={handleCheckOut}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
