import { formatCurrency } from "../../../utils/OtherUtils";

const ProductCard = () => {
  return (
    <div className="max-w-[230px] rounded-lg bg-gray-800 text-white">
      <img className="w-full" src="/image1.png" alt="Black Myth: Wukong" />
      <div className="p-5">
        <h3 className="text-lg font-semibold">Black Myth: Wukong</h3>
        <hr className="my-3 bg-bgCheckBox opacity-25" />
        <div className="mb-4 flex flex-col gap-2">
          <span className="text-sm text-gray-400 line-through">
            {formatCurrency(199000)}
          </span>
          <span className="flex items-center justify-between">
            <span className="font-bold">{formatCurrency(299000)}</span>
            <span className="rounded-full bg-mainCyan px-2 py-[2px] text-xs text-black">
              -80%
            </span>
          </span>
        </div>
        <button className="mb-2 w-full rounded-md bg-mainYellow py-2 text-sm font-normal text-gray-800 transition-colors hover:brightness-110">
          Add To Cart
        </button>
        <button className="w-full rounded-md border border-white py-2 text-sm font-normal text-white transition-colors hover:bg-white hover:bg-opacity-15">
          Add to Wishlist
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
