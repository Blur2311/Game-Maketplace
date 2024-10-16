import { Navbar } from "../Nav&Footer/Navbar";
import { SignIn } from "../SignInPage/SignIn";

export const Homepage: React.FC = () => {
  return (
    <>
      <Navbar />
      <SignIn />
    </>
  );
};
