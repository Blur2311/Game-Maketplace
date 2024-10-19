import { Navbar } from "../Nav&Footer/Navbar";
import {Registration} from "../RegisterPage/Registration";
import { SignIn } from "../SignInPage/SignIn";

export const Homepage: React.FC = () => {
  return (
    <>
      <Navbar />
      <SignIn />
      {/* <Registration /> */}
    </>
  );
};
