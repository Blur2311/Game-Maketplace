import React from "react";
import { Link } from "react-router-dom";
import { GameDTO } from "../../../utils/CartUtils";
import { formatCurrency } from "../../../utils/OtherUtils";
import { getGameURL, getImage } from "../../../utils/ProductUtils";
import { useCart } from "../../CartPage/hooks/useCart";

const ProductCard: React.FC<GameDTO> = (game) => {
  const { addGameToCart } = useCart();
  return (
    <div className="flex-1 overflow-hidden rounded-lg bg-gray-800">
      <div className="flex h-full flex-col text-white">
        <Link to={getGameURL(game.slug)}>
          <img
            className="w-full object-cover transition duration-300 hover:brightness-105"
            src={getImage(game, "thumbnail")}
            alt={game.gameName}
          />
        </Link>
        <div className="flex flex-1 flex-col justify-between p-5">
          <div className="">
            <h3 className="truncate text-lg font-semibold">{game.gameName}</h3>
            <hr className="my-3 bg-bgCheckBox opacity-25" />
            <div className="mb-4 flex flex-col gap-2">
              {game.discountPercent ? (
                <>
                  <span className="text-sm text-gray-400 line-through">
                    {formatCurrency(game.price)}
                  </span>
                  <span className="flex items-center justify-between">
                    <span className="font-bold">
                      {formatCurrency(
                        game.discountPercent
                          ? game.price -
                              (game.price * game.discountPercent) / 100
                          : game.price,
                      )}
                    </span>
                    <span className="max-block-fit rounded-full bg-mainCyan px-2 py-[2px] text-xs text-black">
                      -{game.discountPercent}%
                    </span>
                  </span>
                </>
              ) : (
                <span className="flex items-center justify-between">
                  <span className="font-bold">
                    {formatCurrency(game.price)}
                  </span>
                </span>
              )}
            </div>
          </div>
          <div className="">
            <button
              onClick={() => addGameToCart(game, 1)}
              className="mb-2 w-full rounded-md bg-mainYellow py-2 text-sm font-normal text-gray-800 transition-colors hover:brightness-110"
            >
              Add To Cart
            </button>
            <button className="w-full rounded-md border border-white py-2 text-sm font-normal text-white transition-colors hover:bg-white hover:bg-opacity-15">
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
