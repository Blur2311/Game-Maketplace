import { Button } from "primereact/button";
import { FloatLabel } from "primereact/floatlabel";
import { InputSwitch } from "primereact/inputswitch";
import { Password } from "primereact/password";
import { useState } from "react";
import { FaRegBell } from "react-icons/fa";
import { IoWarningOutline } from "react-icons/io5";
import { PiPassword } from "react-icons/pi";
import { useAuthCheck } from "../../../utils/AuthUtils";

export const AdminSetting = () => {
  useAuthCheck(['ADMIN', 'STAFF']);
  const [checkedProd, setCheckedProd] = useState(true);
  const [checkedSecu, setCheckedSecu] = useState(false);
  const [newPW, setNewPW] = useState("");
  const [reNewPW, setReNewPW] = useState("");

  return (
    <>
      <div className="px-6 py-16">
        <h1 className="text-[32px] font-medium">Settings</h1>
        <div className="grid grid-cols-12 mt-6 gap-x-4 gap-y-8">
          <div className="col-span-12">
            <div className="rounded-[20px] shadow-adminBoxshadow">
              <div className="px-6 py-8">
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full shadow-adminIconshadow">
                    <PiPassword className="text-2xl" />
                  </div>
                  <p className="text-lg font-medium">Change password</p>
                </div>
                <div className="grid grid-cols-12 pb-8 gap-x-6 gap-y-8">
                  <div className="col-span-12 text-sm sm:col-span-6">
                    <FloatLabel className="!w-full">
                      <Password
                        value={newPW}
                        onChange={(e) => setNewPW(e.target.value)}
                        feedback={false}
                        tabIndex={1}
                        className="w-full"
                        inputClassName="shadow-adminInputShadow w-full rounded-lg border bg-transparent p-4 ps-[10px] hover:border-black focus:border-black"
                      />
                      <label>
                        New password <span className="text-red-500">*</span>
                      </label>
                    </FloatLabel>
                  </div>
                  <div className="col-span-12 text-sm sm:col-span-6">
                    <FloatLabel className="!w-full">
                      <Password
                        value={reNewPW}
                        onChange={(e) => setReNewPW(e.target.value)}
                        feedback={false}
                        tabIndex={1}
                        className="w-full"
                        inputClassName="shadow-adminInputShadow w-full rounded-lg border bg-transparent p-4 ps-[10px] hover:border-black focus:border-black"
                      />
                      <label>
                        Re-type new password{" "}
                        <span className="text-red-500">*</span>
                      </label>
                    </FloatLabel>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-2">
                  <Button
                    label="Update"
                    className="rounded-lg bg-mainYellow px-4 py-[10px] text-sm font-medium text-white hover:brightness-105"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-12">
            <div className="rounded-[20px] shadow-adminBoxshadow">
              <div className="px-6 py-8">
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full shadow-adminIconshadow">
                    <FaRegBell className="text-2xl" />
                  </div>
                  <p className="text-lg font-medium">Notifications</p>
                </div>
                <div className="flex flex-col gap-6">
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex flex-col gap-2">
                      <h6 className="font-medium">Product updates</h6>
                      <p className="text-sm text-textSecond">
                        News, announcements, and product updates.
                      </p>
                    </div>
                    <div className="">
                      <InputSwitch
                        checked={checkedProd}
                        onChange={(e) => setCheckedProd(e.value)}
                        className="custom-input-slider"
                      />
                    </div>
                  </div>
                  <hr className="border-[#dcdfe4]" />
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex flex-col gap-2">
                      <h6 className="font-medium">Security updates</h6>
                      <p className="text-sm text-textSecond">
                        Important notifications about your account security.
                      </p>
                    </div>
                    <div className="">
                      <InputSwitch
                        checked={checkedSecu}
                        onChange={(e) => setCheckedSecu(e.value)}
                        className="custom-input-slider"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-12">
            <div className="rounded-[20px] shadow-adminBoxshadow">
              <div className="px-6 py-8">
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full shadow-adminIconshadow">
                    <IoWarningOutline className="text-2xl" />
                  </div>
                  <p className="text-lg font-medium">Delete account</p>
                </div>
                <div className="flex flex-col items-start gap-6">
                  <h4 className="font-medium">
                    Delete your account and all of your source data. This is
                    irreversible.
                  </h4>
                  <Button
                    label="Delete account"
                    className="rounded-lg border border-red-500 bg-red-100 bg-opacity-0 px-4 py-[10px] text-sm font-medium text-red-500 hover:bg-opacity-30"
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
