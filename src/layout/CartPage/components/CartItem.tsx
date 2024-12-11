import { Button } from "primereact/button";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import type { CartItem, GameDTO } from "../../../utils/CartUtils";
import { formatCurrency } from "../../../utils/OtherUtils";
import { getGameURL } from "../../../utils/ProductUtils";

interface CartItemProps {
  item: CartItem;
  game: GameDTO;
  onRemove: (slug: string) => void;
  onQuantityChange: (slug: string, quantityChange: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  game,
  onRemove,
  onQuantityChange,
}) => {
  const discountedPrice = game.price * (1 - (game.discountPercent || 0) / 100);
  const thumbnail = game.media.find((media) => media.mediaName === "thumbnail");
  const mediaUrl = thumbnail ? thumbnail.mediaUrl : game.media[0].mediaUrl;
  const [itemQuantity, setItemQuantity] = useState(item.quantity);
  const handleQuantityChange = (gameSlug: string, quantityChange: number) => {
    setItemQuantity((prevQuantity) => prevQuantity + quantityChange);
    onQuantityChange(gameSlug, quantityChange);
  };

  return (
    <div
      key={game.slug}
      className="mb-4 rounded-xl bg-gray300 p-5 font-inter text-white"
    >
      <div className="flex flex-row items-stretch gap-4">
        <Link to={getGameURL(game.slug)} className="w-16 sm:w-20 lg:w-32">
          <img
            src={mediaUrl}
            alt={game.gameName}
            className="w-full rounded object-cover"
          />
        </Link>
        <div className="w-full flex-1 text-nowrap">
          <div className="flex h-full flex-col justify-between">
            <div className="mt-4 flex flex-col flex-wrap justify-between gap-4 md:flex-row">
              <div>
                {game.features && (
                  <div className="flex gap-2">
                    {game.features.split("\n").map((feature, index) => {
                      return index < 2 ? (
                        <div
                          key={index}
                          className="mb-2 inline-block rounded bg-[#343437] px-2 py-1 text-sm text-white"
                        >
                          {feature}
                        </div>
                      ) : index === 2 ? (
                        <div
                          key={index}
                          className="mb-2 inline-block rounded bg-[#343437] px-2 py-1 text-sm text-white"
                        >
                          ...more
                        </div>
                      ) : null;
                    })}
                  </div>
                )}
                <h3 className="text-xl font-semibold">{game.gameName}</h3>
              </div>
              <div className="flex gap-2">
                {game.discountPercent > 0 && (
                  <>
                    <div className="mb-2 inline-block rounded bg-[#1FBEC6] px-2 py-1 text-sm text-black">
                      -{game.discountPercent}%
                    </div>
                    <p className="text-gray-400 line-through">
                      {formatCurrency(game.price)}
                    </p>
                  </>
                )}
                <p className="font-bold">{formatCurrency(discountedPrice)}</p>
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-y-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <Button
                  icon="pi pi-minus"
                  className="p-button-rounded p-button-text text-sm text-textType hover:text-white"
                  disabled={itemQuantity <= 1}
                  onClick={() => handleQuantityChange(game.slug, -1)}
                />
                <span className="rounded border px-4 py-2">{itemQuantity}</span>
                <Button
                  icon="pi pi-plus"
                  className="p-button-rounded p-button-text text-sm text-textType hover:text-white"
                  disabled={itemQuantity >= game.quantity}
                  onClick={() => handleQuantityChange(game.slug, 1)}
                />
              </div>
              <div className="flex justify-end gap-12">
                <Button
                  label="Remove"
                  className="p-button-danger p-button-text text-sm text-textType hover:text-white"
                  onClick={() => {
                    onRemove(game.slug);
                  }}
                />
                <Button
                  label="Move to wishlist"
                  className="p-button-text text-sm text-textType hover:text-white"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
