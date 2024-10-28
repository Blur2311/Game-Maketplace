import { InputText } from "primereact/inputtext";
import { RightSideButton } from "../../../components/RightSideButton";
import { MdAddBox } from "react-icons/md";
import { GameRow } from "./components/GameRow";
import { Paginator } from "primereact/paginator";
import { useState, useEffect } from "react";
import "./Game.css";
import apiClient from "../../../config/apiClient";

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
        <h3 className="text-[32px] font-semibold">Game List</h3>
        <div className="mt-2 flex gap-9">
          <div className="flex-1">
            <div className="flex rounded-md border border-black p-5">
              <div className="relative rounded-md border border-gray150 bg-transparent">
                <i className="pi pi-search absolute left-3 top-1/2 -translate-y-1/2 transform text-gray100"></i>
                <InputText
                  placeholder="Search"
                  className="w-[230px] bg-transparent p-3 pl-10 text-xs text-black focus:ring-0"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
          </div>
          <div className="w-20"></div>
        </div>
        <div className="mt-5 flex items-start gap-9">
          <div className="flex-1">
            <div className="mb-5 rounded bg-[#F2F2F2] px-5 pb-5">
              <table className="w-full rounded-xl shadow-sm">
                <thead>
                  <tr className="text-left">
                    <th className="p-5 text-xs font-light">Id</th>
                    <th className="p-5 text-xs font-light">Game Name</th>
                    <th className="p-5 text-xs font-light">Price</th>
                    <th className="p-5 text-xs font-light">Discount Percent</th>
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
                </tbody>
              </table>
              <div className="mt-3">
                <Paginator
                  first={first} // bắt đầu từ đâu
                  rows={rows} // bao nhiêu cột hiển thị
                  totalRecords={totalRecords} // Độ dài dữ liệu
                  template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
                  onPageChange={onPageChange}
                  className="bg-transparent text-gray150"
                />
              </div>
            </div>
          </div>
          <RightSideButton
            text={"Add Game"}
            Icon={MdAddBox}
            link={"/admin/game-list/create"}
          />
        </div>
      </div>
    </>
  );
};
