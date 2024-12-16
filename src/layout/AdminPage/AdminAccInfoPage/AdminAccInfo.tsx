import { Button } from "primereact/button";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { ProgressSpinner } from "primereact/progressspinner";
import { useState, useEffect } from "react";
import { FiUser } from "react-icons/fi";
import { MdOutlineCameraAlt } from "react-icons/md";
import { getCurrentUser,useAuthCheck } from "../../../utils/AuthUtils";
import { updateAvatarAndHoVaTenByUsername, UpdateUserDTO } from "./service/AdminAccInfoService";

export type User = {
  sysIdUser: number;
  username: string;
  email: string;
  role: string;
  hoVaTen: string;
  balance: number;
  avatar: string;
  joinTime: string;
};

export const AdminAccInfo = () => {
  useAuthCheck(['ADMIN', 'STAFF']);
  const [uploading, setUploading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [hoVaTen, setHoVaTen] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      if (currentUser) {
        setHoVaTen(currentUser.hoVaTen);
        setPreview(currentUser.avatar);
      }
    };

    fetchUser();
  }, []);

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatar(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!user || !avatar) return;

    setUploading(true);

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result as string;
      const updateUserDTO: UpdateUserDTO = {
        files: [base64Image],
        fileName: avatar.name,
        hoVaTen: hoVaTen,
        username: user.username,
      };

      try {
        await updateAvatarAndHoVaTenByUsername(updateUserDTO);
        const updatedUser = { ...user, avatar: base64Image, hoVaTen: hoVaTen };
        setUser(updatedUser);
      } catch (error) {
        console.error("Error updating avatar and ho va ten:", error);
      } finally {
        setUploading(false);
      }
    };

    reader.readAsDataURL(avatar);
  };

  if (!user) {
    return <ProgressSpinner />;
  }

  return (
    <>
      <div className="px-6 py-16">
        <h1 className="text-[32px] font-medium">Account</h1>
        <div className="grid grid-cols-12 mt-6 gap-x-4 gap-y-8">
          <div className="col-span-12 md:col-span-4">
            <div className="rounded-[20px] shadow-adminBoxshadow">
              <div className="">
                <div className="flex flex-col items-center justify-center gap-4 px-6 py-8">
                  <div className="group relative flex h-[100px] w-[100px] cursor-pointer items-center justify-center overflow-hidden">
                    <input
                      type="file"
                      onChange={handleChangeFile}
                      className="absolute inset-0 cursor-pointer opacity-0 z-40"
                    />

                    {uploading ? (
                      <ProgressSpinner />
                    ) : (
                      <>
                        <img
                          src={preview || "/default-avatar.png"}
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
                    <h6 className="text-2xl font-medium">{user.hoVaTen}</h6>
                    <p className="text-sm text-textSecond">{user.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-12 md:col-span-8">
            <div className="rounded-[20px] shadow-adminBoxshadow">
              <div className="px-6 py-8">
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full shadow-adminIconshadow">
                    <FiUser className="text-2xl" />
                  </div>
                  <p className="text-lg font-medium">Basic details</p>
                </div>
                <div className="grid grid-cols-12 pb-8 gap-x-6 gap-y-8">
                  <FloatLabel className="col-span-12 text-sm sm:col-span-6">
                    <InputText
                      className="w-full rounded-lg border bg-transparent p-4 ps-[10px] shadow-adminInputShadow hover:border-black focus:border-black"
                      value={hoVaTen}
                      onChange={(e) => setHoVaTen(e.target.value)}
                    />
                    <label>
                      Full name <span className="text-red-500">*</span>
                    </label>
                  </FloatLabel>
                  <FloatLabel className="col-span-12 text-sm sm:col-span-6">
                    <InputText
                      className="w-full rounded-lg border bg-transparent p-4 ps-[10px] shadow-adminInputShadow hover:border-black focus:border-black"
                      value={user.username}
                      disabled
                    />
                    <label>
                      Username <span className="text-red-500">*</span>
                    </label>
                  </FloatLabel>
                  <FloatLabel className="col-span-12 text-sm sm:col-span-6">
                    <InputText
                      className="w-full rounded-lg border bg-transparent p-4 ps-[10px] shadow-adminInputShadow hover:border-black focus:border-black"
                      value={user.email}
                      disabled
                    />
                    <label>
                      Email address <span className="text-red-500">*</span>
                    </label>
                  </FloatLabel>
                  <FloatLabel className="col-span-12 text-sm sm:col-span-6">
                    <InputText
                      className="w-full rounded-lg border bg-transparent p-4 ps-[10px] shadow-adminInputShadow hover:border-black focus:border-black"
                      value={user.balance.toString()}
                      disabled
                    />
                    <label>Balance</label>
                  </FloatLabel>
                  <FloatLabel className="col-span-12 text-sm sm:col-span-6">
                    <InputText
                      className="w-full rounded-lg border bg-transparent p-4 ps-[10px] shadow-adminInputShadow hover:border-black focus:border-black"
                      value={user.joinTime}
                      disabled
                    />
                    <label>Join Time</label>
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
                  onClick={handleUpload}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};