import { Dropdown } from "primereact/dropdown";
import React, { useState, useEffect, useCallback } from "react";
import { Item } from "../../components/Item";
import { Paginator } from "primereact/paginator";
import { InputText } from "primereact/inputtext";
import { Accordion, AccordionTab } from "primereact/accordion";
import { CustomCheckbox } from "./components/CheckboxCus";
import { Slider } from "primereact/slider";
import { formatCurrency } from "../../utils/OtherUtils";
import "./Browser.css";
import apiClient from "../../config/apiClient";
import axios from 'axios'; // hoặc import apiClient từ config của bạn
import { RadioButton } from "primereact/radiobutton";

export const BrowserPage = () => {
  const [price, setPrice] = useState<number | [number, number]>([0, 0]);
  const [activeAccorGenre, setActiveAccorGenre] = useState<number | null>(null);
  const [activeAccorType, setActiveAccorType] = useState<number | null>(null);
  const [activeAccorPrice, setActiveAccorPrice] = useState<number | null>(null); // trạng thái cho Accordion Price
  const [selectedItem, setSelectedItem] = useState<string | null>("1");
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
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
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  interface Game {
    sysIdGame: number;
    gameName: string;
    media: {
      mediaUrl: string;
    }[];
    categoryDetails: {
      sysIdCategoryDetail: number;
      category: {
        sysIdCategory: number;
        categoryName: string;
        description: string;
      };
    }[];
    price: number;
    discountPercent: number;
    slug: string;
  }
  const [searchTerm, setSearchTerm] = useState('');


  // Hàm xử lý thay đổi trạng thái của checkbox
  // Hàm xử lý thay đổi trạng thái của checkbox
  const handleCheckboxChange = (selectedLabel: string) => {
    setCheckedItems((prev) => {
      // Tạo bản sao mới với tất cả checkbox đặt về false, ngoại trừ checkbox được chọn
      const updatedCheckedItems = Object.keys(prev).reduce((acc, label) => {
        acc[label] = label === selectedLabel; // Chỉ checkbox được chọn là true
        return acc;
      }, {} as { [key: string]: boolean });

      return updatedCheckedItems;
    });
  };

  const handleCheckboxChangeType = (selectedLabel: string) => {
    setCheckedTypes((prev) => {
      const updatedCheckedTypes = Object.keys(prev).reduce((acc, label) => {
        acc[label] = label === selectedLabel;
        return acc;
      }, {} as { [key: string]: boolean });

      return updatedCheckedTypes;
    });
  };

  const options: any[] = [
    { label: "All", value: "1" },
    { label: "Alphabetical", value: "2" },
    { label: "Price: High to Low", value: "3" },
    { label: "Price: Low to High", value: "4" },
  ];

  const onSliderChange = (e: { value: number | [number, number] }) => {
    setPrice(e.value);
    if (Array.isArray(e.value)) {
      const [minPrice, maxPrice] = e.value;
      debouncedSearch(searchTerm, minPrice, maxPrice);
    }
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

  const onPageChange = (event: any) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  const headerTemplate = (title: string, isActive: boolean) => (
    <div
      className={`tran flex w-full items-center justify-between font-inter text-textType transition duration-300 hover:text-white ${isActive && "text-white"}`}
    >
      <span className="text-sm font-light">{title}</span>
      <i className={`pi ${isActive ? "pi-chevron-up" : "pi-chevron-down"}`} />
    </div>
  );

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get<{ content: Game[] }>('/api/games/browser?page=0&size=12');
        console.log(response.data.content);
        setGames(response.data.content);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  const debounce = (func: Function, delay: number) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return (...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  const searchGames = async (name: string, minPrice?: number, maxPrice?: number, genre?: string) => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: '0',
        size: '12'
      });
  
      if (name) params.append('name', name);
      if (maxPrice !== undefined) params.append('minPrice', maxPrice.toString());
      if (minPrice !== undefined) params.append('maxPrice', minPrice.toString());
      if (genre) params.append('category', genre);
  
      const url = `/api/games/browser?${params.toString()}`;
      const response = await apiClient.get<{ content: Game[] }>(url);
      setGames(response.data.content);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };
  
  const debouncedSearch = useCallback(
    debounce((term: string, minPrice?: number, maxPrice?: number, genre?: string) => 
      searchGames(term, minPrice, maxPrice, genre), 300),
    []
  );
  
  useEffect(() => {
    if (searchTerm || selectedGenre || (Array.isArray(price) && (price[0] !== 0 || price[1] !== 0))) {
      let minPrice, maxPrice;
      if (Array.isArray(price)) { 
        [minPrice, maxPrice] = price;
      }
      debouncedSearch(searchTerm, minPrice, maxPrice, selectedGenre || undefined);
    } else {
      fetchGames();
    }
  }, [searchTerm, price, selectedGenre, debouncedSearch]);

  const fetchGames = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get<{ content: Game[] }>('/api/games/browser?page=0&size=12');
      setGames(response.data.content);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const resetFilters = () => {
    setSearchTerm('');
    setPrice([0, 0]);
    setSelectedGenre(null);
    setActiveAccorGenre(null);
    setActiveAccorPrice(null);
    fetchGames();
  };

  const handleGenreChange = (genre: string) => {
    setSelectedGenre(genre);
  };

  return (
    <>
      <div className="mt-2 flex items-start">
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
          <div className="flex flex-wrap gap-2">
            {games.map((game) => (
              <Item
                key={game.sysIdGame}
                name={game.gameName}
                image={game.media[0]?.mediaUrl}
                type={game.categoryDetails[0]?.category?.categoryName || 'Unknown'}
                price={game.price}
                sale={game.discountPercent}
                wrapper="mb-5"
                url={`/api/games/${game.slug}`}
              />
            ))}
          </div>
          <div className="">
            <Paginator
              first={first} // bắt đầu từ đâu
              rows={rows} // bao nhiêu cột hiển thị
              totalRecords={100} // Độ dài dữ liệu
              template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
              onPageChange={onPageChange}
              className="custom-pagi-browser bg-bgMainColor"
            />
          </div>
        </div>
        <div className="w-1/4 py-3">
          <div className="px-3">
            <div className="flex items-center justify-between">
              <h5 className="text-base font-bold text-white">Filters</h5>
              <button className="text-xs text-mainCyan" onClick={resetFilters}>Reset</button>
            </div>
            <div className="relative mt-3 rounded-[4px] bg-gray300">
              <i className="pi pi-search absolute left-3 top-1/2 -translate-y-1/2 transform text-gray100"></i>
              <InputText
                placeholder="Keywords"
                className="w-full bg-transparent p-3 pl-10 text-xs text-white focus:ring-0"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="px-3">
            <div className="my-4 h-[1px] w-full bg-bgCheckBox" />
          </div>
          <Accordion activeIndex={activeAccorGenre} onTabChange={handleTabChangeGenre}>
            <AccordionTab
              headerTemplate={() => headerTemplate("Genre", activeAccorGenre === 0)}
            >
              {Object.keys(checkedItems).map((label) => (
                <div key={label} className="mb-2 flex items-center">
                  <RadioButton
                    inputId={label}
                    name="genre"
                    value={label}
                    onChange={() => handleGenreChange(label)}
                    checked={selectedGenre === label}
                  />
                  <label htmlFor={label} className="ml-2 cursor-pointer text-sm text-white">
                    {label}
                  </label>
                </div>
              ))}
            </AccordionTab>
          </Accordion>
          {/* <div className="px-3">
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
          </Accordion> */}

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
