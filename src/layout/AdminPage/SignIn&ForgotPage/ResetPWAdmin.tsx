import { Button } from "primereact/button";
import { FloatLabel } from "primereact/floatlabel";
import { Message } from "primereact/message";
import { Password } from "primereact/password";

export const ResetPWAdmin = () => {
  return (
    <>
      <div className="grid min-h-screen lg:grid-cols-2">
        <div className="flex flex-col bg-white">
          <div className="p-6">
            <img src="/logo.png" alt="" className="h-8" />
          </div>
          <div className="flex flex-1 items-center justify-center p-6">
            <div className="mb-40 flex flex-col items-center justify-center gap-10">
              <div className="w-full text-left">
                <h1 className="text-[32px] font-medium">Reset password</h1>
              </div>
              <div className="flex flex-col items-center gap-4">
                <div className="flex flex-col items-center gap-7">
                  <FloatLabel className="text-sm">
                    <Password
                      // toggleMask
                      inputId="Password"
                      inputClassName="border-grayBorder rounded-lg w-[300px] sm:w-[450px] h-[50px] border bg-transparent p-5 ps-[10px]"
                      // value={password}
                      // onChange={(e) => setPassword(e.target.value)}
                      // aria-invalid={!!error}
                      // aria-describedby="password-error"
                    />
                    <label htmlFor="Password">New Password</label>
                  </FloatLabel>
                  <FloatLabel className="text-sm">
                    <Password
                      // toggleMask
                      inputId="Password"
                      inputClassName="border-grayBorder rounded-lg w-[300px] sm:w-[450px] h-[50px] border bg-transparent p-5 ps-[10px]"
                      // value={password}
                      // onChange={(e) => setPassword(e.target.value)}
                      // aria-invalid={!!error}
                      // aria-describedby="password-error"
                    />
                    <label htmlFor="Password">Confirm Password</label>
                  </FloatLabel>
                </div>
                <div className="w-full text-slate-300">
                  <Message
                    //đổi thành error báo lỗi nhớ đổi màu nền ở dưới với text
                    severity="success"
                    text="Success Message (nhớ đọc comment)"
                    className="w-full justify-start rounded-lg bg-green-500 bg-opacity-15"
                  />
                </div>
                <Button
                  label="Confirm"
                  size="large"
                  className="h-10 w-full rounded-xl bg-mainYellow text-sm font-semibold text-white shadow-buttonShadow"
                  // onClick={handleLogin}
                  // disabled={isLockedOut}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="hidden p-6 lg:block">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col justify-center gap-2 text-center text-white">
              <h1 className="text-2xl font-medium">
                Welcome to{" "}
                <span className="text-mainYellow">Code Oxi Admin</span>
              </h1>
              <p className="">
                Empowering your management experience with innovation and
                simplicity.
              </p>
            </div>
            <div className="relative flex justify-center">
              <div
                className="absolute left-1/2 top-1/3 z-0 h-96 w-96 -translate-x-1/2 -translate-y-1/2 transform rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(255, 255, 255, 0.3) 20%, rgba(255, 255, 255, 0.01) 60%, rgba(255, 255, 255, 0) 100%)",
                }}
              ></div>

              <img src="/Frame.png" alt="" className="z-10" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
