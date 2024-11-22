import { Button } from "primereact/button";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { ProgressSpinner } from "primereact/progressspinner";
import { useState } from "react";
import { FiUser } from "react-icons/fi";
import { MdOutlineCameraAlt } from "react-icons/md";

export const AdminAccInfo = () => {
  const [uploading, setUploading] = useState(false);

  return (
    <>
      <div className="px-6 py-16">
        <h1 className="text-[32px] font-medium">Account</h1>
        <div className="mt-6 grid grid-cols-12 gap-x-4 gap-y-8">
          <div className="col-span-12 md:col-span-4">
            <div className="rounded-[20px] shadow-adminBoxshadow">
              <div className="">
                <div className="flex flex-col items-center justify-center gap-4 px-6 py-8">
                  {/* Cái này có sẵn ấn vào hình mở input xog ấn nút để submit
                   xog cho nó loading nhìn cho giống real */}
                  <div className="group relative flex h-[100px] w-[100px] cursor-pointer items-center justify-center overflow-hidden">
                    <input
                      type="file"
                      // onChange={handleChangeFile}
                      className="absolute inset-0 cursor-pointer opacity-0"
                    />

                    {/* trong thời gian đợi nó submit thì cập nhật trạg thái true cho nó load nhìn cho đẹp */}
                    {uploading ? (
                      <ProgressSpinner />
                    ) : (
                      <>
                        <img
                          // src={photoURL || "/girl.png"}  Thay thế bằng URL ảnh placeholder nếu cần
                          src="/cat.jpeg" // nhớ xoá dòng này
                          alt="Uploaded"
                          className="h-full w-full rounded-full border border-dashed border-[#dcdfe4] object-cover p-1"
                        />
                        <div className="absolute left-1/2 top-1/2 flex h-[90%] w-[90%] -translate-x-1/2 -translate-y-1/2 transform items-center justify-center gap-2 rounded-full bg-black bg-opacity-40 text-sm text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          <MdOutlineCameraAlt />
                          <p className="">Select</p>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="space-y-2 text-center">
                    <h6 className="text-2xl font-medium">Huy Dz</h6>
                    <p className="text-sm text-textSecond">
                      huydz102@gmail.com
                    </p>
                  </div>
                </div>
                {/* Nút này để submit file lên nè */}
                <div className="p-2">
                  <Button
                    label="Upload picture"
                    // loading={true}
                    // onClick={handleUpload}
                    className="flex w-full items-center justify-center rounded-lg bg-transparent pb-[7px] pe-[7px] ps-2 pt-2 text-sm text-mainYellow transition duration-300 ease-in-out hover:bg-mainYellow hover:bg-opacity-10"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-12 md:col-span-8">
            <div className="rounded-[20px] shadow-adminBoxshadow">
              <div className="px-6 py-8">
                <div className="mb-8 flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full shadow-adminIconshadow">
                    <FiUser className="text-2xl" />
                  </div>
                  <p className="text-lg font-medium">Basic details</p>
                </div>
                <div className="grid grid-cols-12 gap-x-6 gap-y-8 pb-8">
                  <FloatLabel className="col-span-12 text-sm sm:col-span-6">
                    <InputText
                      className="w-full rounded-lg border bg-transparent p-4 ps-[10px] shadow-adminInputShadow hover:border-black focus:border-black"
                      // value={description}
                      // onChange={(e) => setDescription(e.target.value)}
                    />
                    <label>
                      Full name <span className="text-red-500">*</span>
                    </label>
                  </FloatLabel>
                  <FloatLabel className="col-span-12 text-sm sm:col-span-6">
                    <InputText
                      className="w-full rounded-lg border bg-transparent p-4 ps-[10px] shadow-adminInputShadow hover:border-black focus:border-black"
                      // value={description}
                      // onChange={(e) => setDescription(e.target.value)}
                    />
                    <label>
                      Username <span className="text-red-500">*</span>
                    </label>
                  </FloatLabel>
                  <FloatLabel className="col-span-12 text-sm sm:col-span-6">
                    <InputText
                      className="w-full rounded-lg border bg-transparent p-4 ps-[10px] shadow-adminInputShadow hover:border-black focus:border-black"
                      // value={description}
                      // onChange={(e) => setDescription(e.target.value)}
                    />
                    <label>
                      Email address <span className="text-red-500">*</span>
                    </label>
                  </FloatLabel>
                  <FloatLabel className="col-span-12 text-sm sm:col-span-6">
                    <InputText
                      className="w-full rounded-lg border bg-transparent p-4 ps-[10px] shadow-adminInputShadow hover:border-black focus:border-black"
                      // value={description}
                      // onChange={(e) => setDescription(e.target.value)}
                    />
                    <label>Phone number </label>
                  </FloatLabel>
                  <FloatLabel className="col-span-12 text-sm sm:col-span-6">
                    <InputText
                      className="w-full rounded-lg border bg-transparent p-4 ps-[10px] shadow-adminInputShadow hover:border-black focus:border-black"
                      // value={description}
                      // onChange={(e) => setDescription(e.target.value)}
                    />
                    <label>State</label>
                  </FloatLabel>
                  <FloatLabel className="col-span-12 text-sm sm:col-span-6">
                    <InputText
                      className="w-full rounded-lg border bg-transparent p-4 ps-[10px] shadow-adminInputShadow hover:border-black focus:border-black"
                      // value={description}
                      // onChange={(e) => setDescription(e.target.value)}
                    />
                    <label>City </label>
                  </FloatLabel>
                </div>
              </div>
              <div className="flex items-center justify-end gap-2 p-4 pt-2">
                <Button
                  label="Cancel"
                  className="rounded-lg px-2 py-[10px] text-sm font-medium hover:bg-black hover:bg-opacity-5"
                />
                <Button
                  label="Save changes"
                  className="rounded-lg bg-mainYellow px-4 py-[10px] text-sm font-medium text-white hover:brightness-105"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
