import { Button } from "primereact/button";
import { FaFacebook, FaYoutube } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { scrollToTop } from "../../../utils/OtherUtils";

export const Footer = () => {
  return (
    <>
      <div className="bg-gray300 px-10 pb-10 pt-5 sm:px-16">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-3xl text-gray250">
            <FaFacebook />
            <FaSquareXTwitter />
            <FaYoutube />
          </div>
          <Button
            icon="pi pi-chevron-up"
            onClick={scrollToTop}
            className="h-9 w-9 border-2 text-gray250 focus:ring-0"
          />
        </div>
        <div className="pt-5">
          <div className="flex flex-col justify-between gap-10 sm:flex-row sm:items-end sm:gap-0 lg:items-center">
            <div className="mb-2 flex flex-col items-start gap-10 text-nowrap lg:flex-row lg:gap-20">
              <div className="">
                <h6 className="mb-3 text-base text-gray350 opacity-50">
                  Introduction
                </h6>
                <ul className="flex flex-col gap-2">
                  <li className="text-sm text-gray250">
                    <a href="#">What is a licensed game?</a>
                  </li>
                  <li className="text-sm text-gray250">
                    <a href="#">Introducing Code Oxi Store</a>
                  </li>
                  <li className="text-sm text-gray250">
                    <a href="#">Terms of Service</a>
                  </li>
                  <li className="text-sm text-gray250">
                    <a href="#">Privacy Policy</a>
                  </li>
                </ul>
              </div>
              <div className="">
                <h6 className="mb-3 text-base text-gray350 opacity-50">
                  Account
                </h6>
                <ul className="flex flex-col gap-2">
                  <li className="text-sm text-gray250">
                    <a href="#">Purchased Products</a>
                  </li>
                  <li className="text-sm text-gray250">
                    <a href="#">Warranty Policy</a>
                  </li>
                </ul>
              </div>
              <div className="flex-1">
                <h6 className="mb-3 text-base text-gray350 opacity-50">
                  Contact
                </h6>
                <ul className="flex flex-col gap-2">
                  <li className="text-sm text-gray250">
                    <a href="#">Automatic Hotline: 1900 633 305</a>
                  </li>
                  <li className="text-sm text-gray250">
                    <a href="#">Customer Support Contact</a>
                  </li>
                  <li className="text-sm text-gray250">
                    <a href="#">Chat with Customer Service</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="self-center sm:self-auto">
              <img src="/logo.png" alt="" className="max-h-20" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
