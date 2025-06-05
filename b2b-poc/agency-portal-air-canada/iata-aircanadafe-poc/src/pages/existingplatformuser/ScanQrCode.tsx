import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

const RequestCredential: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleScan = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigate("/request-credential", { state: { showToast: true } });
    }, 3000);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div
        className="relative bg-cover bg-center h-40"
        style={{
          backgroundImage: "url('/assets/background.png')",
        }}
      ></div>
      <div className="flex-grow flex justify-center items-center bg-slate-100">
        <div className="bg-white bg-opacity-80 shadow-lg rounded-lg w-full max-w-md p-8">
          <div>
            <div className="py-2 border-b border-slate-200">
              <div className="font-semibold text-slate-800">
                Request Employee Credential
              </div>
            </div>
            <div className="flex justify-between items-center gap-8">
              <div className="mt-6">
                <div className="py-6 text-slate-900 text-2xl font-medium">
                  Scan QR Code to proceed
                </div>
                <div className="text-slate-600 text-base font-normal">
                  Use your phone’s camera to scan the QR Code. <br /> Once
                  scanned, you’ll be directed to the next step.
                </div>
              </div>
              <div className="mt-8 flex justify-center items-center">
                <img
                  src="https://via.placeholder.com/150"
                  alt="QR Code"
                  className="w-32 h-32 border border-gray-300 rounded-md"
                />
              </div>
            </div>

            {/* Scanning in progress message */}
            {loading && (
              <div className="mt-8 flex justify-center items-center">
                <div className="text-slate-900 text-xl font-semibold text-center">
                  Scanning in progress. <br />
                  Please wait while the information is being processed. <br />
                  This will only take a moment.
                </div>
              </div>
            )}

            <div className="mt-6 flex justify-end space-x-2">
              <button
                onClick={handleScan}
                className="btn-sm bg-blue-600 text-white hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? "Scanning..." : "Start Scan"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RequestCredential;
