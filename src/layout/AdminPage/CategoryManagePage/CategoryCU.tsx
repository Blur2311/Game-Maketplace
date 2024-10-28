import { Button } from "primereact/button";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { FaAsterisk } from "react-icons/fa";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import apiClient from "../../../config/apiClient";

export const CategoryCU = () => {
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
    }
  }, [id, isUpdateMode]);

  const handleSave = async () => {
    if (!categoryName) {
      setError("Category Name is required");
      return;
    }

    setLoading(true);
    const categoryDTO = {
      sysIdCategory: isUpdateMode ? id : null,
      categoryName,
      description,
    };

    try {
      const response = await apiClient.post("/api/categories", categoryDTO);
      // console.log("Category saved:", response.data);
      // điều hướng về trang danh sách sau khi lưu thành công
      navigate("/admin/category-list");
    } catch (error) {
      console.error("Error saving category:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mr-6">
        {/* Cập nhật hay thêm mới, hay xem chi tiết nhớ sửa lại cái tên  */}
        <h3 className="text-[32px] font-semibold">Category Detail</h3>
        <div className="my-5 rounded-md border-2 border-[#F2F2F2] p-5 pt-7">
          {/* Cập nhật hay thêm mới, hay xem chi tiết nhớ sửa lại cái tên  */}
          <div className="border-b-2 border-[#F2F2F2] pb-3">
            <h6 className="text-lg text-gray100">
              The information can be edited
            </h6>
            <p className="text-textGray300 mt-3 flex items-center gap-1 text-sm">
              <FaAsterisk className="text-[6px] text-red-500" />
              Is a mandatory information field
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-[35px]">
            <FloatLabel className="flex-1 text-sm">
              <InputText
                className="h-[50px] w-full border border-grayBorder bg-transparent p-5 ps-[10px]"
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
            <FloatLabel className="flex-1 text-sm">
              <InputTextarea
                rows={5}
                className="w-full border border-grayBorder bg-transparent p-5 ps-[10px]"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <label>
                Category Describe <span className="text-red-500">*</span>
              </label>
            </FloatLabel>
          </div>
          <div className="mt-6 flex items-center justify-end gap-8 border-t-2 border-[#F2F2F2] pt-3">
            <Link
              to={`/admin/category-list`}
              className="rounded bg-gray250 px-5 py-3 text-xs font-bold uppercase hover:bg-gray350"
            >
              Cancel
            </Link>
            <Button
              loading={loading}
              size="large"
              className="rounded bg-mainYellow px-5 py-3 text-xs font-bold uppercase text-white hover:brightness-110"
              onClick={handleSave}
            >
              {isUpdateMode ? "Update" : "Add"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
