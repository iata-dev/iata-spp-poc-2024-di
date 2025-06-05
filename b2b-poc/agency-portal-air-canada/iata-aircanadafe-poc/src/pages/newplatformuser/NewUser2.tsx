import React from "react";
import { useFormik } from "formik";
import { NavigateFunction, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { API } from "../../api";

const NewUser2: React.FC = () => {
  const location = useLocation();
  const navigate: NavigateFunction = useNavigate();
  const { verifyData } = location.state || {};
  const { rpValue } = verifyData || {};
  console.log(rpValue?.pcc);
  const formik = useFormik({
    initialValues: {
      employeeID: rpValue?.employeeID || "",
      salutation: rpValue?.salutation || "Mr.",
      givenName: rpValue?.givenName || "",
      surname: rpValue?.surname || "",
      jobTitle: rpValue?.jobTitle || "",
      email: rpValue?.email || "",
      localNumber: rpValue?.localNumber || "",
      countryCode: rpValue?.countryCode || "",
      pcc: (() => {
        // Check if pcc is a comma-separated string (old format)
        if (typeof rpValue?.pcc === "string") {
          return rpValue.pcc.split(",").map((item) => item.trim()); // Split by commas and remove extra spaces
        }
        // Otherwise, assume it's the new format (pcc[0], pcc[1], ...)
        return (
          Object.keys(rpValue)
            .filter((key) => key.startsWith("pcc["))
            .map((key) => rpValue[key]) || [""]
        );
      })(),
    },
    onSubmit: async (values) => {
      console.log("Form submitted with values: ", values);
    },
  });

  const createProfile = async () => {
    try {
      if (rpValue) {
        const createUserProfileInIDP = await API.post(
          "/api/idp/register-profile",
          rpValue,
        );
        if (createUserProfileInIDP) {
          navigate("/successful-login", { state: { newProfile: true } });
        }
      }
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage: `url('/assets/BG.png')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Navbar />
      <main className="flex-grow flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg w-full  max-w-5xl">
          {/* Card Content */}

          <div className="flex items-center bg-gray-200 gap-3 px-6 py-4 justify-start">
            <svg
              width="14"
              height="16"
              viewBox="0 0 14 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 0.4375C4.34969 0.4375 2.1875 2.59969 2.1875 5.25C2.1875 6.90688 3.03312 8.37812 4.31462 9.24644C1.86231 10.2983 0.125 12.7321 0.125 15.5625H1.5C1.5 12.5169 3.95438 10.0625 7 10.0625C10.0456 10.0625 12.5 12.5169 12.5 15.5625H13.875C13.875 12.7321 12.1377 10.299 9.68538 9.24575C10.3396 8.8044 10.8756 8.20934 11.2465 7.51273C11.6173 6.81611 11.8117 6.03918 11.8125 5.25C11.8125 2.59969 9.65031 0.4375 7 0.4375ZM7 1.8125C8.90644 1.8125 10.4375 3.34356 10.4375 5.25C10.4375 7.15644 8.90644 8.6875 7 8.6875C5.09356 8.6875 3.5625 7.15644 3.5625 5.25C3.5625 3.34356 5.09356 1.8125 7 1.8125Z"
                fill="#EB2226"
              />
            </svg>

            <h2 className="text-lg font-normal">User Details</h2>
          </div>
          <form>
            <div className="px-6 mt-5 flex items-center justify-between">
              <div className="flex items- w-full">
                <h2 className="text-sm font-normal ml-10">
                  Profile data per IATA ID details
                </h2>
              </div>
              <div className="flex items- w-full  justify-end gap-2 mb-4 ">
                <h2 className="text-sm font-normal">
                  *Contact your agency admin to edit this information
                </h2>
              </div>
            </div>
            <div className="w-full max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-1 gap-6 py-2">
                <div>
                  <label
                    htmlFor="employeeID"
                    className="block text-sm font-medium"
                  >
                    Employee ID Number
                  </label>
                  <input
                    type="text"
                    id="employeeID"
                    name="employeeID"
                    value={formik.values.employeeID}
                    readOnly={true}
                    className="mt-1 bg-[#C0C0C0] block w-full border-gray-300 rounded-md shadow-sm focus:ring-redPrimary focus:border-redPrimary"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-2">
                <div>
                  <label
                    htmlFor="salutation"
                    className="block text-sm font-medium"
                  >
                    Title
                  </label>
                  <select
                    id="salutation"
                    name="salutation"
                    value={formik.values.salutation}
                    className="mt-1 block bg-[#C0C0C0] w-full border-gray-300 rounded-md shadow-sm focus:ring-redPrimary focus:border-redPrimary"
                  >
                    <option>Mr.</option>
                    <option>Ms.</option>
                    <option>Dr.</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="givenName"
                    className="block text-sm font-medium"
                  >
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="givenName"
                    name="givenName"
                    value={formik.values.givenName}
                    readOnly={true}
                    required
                    className="mt-1 block bg-[#C0C0C0] w-full border-gray-300 rounded-md shadow-sm focus:ring-redPrimary focus:border-redPrimary"
                  />
                  {formik.touched.givenName && formik.errors.givenName && (
                    <div className="text-red-500">
                      {(formik.errors.givenName as string) || ""}
                    </div>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="surname"
                    className="block text-sm font-medium"
                  >
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="surname"
                    name="surname"
                    value={formik.values.surname}
                    required
                    readOnly={true}
                    className="mt-1 bg-[#C0C0C0] block w-full border-gray-300 rounded-md shadow-sm focus:ring-redPrimary focus:border-redPrimary"
                  />
                  {formik.errors.surname && formik.touched.surname && (
                    <div className="text-red-500">
                      {formik.errors.surname as string}
                    </div>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-2">
                <div>
                  <label
                    htmlFor="countryCode"
                    className="block text-sm font-medium"
                  >
                    Country Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="countryCode"
                    name="countryCode"
                    value={formik.values.countryCode}
                    required
                    readOnly={true}
                    className="mt-1 bg-[#C0C0C0] block w-full border-gray-300 rounded-md shadow-sm focus:ring-redPrimary focus:border-redPrimary"
                  />
                  {formik.errors.countryCode && formik.touched.countryCode && (
                    <div className="text-red-500">
                      {formik.errors.countryCode as string}
                    </div>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="localNumber"
                    className="block text-sm font-medium"
                  >
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="localNumber"
                    name="localNumber"
                    value={formik.values.localNumber}
                    readOnly={true}
                    required
                    className="mt-1 bg-[#C0C0C0] block w-full border-gray-300 rounded-md shadow-sm focus:ring-redPrimary focus:border-redPrimary"
                  />
                  {formik.errors.localNumber && formik.touched.localNumber && (
                    <div className="text-red-500">
                      {formik.errors.localNumber as string}
                    </div>
                  )}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formik.values.email}
                    readOnly={true}
                    className="mt-1 block bg-[#C0C0C0] w-full border-gray-300 rounded-md shadow-sm focus:ring-redPrimary focus:border-redPrimary"
                  />
                  {formik.errors.email && formik.touched.email && (
                    <div className="text-red-500">
                      {formik.errors.email as string}
                    </div>
                  )}
                </div>
              </div>

              <div className="py-4">
                <h4 className="font-semibold text-sm">PCC Codes</h4>
                {formik.values.pcc.map((code: string, index: number) => (
                  <div key={index} className="flex items-start flex-col gap-2">
                    <input
                      type="text"
                      value={code}
                      onChange={(e) => {
                        const newPcc = [...formik.values.pcc];
                        newPcc[index] = e.target.value;
                        formik.setFieldValue("pcc", newPcc);
                      }}
                      readOnly={true}
                      className="mt-1 bg-[#C0C0C0] block w-full border-gray-300 rounded-md shadow-sm focus:ring-redPrimary focus:border-redPrimary"
                    />
                  </div>
                ))}
              </div>
            </div>
          </form>
          <div className="flex justify-end gap-4 mb-12 mr-14">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="text-slate-600 border rounded-md px-4 py-2"
            >
              Cancel
            </button>
            <button
              onClick={createProfile}
              className="bg-redPrimary text-white rounded-md px-4 py-2"
            >
              Create Profile
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
export default NewUser2;
