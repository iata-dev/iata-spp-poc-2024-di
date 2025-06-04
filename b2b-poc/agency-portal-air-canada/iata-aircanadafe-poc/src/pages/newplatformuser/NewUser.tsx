import React, { useState } from "react";
import { useFormik } from "formik";
import { NavigateFunction, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../../components/Navbar.tsx";
import { API } from "../../api";

const NewUser: React.FC = () => {
  const location = useLocation();
  const navigate: NavigateFunction = useNavigate();
  const { verifyData } = location.state || {};
  const { rpValue, agencyRecord } = verifyData || {}; // Destructure with fallback
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  // Fallback values in case rpValue or agencyRecord is undefined
  const formik = useFormik({
    initialValues: {
      localNumber: rpValue?.localNumber || "",
      countryCode: rpValue?.countryCode || "",
      surname: rpValue?.surname || "",
      givenName: rpValue?.givenName || "",
      jobTitle: rpValue?.jobTitle || "",
      employeeID: rpValue?.employeeID || "",
      email: rpValue?.email || "",
      salutation: rpValue?.salutation || "",
      agencyName: agencyRecord?.agencyName || "",
      agencyContactNo: agencyRecord?.agencyContactNo || "",
      agencyAddress: agencyRecord?.agencyAddress || "",
      agencyCountry: agencyRecord?.agencyCountry || "",
      agencyState: agencyRecord?.agencyState || "",
      agencyCity: agencyRecord?.agencyCity || "",
      agencyPostalCode: agencyRecord?.agencyPostalCode || "",
      agencyIATACode: agencyRecord?.agencyIATACode || "",
      agencyIATACodeCountry: agencyRecord?.agencyIATACodeCountry || "",
      agencyStreetAddress: agencyRecord?.agencyStreetAddress || "",
      agencyStreetName: agencyRecord?.agencyStreetName || "",
    },
    onSubmit: (values): void => {
      console.log("Form submitted with values: ", values);
    },
  });

  const handleSubmit: () => Promise<void> = async (): Promise<void> => {
    toast.success(
      "Your agency and admin employee registration was successful.",
    );
    await API.patch("/agency", {
      isAgencyRegistered: true,
    });
    navigate("/successful-login");
  };
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage: `url('../../../public/assets/BG.png')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Navbar />
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
        {/* Modal container */}
        <div className="bg-white rounded-lg shadow-lg w-[1300px] flex overflow-hidden relative">
          {/* Left Section */}
          <div className=" flex items-center justify-between ml-10 px-12 ">
            <img
              src="/assets/download.png"
              alt="Air Canada Connex"
              className="w-64 "
            />
          </div>
          <div className="px-4 py-2 my-4">
            <div className="flex items-center  rounded-t-lg bg-gray-100 justify-start gap-2 ">
              <div className="flex items-center bg-gray-400 px-4 py-2 border-l rounded-tl-lg rounded-bl-lg justify-start gap-2">
                <svg
                  width="17"
                  height="18"
                  viewBox="0 0 15 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.38867 8.5C8.44954 8.5 9.46695 8.07857 10.2171 7.32843C10.9672 6.57828 11.3887 5.56087 11.3887 4.5C11.3887 3.43913 10.9672 2.42172 10.2171 1.67157C9.46695 0.921427 8.44954 0.5 7.38867 0.5C6.32781 0.5 5.31039 0.921427 4.56024 1.67157C3.8101 2.42172 3.38867 3.43913 3.38867 4.5C3.38867 5.56087 3.8101 6.57828 4.56024 7.32843C5.31039 8.07857 6.32781 8.5 7.38867 8.5ZM5.96055 10C2.88242 10 0.388672 12.4937 0.388672 15.5719C0.388672 16.0844 0.804297 16.5 1.3168 16.5H13.4605C13.973 16.5 14.3887 16.0844 14.3887 15.5719C14.3887 12.4937 11.8949 10 8.8168 10H5.96055Z"
                    fill="white"
                  />
                </svg>
              </div>
              <h2 className="text-xs text-gray-600 font-normal">
                Agency Contact:
              </h2>
            </div>
            <form>
              <div className="px-0 py-2">
                <div className="grid grid-cols-1  md:grid-cols-3 gap-6 py-1">
                  <div>
                    <label
                      htmlFor="title"
                      className="block text-grayPrimary text-xs font-normal"
                    >
                      Title
                    </label>
                    <select
                      id="title"
                      name="title"
                      value={formik.values.salutation}
                      className="mt-1 block w-full bg-[#C0C0C0] border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option>Mr.</option>
                      <option>Ms.</option>
                      <option>Dr.</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-grayPrimary text-sm font-normal"
                    >
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      readOnly={true}
                      id="firstName"
                      name="firstName"
                      value={formik.values.givenName}
                      required
                      pattern="^[A-Za-z]+$"
                      className="mt-1 block w-full bg-[#C0C0C0] border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-grayPrimary text-sm font-normal"
                    >
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      readOnly={true}
                      name="lastName"
                      value={formik.values.surname}
                      required
                      pattern="^[A-Za-z]+$" // Example pattern: only alphabetic characters
                      className="mt-1 block bg-[#C0C0C0] w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
              <div className="px-0 py-2">
                <div className="grid grid-cols-1  md:grid-cols-3 gap-6 py-1">
                  <div>
                    <label
                      htmlFor="employeeId"
                      className="block text-grayPrimary text-sm font-normal"
                    >
                      Employee ID Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="employeeId"
                      readOnly={true}
                      name="employeeId"
                      value={formik.values.employeeID}
                      required
                      pattern="^\d{10}$"
                      className="mt-1 block w-full bg-[#C0C0C0] border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phoneNumber"
                      className="block text-grayPrimary text-sm font-normal"
                    >
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      readOnly={true}
                      name="phoneNumber"
                      value={formik.values.localNumber}
                      required
                      pattern="^\d{10}$"
                      className="mt-1 block w-full bg-[#C0C0C0] border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="emailAddress"
                      className="block text-grayPrimary text-sm font-normal"
                    >
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="emailAddress"
                      name="emailAddress"
                      readOnly={true}
                      value={formik.values.email}
                      required
                      pattern="^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$"
                      className="mt-1 block w-full bg-[#C0C0C0] border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
              <div className="px-0 py-2">
                <div className="grid grid-cols-1  md:grid-cols-2 gap-6 py-1">
                  <div className="flex-1">
                    <label
                      htmlFor="title"
                      className="block text-grayPrimary  text-sm font-normal"
                    >
                      Preferred language for Notifications
                    </label>
                    <select
                      id="title"
                      name="title"
                      value={selectedLanguage}
                      onChange={(e) => setSelectedLanguage(e.target.value)}
                      className="mt-1 block w-full border-gray-300  rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option>English</option>
                      <option>French</option>
                    </select>
                  </div>
                  <div>
                    <h3 className="text-[#636363] text-left text-sm mt-4">
                      Using a corporate email domain is recommended for fraud{" "}
                      prevention and to expedite the authentication process
                    </h3>
                  </div>
                </div>
              </div>

              <div className="flex items-center rounded-t-lg bg-gray-100 justify-start gap-2 ">
                <div className="flex items-center bg-gray-400 px-4 py-2  border-l rounded-tl-lg rounded-bl-lg justify-start gap-2">
                  <svg
                    width="17"
                    height="18"
                    viewBox="0 0 15 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.38867 8.5C8.44954 8.5 9.46695 8.07857 10.2171 7.32843C10.9672 6.57828 11.3887 5.56087 11.3887 4.5C11.3887 3.43913 10.9672 2.42172 10.2171 1.67157C9.46695 0.921427 8.44954 0.5 7.38867 0.5C6.32781 0.5 5.31039 0.921427 4.56024 1.67157C3.8101 2.42172 3.38867 3.43913 3.38867 4.5C3.38867 5.56087 3.8101 6.57828 4.56024 7.32843C5.31039 8.07857 6.32781 8.5 7.38867 8.5ZM5.96055 10C2.88242 10 0.388672 12.4937 0.388672 15.5719C0.388672 16.0844 0.804297 16.5 1.3168 16.5H13.4605C13.973 16.5 14.3887 16.0844 14.3887 15.5719C14.3887 12.4937 11.8949 10 8.8168 10H5.96055Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <h2 className="text-xs text-gray-600 font-normal">
                  Agency Address:
                </h2>
              </div>
              <div className="px-0 py-2">
                <div className="grid grid-cols-1  md:grid-cols-3 gap-6 py-1">
                  <div>
                    <label
                      htmlFor="streetAddress"
                      className="block text-grayPrimary text-sm font-normal"
                    >
                      Agency Name
                    </label>
                    <input
                      type="text"
                      id="AgencyName"
                      name="agencyName"
                      value={formik.values.agencyName}
                      required
                      readOnly={true}
                      pattern="^[A-Za-z]+$" // Example pattern: only alphabetic characters
                      className="mt-1 block w-full bg-[#C0C0C0] border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phoneNumber"
                      className="block text-grayPrimary text-sm font-normal"
                    >
                      Agency Phone Number
                    </label>
                    <input
                      type="text"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formik.values.agencyContactNo}
                      required
                      pattern="^[A-Za-z]+$" // Example pattern: only alphabetic characters
                      className="mt-1 block bg-[#C0C0C0] w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="AgencyAddress"
                      className="block text-grayPrimary text-sm font-normal"
                    >
                      Agency Address
                    </label>
                    <input
                      type="text"
                      id="AgencyAddress"
                      name="AgencyAddress"
                      value={formik.values.agencyAddress}
                      required
                      pattern="^[A-Za-z]+$" // Example pattern: only alphabetic characters
                      className="mt-1 block bg-[#C0C0C0] w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
              <div className="px-0 py-2">
                <div className="grid grid-cols-1  md:grid-cols-3 gap-6 py-1">
                  <div>
                    <label
                      htmlFor="streetAddress"
                      className="block text-grayPrimary text-sm font-normal"
                    >
                      Street Address
                    </label>
                    <input
                      type="text"
                      id="streetAddress"
                      name="streetAddress"
                      value={formik.values.agencyStreetAddress}
                      required
                      readOnly={true}
                      pattern="^[A-Za-z]+$" // Example pattern: only alphabetic characters
                      className="mt-1 block w-full bg-[#C0C0C0] border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="streetName"
                      className="block text-grayPrimary text-sm font-normal"
                    >
                      Street Name
                    </label>
                    <input
                      type="text"
                      id="streetName"
                      name="streetName"
                      value={formik.values.agencyStreetName}
                      required
                      pattern="^[A-Za-z]+$" // Example pattern: only alphabetic characters
                      className="mt-1 block w-full bg-[#C0C0C0] border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="country"
                      className="block text-grayPrimary text-sm font-normal"
                    >
                      Country
                    </label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      value={formik.values.agencyCountry}
                      required
                      pattern="^[A-Za-z]+$" // Example pattern: only alphabetic characters
                      className="mt-1 block w-full bg-[#C0C0C0] border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
              <div className="px-0 py-2">
                <div className="grid grid-cols-1  md:grid-cols-3 gap-6 py-1">
                  <div>
                    <label
                      htmlFor="provice"
                      className="block text-grayPrimary text-sm font-normal"
                    >
                      Province/State
                    </label>
                    <input
                      type="text"
                      id="provice"
                      name="provice"
                      value={formik.values.agencyState}
                      required
                      readOnly={true}
                      pattern="^[A-Za-z]+$" // Example pattern: only alphabetic characters
                      className="mt-1 block w-full bg-[#C0C0C0] border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="city"
                      className="block text-grayPrimary text-sm font-normal"
                    >
                      City Name
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formik.values.agencyCity}
                      required
                      pattern="^[A-Za-z]+$" // Example pattern: only alphabetic characters
                      className="mt-1 block w-full bg-[#C0C0C0] border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="postalCode"
                      className="block text-grayPrimary text-sm font-normal"
                    >
                      Postal/ Zip Code
                    </label>
                    <input
                      type="text"
                      id="postalCode"
                      name="postalCode"
                      value={formik.values.agencyPostalCode}
                      required
                      pattern="^[A-Za-z]+$" // Example pattern: only alphabetic characters
                      className="mt-1 block w-full bg-[#C0C0C0] border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
              <div className="px-0 py-2">
                <div className="grid grid-cols-1  md:grid-cols-3 gap-6 py-1">
                  <div>
                    <label
                      htmlFor="iataCode"
                      className="block text-grayPrimary text-sm font-normal"
                    >
                      IATA/ARC
                    </label>
                    <input
                      type="text"
                      id="iataCode"
                      name="iataCode"
                      value={formik.values.agencyIATACode}
                      required
                      readOnly={true}
                      pattern="^[A-Za-z]+$"
                      className="mt-1 block w-full bg-[#C0C0C0] border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="americaToronto"
                      className="block text-grayPrimary text-sm font-normal"
                    >
                      America/Toronto
                    </label>
                    <input
                      type="text"
                      id="americaToronto"
                      name="americaToronto"
                      value={formik.values.agencyIATACodeCountry}
                      required
                      pattern="^[A-Za-z]+$" // Example pattern: only alphabetic characters
                      className="mt-1 block w-full bg-[#C0C0C0] border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            </form>
            <div className="">
              <h2 className="text-sm text-gray-500 font-normal py-1 italic">
                Find list of supported POS under the country field. View our{" "}
                <span className="text-blue-500"> NDC roadmap</span> as we
                continue expanding our program to new markets.
              </h2>
            </div>
            <div className="flex pt-8 items-center justify-end gap-4 mr-6 p-2">
              <button className="btn-lg px-14 py-2 text-black border border-black bg-white rounded">
                Go to registration options
              </button>
              <button
                onClick={handleSubmit}
                className="btn-lg px-14 py-2 text-white bg-redPrimary rounded-lg"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NewUser;
