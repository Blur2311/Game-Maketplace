import { Button } from "primereact/button";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";

export const ChangePW = () => {
  return (
    <>
      <div className="pl-5">
        <div className="rounded bg-white p-10">
          <h1 className="text-3xl">Change Your Password</h1>
          <h6 className="mt-[15px] text-sm font-light">
            For your security, we highly recommend that you choose a unique
            password that you don't use for any other online account.
          </h6>
          <div className="mt-[50px]">
            <div className="">
              <h5 className="text-sm font-bold">Current Password</h5>
              <div className="mt-[25px]">
                <FloatLabel className="text-sm">
                  <Password
                    // toggleMask
                    inputClassName="border-grayBorder h-[50px] border bg-transparent p-5 ps-[10px] w-[360px]"
                    // value={password}
                    // onChange={(e) => setPassword(e.target.value)}
                    // aria-invalid={!!error}
                    // aria-describedby="password-error"
                  />
                  <label>Current Password</label>
                </FloatLabel>
              </div>
            </div>
            <div className="">
              <h5 className="mt-10 text-sm font-bold">New Password</h5>
              <div className="mt-[25px]">
                <FloatLabel className="text-sm">
                  <Password
                    // toggleMask
                    inputClassName="border-grayBorder h-[50px] border bg-transparent p-5 ps-[10px] w-[360px]"
                    // value={password}
                    // onChange={(e) => setPassword(e.target.value)}
                    // aria-invalid={!!error}
                    // aria-describedby="password-error"
                  />
                  <label>New Password</label>
                </FloatLabel>
              </div>
            </div>
            <div className="mt-4 max-w-[360px] rounded-md bg-gray250 py-4 ps-10 font-light">
              <ul className="list-disc text-sm">
                <li>Avoid using any of your last 5 passwords</li>
                <li>Use 7+ characters</li>
                <li>Use at least 1 letter</li>
                <li>Use at least 1 number</li>
                <li>No spaces</li>
              </ul>
            </div>
            <div className="mt-10">
              <FloatLabel className="text-sm">
                <Password
                  // toggleMask
                  inputClassName="border-grayBorder h-[50px] border bg-transparent p-5 ps-[10px] w-[360px]"
                  // value={password}
                  // onChange={(e) => setPassword(e.target.value)}
                  // aria-invalid={!!error}
                  // aria-describedby="password-error"
                />
                <label>Retype New Password</label>
              </FloatLabel>
            </div>
            <Button
              label="SAVE CHANGES"
              size="large"
              className="mt-5 h-[50px] w-[150px] bg-mainYellow text-xs font-bold text-slate-900"
              // onClick={handleLogin}
              // disabled={isLockedOut}
            />
          </div>
          <div className="">
            <h5 className="mt-20 text-lg font-bold">
              Two-Factor Authentication
            </h5>
            <h6 className="mt-5 text-sm font-light">
              Using two-factor authentication helps secure your account,
              preventing unauthorized transactions.
            </h6>
            <div className="mt-10">
              <h5 className="text-sm font-bold">Payment authentication</h5>
              <div className="mt-[25px]">
                <FloatLabel className="text-sm">
                  <InputText
                    // toggleMask
                    className="h-[50px] w-[360px] border border-grayBorder bg-transparent p-5 ps-[10px]"
                    // value={password}
                    // onChange={(e) => setPassword(e.target.value)}
                    // aria-invalid={!!error}
                    // aria-describedby="password-error"
                  />
                  <label>Do not use OTP</label>
                </FloatLabel>
              </div>
            </div>
            <div className="mt-10">
              <h5 className="text-sm font-bold">Login authentication</h5>
              <div className="mt-[25px]">
                <FloatLabel className="text-sm">
                  <InputText
                    // toggleMask
                    className="h-[50px] w-[360px] border border-grayBorder bg-transparent p-5 ps-[10px]"
                    // value={password}
                    // onChange={(e) => setPassword(e.target.value)}
                    // aria-invalid={!!error}
                    // aria-describedby="password-error"
                  />
                  <label>Do not use OTP</label>
                </FloatLabel>
              </div>
            </div>
            <Button
              label="SET UP"
              size="large"
              className="mt-5 h-[50px] w-[150px] bg-gray250 text-xs font-bold text-slate-900"
              // onClick={handleLogin}
              // disabled={isLockedOut}
            />
          </div>
        </div>
      </div>
    </>
  );
};
