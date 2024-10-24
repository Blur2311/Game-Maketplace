import React from "react";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import { useCart } from "./hooks/useCart";
import CartItem from "./components/CartItem";
import CartSummary from "./components/CartSummary";
import LoadingSpinner from "./components/LoadingSpinner";
import "./CartPage.css";

const CartPage: React.FC = () => {
  const { cartItems, games, loading, error, removeItem } = useCart();

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const game = games.get(item.slug);
      if (game) {
        const discountedPrice = game.price * (1 - (game.discountPercent || 0) / 100);
        return total + discountedPrice * item.quantity;
      }
      return total;
    }, 0);
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

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">{error}</div>;
  }

  const subtotal = calculateSubtotal();

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-8 text-3xl font-bold text-white">My Cart</h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {cartItems.map((item) => {
            const game = games.get(item.slug);
            if (!game) return null;
            return (
              <CartItem
                key={item.slug}
                item={item}
                game={game}
                onRemove={handleRemoveItem}
              />
            );
          })}
        </div>

        <div className="lg:col-span-1">
          <CartSummary subtotal={subtotal} cartItemsCount={cartItems.length} />
        </div>
      </div>
      <ConfirmDialog />
    </div>
  );
};

export default CartPage;