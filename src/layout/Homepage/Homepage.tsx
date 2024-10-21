import { Link } from "react-router-dom";
import { Navbar } from "../Nav&Footer/Navbar";

export const Homepage: React.FC = () => {
  return (
    <>
      <Navbar />
      <div>
        <h1>Welcome to the Homepage</h1>
        <nav>
          <ul>
            <li>
              <Link to="/signin">Sign In</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/verify-otp">Verify OTP</Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};
