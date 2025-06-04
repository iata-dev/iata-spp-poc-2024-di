import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface AgencyData {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  phoneNumber: string;
  emailAddress: string;
  pcc: string[];
  dateCreated: string;
  token: string;
}

const RegisterAgencyModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  // To track form validation errors
  const [errors, setErrors] = useState<Partial<AgencyData> | undefined>();
  const [formData, setFormData] = useState({
    employeeId: "",
    title: "",
    firstName: "",
    lastName: "",
    role: "",
    phoneNumber: "",
    emailAddress: "",
    agencyName: "",
    agencyContactNo: "",
    agencyAddress: "",
    agencyCountry: "",
    agencyState: "",
    agencyCity: "",
    agencyPostalCode: "",
    agencyIATACode: "",
    agencyIATACodeCountry: "",
  });
  if (!isOpen) return null; // Ensure the modal is hidden when `isOpen` is false.

  // Handle input changes and update state
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate form fields before submission
  const validateForm = () => {
    const newErrors: Partial<AgencyData> = {};
    if (!formData.firstName) newErrors.firstName = "First Name is required";
    if (!formData.lastName) newErrors.lastName = "Last Name is required";
    if (!formData.role) newErrors.role = "Role is required";
    if (!formData.phoneNumber)
      newErrors.phoneNumber = "Phone Number is required";
    if (!formData.emailAddress)
      newErrors.emailAddress = "Email Address is required";
    if (!/\S+@\S+\.\S+/.test(formData.emailAddress))
      newErrors.emailAddress = "Email Address is invalid";
    if (!/^\d{10}$/.test(formData.phoneNumber))
      newErrors.phoneNumber = "Phone Number should be 10 digits";

    return newErrors;
  };

  // Submit form
  const handleSubmit = () => {
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      // Proceed with form submission
      console.log("Form submitted:", formData);
      navigate("/successful-login");
    } else {
      setErrors(newErrors); // Set validation errors
    }
  };
  return (
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
        <div className="w-full p-8 flex flex-col items-center justify-center">
          <div className="flex justify-end w-full">
            <h2 className="text-xs text-gray-500 font-normal py-2">
              To update the profile details please contact your Agency
              administrator.
            </h2>
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
              onClick={onClose}
              aria-label="Close Modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="">
            {/* Card Header */}
            <div className="flex items-center rounded-t-lg bg-gray-100 justify-start gap-2 ">
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-1">
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
                      value={formData.title}
                      onChange={handleChange}
                      className="mt-1 block w-full border-gray-300 text-grayPrimary text-xs font-normal rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option>Mr.</option>
                      <option>Ms.</option>
                      <option>Dr.</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-grayPrimary text-xs font-normal"
                    >
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      pattern="^[A-Za-z]+$"
                      className="mt-1 block w-full border-gray-300 text-grayPrimary text-xs font-normal rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors?.firstName && (
                      <div className="text-red-500">{errors.firstName}</div>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-grayPrimary text-xs font-normal"
                    >
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      pattern="^[A-Za-z]+$"
                      className="mt-1 block w-full border-gray-300 rounded-md text-grayPrimary text-xs font-normal shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors?.lastName && (
                      <div className="text-red-500">{errors.lastName}</div>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-1">
                  <div>
                    <label
                      htmlFor="phoneNumber"
                      className="block text-grayPrimary text-xs font-normal"
                    >
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      required
                      pattern="^\d{10}$"
                      className="mt-1 block w-full border-gray-300 text-grayPrimary text-xs font-normal rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors?.phoneNumber && (
                      <div className="text-red-500">{errors.phoneNumber}</div>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="emailAddress"
                      className="block text-grayPrimary text-xs font-normal"
                    >
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="emailAddress"
                      name="emailAddress"
                      value={formData.emailAddress}
                      onChange={handleChange}
                      required
                      pattern="^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$"
                      className="mt-1 block w-full border-gray-300 text-grayPrimary text-xs font-normal rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors?.emailAddress && (
                      <div className="text-red-500">{errors.emailAddress}</div>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-1">
                  <div>
                    <label
                      htmlFor="title"
                      className="block text-grayPrimary text-xs font-normal"
                    >
                      Preferred language for Notifications
                    </label>
                    <select
                      id="title"
                      name="title"
                      className="mt-1 block w-full border-gray-300 text-grayPrimary text-xs font-normal rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option>English</option>
                      <option>French</option>
                    </select>
                  </div>
                  <div>
                    <h2 className="text-xs text-gray-500 font-normal py-4">
                      Using a corporate email domain is recommended for fraud
                      prevention and to expedite the authentication process
                    </h2>
                  </div>
                </div>
              </div>
              {/* Card Header */}
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

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-1">
                <div>
                  <label
                    htmlFor="agencyName"
                    className="block text-grayPrimary text-xs font-normal"
                  >
                    Agency Name
                  </label>
                  <input
                    type="text"
                    id="agencyName"
                    name="agencyName"
                    value={formData.agencyName}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 text-grayPrimary text-xs font-normal rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="agencyContactNo"
                    className="block text-grayPrimary text-xs font-normal"
                  >
                    Agency Phone Number
                  </label>
                  <input
                    type="text"
                    id="agencyContactNo"
                    name="agencyContactNo"
                    value={formData.agencyContactNo}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 text-grayPrimary text-xs font-normal rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="agencyAddress"
                    className="block text-grayPrimary text-xs font-normal"
                  >
                    Agency Address
                  </label>
                  <input
                    type="text"
                    id="agencyAddress"
                    name="agencyAddress"
                    value={formData.agencyAddress}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300  text-grayPrimary text-xs font-normal rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-2">
                <div>
                  <label
                    htmlFor="agencyAddress"
                    className="block text-grayPrimary text-xs font-normal"
                  >
                    Street Number
                  </label>
                  <input
                    type="text"
                    id="agencyAddress"
                    name="agencyAddress"
                    value={formData.agencyAddress}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 text-grayPrimary text-xs font-normal rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="agencyAddress"
                    className="block text-grayPrimary text-xs font-normal"
                  >
                    Street Name
                  </label>
                  <input
                    type="text"
                    id="agencyAddress"
                    name="agencyAddress"
                    value={formData.agencyAddress}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm text-grayPrimary text-xs font-normal focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="agencyCountry"
                    className="block text-grayPrimary text-xs font-normal"
                  >
                    Country
                  </label>
                  <select
                    id="agencyCountry"
                    name="agencyCountry"
                    value={formData.agencyCountry}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 text-grayPrimary text-xs font-normal rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option>Canada</option>
                    <option disabled>United States</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-1">
                <div>
                  <label
                    htmlFor="agencyState"
                    className="block text-grayPrimary text-xs font-normal"
                  >
                    Province/State
                  </label>
                  <input
                    type="text"
                    id="agencyState"
                    name="agencyState"
                    value={formData.agencyState}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="agencyCity"
                    className="block text-grayPrimary text-xs font-normal"
                  >
                    City Name
                  </label>
                  <input
                    type="text"
                    id="agencyCity"
                    name="agencyCity"
                    value={formData.agencyCity}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="agencyPostalCode"
                    className="block text-grayPrimary text-xs font-normal"
                  >
                    Postal/ZIP Code
                  </label>
                  <input
                    type="text"
                    id="agencyPostalCode"
                    name="agencyPostalCode"
                    value={formData.agencyPostalCode}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-1">
                <div>
                  <label
                    htmlFor="agencyIATACode"
                    className="block text-grayPrimary text-xs font-normal"
                  >
                    IATA/ARC
                  </label>
                  <input
                    type="text"
                    id="agencyIATACode"
                    name="agencyIATACode"
                    value={formData.agencyIATACode}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="agencyCountry"
                    className="block text-grayPrimary text-xs font-normal"
                  >
                    America/Toronto
                  </label>
                  <select
                    id="agencyIATACodeCountry"
                    name="agencyIATACodeCountry"
                    value={formData.agencyIATACodeCountry}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 text-grayPrimary text-xs font-normal rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option>Toronto</option>
                    <option disabled>United States</option>
                  </select>
                </div>
              </div>
              <h2 className="text-xs text-gray-500 font-normal py-1 italic">
                Find list of supported POS under the country field. View our{" "}
                <span className="text-blue-500"> NDC roadmap</span> as we
                continue expanding our program to new markets.
              </h2>
              <div className="flex justify-end mt-4">
                <button className="bg-white text-black border border-gray-300 mr-4 rounded-md px-4 py-2">
                  Go to registration options
                </button>
                <button
                  onClick={handleSubmit}
                  className="bg-redPrimary text-white rounded-md px-4 py-2"
                >
                  Get validation code
                </button>
              </div>
            </form>
          </div>
        </div>
        {/* Close Button */}
      </div>
    </div>
  );
};

export default RegisterAgencyModal;
