import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { formatCurrency, formatDate } from "../../utils/OtherUtils";
import { Button } from "primereact/button";
import { MdOutlineCameraAlt } from "react-icons/md";
import { ProgressSpinner } from "primereact/progressspinner";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import apiClient from "../../config/apiClient";
import { useAuthCheck } from "../../utils/AuthUtils";
import { ToggleButton } from "primereact/togglebutton";
import { Dialog } from "primereact/dialog";
import { Password } from "primereact/password";

export const UserProfile = () => {
  const [uploading, setUploading] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [userData, setUserData] = useState<any | null>(null);
  const [avatar, setAvatar] = useState<string | null>(
    sessionStorage.getItem("user-avatar") || null,
  ); // Lấy ảnh từ sessionStorage khi load trang
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [CheckLogin, setCheckLogin] = useState<number>(0);
  const [checked, setChecked] = useState(false);
  const [visible, setVisible] = useState(false);

  useAuthCheck([]);

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
            setUserData(data);
            user.email = data.email;
            user.hoVaTen = data.hoVaTen;
            user.username = data.username; // Cập nhật userData nếu có dữ liệu
            user.avatar = data.avatar;
            user.gender = data.gender;
            user.dob = data.dob;
            user.phoneNumber = data.phoneNumber;
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

  // chức năng update

  const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileSelected = event.target.files?.[0]; // Lấy file đầu tiên

    if (fileSelected) {
      setUploadingAvatar(true);
      const reader = new FileReader();

      reader.onloadend = () => {
        // Khi file đã được đọc, lưu URL tạm thời vào sessionStorage
        const imageUrl = reader.result as string;
        sessionStorage.setItem("user-avatar", imageUrl); // Lưu URL ảnh vào sessionStorage
        // console.log("Ảnh đã được tải lên:", imageUrl);
        setAvatar(imageUrl);
        user.avatar = imageUrl;
        setFile(fileSelected);
        setCheckLogin(1);
        setUploadingAvatar(false);
        // Cập nhật lại ảnh trong state nếu cần (hoặc có thể sử dụng URL trực tiếp từ reader.result)
        // setAvatar(imageUrl); // Ví dụ nếu có state avatar
      };

      // Đọc file dưới dạng URL
      reader.readAsDataURL(fileSelected);
    } else {
      console.log("Không có file nào được chọn");
    }
  };

  const [user, setUser] = useState({
    email: "",
    hoVaTen: "",
    avatar: "",
    username: "",
    gender: false,
    dob: "",
    phoneNumber: "",
  });

  const updateUser = async () => {
    try {
      if (file != null) {
        // Tạo FormData và thêm file vào
        const formData = new FormData();
        formData.append("file", file);

        // Gọi API với FormData
        const response = await apiClient.post(
          "/api/users/upload-avatar",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data", // Để trình duyệt tự động thêm đúng content type
            },
          },
        );
        user.avatar = response.data.data;
        // Trả về dữ liệu để xử lý tiếp
      }

      try {
        const updateResponse = await apiClient.put("/api/users/update", user, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log("Kết quả cập nhật:", updateResponse.data);
        window.location.reload();
        return updateResponse.data;
      } catch (updateError) {
        console.error("Lỗi khi gọi API updateUser:", updateError);
        return null;
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
      return null; // Trả về null nếu có lỗi
    }
  };

  const [ingredient, setIngredient] = useState("");

  return (
    <>
      <div className="rounded bg-white p-10">
        <h1 className="text-3xl">Account Settings</h1>
        <h6 className="mt-[15px] text-sm font-light">
          Manage your account's details.
        </h6>
        <h5 className="mt-[30px] text-lg font-bold">Account Information</h5>
        <div className="mt-5 flex flex-col items-start gap-y-5 lg:flex-row">
          <div className="flex flex-1 flex-col gap-5">
            <div className="flex items-center">
              <p className="min-w-[150px] text-sm font-semibold">Username:</p>
              <p className="text-sm font-light">
                {userData?.username || "N/A"}
              </p>
            </div>
            <div className="flex items-center">
              <p className="min-w-[150px] text-sm font-semibold">Full Name:</p>
              <p className="text-sm font-light">{userData?.hoVaTen || "N/A"}</p>
            </div>
            <div className="flex items-center">
              <p className="min-w-[150px] text-sm font-semibold">Balance:</p>
              <p className="text-sm font-light">
                {/* {formatCurrency(44910)}  */}
                {userData?.balance ? formatCurrency(userData.balance) : "N/A"}
              </p>
            </div>
            <div className="flex items-center">
              <p className="min-w-[150px] text-sm font-semibold">Join Date:</p>
              <p className="text-sm font-light">
                {/* {formatDate("2017-07-22T17:46:37")} */}
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
            {/*
                <div className="flex items-center">
                  <p className="min-w-[150px] text-sm font-semibold">
                    Customer Group:
                  </p>
                  <p className="text-sm font-light">Silver VIP</p>
                </div>
                */}
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
        <div className="mt-10">
          <div className="grid grid-cols-12">
            <div className="col-span-12 flex items-center gap-2 lg:col-span-6">
              <FloatLabel className="flex-1 text-sm">
                <InputText
                  readOnly
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
                onClick={() => setVisible(true)}
                // disabled={isLockedOut}
              />
              <Dialog
                visible={visible}
                onHide={() => setVisible(false)}
                footer={
                  <div className="flex flex-col gap-2 text-xs font-bold">
                    <button
                      className="h-[50px] rounded bg-mainCyan px-4 uppercase text-white hover:brightness-105"
                      onClick={() => {
                        setVisible(false);
                      }}
                    >
                      Continue
                    </button>
                    <button
                      className="h-[50px] rounded bg-gray-200 px-4 py-2 uppercase text-black hover:bg-gray-300"
                      onClick={() => setVisible(false)}
                    >
                      Cancel
                    </button>
                  </div>
                }
                className="max-w-[489px] font-inter"
              >
                <h6 className="mb-5 text-center text-3xl font-light text-black">
                  Verify Your Identity to Change Your Gmail Address
                </h6>
                <p className="mb-4 text-sm text-textSidebar">
                  Please enter your password to proceed and secure your account.
                </p>
                <div>
                  <Password
                    placeholder="Current Password"
                    className="w-full"
                    inputClassName="border-grayBorder text-sm h-[50px] border bg-transparent p-5 ps-[10px] w-full"
                    // onChange={(e) =>
                    //   setFormData({ ...formData, oldPassword: e.target.value })
                    // }
                  />
                </div>
              </Dialog>
            </div>
          </div>
        </div>
        <div className="mt-[50px]">
          <h5 className="text-lg font-bold">Personal Details</h5>
          <div className="flex flex-col gap-y-5 lg:flex-row lg:items-center">
            <div className="order-2 mt-[25px] flex flex-1 flex-col gap-[25px] lg:order-1">
              <FloatLabel className="flex-1 text-sm">
                <InputText
                  id="hoVaTen"
                  className="h-[50px] w-full border border-grayBorder bg-transparent p-5 ps-[10px]"
                  value={user.hoVaTen || ""}
                  onChange={(e) =>
                    setUser({ ...user, hoVaTen: e.target.value })
                  }
                />
                <label htmlFor="hoVaTen">Full Name</label>
              </FloatLabel>

              <FloatLabel className="flex-1 text-sm">
                <InputText
                  id="dob"
                  type="date"
                  className="h-[50px] w-full border border-grayBorder bg-transparent p-5 ps-[10px]"
                  value={user.dob || ""}
                  onChange={(e) => setUser({ ...user, dob: e.target.value })}
                />
                <label htmlFor="hoVaTen">DOB</label>
              </FloatLabel>

              <FloatLabel className="flex-1 text-sm">
                <InputText
                  id="phonenumber"
                  className="h-[50px] w-full border border-grayBorder bg-transparent p-5 ps-[10px]"
                  value={user.phoneNumber || ""}
                  onChange={(e) =>
                    setUser({ ...user, phoneNumber: e.target.value })
                  }
                />
                <label htmlFor="hoVaTen">Phone Number</label>
              </FloatLabel>

              <ToggleButton
                checked={checked}
                onLabel="Male"
                offLabel="Female"
                onIcon="pi pi-mars"
                offIcon="pi pi-venus"
                onChange={(e) => setChecked(e.value)}
                className="custom-toggle h-[50px] w-32"
              />

              {/* Sửa lại gender cho bố
              <div className="card justify-content-center flex">
                <div className="flex flex-wrap gap-3">
                  <div className="align-items-center flex">
                    <RadioButton
                      inputId="genderMale"
                      name="gender"
                      value={true} // Giá trị cho "Male" là true
                      onChange={() => setUser({ ...user, gender: true })}
                      checked={user.gender === true} // Kiểm tra nếu gender là true
                    />
                    <label htmlFor="genderMale" className="ml-2">
                      Male
                    </label>
                  </div>

                  <div className="align-items-center flex">
                    <RadioButton
                      inputId="genderFemale"
                      name="gender"
                      value={false} // Giá trị cho "Female" là false
                      onChange={() => setUser({ ...user, gender: false })}
                      checked={user.gender === false} // Kiểm tra nếu gender là false
                    />
                    <label htmlFor="genderFemale" className="ml-2">
                      Female
                    </label>
                  </div>
                </div>
              </div> */}

              <Button
                label="SAVE CHANGES"
                size="large"
                className="mt-5 h-[50px] w-[150px] bg-mainYellow text-xs font-bold text-slate-900"
                onClick={updateUser}
                // disabled={isLockedOut}
              />
            </div>
            <div className="order-1 mt-[25px] flex flex-1 items-center justify-center lg:order-2 lg:mt-0">
              <div className="relative">
                {/* Cái này có sẵn ấn vào hình mở input xog ấn nút để submit
                    xog cho nó loading nhìn cho giống real */}
                <div className="group relative flex h-[248px] w-[248px] cursor-pointer items-center justify-center overflow-hidden">
                  <input
                    type="file"
                    onChange={handleChangeFile}
                    className="absolute inset-0 z-50 cursor-pointer opacity-0"
                  />

                  {/* trong thời gian đợi nó submit thì cập nhật trạg thái true cho nó load nhìn cho đẹp */}
                  {uploading ? (
                    <ProgressSpinner />
                  ) : (
                    // <img
                    //   id="user-avatar"
                    //   src={
                    //     userData?.avatar && CheckLogin === 0
                    //       ? userData?.avatar
                    //       : avatar || "/user image.webp"
                    //   }
                    //   // Kiểm tra trong localStorage nếu có

                    //   // src={photoURL || "/girl.png"}  Thay thế bằng URL ảnh placeholder nếu cần
                    //   // src={userData?.avatar || "/user image.webp"} // nhớ xoá dòng này
                    //   alt="Uploaded"
                    //   className="object-cover w-full h-full border-4 rounded-full border-slate-900"
                    // />

                    <>
                      <img
                        src={
                          userData?.avatar && CheckLogin === 0
                            ? userData?.avatar
                            : avatar || "/user image.webp"
                        }
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
                  {/* <button className="shadow-whiteInShadow flex items-center justify-center rounded-full bg-mainYellow pb-[7px] pe-[7px] ps-2 pt-2">
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
    </>
  );
};
