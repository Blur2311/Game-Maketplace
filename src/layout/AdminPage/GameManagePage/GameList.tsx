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

interface CategoryDetail {
  sysIdCategoryDetail: number;
  sysIdGame: number;
  sysIdCategory: number;
  categoryName: string;
}

interface Media {
  sysIdMedia: number;
  mediaName: string;
  mediaUrl: string;
  sysIdGame: number;
}

interface Game {
  sysIdGame: number;
  gameName: string;
  price: number;
  discountPercent: number | null;
  categoryDetails: CategoryDetail[];
  gameImage: string;
  description: string;
  isActive: boolean;
  quantity: number;
  media: Media[];
}

export const GameList = () => {
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [searchTerm, setSearchTerm] = useState(""); // Thêm state để lưu trữ giá trị tìm kiếm
  const [games, setGames] = useState<Game[]>([]);
  const [selectedOption, setSelectedOption] = useState<any | null>("oldest");
  const [selectedCities, setSelectedCities] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);

  const options: any[] = [
    { label: "Oldest", value: "oldest" },
    { label: "Newest", value: "newest" },
  ];
  const categories = [
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ];

  const status = [
    { name: "Published", code: "true" },
    { name: "Draft", code: "false" },
  ];

  const onPageChange = (event: any) => {
    setFirst(event.first);
    setRows(event.rows);
    fetchGames(event.first, event.rows, searchTerm);
  };

  const fetchGames = (first: number, rows: number, searchTerm: string) => {
    apiClient
      .get("/api/games")
      .then((response) => {
        const allGames = response.data.data;
        // console.log("All games:", allGames);
        if (Array.isArray(allGames)) {
          const filteredGames = allGames.filter((game: Game) =>
            game.gameName.toLowerCase().includes(searchTerm.toLowerCase()),
          );
          setTotalRecords(filteredGames.length);
          const paginatedGames = filteredGames.slice(first, first + rows);
          setGames(paginatedGames);
        } else {
          console.error("API response is not an array:", allGames);
        }
      })
      .catch((error) => {
        console.error("Error fetching games:", error);
      });
  };

  useEffect(() => {
    fetchGames(first, rows, searchTerm);
  }, [first, rows, searchTerm]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setFirst(0); // trở lại trang đầu tiên khi tìm kiếm
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
                    <div className="shadow-adminInputShadow relative w-full min-w-[211px] rounded-lg border border-gray150 bg-transparent hover:border-black">
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
                          value={selectedCities}
                          onChange={(e) => setSelectedCities(e.value)}
                          options={categories}
                          optionLabel="name"
                          placeholder="Select Categories"
                          maxSelectedLabels={3}
                          className="shadow-adminInputShadow w-full rounded-lg border border-gray150 px-4 py-2 font-inter text-sm"
                          itemClassName="!font-inter"
                        />
                      </div>
                      <div className="flex-1">
                        <MultiSelect
                          value={selectedStatus}
                          onChange={(e) => setSelectedStatus(e.value)}
                          options={status}
                          optionLabel="name"
                          placeholder="Select Status"
                          maxSelectedLabels={3}
                          className="shadow-adminInputShadow w-full rounded-lg border border-gray150 px-4 py-2 font-inter text-sm"
                          itemClassName="!font-inter"
                        />
                      </div>
                      <div className="flex-1">
                        <Dropdown
                          value={selectedOption}
                          options={options}
                          onChange={(e) => setSelectedOption(e.value)}
                          className="custom-icon-color shadow-adminInputShadow w-full min-w-36 rounded-lg border border-gray150 px-4 py-2 !font-inter text-sm"
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
                  <table className="w-full rounded-xl">
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
                        />
                      ))}
                      <GameRow
                        sysIdGame={0}
                        gameName={"ASSASIN CREED"}
                        price={19000000}
                        discountPercent={10}
                        categoryDetails={[]}
                        gameImage={""}
                        description={"HAHAHHA"}
                        isActive={false}
                        quantity={0}
                        media={[]}
                      />
                      <GameRow
                        sysIdGame={0}
                        gameName={"ASSASIN CREED"}
                        price={19000000}
                        discountPercent={10}
                        categoryDetails={[]}
                        gameImage={""}
                        description={"HAHAHHA"}
                        isActive={true}
                        quantity={0}
                        media={[]}
                      />
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
