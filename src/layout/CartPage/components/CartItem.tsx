import React, { useState } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { formatCurrency } from "../../../utils/OtherUtils";
import type { CartItem, GameDTO } from "../../../utils/CartUtils";
import { useCart } from "../hooks/useCart";

interface CartItemProps {
  item: CartItem;
  game: GameDTO;
  onRemove: (slug: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, game, onRemove }) => {
  const discountedPrice = game.price * (1 - (game.discountPercent || 0) / 100);
  const thumbnail = game.media.find((media) => media.mediaName === "thumbnail");
  const mediaUrl = thumbnail ? thumbnail.mediaUrl : game.media[0].mediaUrl;
  const { updateQuantity } = useCart();
  const [itemQuantity, setItemQuantity] = useState(item.quantity);
  const handleQuantityChange = (gameSlug: string, quantityChange: number) => {
    setItemQuantity((prevQuantity) => prevQuantity + quantityChange);
    updateQuantity(gameSlug, quantityChange);
  }

  return (
    <Card key={game.slug} className="mb-4">
      <div className="flex flex-col items-center gap-4 md:flex-row">
        <img
          src={mediaUrl}
          alt={game.gameName}
          className="object-cover h-48 rounded w-36"
        />
        <div className="flex-grow">
          <div className="flex flex-col justify-between md:flex-row">
            <div>
              {game.features && (
                <div className="flex gap-2">
                  {game.features.split("\n").map((feature, index) => {
                    return (index < 2) ? (
                      <div className="inline-block px-2 py-1 mb-2 text-sm bg-[#343437] text-white rounded">
                        {feature}
                      </div>
                    ) : (index === 2) ? (
                      <div className="inline-block px-2 py-1 mb-2 text-sm bg-[#343437] text-white rounded">
                        ...more
                      </div>
                    ) : null;
                  })}
                </div>
              )}
              <h3 className="text-xl font-semibold">{game.gameName}</h3>
            </div>
            <div className="text-right">
              {game.discountPercent > 0 && (
                <div className="inline-block px-2 py-1 mb-2 text-sm bg-[#1FBEC6] text-black rounded">
                  -{game.discountPercent}%
                </div>
              )}
              <div className="flex flex-col">
                {game.discountPercent > 0 && (
                  <span className="text-gray-400 line-through">
                    {formatCurrency(game.price)}
                  </span>
                )}
                <span className="text-xl font-bold">
                  {formatCurrency(discountedPrice)}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2">
              <Button
                icon="pi pi-minus"
                className="p-button-rounded p-button-text"
                disabled={itemQuantity <= 1}
                onClick={() => handleQuantityChange(game.slug, -1)}
              />
              <span className="px-4 py-2 border rounded">{itemQuantity}</span>
              <Button
                icon="pi pi-plus"
                className="p-button-rounded p-button-text"
                disabled={itemQuantity >= game.quantityCount}
                onClick={() => handleQuantityChange(game.slug, 1)}
              />
            </div>
            <div className="flex gap-12">
              <Button
                label="Remove"
                className="p-button-danger p-button-text"
                onClick={() => {
                  onRemove(game.slug);
                }}
              />
              <Button label="Move to wishlist" className="p-button-text" />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CartItem;