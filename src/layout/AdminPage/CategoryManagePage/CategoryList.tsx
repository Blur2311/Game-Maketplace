import { InputText } from "primereact/inputtext";
import { RightSideButton } from "../../../components/RightSideButton";
import { MdAddBox } from "react-icons/md";
import { CategoryRow } from "./components/CategoryRow";
import { Paginator } from "primereact/paginator";
import { useState } from "react";
import "./Category.css";
import apiClient from "../../../config/apiClient";
import { useEffect } from "react";

export const CategoryList = () => {
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  interface Category {
    sysIdCategory: number;
    categoryName: string;
    description: string;
  }
  const [categories, setCategories] = useState<Category[]>([]);

  const onPageChange = (event: any) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  useEffect(() => {
    apiClient
      .get("/api/categories")
      .then((response) => {
        setCategories(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  return (
    <>
      <div className="">
        <h3 className="text-[32px] font-semibold">Category List</h3>
        <div className="mt-2 flex gap-9">
          <div className="flex-1">
            <div className="flex rounded-md border border-black p-5">
              <div className="relative rounded-md border border-gray150 bg-transparent">
                <i className="pi pi-search absolute left-3 top-1/2 -translate-y-1/2 transform text-gray100"></i>
                <InputText
                  placeholder="Search"
                  className="w-[230px] bg-transparent p-3 pl-10 text-xs text-black focus:ring-0"
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
                    <th className="p-5 text-xs font-light">Category Name</th>
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
              <div className="mt-3">
                <Paginator
                  first={first} // bắt đầu từ đâu
                  rows={rows} // bao nhiêu cột hiển thị
                  totalRecords={100} // Độ dài dữ liệu
                  template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
                  onPageChange={onPageChange}
                  className="bg-transparent text-gray150"
                />
              </div>
            </div>
          </div>
          <RightSideButton
            text={"Add Category"}
            Icon={MdAddBox}
            link={"/admin/category-list/create"}
          />
        </div>
      </div>
    </>
  );
};
