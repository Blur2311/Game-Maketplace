import { Button } from "primereact/button";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { useState } from "react";

export const SignIn: React.FC = () => {
  const [value, setValue] = useState<string>();

  return (
    <>
      <div className="container mx-auto flex h-screen justify-center sm:my-8 sm:h-full">
        <div className="flex w-full flex-col items-center rounded-lg bg-gray300 px-5 pb-[60px] pt-[50px] text-white sm:w-[470px] sm:px-14">
          {/* Logo */}
          <img src="/cat.jpeg" alt="" className="mb-[60px] h-14 w-14" />

          <h6 className="mb-5 text-xl font-bold">Sign In</h6>
          <div className="flex flex-col items-center gap-6">
            <FloatLabel className="w-full">
              <InputText
                id="Email"
                className="border-grayBorder h-[60px] w-full border bg-transparent p-5 ps-[10px]"
                // value={value}
                // onChange={(e) => setValue(e.target.value)}
              />
              <label htmlFor="Email">Email Address</label>
            </FloatLabel>
            <FloatLabel>
              <Password
                toggleMask
                inputId="Password"
                inputClassName="border-grayBorder h-[60px] border bg-transparent p-5 ps-[10px] first:w-[360px]"
                // value={value}
                // onChange={(e) => setValue(e.target.value)}
              />
              <label htmlFor="Password">Password</label>
            </FloatLabel>
            <div className="w-full">
              <a href="#" className="text-[15px] font-medium underline">
                Forgot password?
              </a>
            </div>

            <Button
              label="SIGN IN"
              size="large"
              className="h-[60px] w-full bg-mainYello text-xs"
            />

            <div className="mt-16">
              <a href="#" className="text-[15px] font-medium underline">
                Create account
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
