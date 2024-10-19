import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { useState } from "react";

export const Registration: React.FC = () => {
  const [value, setValue] = useState<string>();

  return (
    <>
      <div className="container flex justify-center h-screen mx-auto sm:my-8 sm:h-full">
        <div className="flex w-full flex-col items-center rounded-lg bg-gray300 px-5 pb-[60px] pt-[50px] text-white sm:w-[470px] sm:px-14">
          {/* Logo */}
          <img src="/cat.jpeg" alt="" className="mb-[60px] h-14 w-14" />

          {/* <h6 className="mb-5 text-xl font-bold">CREATE ACCOUNT</h6> */}
          <p className="mb-6 text-center text-mainYello hover:text-white">
            Register to track your orders, save your favorite games and get exclusive offers
          </p>
          <div className="flex flex-col items-center gap-6">
            <FloatLabel className="w-full text-sm">
              <InputText
                id="Email"
                className="h-[50px] w-full border border-grayBorder bg-transparent p-5 ps-[10px]"
                // value={value}
                // onChange={(e) => setValue(e.target.value)}
              />
              <label htmlFor="Email">Email Address</label>
            </FloatLabel>
            <FloatLabel className="w-full text-sm">
              <InputText
                id="DisplayName"
                className="h-[50px] w-full border border-grayBorder bg-transparent p-5 ps-[10px]"
                // value={value}
                // onChange={(e) => setValue(e.target.value)}
              />
              <label htmlFor="DisplayName">Display Name</label>
            </FloatLabel>
            <FloatLabel className="w-full text-sm">
              <InputText
                id="FullName"
                className="h-[50px] w-full border border-grayBorder bg-transparent p-5 ps-[10px]"
                // value={value}
                // onChange={(e) => setValue(e.target.value)}
              />
              <label htmlFor="FullName">Full Name</label>
            </FloatLabel>
            <FloatLabel className="text-sm">
              <Password
                // toggleMask
                inputId="Password"
                inputClassName="border-grayBorder h-[50px] border bg-transparent p-5 ps-[10px] first:w-[360px]"
                // value={value}
                // onChange={(e) => setValue(e.target.value)}
              />
              <label htmlFor="Password">Password</label>
            </FloatLabel>
            <FloatLabel className="text-sm">
              <Password
                // toggleMask
                inputId="Confirm Password"
                inputClassName="border-grayBorder h-[50px] border bg-transparent p-5 ps-[10px] first:w-[360px]"
                // value={value}
                // onChange={(e) => setValue(e.target.value)}
              />
              <label htmlFor="Confirm Password">Confirm Password</label>
            </FloatLabel>
            <div className="flex w-full align-items-center">
              <Checkbox
                inputId="Read"
                name="ReadPolicy"
                value="Read"
                // onChange={onIngredientsChange}
                checked
              />
              <label
                htmlFor="ReadPolicy"
                className="ml-2 text-sm text-slate-300"
              >
                {"I have read and agree to the "}
                <a
                  href="#"
                  className="font-medium underline hover:text-mainYello"
                >
                  term of service
                </a>
              </label>
            </div>

            <Button
              label="CREATE ACCOUNT"
              size="large"
              className="w-full text-base font-bold h-14 bg-mainYello text-slate-900"
            />

            <div className="text-sm mt-9">
              {"Already have an account? "}
              <a
                href="#"
                className="font-medium underline hover:text-mainYello"
              >
                Sign in
              </a>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className="font-medium underline hover:text-mainYello"
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
