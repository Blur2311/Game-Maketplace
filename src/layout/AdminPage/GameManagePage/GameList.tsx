import { InputText } from "primereact/inputtext";
import { RightSideButton } from "../../../components/RightSideButton";
import { MdAddBox } from "react-icons/md";
import { GameRow } from "./components/GameRow";
import { Paginator } from "primereact/paginator";
import { useState, useEffect } from "react";
import "./Game.css";
import apiClient from "../../../config/apiClient";
import { MultiSelect } from "primereact/multiselect";
import { Dropdown } from "primereact/dropdown";
import { Game } from "../../../model/GameModel";
import { Category } from "../../../model/CategoryModel";
import { fetchCategories, fetchGames } from "./service/GameListService";

export const GameList = () => {
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [searchTerm, setSearchTerm] = useState(""); // Thêm state để lưu trữ giá trị tìm kiếm
  const [games, setGames] = useState<Game[]>([]);
  const [selectedOption, setSelectedOption] = useState<any | null>("oldest");
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const options: any[] = [
    { label: "Oldest", value: "oldest" },
    { label: "Newest", value: "newest" },
  ];

  const status = [
    { name: "Active", code: "true" },
    { name: "Inactive", code: "false" },
  ];

  const onPageChange = async (event: any) => {
    setFirst(event.first);
    setRows(event.rows);
    const { paginatedGames, totalRecords } = await fetchGames(
      event.first,
      event.rows,
      searchTerm,
      selectedCategories,
      selectedStatus,
      selectedOption,
    );
    setGames(paginatedGames);
    setTotalRecords(totalRecords);
  };

  useEffect(() => {
    const loadCategoriesAndGames = async () => {
      try {
        const categories = await fetchCategories();
        setCategories(categories);
        const { paginatedGames, totalRecords } = await fetchGames(
          first,
          rows,
          searchTerm,
          selectedCategories,
          selectedStatus,
          selectedOption,
        );
        setGames(paginatedGames);
        setTotalRecords(totalRecords);
      } catch (error) {
        console.error("Error loading categories and games:", error);
      }
    };

    loadCategoriesAndGames();
    localStorage.removeItem("selectedGame");
  }, [
    first,
    rows,
    searchTerm,
    selectedCategories,
    selectedStatus,
    selectedOption,
  ]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setFirst(0); // trở lại trang đầu tiên khi tìm kiếm
  };

  const handleCategoryChange = (e: any) => {
    setSelectedCategories(e.value);
    setFirst(0); // trở lại trang đầu tiên khi thay đổi thể loại
  };

  const handleStatusChange = (e: any) => {
    setSelectedStatus(e.value);
    setFirst(0); // trở lại trang đầu tiên khi thay đổi trạng thái
  };

  const handleOptionChange = (e: any) => {
    setSelectedOption(e.value);
    setFirst(0); // trở lại trang đầu tiên khi thay đổi sắp xếp
  };

  return (
    <>
      <div className="">
        <div className="flex items-start justify-between gap-6">
          <h3 className="text-[32px] font-medium">Games</h3>
          <RightSideButton Icon={MdAddBox} link={"/admin/game/create"} />
        </div>
        <div className="mt-8">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12">
              <div className="rounded-[20px] px-6 py-4 shadow-adminBoxshadow">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex-auto">
                    <div className="relative w-full min-w-[211px] rounded-lg border border-gray150 bg-transparent shadow-adminInputShadow hover:border-black">
                      <i className="pi pi-search absolute left-3 top-1/2 -translate-y-1/2 transform text-gray100"></i>
                      <InputText
                        placeholder="Search"
                        className="w-full bg-transparent py-[17px] pl-10 pr-3 text-sm text-black focus:ring-0"
                        value={searchTerm}
                        onChange={handleSearchChange}
                      />
                    </div>
                  </div>
                  <div className="flex-grow">
                    <div className="flex flex-wrap items-center justify-start gap-4">
                      <div className="flex-1">
                        <MultiSelect
                          value={selectedCategories}
                          onChange={handleCategoryChange}
                          options={categories}
                          optionLabel="name"
                          optionValue="code"
                          placeholder="Select Categories"
                          maxSelectedLabels={3}
                          className="w-full rounded-lg border border-gray150 px-4 py-2 font-inter text-sm shadow-adminInputShadow"
                          itemClassName="!font-inter"
                        />
                      </div>
                      <div className="flex-1">
                        <MultiSelect
                          value={selectedStatus}
                          onChange={handleStatusChange}
                          options={status}
                          optionLabel="name"
                          optionValue="code"
                          placeholder="Select Status"
                          maxSelectedLabels={3}
                          className="w-full rounded-lg border border-gray150 px-4 py-2 font-inter text-sm shadow-adminInputShadow"
                          itemClassName="!font-inter"
                        />
                      </div>
                      <div className="flex-1">
                        <Dropdown
                          value={selectedOption}
                          options={options}
                          onChange={handleOptionChange}
                          className="custom-icon-color w-full min-w-36 rounded-lg border border-gray150 px-4 py-2 !font-inter text-sm shadow-adminInputShadow"
                          dropdownIcon="pi pi-chevron-down"
                          panelClassName="custom-dropdown-panel"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-12">
              <div className="mb-5 rounded-[20px] bg-[#F2F2F2] px-5 pb-5 shadow-adminBoxshadow">
                <div className="overflow-x-scroll">
                  <table className="w-full text-nowrap rounded-xl">
                    <thead>
                      <tr className="text-left">
                        <th className="p-5 text-xs font-light">ID</th>
                        <th className="p-5 text-xs font-light">Game Name</th>
                        <th className="p-5 text-xs font-light">Price</th>
                        <th className="p-5 text-xs font-light">Status</th>
                        <th className="p-5 text-xs font-light">Category</th>
                        <th className=""></th>
                      </tr>
                    </thead>
                    <tbody>
                      {games.map((game) => (
                        <GameRow
                          key={game.sysIdGame}
                          sysIdGame={game.sysIdGame}
                          gameName={game.gameName}
                          price={game.price}
                          discountPercent={game.discountPercent}
                          categoryDetails={game.categoryDetails}
                          gameImage={game.gameImage}
                          description={game.description}
                          isActive={game.isActive}
                          quantity={game.quantity}
                          media={game.media}
                          releaseDate={game.releaseDate}
                          slug={game.slug}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-3">
                  <div className="flex items-center justify-end gap-4">
                    <Paginator
                      first={first} // bắt đầu từ đâu
                      rows={rows} // bao nhiêu cột hiển thị
                      totalRecords={totalRecords} // Độ dài dữ liệu
                      template={{
                        layout: "CurrentPageReport PrevPageLink NextPageLink",
                        CurrentPageReport: (options: any) => (
                          <span
                            style={{
                              color: "var(--text-color)",
                              userSelect: "none",
                              width: "120px",
                              textAlign: "center",
                            }}
                          >
                            {options.first} - {options.last} of{" "}
                            {options.totalRecords}
                          </span>
                        ),
                      }}
                      onPageChange={onPageChange}
                      className="custom-pagi-cate bg-transparent text-gray150"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
