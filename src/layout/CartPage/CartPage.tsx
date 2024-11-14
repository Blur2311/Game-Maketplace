import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import React from "react";
import apiClient from "../../config/apiClient";
import "./CartPage.css";
import CartItem from "./components/CartItem";
import CartSummary from "./components/CartSummary";
import LoadingSpinner from "./components/LoadingSpinner";
import { useCart } from "./hooks/useCart";
import { useNavigate } from "react-router-dom";
import { showErrorToast } from "../../utils/ErrorHandlingUtils";
import { Toast } from "primereact/toast";

export const CartPage: React.FC = () => {
  const { cartItems, games, loading, error, removeItem, updateQuantity, fetchGameDetails } = useCart();
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
      { total: 0, discount: 0 }
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
        <div className="p-4 text-center text-gray-500">
          Your cart is empty
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
    await apiClient.post(`/api/games/valid-cart-items`, cartItems)
    .then((response) => {
      let res = response.data;
      if (!res || res.data.length === 0) {
        fetchGameDetails(cartItems);
        navigate("/checkout");
      } else {
        showErrorToast(toast, res.message
          ? res.message
          : "Some of the items in your cart are no longer available. Please remove them before proceeding to checkout.");
      }
    }).catch((error) => {
      console.error(error);
    });
  };

  return (
    <>
    <Toast ref={toast} />
    <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-8 text-3xl font-bold text-white">My Cart</h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {renderCartItems()}
        </div>

        <div className="lg:col-span-1">
          <CartSummary cal={calc()} cartItemsCount={cartItems.length} onCheckOut={handleCheckOut} />
        </div>
      </div>
      <ConfirmDialog />
    </div>
    </>
  );
};
