import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { formatCurrency, formatDate } from "../../utils/OtherUtils";
import { Button } from "primereact/button";
import { MdOutlineCameraAlt } from "react-icons/md";
import { ProgressSpinner } from "primereact/progressspinner";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import apiClient from "../../config/apiClient";

export const UserProfile = () => {
  const [uploading, setUploading] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [userData, setUserData] = useState<any | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        const fetchedUsername = decoded.sub;

        setUsername(fetchedUsername);
        fetchUserProfile(fetchedUsername).then((data) => {
          if (data) {
            console.log("Dữ liệu người dùng:", data);
            setUserData(data); // Cập nhật userData nếu có dữ liệu
          }
        });
      } catch (error) {
        console.error("Token không hợp lệ", error);
      }
    }
  }, []);

  const fetchUserProfile = async (username: string): Promise<any | null> => {
    try {
      const response = await apiClient.get(
        `/api/users/account-profile?username=${username}`,
      );
      return response.data.data; // Trả về dữ liệu để xử lý tiếp
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
      return null; // Trả về null nếu có lỗi
    }
  };

  useEffect(() => {
    if (userData) {
      console.log("UserData đã cập nhật:", userData.username);
    }
  }, [userData]);

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
                <p className="text-sm font-light">
                  {" "}
                  {userData?.username || "N/A"}
                </p>
              </div>
              <div className="flex items-center">
                <p className="min-w-[150px] text-sm font-semibold">
                  Full Name:
                </p>
                <p className="text-sm font-light">
                  {userData?.hoVaTen || "N/A"}
                </p>
              </div>
              <div className="flex items-center">
                <p className="min-w-[150px] text-sm font-semibold">Balance:</p>
                <p className="text-sm font-light">
                  {/* {formatCurrency(44910)}  */}
                  {userData?.balance ? formatCurrency(userData.balance) : "N/A"}
                </p>
              </div>
              <div className="flex items-center">
                <p className="min-w-[150px] text-sm font-semibold">
                  Join Date:
                </p>
                <p className="text-sm font-light">
                  {formatDate("2017-07-22T17:46:37")}
                  {userData?.joinTime ? formatDate(userData?.joinTime) : "N/A"}
                </p>
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-5">
              <div className="flex items-center">
                <p className="min-w-[150px] text-sm font-semibold">Email:</p>
                <p className="text-sm font-light underline">
                  {userData?.email || "N/A"}
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
                <p className="text-sm font-light">
                  {/* {formatCurrency(0)} */}
                  {userData?.totalSpent
                    ? formatCurrency(userData.totalSpent)
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>
          {/* <div className="mt-10">
            <div className="flex items-center gap-5">
              <div className="flex flex-1 items-center gap-2">
                <FloatLabel className="flex-1 text-sm">
                  <InputText
                    id="Username"
                    className="h-[50px] w-full border border-grayBorder bg-transparent p-5 ps-[10px]"
                    value={userData?.username || "N/A"}
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
                    value={userData?.email || "N/A"}
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
          </div> */}
          <div className="mt-[50px]">
            <h5 className="text-lg font-bold">Personal Details</h5>
            <div className="flex items-center">
              <div className="mt-[25px] flex flex-1 flex-col gap-[25px]">
                <FloatLabel className="flex-1 text-sm">
                  <InputText
                    id="Username"
                    className="h-[50px] w-full border border-grayBorder bg-transparent p-5 ps-[10px]"
                    value={userData?.username || "N/A"}
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
                    value={userData?.hoVaTen || "N/A"}
                    // value={username}
                    // onChange={(e) => setUsername(e.target.value)}
                    // aria-invalid={!!error}
                    // aria-describedby="username-error"
                  />
                  <label htmlFor="Fullname">Full Name</label>
                </FloatLabel>
                {/* <FloatLabel className="flex-1 text-sm">
                  <InputText
                    id="Gender"
                    className="h-[50px] w-full border border-grayBorder bg-transparent p-5 ps-[10px]"
                  // value={username}
                  // onChange={(e) => setUsername(e.target.value)}
                  // aria-invalid={!!error}
                  // aria-describedby="username-error"
                  />
                  <label htmlFor="Gender">Gender</label>
                </FloatLabel> */}
                <FloatLabel className="flex-1 text-sm">
                  <InputText
                    id="Address"
                    className="h-[50px] w-full border border-grayBorder bg-transparent p-5 ps-[10px]"
                    value={userData?.email || "N/A"}
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
                  <div className="group relative flex h-[248px] w-[248px] cursor-pointer items-center justify-center overflow-hidden">
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
                          className="h-full w-full rounded-full border border-dashed border-black object-cover p-1"
                        />
                        <div className="absolute left-1/2 top-1/2 flex h-[95%] w-[95%] -translate-x-1/2 -translate-y-1/2 transform items-center justify-center gap-2 rounded-full bg-black bg-opacity-40 text-lg text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          <MdOutlineCameraAlt />
                          <p className="">Select</p>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Nút này để submit file lên nè */}
                  <div className="absolute bottom-0 right-8">
                    {/* <button
                      // onClick={handleUpload}
                      className="shadow-whiteInShadow flex items-center justify-center rounded-full border-4 border-white bg-mainYellow pb-[7px] pe-[7px] ps-2 pt-2"
                    >
                      <MdOutlineCameraAlt className="text-[30px] text-slate-900" />
                    </button> */}
                    <Button
                      icon="pi pi-camera"
                      tooltip="Upload image"
                      className="shadow-whiteInShadow flex h-10 w-10 items-center justify-center rounded-full border-4 border-white bg-mainYellow"
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
