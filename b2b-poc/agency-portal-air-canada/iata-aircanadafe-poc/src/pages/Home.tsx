import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import SignUpModal from "../components/SignUpModal";
import RegisterAgencyModal from "./agencyregistration/RegisterAgencyModal";
import { API } from "../api";
import { IRequestQRResponse } from "../interface";

const Home: React.FC = () => {
  const navigate: NavigateFunction = useNavigate();
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState<boolean>(false);
  const [isRegisterAgencyModalOpen, setIsRegisterAgencyModalOpen] =
    useState<boolean>(false);

  // Toggle the visibility of SignUp Modal
  const toggleSignUpModal = () => {
    setIsSignUpModalOpen((prev) => !prev);
  };

  // Toggle the visibility of Register Agency Modal
  const toggleRegisterAgencyModal = () => {
    setIsRegisterAgencyModalOpen((prev) => !prev);
  };
  // Handle the legacy registration click
  const handleLegacyClick = () => {
    setIsSignUpModalOpen(false); // Close the SignUpModal
    setIsRegisterAgencyModalOpen(true); // Open the RegisterAgencyModal
  };

  const resetDemo: () => Promise<void> = async (): Promise<void> => {
    await API.delete("/api/idp/reset");
  };

  const requestRPQrCode: () => Promise<void> = async (): Promise<void> => {
    // Make a request to the backend to generate a QR code
    // This can be done using the Axios API or Axios
    const RPRequestResponse: IRequestQRResponse =
      await API.post("/api/proof-request");
    if (RPRequestResponse.data) {
      navigate("/scan", {
        state: {
          qrCode: RPRequestResponse.data.longUrl,
          credProofId: RPRequestResponse.data.credProofId,
        },
      });
    }
  };

  const createAgencyAccount: () => void = (): void => {
    setIsSignUpModalOpen(true);
  };
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 flex">
        {/* Left Section */}
        <div
          onClick={() => resetDemo()}
          className="w-1/2 bg-cover bg-center text-white flex items-center justify-right px-20 cursor-pointer"
          style={{
            backgroundImage: "url('/assets/background.jpg')",
            backgroundPosition: "center", // Adjust as needed
          }}
        ></div>

        {/* Right Section */}
        <div className="w-1/2 bg-gray-50 flex flex-col justify-center items-center p-8">
          <div className="w-full max-w-sm">
            <img
              src="/assets/download.png"
              alt="Logo"
              className="w-full h-auto mx-auto px-12"
            />
            <div className="space-y-6 w-full">
              <div className="w-full flex-col">
                <div className="space-y-2">
                  <form>
                    {/* Username */}
                    <div className="mb-4">
                      <label
                        htmlFor="username"
                        className="block text-sm items-center gap-1 pb-2 font-normal text-gray-600"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="flex-shrink-0"
                        >
                          <path
                            d="M8.00008 3.99935C8.73341 3.99935 9.33341 4.59935 9.33341 5.33268C9.33341 6.06601 8.73341 6.66601 8.00008 6.66601C7.26675 6.66601 6.66675 6.06601 6.66675 5.33268C6.66675 4.59935 7.26675 3.99935 8.00008 3.99935ZM8.00008 10.666C9.80008 10.666 11.8667 11.526 12.0001 11.9993H4.00008C4.15341 11.5193 6.20675 10.666 8.00008 10.666ZM8.00008 2.66602C6.52675 2.66602 5.33341 3.85935 5.33341 5.33268C5.33341 6.80601 6.52675 7.99935 8.00008 7.99935C9.47341 7.99935 10.6667 6.80601 10.6667 5.33268C10.6667 3.85935 9.47341 2.66602 8.00008 2.66602ZM8.00008 9.33268C6.22008 9.33268 2.66675 10.226 2.66675 11.9993V13.3327H13.3334V11.9993C13.3334 10.226 9.78008 9.33268 8.00008 9.33268Z"
                            fill="#1C1F23"
                          />
                        </svg>
                        Username
                      </label>
                      <input
                        type="text"
                        id="username"
                        className="w-full px-4 border border-gray-300 text-sm rounded-md"
                        placeholder="Enter your username"
                      />
                    </div>

                    {/* Password */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between">
                        <label
                          htmlFor="password"
                          className="block text-sm items-center  gap-1 pb-2 font-normal text-gray-600"
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clipPath="url(#clip0_4668_364)">
                              <path
                                d="M8.00008 11.3337C8.73341 11.3337 9.33341 10.7337 9.33341 10.0003C9.33341 9.26699 8.73341 8.66699 8.00008 8.66699C7.26675 8.66699 6.66675 9.26699 6.66675 10.0003C6.66675 10.7337 7.26675 11.3337 8.00008 11.3337ZM12.0001 5.33366H11.3334V4.00033C11.3334 2.16033 9.84008 0.666992 8.00008 0.666992C6.16008 0.666992 4.66675 2.16033 4.66675 4.00033V5.33366H4.00008C3.26675 5.33366 2.66675 5.93366 2.66675 6.66699V13.3337C2.66675 14.067 3.26675 14.667 4.00008 14.667H12.0001C12.7334 14.667 13.3334 14.067 13.3334 13.3337V6.66699C13.3334 5.93366 12.7334 5.33366 12.0001 5.33366ZM5.93341 4.00033C5.93341 2.86033 6.86008 1.93366 8.00008 1.93366C9.14008 1.93366 10.0667 2.86033 10.0667 4.00033V5.33366H5.93341V4.00033ZM12.0001 13.3337H4.00008V6.66699H12.0001V13.3337Z"
                                fill="#1C1F23"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_4668_364">
                                <rect width="16" height="16" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                          Password
                        </label>
                        <Link
                          to="/forgot-password"
                          className="text-xs text-gray-600  font-medium underline"
                        >
                          Forgot password?
                        </Link>
                      </div>
                      <input
                        type="text"
                        id="password"
                        className="w-full px-4 border text-sm  border-gray-300 rounded-md"
                        placeholder="Enter your password"
                      />
                    </div>
                  </form>
                </div>
                <div className="flex flex-col space-y-2">
                  <Link to="/">
                    <button className="relative w-full text-redPrimary bg-[#E2E2E2] rounded-lg  overflow-hidden group">
                      {/* Hover Effect */}
                      <span className="absolute inset-0 bg-redPrimary scale-x-0 transform origin-left transition-transform duration-1000 ease-out group-hover:scale-x-100"></span>
                      <div className="relative flex items-center justify-center z-10 py-2 rounded-lg">
                        {/* Content of the Button */}
                        <svg
                          width="21"
                          height="20"
                          viewBox="0 0 21 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="group-hover:fill-white"
                        >
                          <path
                            d="M17.1666 15.8333L10.4999 15.8333L10.4999 17.5L17.1666 17.5C18.0833 17.5 18.8333 16.75 18.8333 15.8333L18.8333 4.16667C18.8333 3.25 18.0833 2.5 17.1666 2.5L10.4999 2.5L10.4999 4.16667L17.1666 4.16667L17.1666 15.8333Z"
                            className="group-hover:fill-white"
                            fill="#1C1F23"
                          />
                          <path
                            d="M9.825 7.00898L11 5.83398L15.1667 10.0007L11 14.1673L9.825 12.984L11.975 10.834H3.5V9.16732H11.975L9.825 7.00898Z"
                            className="group-hover:fill-white"
                            fill="#1C1F23"
                          />
                        </svg>

                        <span className="ml-2 text-lg font-normal text-gray-600 group-hover:text-white">
                          Log in
                        </span>
                      </div>
                    </button>
                  </Link>

                  <div
                    onClick={() => requestRPQrCode()}
                    className="cursor-pointer"
                  >
                    <img
                      src="/assets/button.png"
                      alt="Logo"
                      className="w-full mx-auto"
                    />
                  </div>
                </div>
                <div className="flex items-center my-4 justify-between">
                  <div className="flex items-center text-sm justify-start text-gray-600  gap-2">
                    Don't have an agency account ?{" "}
                    <button
                      onClick={() => createAgencyAccount()}
                      disabled={isRegisterAgencyModalOpen}
                      className="text-xs text-gray-600 font-semibold underline"
                    >
                      Create Agency Account.
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Modals */}
      {isSignUpModalOpen && (
        <SignUpModal
          onLegacyClick={handleLegacyClick}
          isOpen={isSignUpModalOpen}
          onClose={toggleSignUpModal}
        />
      )}

      {isRegisterAgencyModalOpen && (
        <RegisterAgencyModal
          isOpen={isRegisterAgencyModalOpen}
          onClose={toggleRegisterAgencyModal}
        />
      )}
      {/* Footer is displayed on every page */}
      <Footer />
    </div>
  );
};

export default Home;
