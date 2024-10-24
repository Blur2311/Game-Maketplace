import { Button } from "primereact/button";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { FaAsterisk } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";

export const CategoryCU = () => {
  const { id } = useParams<{ id?: string }>(); // Nhận tham số id tùy chọn
  const isUpdateMode = Boolean(id); // Xác định chế độ cập nhật hay tạo mới

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
              Là trường thông tin bắt buộc
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-[35px]">
            <FloatLabel className="flex-1 text-sm">
              <InputText
                className="h-[50px] w-full border border-grayBorder bg-transparent p-5 ps-[10px]"
                // value={username}
                // onChange={(e) => setUsername(e.target.value)}
                // aria-invalid={!!error}
                // aria-describedby="username-error"
              />
              <label>
                Category Name <span className="text-red-500">*</span>
              </label>
            </FloatLabel>
            <FloatLabel className="flex-1 text-sm">
              <InputTextarea
                rows={5}
                className="w-full border border-grayBorder bg-transparent p-5 ps-[10px]"
                // value={username}
                // onChange={(e) => setUsername(e.target.value)}
                // aria-invalid={!!error}
                // aria-describedby="username-error"
              />
              <label>
                Category Describe <span className="text-red-500">*</span>
              </label>
            </FloatLabel>
          </div>
          <div className="mt-6 flex items-center justify-end gap-8 border-t-2 border-[#F2F2F2] pt-3">
            <Link
              to={`/home/role`}
              className="rounded bg-gray250 px-5 py-3 text-xs font-bold uppercase hover:bg-gray350"
            >
              Cancel
            </Link>
            <Button
              // loading={load}
              size="large"
              className="rounded bg-mainYellow px-5 py-3 text-xs font-bold uppercase text-white hover:brightness-110"
            >
              {isUpdateMode ? "Update" : "Add"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
