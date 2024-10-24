import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { formatCurrency, formatDate } from "../../utils/OtherUtils";
import { Button } from "primereact/button";
import { MdOutlineCameraAlt } from "react-icons/md";
import { ProgressSpinner } from "primereact/progressspinner";
import { useState } from "react";

export const UserProfile = () => {
  const [uploading, setUploading] = useState(false);

  return (
    <>
      <div className="pl-5">
        <div className="rounded bg-white p-10">
          <h1 className="text-3xl">Account Settings</h1>
          <h6 className="mt-[15px] text-sm font-light">
            Manage your account's details.
          </h6>
          <h5 className="mt-[30px] text-lg font-bold">Account Information</h5>
          <div className="mt-5 flex items-start">
            <div className="flex flex-1 flex-col gap-5">
              <div className="flex items-center">
                <p className="min-w-[150px] text-sm font-semibold">Username:</p>
                <p className="text-sm font-light">hieuchi1999</p>
              </div>
              <div className="flex items-center">
                <p className="min-w-[150px] text-sm font-semibold">
                  Full Name:
                </p>
                <p className="text-sm font-light">Huy Phạm</p>
              </div>
              <div className="flex items-center">
                <p className="min-w-[150px] text-sm font-semibold">Balance:</p>
                <p className="text-sm font-light">{formatCurrency(44910)}</p>
              </div>
              <div className="flex items-center">
                <p className="min-w-[150px] text-sm font-semibold">
                  Join Date:
                </p>
                <p className="text-sm font-light">
                  {formatDate("2017-07-22T17:46:37")}
                </p>
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-5">
              <div className="flex items-center">
                <p className="min-w-[150px] text-sm font-semibold">Email:</p>
                <p className="text-sm font-light underline">
                  ph7569626@gmail.com
                </p>
              </div>
              <div className="flex items-center">
                <p className="min-w-[150px] text-sm font-semibold">
                  Customer Group:
                </p>
                <p className="text-sm font-light">Silver VIP</p>
              </div>
              <div className="flex items-center">
                <p className="min-w-[150px] text-sm font-semibold">
                  Accumulated:
                </p>
                <p className="text-sm font-light">{formatCurrency(4499910)}</p>
              </div>
            </div>
          </div>
          <div className="mt-10">
            <div className="flex items-center gap-5">
              <div className="flex flex-1 items-center gap-2">
                <FloatLabel className="flex-1 text-sm">
                  <InputText
                    id="Username"
                    className="h-[50px] w-full border border-grayBorder bg-transparent p-5 ps-[10px]"
                    // value={username}
                    // onChange={(e) => setUsername(e.target.value)}
                    // aria-invalid={!!error}
                    // aria-describedby="username-error"
                  />
                  <label htmlFor="Username">Username</label>
                </FloatLabel>
                <Button
                  icon="pi pi-pen-to-square"
                  size="large"
                  className="h-[50px] w-[50px] bg-mainYellow text-base font-bold text-slate-900"
                  // onClick={handleLogin}
                  // disabled={isLockedOut}
                />
              </div>
              <div className="flex flex-1 items-center gap-2">
                <FloatLabel className="flex-1 text-sm">
                  <InputText
                    id="Email"
                    className="h-[50px] w-full border border-grayBorder bg-transparent p-5 ps-[10px]"
                    // value={username}
                    // onChange={(e) => setUsername(e.target.value)}
                    // aria-invalid={!!error}
                    // aria-describedby="username-error"
                  />
                  <label htmlFor="Email">Email</label>
                </FloatLabel>
                <Button
                  icon="pi pi-pen-to-square"
                  size="large"
                  className="h-[50px] w-[50px] bg-mainYellow text-base font-bold text-slate-900"
                  // onClick={handleLogin}
                  // disabled={isLockedOut}
                />
              </div>
            </div>
          </div>
          <div className="mt-[50px]">
            <h5 className="text-lg font-bold">Personal Details</h5>
            <div className="flex items-center">
              <div className="mt-[25px] flex flex-1 flex-col gap-[25px]">
                <FloatLabel className="flex-1 text-sm">
                  <InputText
                    id="Username"
                    className="h-[50px] w-full border border-grayBorder bg-transparent p-5 ps-[10px]"
                    // value={username}
                    // onChange={(e) => setUsername(e.target.value)}
                    // aria-invalid={!!error}
                    // aria-describedby="username-error"
                  />
                  <label htmlFor="Username">Username</label>
                </FloatLabel>
                <FloatLabel className="flex-1 text-sm">
                  <InputText
                    id="Fullname"
                    className="h-[50px] w-full border border-grayBorder bg-transparent p-5 ps-[10px]"
                    // value={username}
                    // onChange={(e) => setUsername(e.target.value)}
                    // aria-invalid={!!error}
                    // aria-describedby="username-error"
                  />
                  <label htmlFor="Fullname">Full Name</label>
                </FloatLabel>
                <FloatLabel className="flex-1 text-sm">
                  <InputText
                    id="Gender"
                    className="h-[50px] w-full border border-grayBorder bg-transparent p-5 ps-[10px]"
                    // value={username}
                    // onChange={(e) => setUsername(e.target.value)}
                    // aria-invalid={!!error}
                    // aria-describedby="username-error"
                  />
                  <label htmlFor="Gender">Gender</label>
                </FloatLabel>
                <FloatLabel className="flex-1 text-sm">
                  <InputText
                    id="Address"
                    className="h-[50px] w-full border border-grayBorder bg-transparent p-5 ps-[10px]"
                    // value={username}
                    // onChange={(e) => setUsername(e.target.value)}
                    // aria-invalid={!!error}
                    // aria-describedby="username-error"
                  />
                  <label htmlFor="Address">Address</label>
                </FloatLabel>
                <Button
                  label="SAVE CHANGES"
                  size="large"
                  className="mt-5 h-[50px] w-[150px] bg-mainYellow text-xs font-bold text-slate-900"
                  // onClick={handleLogin}
                  // disabled={isLockedOut}
                />
              </div>
              <div className="flex flex-1 items-center justify-center">
                <div className="relative">
                  {/* Cái này có sẵn ấn vào hình mở input xog ấn nút để submit
                   xog cho nó loading nhìn cho giống real */}
                  <div className="relative flex h-[248px] w-[248px] cursor-pointer items-center justify-center overflow-hidden">
                    <input
                      type="file"
                      // onChange={handleChangeFile}
                      className="absolute inset-0 cursor-pointer opacity-0"
                    />

                    {/* trong thời gian đợi nó submit thì cập nhật trạg thái true cho nó load nhìn cho đẹp */}
                    {uploading ? (
                      <ProgressSpinner />
                    ) : (
                      <img
                        // src={photoURL || "/girl.png"}  Thay thế bằng URL ảnh placeholder nếu cần
                        src="/cat.jpeg" // nhớ xoá dòng này
                        alt="Uploaded"
                        className="h-full w-full rounded-full border-4 border-slate-900 object-cover"
                      />
                    )}
                  </div>

                  {/* Nút này để submit file lên nè */}
                  <div className="absolute bottom-0 right-8">
                    <button
                      // onClick={handleUpload}
                      className="shadow-whiteInShadow flex items-center justify-center rounded-full bg-mainYellow pb-[7px] pe-[7px] ps-2 pt-2"
                    >
                      <MdOutlineCameraAlt className="text-[30px] text-slate-900" />
                    </button>
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
