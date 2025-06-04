import React, { useEffect } from "react";
import { API } from "../api";
import {
  IAgencyResponse,
  IRequestQRResponse,
  IRPVerificationDisplayStatus,
} from "../interface";
import QRCode from "react-qr-code";
import { useNavigate } from "react-router-dom";

interface ModalProps {
  isOpen: boolean;
  onLegacyClick: () => void;
  onClose: () => void;
}

const SignUpModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onLegacyClick,
}) => {
  const [qrCode, setQrCode] = React.useState<string | null>(null);
  const [credProofId, setCredProofId] = React.useState<string | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const requestRPQrCode = async () => {
      // Make a request to the backend to generate a QR code
      // This can be done using the Axios API or Axios
      const RPRequestResponse: IRequestQRResponse =
        await API.post("/api/proof-request");
      if (RPRequestResponse.data) {
        setQrCode(RPRequestResponse.data.longUrl);
        setCredProofId(RPRequestResponse.data.credProofId);
      }
    };
    if (isOpen) {
      requestRPQrCode();
    }
  }, [isOpen]);

  useEffect(() => {
    if (credProofId) {
      const interval = setInterval(async () => {
        try {
          const response: IAgencyResponse = await API.get(
            `/api/auth/agencies/${credProofId}`,
          );

          if (response.success) {
            if (
              response.success &&
              (response.data.state === IRPVerificationDisplayStatus.SENT ||
                response.data.state === IRPVerificationDisplayStatus.SUCCESS)
            ) {
              clearInterval(interval);
              navigate("/scanning", { state: { credProofId } });
            }
          }
        } catch (error) {
          console.error("Error fetching offer status:", error);
        }
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [credProofId, navigate]);
  if (!isOpen || !qrCode || !credProofId) return null; // Ensure the modal is hidden when `isOpen` is false.
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      {/* Modal container */}
      <div className="bg-white rounded-lg shadow-lg w-[900px] flex overflow-hidden relative">
        {/* Left Section */}
        <div className="w-full flex items-center justify-between ml-12 ">
          <img
            src="/assets/download.png" // Replace with the actual logo path
            alt="Air Canada Connex"
            className="w-64 mb-4 "
          />
        </div>
        <div className="w-full p-8 flex flex-col items-center justify-center">
          {/* Right Section */}
          <div className="w-full flex items-center justify-between ">
            <p className="text-xs text-gray-700 mb-4 mr-2 text-left">
              Sign up with digital ID for instant registration
            </p>
            {qrCode ? (
              <QRCode value={qrCode} />
            ) : (
              <div className="w-40 h-40 mb-4 rounded-md">
                Generating QR Code...
              </div>
            )}
          </div>
          <div className="w-full flex items-center justify-between ">
            <p className="text-xs text-gray-700 mb-4 mr-2 text-left">
              Legacy process can take up to 7 business days
            </p>
            <button
              className="bg-redPrimary  w-full text-white px-6 py-4 text-sm rounded-sm"
              onClick={() => {
                onClose(); // Close the current modal
                onLegacyClick(); // Trigger the legacy process
              }}
            >
              Legacy registration
            </button>
          </div>
        </div>
        {/* Close Button */}
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
    </div>
  );
};

export default SignUpModal;
