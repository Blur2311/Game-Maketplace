import { Dropdown } from "primereact/dropdown";
import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Accordion, AccordionTab } from "primereact/accordion";
import { Slider } from "primereact/slider";
import { formatCurrency } from "../../utils/OtherUtils";
import { CustomCheckbox } from "../BrowserPage/components/CheckboxCus";
import { LuMail } from "react-icons/lu";
import { InputSwitch } from "primereact/inputswitch";
import "./Wishlist.css";
import { WishlistItem } from "./components/WishlistItem";

export const Wishlist = () => {
  const [price, setPrice] = useState<number | [number, number]>([0, 0]);
  const [activeAccorGenre, setActiveAccorGenre] = useState<number | null>(null);
  const [activeAccorType, setActiveAccorType] = useState<number | null>(null);
  const [activeAccorPrice, setActiveAccorPrice] = useState<number | null>(null); // trạng thái cho Accordion Price
  const [selectedItem, setSelectedItem] = useState<string | null>("1");
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    Action: false,
    Adventure: false,
    RPG: false,
    Simulation: false,
    Strategy: false,
    Sports: false,
    Racing: false,
    Sandbox: false,
    Survival: false,
    Horror: false,
  });
  const [checkedTypes, setCheckedTypes] = useState<Record<string, boolean>>({
    Entertainment: false,
    Work: false,
    Study: false,
    "Steam Games": false,
    "Photo - Video Editing": false,
    "Windows, Office": false,
    "Google Drive": false,
    "Steam Wallet": false,
    Antivirus: false,
    "Xbox, iTunes Gift Card": false,
  });
  const [checked, setChecked] = useState(false);

  const onToggleChange = (e: { value: boolean }) => {
    setChecked(e.value);
  };

  // Hàm xử lý thay đổi trạng thái của checkbox
  const handleCheckboxChange = (label: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [label]: !prev[label], // Đảo ngược trạng thái của checkbox theo label
    }));
  };
  const handleCheckboxChangeType = (label: string) => {
    setCheckedTypes((prev) => ({
      ...prev,
      [label]: !prev[label], // Đảo ngược trạng thái của checkbox theo label
    }));
  };

  const options: any[] = [
    { label: "All", value: "1" },
    { label: "Alphabetical", value: "2" },
    { label: "Price: High to Low", value: "3" },
    { label: "Price: Low to High", value: "4" },
  ];

  const onSliderChange = (e: { value: number | [number, number] }) => {
    setPrice(e.value);
  };

  // Hàm này quản lý trạng thái cho Accordion Genre
  const handleTabChangeGenre = (e: { index: number | number[] }) => {
    if (Array.isArray(e.index)) {
      setActiveAccorGenre(e.index.length > 0 ? e.index[0] : null);
    } else {
      setActiveAccorGenre(e.index);
    }
  };

  // Hàm này quản lý trạng thái cho Accordion Types
  const handleTabChangeType = (e: { index: number | number[] }) => {
    if (Array.isArray(e.index)) {
      setActiveAccorType(e.index.length > 0 ? e.index[0] : null);
    } else {
      setActiveAccorType(e.index);
    }
  };

  // Hàm này quản lý trạng thái cho Accordion Price
  const handleTabChangePrice = (e: { index: number | number[] }) => {
    if (Array.isArray(e.index)) {
      setActiveAccorPrice(e.index.length > 0 ? e.index[0] : null);
    } else {
      setActiveAccorPrice(e.index);
    }
  };

  const onOptionChange = (e: any) => {
    setSelectedItem(e.value);
  };

  const headerTemplate = (title: string, isActive: boolean) => (
    <div
      className={`tran flex w-full items-center justify-between font-inter text-textType transition duration-300 hover:text-white ${isActive && "text-white"}`}
    >
      <span className="text-sm font-light">{title}</span>
      <i className={`pi ${isActive ? "pi-chevron-up" : "pi-chevron-down"}`} />
    </div>
  );

  return (
    <>
      <div className="mt-2">
        <h1 className="mb-[30px] text-4xl font-black text-white">
          My Wishlist
        </h1>
        <div className="mb-8 flex items-center justify-between rounded-md border-l-[6px] border-mainCyan bg-gray300 bg-opacity-90 p-4">
          <div className="flex items-center gap-2">
            <LuMail className="text-2xl text-mainCyan" />
            <p className="text-sm text-white">
              Get notified when your wishlisted games go on sale, or are
              available for purchase or pre-purchase.
            </p>
          </div>
          <InputSwitch
            checked={checked}
            onChange={onToggleChange}
            className=""
          />
        </div>
      </div>
      <div className="mb-5 mt-2 flex items-start">
        <div className="w-3/4 pr-4">
          <div className="mb-4 flex items-center gap-2">
            <h6 className="text-sm font-normal text-gray150">Show:</h6>
            <Dropdown
              value={selectedItem}
              options={options}
              defaultValue={"1"}
              onChange={onOptionChange}
              className="custom-dropdown bg-transparent !font-inter focus:outline-none focus:ring-0"
            />
          </div>
          <div className="flex flex-wrap gap-4">
            <WishlistItem
              img={"/darksoul.jpg"}
              name={"Dark Soul Remastered TM"}
              type={[
                { text: "Steam Game", url: "" },
                { text: "RPG", url: "" },
              ]}
              price={190000}
              quantity={1}
              sale={80}
            />
            <WishlistItem
              img={"/assasin.webp"}
              name={"Assassin Creed"}
              type={[
                { text: "Steam Game", url: "" },
                { text: "RPG", url: "" },
              ]}
              price={190000}
              quantity={1}
            />
          </div>
        </div>
        <div className="w-1/4 py-3">
          <div className="px-3">
            <div className="flex items-center justify-between">
              <h5 className="text-base font-bold text-white">Filters</h5>
              <button className="text-xs text-mainCyan">Reset</button>
            </div>
            <div className="relative mt-3 rounded-[4px] bg-gray300">
              <i className="pi pi-search absolute left-3 top-1/2 -translate-y-1/2 transform text-gray100"></i>
              <InputText
                placeholder="Keywords"
                className="w-full bg-transparent p-3 pl-10 text-xs text-white focus:ring-0"
              />
            </div>
          </div>
          <div className="px-3">
            <div className="my-4 h-[1px] w-full bg-bgCheckBox" />
          </div>
          <Accordion
            activeIndex={activeAccorGenre}
            onTabChange={handleTabChangeGenre}
          >
            <AccordionTab
              headerTemplate={() =>
                headerTemplate("Genre", activeAccorGenre === 0)
              }
            >
              {Object.keys(checkedItems).map((label) => (
                <CustomCheckbox
                  key={label}
                  label={label}
                  checked={checkedItems[label]}
                  onChange={() => handleCheckboxChange(label)}
                />
              ))}
            </AccordionTab>
          </Accordion>
          <div className="px-3">
            <div className="my-4 h-[1px] w-full bg-bgCheckBox" />
          </div>
          <Accordion
            activeIndex={activeAccorType}
            onTabChange={handleTabChangeType}
          >
            <AccordionTab
              headerTemplate={() =>
                headerTemplate("Types", activeAccorType === 0)
              }
            >
              {Object.keys(checkedTypes).map((label) => (
                <CustomCheckbox
                  key={label}
                  label={label}
                  checked={checkedTypes[label]}
                  onChange={() => handleCheckboxChangeType(label)}
                />
              ))}
            </AccordionTab>
          </Accordion>

          <div className="px-3">
            <div className="my-4 h-[1px] w-full bg-bgCheckBox" />
          </div>
          <Accordion
            activeIndex={activeAccorPrice}
            onTabChange={handleTabChangePrice}
          >
            <AccordionTab
              headerTemplate={() =>
                headerTemplate("Price", activeAccorPrice === 0)
              }
            >
              <div className="px-4 py-3">
                <Slider
                  value={price}
                  onChange={onSliderChange}
                  range
                  min={0}
                  max={10000000}
                  step={50000}
                  className="mb-4"
                />
                <span className="text-sm text-white">Price:</span>
                <span className="float-end text-sm text-white">
                  {Array.isArray(price)
                    ? `${formatCurrency(price[1])} - ${formatCurrency(price[0])}`
                    : price}
                </span>
              </div>
            </AccordionTab>
          </Accordion>
          <div className="px-3">
            <div className="my-4 h-[1px] w-full bg-bgCheckBox" />
          </div>
        </div>
      </div>
    </>
  );
};
