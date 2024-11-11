import { Accordion, AccordionTab } from "primereact/accordion";
import { InputText } from "primereact/inputtext";
import { Paginator } from "primereact/paginator";
import { Slider } from "primereact/slider";
import React, { useCallback, useEffect, useState } from "react";
import { Item } from "../../components/Item";
import apiClient from "../../config/apiClient";
import type { Filters, Game } from "../../utils/BrowserUtils";
import { formatCurrency } from "../../utils/OtherUtils";
import "./Browser.css";
import { CustomCheckbox } from "./components/CheckboxCus";


export const BrowserPage = () => {
  const [price, setPrice] = useState<number | [number, number]>([9999999, 0]);
  const [activeAccorGenre, setActiveAccorGenre] = useState<number | null>(null);
  const [activeAccorType, setActiveAccorType] = useState<number | null>(null);
  const [activeAccorPrice, setActiveAccorPrice] = useState<number | null>(null); // trạng thái cho Accordion Price
  const [selectedItem, setSelectedItem] = useState<string | null>("1");
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(12);
  const [totalRecords, setTotalRecords] = useState(0);
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
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [currentFilters, setCurrentFilters] = useState<Filters>({
    name: '',
    minPrice: undefined,
    maxPrice: undefined,
    genre: undefined
  });
  const [searchTerm, setSearchTerm] = useState('');

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

  const onPageChange = async (event: any) => {
    setFirst(event.first);
    setRows(event.rows);
  
    const newPage = event.first / event.rows;
  
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: newPage.toString(),
        size: rows.toString(), // Dùng số hàng đã được đặt
      });
  
      // Thêm các bộ lọc từ `currentFilters` vào URL nếu có giá trị
      if (currentFilters.name) params.append('name', currentFilters.name);
      if (currentFilters.minPrice !== undefined) params.append('maxPrice', currentFilters.minPrice.toString());
      if (currentFilters.maxPrice !== undefined) params.append('minPrice', currentFilters.maxPrice.toString());
      if (currentFilters.genre) params.append('category', currentFilters.genre);

      const url = `/api/games/browser?${params.toString()}`;
      const response = await apiClient.get<{ content: Game[], totalPages: number, totalElements: number, number: number }>(url);
      setGames(response.data.content);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
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
        const response = await apiClient.get<{ content: Game[], totalElements: number, totalPages: number, size: number }>('/api/games/browser?page=0&size=12');
        setGames(response.data.content);
        setLoading(false);
        setTotalRecords(response.data.totalElements);
      } catch (err) {
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

      setCurrentFilters((prevFilters) => ({
        ...prevFilters,
        name,
        minPrice,
        maxPrice,
        genre,
      }));

      if (name) params.append('name', name);
      if (maxPrice !== undefined) params.append('minPrice', maxPrice.toString());
      if (minPrice !== undefined) params.append('maxPrice', minPrice.toString());
      if (genre) params.append('category', genre);

      const url = `/api/games/browser?${params.toString()}`;
      const response = await apiClient.get<{ content: Game[], totalElements: number, totalPages: number, size: number }>(url);
      setGames(response.data.content);
      setTotalRecords(response.data.totalElements);
      setLoading(false);
    } catch (err) {
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
      const response = await apiClient.get<{ content: Game[], totalElements: number, totalPages: number, size: number }>('/api/games/browser?page=0&size=12');
      setGames(response.data.content);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  const resetFilters = () => {
    setSearchTerm('');
    setPrice([9999999, 0]);
    setSelectedGenre(null);
    setActiveAccorGenre(null);
    setActiveAccorPrice(null);
    setCurrentFilters({
      name: '',
      minPrice: undefined,
      maxPrice: undefined,
      genre: undefined,
    });
    fetchGames();
  };

  const handleGenreChange = (genre: string) => {
    setSelectedGenre(genre);
    setCurrentFilters((prev) => ({ ...prev, genre })); 
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    setCurrentFilters((prev) => ({ ...prev, searchTerm: term })); 
  };

  const onSliderChange = (e: { value: number | [number, number] }) => {
    setPrice(e.value);
    if (Array.isArray(e.value)) {
      const [minPrice, maxPrice] = e.value;
      debouncedSearch(searchTerm, minPrice, maxPrice);
    }
  };

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
  
      const params = new URLSearchParams({
        page: (first / rows).toString(),
        size: rows.toString(),
      });
  
      if (currentFilters.name) params.append('name', currentFilters.name);
      if (currentFilters.minPrice !== undefined) params.append('minPrice', currentFilters.minPrice.toString());
      if (currentFilters.maxPrice !== undefined) params.append('maxPrice', currentFilters.maxPrice.toString());
      if (currentFilters.genre) params.append('category', currentFilters.genre);
  
      const url = `/api/games/browser?${params.toString()}`;
      const response = await apiClient.get<{ content: Game[], totalPages: number, totalElements: number, number: number }>(url);
      setGames(response.data.content);
      setLoading(false);
    };
  
    fetchGames();
  }, [currentFilters, first, rows]);  


  return (
    <>
      <div className="flex items-start mt-2">
        <div className="w-3/4 pr-4">
          <div className="flex items-center gap-2 mb-4">
            <h6 className="text-sm font-normal text-gray150">Show:</h6>
            <div className="custom-dropdown bg-transparent !font-inter focus:outline-none focus:ring-0 text-white">All</div>
            {/* <Dropdown
              value={selectedItem}
              options={options}
              defaultValue={"1"}
              onChange={onOptionChange}
              className="custom-dropdown bg-transparent !font-inter focus:outline-none focus:ring-0"
            /> */}
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
                url={`/product?game=${game.slug}`}
              />
            ))}
          </div>
          <div className="">
            <Paginator
              first={first} // bắt đầu từ đâu
              rows={12} // bao nhiêu cột hiển thị
              totalRecords={totalRecords} // Độ dài dữ liệu
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
              <i className="absolute transform -translate-y-1/2 pi pi-search left-3 top-1/2 text-gray100"></i>
              <InputText
                placeholder="Keywords"
                className="w-full p-3 pl-10 text-xs text-white bg-transparent focus:ring-0"
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
                <CustomCheckbox
                  key={label}
                  label={label}
                  checked={selectedGenre === label}
                  onChange={() => handleGenreChange(label)}
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
                <span className="text-sm text-white float-end">
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
