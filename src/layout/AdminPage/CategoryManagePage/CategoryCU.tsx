import { Button } from "primereact/button";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { FaAsterisk } from "react-icons/fa";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import apiClient from "../../../config/apiClient";
import { NavLink } from "react-router-dom";
import { TiArrowLeft } from "react-icons/ti";
import {
  fetchCategoryById,
  saveCategory,
  CategoryDTO,
} from "./service/CategoryService"; // Import các hàm từ categoryService
import { useAuthCheck } from "../../../utils/AuthUtils";

export const CategoryCU = () => {
  useAuthCheck(['ADMIN']);
  const { id } = useParams<{ id?: string }>(); // Nhận tham số id tùy chọn
  const isUpdateMode = Boolean(id); // Xác định chế độ cập nhật hay tạo mới
  const navigate = useNavigate();

  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isUpdateMode && id) {
      const storedCategory = localStorage.getItem("selectedCategory");
      if (storedCategory) {
        const category = JSON.parse(storedCategory);
        setCategoryName(category.categoryName);
        setDescription(category.description);
      }
      else {
        navigate("/admin/category/list");
      }
    }
  }, [id, isUpdateMode]);

  const handleSave = async () => {
    if (!categoryName) {
      setError("Category Name is required");
      return;
    }

    setLoading(true);
    const categoryDTO: CategoryDTO = {
      sysIdCategory: isUpdateMode ? id : null,
      categoryName,
      description,
    };

    try {
      await saveCategory(categoryDTO);
      navigate("/admin/category/list");
    } catch (error) {
      console.error("Error saving category:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="px-6 py-16">
        <div className="flex flex-col gap-6 mb-8">
          <NavLink
            to={"/admin/category/list"}
            className="flex items-center gap-2 text-sm hover:underline"
          >
            <TiArrowLeft className="text-xl" />
            Categories
          </NavLink>
          <h3 className="text-[32px] font-medium">
            {isUpdateMode ? "Detail" : "Create"} category
          </h3>
        </div>

        <div className="rounded-[20px] shadow-adminBoxshadow">
          <div className="px-6 pt-4">
            <h6 className="mb-6 text-lg font-medium">Basic information</h6>

            <div className="grid grid-cols-12 pb-8 gap-x-6 gap-y-8">
              <FloatLabel className="col-span-12 text-sm">
                <InputText
                  className="w-full rounded-lg border bg-transparent p-4 ps-[10px] shadow-adminInputShadow hover:border-black"
                  value={categoryName}
                  onChange={(e) => {
                    setCategoryName(e.target.value);
                    setError("");
                  }}
                />
                <label>
                  Category Name <span className="text-red-500">*</span>
                </label>
                {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
              </FloatLabel>

              <FloatLabel className="col-span-12 text-sm">
                <InputTextarea
                  rows={5}
                  className="w-full rounded-lg border bg-transparent p-4 ps-[10px] shadow-adminInputShadow hover:border-black"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <label>
                  Category Describe <span className="text-red-500">*</span>
                </label>
              </FloatLabel>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 p-4 pt-2">
            <Link
              to={`/admin/category/list`}
              className="rounded-lg px-2 py-[10px] text-sm font-medium hover:bg-black hover:bg-opacity-5"
            >
              Cancel
            </Link>
            <Button
              loading={loading}
              label={isUpdateMode ? "Update" : "Create"}
              onClick={handleSave}
              className="rounded-lg bg-mainYellow px-4 py-[10px] text-sm font-medium text-white hover:brightness-105"
            />
          </div>
        </div>
      </div>
    </>
  );
};
