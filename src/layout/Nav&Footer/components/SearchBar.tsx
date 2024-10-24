import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { Link } from "react-router-dom";
import { CartItem } from "../../../utils/cartUtils";
import { Button } from "primereact/button";
import { addToCart } from "../../../utils/cartUtils";

export const SearchBar = () => {
  const [selectedItem, setSelectedItem] = useState<string | null>();
  const onOptionChange = (e: any) => {
    setSelectedItem(e.value);
  };
  const handleAddToCart = () => {
    const item: CartItem = { slug: 'dying-light-2-stay-human', quantity: 3 };
    addToCart(item);
  };
  const options: any[] = [
    { label: "Discover", value: "1" },
    { label: "Browse", value: "2" },
    { label: "News", value: "3" },
  ];
  return (
    <>
      <div className="sticky top-0 z-50 mx-auto h-[100px] w-11/12 bg-bgMainColor md:w-3/4">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center">
            <div className="relative rounded-full bg-gray300">
              <i className="absolute transform -translate-y-1/2 pi pi-search left-3 top-1/2 text-gray100"></i>
              <InputText
                placeholder="Search store"
                className="w-[230px] bg-transparent p-3 pl-10 text-xs text-white focus:ring-0"
              />
            </div>
            <div className="hidden ml-5 lg:block">
              <ul className="flex items-center gap-8 text-sm font-normal text-gray150">
                <li className="text-white">Discover</li>
                <li className="hover:text-white">Browse</li>
                <li className="hover:text-white">News</li>
              </ul>
            </div>
          </div>
          <div className="hidden lg:block">
            <ul className="flex items-center gap-8 text-sm font-normal text-gray150">
              <li>
                <Button
                  label="Add to Cart"
                  icon="pi pi-shopping-cart"
                  className="p-button-success"
                  onClick={handleAddToCart}
                />
              </li>
            </ul>
          </div>
          {/* Cái này cũg thế kô rõ thì lên trên epic game xem */}
          <div className="hidden lg:block">
            <ul className="flex items-center gap-8 text-sm font-normal text-gray150">
              <li className="text-white">Wishlist</li>
              <li className="hover:text-white">
                <Link to="/cart">Cart</Link>
              </li>
            </ul>
          </div>
          <div className="block lg:hidden">
            <Dropdown
              value={selectedItem}
              options={options}
              defaultValue={"1"}
              onChange={onOptionChange}
              className="custom-dropdown bg-transparent !font-inter focus:outline-none focus:ring-0"
            />
          </div>
        </div>
      </div>
    </>
  );
};
