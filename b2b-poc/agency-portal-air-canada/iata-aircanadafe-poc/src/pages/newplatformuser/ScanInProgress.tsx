import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import useHistory
import Navbar from "../../components/Navbar";
import { IAgencyResponse, IRPVerificationDisplayStatus } from "../../interface";
import { API } from "../../api";
import { toast } from "react-toastify";

const ScanInProgress = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const credProofId = location.state.credProofId;
  const screen = location.state.screen;

  useEffect(() => {
    if (credProofId) {
      const interval = setInterval(async () => {
        try {
          const apiURL =
            screen === "employee-signup"
              ? "/api/auth/agencies/employee"
              : "/api/auth/agencies";
          const response: IAgencyResponse = await API.get(
            `${apiURL}/${credProofId}`,
          );

          if (response.success) {
            if (
              response.success &&
              response.data.state === IRPVerificationDisplayStatus.SUCCESS &&
              response.data.verified
            ) {
              clearInterval(interval);
              if (screen === "employee-signup") {
                console.log(
                  response.data.agencyRecord.agencyEmployeeIdpId.includes(
                    response?.data?.rpValue?.email,
                  ),
                );
                if (
                  response.data.agencyRecord.agencyEmployeeIdpId.includes(
                    response?.data?.rpValue?.email,
                  )
                ) {
                  console.log(response.data.agencyRecord.agencyIdpId);
                  navigate("/successful-login");
                } else {
                  navigate("/new-user-2", {
                    state: { verifyData: response.data },
                  });
                }
              } else {
                if (response.data.agencyRecord.isAgencyRegistered) {
                  toast.error(
                    "Agency already registered. Please log in to continue!",
                  );
                  navigate("/");
                } else {
                  navigate("/new-user", {
                    state: { verifyData: response.data },
                  });
                }
              }
            }
          }
        } catch (error) {
          console.error("Error fetching offer status:", error);
        }
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [credProofId, navigate, screen]);

  const backToLogIn: () => void = (): void => {
    navigate("/");
  };
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow bg-gray-50 flex items-center justify-center ">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-xl">
          {/* Card Header */}
          <div className="flex items-center rounded-t-lg bg-gray-200 px-6 py-4 justify-start gap-2 border-b pb-4 mb-4">
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.134 1.5C5.468 1.56 3.911 1.815 2.847 2.875C1.915 3.803 1.604 5.108 1.5 7.2M13.866 1.5C16.532 1.56 18.089 1.815 19.153 2.875C20.085 3.803 20.396 5.108 20.5 7.2M13.866 20.5C16.532 20.44 18.089 20.185 19.153 19.125C20.085 18.197 20.396 16.892 20.5 14.8M8.134 20.5C5.468 20.44 3.911 20.185 2.847 19.125C1.915 18.197 1.604 16.892 1.5 14.8M6.5 16C8.832 13.558 13.143 13.443 15.5 16M13.495 8.5C13.495 9.88 12.375 11 10.992 11C10.6634 11.0005 10.3378 10.9362 10.0341 10.8108C9.73029 10.6854 9.45422 10.5014 9.22165 10.2692C8.98908 10.037 8.80457 9.76121 8.67868 9.45763C8.5528 9.15406 8.488 8.82864 8.488 8.5C8.488 7.12 9.608 6 10.992 6C11.3206 5.99961 11.646 6.06398 11.9496 6.18944C12.2533 6.3149 12.5292 6.49899 12.7617 6.73117C12.9942 6.96336 13.1786 7.23909 13.3044 7.5426C13.4302 7.84611 13.495 8.17144 13.495 8.5Z"
                stroke="#DD3534"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <h2 className="text-lg font-normal">Verification</h2>
          </div>

          {/* Card Content */}
          <div className="p-6 flex items-center justify-between">
            {/* Left Content */}
            <div className="flex flex-col mr-12 ">
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Scanning in progress
                </h3>
                <p className="text-sm text-gray-600">
                  Please wait while the QR code is being scanned and processed.
                  This will only take a moment.
                </p>
              </div>
              {/* Back to Log in Button */}
              <button
                onClick={() => backToLogIn()}
                className="relative text-redPrimary w-32 bg-[#E2E2E2] rounded-md overflow-hidden group"
              >
                {/* Hover Effect */}
                <span className="absolute inset-0 bg-redPrimary scale-x-0 transform origin-left transition-transform duration-1000 ease-out group-hover:scale-x-100"></span>
                <div className="relative flex items-center justify-center z-10 py-2 rounded-lg">
                  <span className="text-sm font-normal text-gray-600 group-hover:text-white">
                    Back to Login
                  </span>
                </div>
              </button>
            </div>

            {/* Right Image */}
            <div className="ml-6">
              <div className="w-36 h-36 bg-blue-100 rounded-full flex items-center justify-center">
                <img
                  src="/assets/phone.png"
                  alt="Phone"
                  className="w-34 h-34"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ScanInProgress;
