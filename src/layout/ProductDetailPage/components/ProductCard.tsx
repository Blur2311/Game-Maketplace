import React from "react";
import { Link } from "react-router-dom";
import { GameDTO } from "../../../utils/CartUtils";
import { formatCurrency } from "../../../utils/OtherUtils";
import { getGameURL, getImage } from "../../../utils/ProductUtils";
import { useCart } from "../../CartPage/hooks/useCart";

const ProductCard: React.FC<GameDTO> = (game) => {
  const { addGameToCart } = useCart();
  return (
    <div className="max-w-[230px] rounded-lg bg-gray-800 text-white">
      <Link to={getGameURL(game.slug)}>
        <img
          className="w-full game-thumbnail-img"
          src={getImage(game, "thumbnail")}
          alt={game.gameName}
        />
      </Link>
      <div className="flex flex-col justify-between p-5">
        <div className="">
          <h3 className="text-lg font-semibold truncate">{game.gameName}</h3>
          <hr className="my-3 opacity-25 bg-bgCheckBox" />
          <div className="flex flex-col gap-2 mb-4">
            {game.discountPercent ? (
              <>
                <span className="text-sm text-gray-400 line-through">
                  {formatCurrency(game.price)}
                </span>
                <span className="flex items-center justify-between">
                  <span className="font-bold">
                    {formatCurrency(
                      game.discountPercent
                        ? game.price - (game.price * game.discountPercent) / 100
                        : game.price,
                    )}
                  </span>
                  <span className="rounded-full bg-mainCyan max-block-fit px-2 py-[2px] text-xs text-black">
                    -{game.discountPercent}%
                  </span>
                </span>
              </>
            ) : (
              <span className="flex items-center justify-between">
                <span className="font-bold">{formatCurrency(game.price)}</span>
              </span>
            )}
          </div>
        </div>
        <div className="">
          <button
            onClick={() => addGameToCart(game, 1)}
            className="w-full py-2 mb-2 text-sm font-normal text-gray-800 transition-colors rounded-md bg-mainYellow hover:brightness-110"
          >
            Add To Cart
          </button>
          <button className="w-full py-2 text-sm font-normal text-white transition-colors border border-white rounded-md hover:bg-white hover:bg-opacity-15">
            Add to Wishlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
