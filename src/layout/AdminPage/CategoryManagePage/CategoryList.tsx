import { InputText } from "primereact/inputtext";
import { RightSideButton } from "../../../components/RightSideButton";
import { MdAddBox } from "react-icons/md";
import { CategoryRow } from "./components/CategoryRow";
import { Paginator } from "primereact/paginator";
import { useState, useEffect } from "react";
import "./Category.css";
import apiClient from "../../../config/apiClient";
import { Category } from "../../../model/CategoryModel";
import { useAuthCheck } from "../../../utils/AuthUtils";

export const CategoryList = () => {
  useAuthCheck(['ADMIN']);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [searchTerm, setSearchTerm] = useState(""); // Thêm state để lưu trữ giá trị tìm kiếm

  const [categories, setCategories] = useState<Category[]>([]);

  const onPageChange = (event: any) => {
    setFirst(event.first);
    setRows(event.rows);
    fetchCategories(event.first, event.rows, searchTerm);
  };

  const fetchCategories = (first: number, rows: number, searchTerm: string) => {
    apiClient
      .get("/api/categories")
      .then((response) => {
        const allCategories = response.data.data;
        if (Array.isArray(allCategories)) {
          const filteredCategories = allCategories.filter(
            (category: Category) =>
              category.categoryName
                .toLowerCase()
                .includes(searchTerm.toLowerCase()),
          );
          setTotalRecords(filteredCategories.length);
          const paginatedCategories = filteredCategories.slice(
            first,
            first + rows,
          );
          setCategories(paginatedCategories);
        } else {
          console.error("API response is not an array:", allCategories);
        }
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };

  useEffect(() => {
    fetchCategories(first, rows, searchTerm);
    localStorage.removeItem("selectedCategory");
  }, [first, rows, searchTerm]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setFirst(0); // trở lại trang đầu tiên khi tìm kiếm
  };

  return (
    <>
      <div className="px-6 py-16">
        <div className="flex items-start justify-between gap-6">
          <h3 className="text-[32px] font-medium">Categories</h3>
          <RightSideButton Icon={MdAddBox} link={"/admin/category/create"} />
        </div>
        <div className="mt-8">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-4">
              <div className="rounded-[20px] px-6 py-4 shadow-adminBoxshadow">
                <div className="flex">
                  <div className="relative w-full bg-transparent border rounded-lg border-gray150 hover:border-black">
                    <i className="absolute transform -translate-y-1/2 pi pi-search left-3 top-1/2 text-gray100"></i>
                    <InputText
                      placeholder="Search"
                      className="w-full bg-transparent py-[17px] pl-10 pr-3 text-sm text-black focus:ring-0"
                      value={searchTerm}
                      onChange={handleSearchChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-8">
              <div className="mb-5 rounded-[20px] bg-[#F2F2F2] px-5 pb-5 shadow-adminBoxshadow">
                <div className="overflow-x-scroll">
                  <table className="w-full rounded-xl">
                    <thead>
                      <tr className="text-left">
                        <th className="p-5 text-xs font-light">ID</th>
                        <th className="p-5 text-xs font-light">
                          Category Name
                        </th>
                        <th className="p-5 text-xs font-light">Describe</th>
                        <th className=""></th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories.map((category) => (
                        <CategoryRow
                          key={category.sysIdCategory}
                          sysIdCategory={category.sysIdCategory}
                          categoryName={category.categoryName}
                          description={category.description}
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
                      className="bg-transparent custom-pagi-cate text-gray150"
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
