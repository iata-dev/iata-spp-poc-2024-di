import React, { useState } from "react";

// Define the interface for employee data
interface EmployeeData {
  id: string;
  name: string;
  status: string;
  dateCreated: string;
  token: string;
  credentialDetails: {
    label: string;
    value: string;
  }[];
}

interface AddEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddEmployee: (employee: EmployeeData) => void;
}

const AddEmployeeModal: React.FC<AddEmployeeModalProps> = ({
  isOpen,
  onClose,
  onAddEmployee,
}) => {
  const [employeeData, setEmployeeData] = useState({
    employeeId: "",
    title: "",
    firstName: "",
    lastName: "",
    role: "",
    phoneNumber: "",
    emailAddress: "",
    pcc: [""] as string[], // PCC codes as an array
  });

  // To track form validation errors
  const [errors, setErrors] = useState<any>({});

  if (!isOpen) {
    return null; // Return null instead of false
  }

  // Handle input changes and update state
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setEmployeeData({ ...employeeData, [name]: value });
  };

  // Add new PCC input field
  const handleAddPcc = () => {
    setEmployeeData((prev) => ({
      ...prev,
      pcc: [...prev.pcc, ""], // Add a new blank entry for PCC
    }));
  };

  // Handle changes in PCC input fields
  const handlePccChange = (index: number, value: string) => {
    const updatedPcc = [...employeeData.pcc];
    updatedPcc[index] = value;
    setEmployeeData({ ...employeeData, pcc: updatedPcc });
  };

  // Validate form fields before submission
  const validateForm = () => {
    const newErrors: any = {};
    if (!employeeData.firstName) newErrors.firstName = "First Name is required";
    if (!employeeData.lastName) newErrors.lastName = "Last Name is required";
    if (!employeeData.role) newErrors.role = "Role is required";
    if (!employeeData.phoneNumber)
      newErrors.phoneNumber = "Phone Number is required";
    if (!employeeData.emailAddress)
      newErrors.emailAddress = "Email Address is required";
    if (!/\S+@\S+\.\S+/.test(employeeData.emailAddress))
      newErrors.emailAddress = "Email Address is invalid";
    if (!/^\d{10}$/.test(employeeData.phoneNumber))
      newErrors.phoneNumber = "Phone Number should be 10 digits";

    return newErrors;
  };

  // Submit form
  const handleSubmit = () => {
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      const newEmployee = {
        id: Date.now().toString(),
        name: `${employeeData.firstName} ${employeeData.lastName}`,
        status: "Onboarded",
        dateCreated: new Date().toLocaleDateString(),
        token: "",
        credentialDetails: [
          { label: "Employee ID", value: employeeData.employeeId },
          { label: "Title", value: employeeData.title },
          { label: "First Name", value: employeeData.firstName },
          { label: "Last Name", value: employeeData.lastName },
          { label: "Role", value: employeeData.role },
          { label: "Phone Number", value: employeeData.phoneNumber },
          { label: "Email", value: employeeData.emailAddress },
          ...employeeData.pcc.map((pcc, index) => ({
            label: `PCC Code ${index + 1}`,
            value: pcc,
          })),
        ],
      };

      onAddEmployee(newEmployee);
      onClose(); // Close modal after submission
    } else {
      setErrors(newErrors); // Set validation errors
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-120">
          <div className="py-2 mb-6 border-b border-slate-200">
            <div className="flex justify-between items-center">
              <div className="font-semibold text-slate-800">New Employee</div>
              <button
                className="text-slate-400 dark:text-slate-500 hover:text-slate-500"
                onClick={onClose}
              >
                <div className="sr-only">Close</div>
                <svg className="w-4 h-4 fill-current">
                  <path d="M7.95 6.536l4.242-4.243a1 1 0 111.415 1.414L9.364 7.95l4.243 4.242a1 1 0 11-1.415 1.415L7.95 9.364l-4.243 4.243a1 1 0 01-1.414-1.415L6.536 7.95 2.293 3.707a1 1 0 011.414-1.414L7.95 6.536z" />
                </svg>
              </button>
            </div>
          </div>
          <div className="w-full max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-1 gap-6 py-2">
              <div>
                <label
                  htmlFor="employeeId"
                  className="block text-sm font-medium"
                >
                  Employee ID Number
                </label>
                <input
                  type="text"
                  id="employeeId"
                  name="employeeId"
                  value={employeeData.employeeId}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-redPrimary focus:border-redPrimary"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-2">
              <div>
                <label htmlFor="title" className="block text-sm font-medium">
                  Title
                </label>
                <select
                  id="title"
                  name="title"
                  value={employeeData.title}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-redPrimary focus:border-redPrimary"
                >
                  <option>Mr.</option>
                  <option>Ms.</option>
                  <option>Dr.</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium"
                >
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={employeeData.firstName}
                  onChange={handleChange}
                  required
                  pattern="^[A-Za-z]+$" // Example pattern: only alphabetic characters
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-redPrimary focus:border-redPrimary"
                />
                {errors.firstName && (
                  <div className="text-red-500">{errors.firstName}</div>
                )}
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={employeeData.lastName}
                  onChange={handleChange}
                  required
                  pattern="^[A-Za-z]+$" // Example pattern: only alphabetic characters
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-redPrimary focus:border-redPrimary"
                />
                {errors.lastName && (
                  <div className="text-red-500">{errors.lastName}</div>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-2">
              <div>
                <label htmlFor="role" className="block text-sm font-medium">
                  Role <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  value={employeeData.role}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-redPrimary focus:border-redPrimary"
                />
                {errors.role && (
                  <div className="text-red-500">{errors.role}</div>
                )}
              </div>
              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium"
                >
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={employeeData.phoneNumber}
                  onChange={handleChange}
                  required
                  pattern="^\d{10}$"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-redPrimary focus:border-redPrimary"
                />
                {errors.phoneNumber && (
                  <div className="text-red-500">{errors.phoneNumber}</div>
                )}
              </div>
              <div>
                <label
                  htmlFor="emailAddress"
                  className="block text-sm font-medium"
                >
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="emailAddress"
                  name="emailAddress"
                  value={employeeData.emailAddress}
                  onChange={handleChange}
                  required
                  pattern="^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-redPrimary focus:border-redPrimary"
                />
                {errors.emailAddress && (
                  <div className="text-red-500">{errors.emailAddress}</div>
                )}
              </div>
            </div>

            <div className="py-4">
              <h4 className="font-semibold text-sm">PCC Codes</h4>
              {employeeData.pcc.map((pcc, index) => (
                <div key={index} className="flex items-start flex-col gap-2">
                  <input
                    type="text"
                    value={pcc}
                    onChange={(e) => handlePccChange(index, e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-redPrimary focus:border-redPrimary"
                  />
                  {index === employeeData.pcc.length - 1 && (
                    <button
                      type="button"
                      onClick={handleAddPcc}
                      className="text-redPrimary"
                    >
                      <div className="h-[30px] py-[5px] justify-start items-start gap-[5px] inline-flex">
                        <svg
                          width="21"
                          height="20"
                          viewBox="0 0 21 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10.4998 6.66675V10.0001M10.4998 10.0001V13.3334M10.4998 10.0001H13.8332M10.4998 10.0001H7.1665M18.8332 10.0001C18.8332 14.6025 15.1022 18.3334 10.4998 18.3334C5.89746 18.3334 2.1665 14.6025 2.1665 10.0001C2.1665 5.39771 5.89746 1.66675 10.4998 1.66675C15.1022 1.66675 18.8332 5.39771 18.8332 10.0001Z"
                            stroke="#252525"
                            stroke-width="1.67"
                            stroke-linecap="round"
                          />
                        </svg>

                        <div className="text-[#252525] text-sm font-medium font-['Inter'] leading-tight">
                          Add PCC code
                        </div>
                      </div>
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-4">
              <button
                onClick={onClose}
                className="text-slate-600 border rounded-md px-4 py-2"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="bg-redPrimary text-white rounded-md px-4 py-2"
              >
                Save Employee
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default AddEmployeeModal;
