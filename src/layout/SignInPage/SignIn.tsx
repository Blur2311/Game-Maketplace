import { Button } from "primereact/button";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { useState } from "react";

export const SignIn: React.FC = () => {
  const [value, setValue] = useState<string>();

  return (
    <>
      <div className="container flex items-center justify-center h-screen mx-auto">
        <div className="flex w-full flex-col items-center rounded-lg bg-gray300 px-5 pb-[60px] pt-[50px] text-white sm:w-[470px] sm:px-14">
          {/* Logo */}
          <img src="/cat.jpeg" alt="" className="mb-[60px] h-14 w-14" />

          {/* <h6 className="mb-5 text-xl font-bold">Sign In</h6> */}
          <div className="flex flex-col items-center gap-6">
            <FloatLabel className="w-full text-sm">
              <InputText
                id="Email"
                className="border-grayBorder h-[50px] w-full border bg-transparent p-5 ps-[10px]"
                // value={value}
                // onChange={(e) => setValue(e.target.value)}
              />
              <label htmlFor="Email">Email Address</label>
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
            <div className="w-full text-slate-300">
              <a href="#" className="text-sm font-medium underline hover:text-mainYello">
                Forgot password?
              </a>
            </div>

            <Button
              label="SIGN IN"
              size="large"
              className="w-full text-base font-bold h-14 bg-mainYello text-slate-900"
            />

            <div className="mt-10 text-slate-300">
              <a href="#" className="text-base font-medium underline hover:text-mainYello">
                Create account
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
