import { Button } from "primereact/button";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { useState } from "react";
import { FiCamera } from "react-icons/fi";
import { TiArrowLeft } from "react-icons/ti";
import { useParams, NavLink, Link } from "react-router-dom";

export const CustomerCU = () => {
  const { id } = useParams<{ id?: string }>(); // Nhận tham số id tùy chọn
  const isUpdateMode = Boolean(id); // Xác định chế độ cập nhật hay tạo mới

  const [avatar, setAvatar] = useState<string | null>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <div className="">
        <div className="mb-8 flex flex-col gap-6">
          <NavLink
            to={"/admin/customer/list"}
            className="flex items-center gap-2 text-sm hover:underline"
          >
            <TiArrowLeft className="text-xl" />
            Customers
          </NavLink>
          <h3 className="text-[32px] font-medium">
            {isUpdateMode ? "Detail" : "Create"} customer
          </h3>
        </div>

        <div className="rounded-[20px] shadow-adminBoxshadow">
          <div className="px-6 pt-4">
            <h6 className="mb-6 text-lg font-medium">Basic information</h6>

            <div className="grid grid-cols-12 gap-x-6 gap-y-8 pb-8">
              <div className="col-span-12 flex items-center gap-6">
                {/* Avatar Preview Circle */}
                <div className="h-[100px] w-[100px] rounded-full border border-dashed border-gray-300 p-1">
                  <div className="flex h-full items-center justify-center rounded-full bg-[#f9fafb]">
                    {avatar ? (
                      <img
                        src={avatar}
                        alt="Avatar Preview"
                        className="h-full w-full rounded-full object-cover"
                      />
                    ) : (
                      <FiCamera size={24} />
                    )}
                  </div>
                </div>

                {/* Upload Information and Select Button */}
                <div className="flex flex-col gap-2">
                  <p className="font-medium">Avatar</p>
                  <p className="text-xs text-textSecond">
                    Min 400×400px, PNG or JPEG
                  </p>
                  <label className="mt-2 inline-block">
                    <input
                      type="file"
                      accept="image/png, image/jpeg"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <span className="adminInputShadow cursor-pointer rounded-lg border px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-100">
                      Select
                    </span>
                  </label>
                </div>
              </div>

              <FloatLabel className="col-span-12 text-sm md:col-span-6">
                <InputText
                  className="shadow-adminInputShadow w-full rounded-lg border bg-transparent p-4 ps-[10px] hover:border-black"
                  // value={gameName || ""}
                  // onChange={(e) => {
                  //   setGameName(e.target.value);
                  //   setError("");
                  // }}
                />
                <label>
                  Username <span className="text-red-500">*</span>
                </label>
                {/* {error && <p className="mt-1 text-xs text-red-500">{error}</p>} */}
              </FloatLabel>

              <FloatLabel className="col-span-12 text-sm md:col-span-6">
                <InputText
                  className="shadow-adminInputShadow w-full rounded-lg border bg-transparent p-4 ps-[10px] hover:border-black"
                  // value={gameName || ""}
                  // onChange={(e) => {
                  //   setGameName(e.target.value);
                  //   setError("");
                  // }}
                />
                <label>
                  Email address <span className="text-red-500">*</span>
                </label>
                {/* {error && <p className="mt-1 text-xs text-red-500">{error}</p>} */}
              </FloatLabel>

              <FloatLabel className="col-span-12 text-sm md:col-span-6">
                <InputText
                  className="shadow-adminInputShadow w-full rounded-lg border bg-transparent p-4 ps-[10px] hover:border-black"
                  // value={gameName || ""}
                  // onChange={(e) => {
                  //   setGameName(e.target.value);
                  //   setError("");
                  // }}
                />
                <label>
                  Full name <span className="text-red-500">*</span>
                </label>
                {/* {error && <p className="mt-1 text-xs text-red-500">{error}</p>} */}
              </FloatLabel>

              <FloatLabel className="col-span-12 text-sm md:col-span-6">
                <InputText
                  className="shadow-adminInputShadow w-full rounded-lg border bg-transparent p-4 ps-[10px] hover:border-black"
                  // value={gameName || ""}
                  // onChange={(e) => {
                  //   setGameName(e.target.value);
                  //   setError("");
                  // }}
                />
                <label>
                  Address <span className="text-red-500">*</span>
                </label>
                {/* {error && <p className="mt-1 text-xs text-red-500">{error}</p>} */}
              </FloatLabel>

              <div className="col-span-12 text-sm md:col-span-6">
                <FloatLabel className="!w-full">
                  <Password
                    // value={newPW}
                    // onChange={(e) => setNewPW(e.target.value)}
                    feedback={false}
                    tabIndex={1}
                    className="w-full"
                    inputClassName="shadow-adminInputShadow w-full rounded-lg border bg-transparent p-4 ps-[10px] hover:border-black focus:border-black"
                  />
                  <label>
                    Password <span className="text-red-500">*</span>
                  </label>
                </FloatLabel>
              </div>
              <div className="col-span-12 text-sm md:col-span-6">
                <FloatLabel className="!w-full">
                  <Password
                    // value={reNewPW}
                    // onChange={(e) => setReNewPW(e.target.value)}
                    feedback={false}
                    tabIndex={1}
                    className="w-full"
                    inputClassName="shadow-adminInputShadow w-full rounded-lg border bg-transparent p-4 ps-[10px] hover:border-black focus:border-black"
                  />
                  <label>
                    Re-type new password <span className="text-red-500">*</span>
                  </label>
                </FloatLabel>
              </div>
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
              // loading={loading}
              label={isUpdateMode ? "Update" : "Create"}
              // onClick={handleSave}
              className="rounded-lg bg-mainYellow px-4 py-[10px] text-sm font-medium text-white hover:brightness-105"
            />
          </div>
        </div>
      </div>
    </>
  );
};
