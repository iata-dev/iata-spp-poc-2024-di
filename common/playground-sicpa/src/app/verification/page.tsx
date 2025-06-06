"use client";
import type { NextPage } from "next";
import { useState, Suspense, useEffect } from "react";
import { useQRCode } from "next-qrcode";
import Link from "next/link";

const Verification: NextPage = () => {
  const [qrCodeText, setQrCodeText] = useState<string>();
  const [scheme, setScheme] = useState("openid-vc");
  const [isLoading, setIsLoading] = useState(false);
  const delay = (ms: number | undefined) =>
    new Promise((res) => setTimeout(res, ms));
  const [referenceId, setReferenceId] = useState(null);
  const [status, setStatus] = useState('');

  const onSchemaOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScheme(e.target.value);
  };

  const callAPI = async () => {
    console.log("calling API");
    setIsLoading(true);
    setStatus("PENDING");
    setReferenceId(null)

    try {
      const res = await fetch(`/api/verification`, { cache: "no-cache" });
      const data = await res.json();
      console.log(data.verification.credentialOfferUri);

      const urlEncodedRequestUri = data.verification.authorizationRequestUri;
      setReferenceId(data.verification.referenceId);

      const urlEncodedClientId ="did:web:did-doc-dts-dev-features.s3.eu-central-2.amazonaws.com:492e27e3-0bda-44ba-bb42-65029fa55e07"

      setQrCodeText(
        `?client_id=${urlEncodedClientId}&request_uri=${urlEncodedRequestUri}`
        // `openid4vp://?request_uri=${urlEncodedRequestUri}`
      );
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  const { Canvas, SVG } = useQRCode();

  useEffect(() => {
    if (referenceId) {
      const interval = setInterval(async () => {
        try {
          const res = await fetch(
            `/api/verification/${referenceId}`, { 
              cache: "no-cache",
              method: "GET"
            }
          );
          const data = await res.json();
          const status = data.verifidationStatus;
          setStatus(status);
          if(status==="FAILED" || status==="PASSED") clearInterval(interval);

        } catch (error) {
          console.error('Error fetching status:', error);
          setStatus("ERROR");
        }
      }, 2000);

      return () => clearInterval(interval); // Cleanup interval on component unmount
    }
  }, [referenceId]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-white">
      <h1 className="text-3xl font-bold mb-2">Verification Process</h1>
      <p className="text-lg text-gray-600 mb-8 text-center max-w-2xl">
      Verify digital credentials securely using the latest OpenID4VP standards.
      </p>
      <div className="flex flex-row px-24 gap-16 grid-cols-2">
        <div className="flex-none">
          <div className="pt-6">
            <button
              disabled={isLoading}
              onClick={() => callAPI()}
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            >
              Start Verification
            </button>
          </div>
          {/* Hidden blocks */}
          <div className="hidden">
            {/* Credential Format block */}
          </div>
          <div className="hidden">
            {/* Scheme block */}
          </div>
        </div>
        <div className="grow">
          <div className="bg-gray-50 p-5 rounded-md w-[340px] h-[340px] border border-gray-300 shadow-sm">
            {isLoading && (
              <div className="flex items-center justify-center">
                <span className="text-3xl mr-4">Loading</span>
                <svg className="animate-spin h-5 w-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={4}></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            )}
            {qrCodeText && !isLoading && (
              <Link href={`openid-vc://${qrCodeText}`} target="_blank">
                <Canvas
                  text={`openid-vc://${qrCodeText}`}
                  options={{
                    margin: 2,
                    scale: 4,
                    width: 300,
                    color: {
                      dark: "#010599FF",
                      light: "#FFFFFFFF",
                    },
                  }}
                />
              </Link>
            )}
          </div>
          <div className="mt-4 p-4 rounded-md border border-gray-200 shadow-sm h-16 flex items-center justify-center">
            {referenceId && (
              <div className="flex items-center justify-center">
                {status === "VERIFIED" ? (
                  <span className="inline-flex items-center bg-green-100 text-green-800 text-sm font-medium px-4 py-2 rounded-full">
                    <svg className="w-4 h-4 mr-2 fill-current" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Credential {status}
                  </span>
                ) : status === "PENDING" ? (
                  <span className="inline-flex items-center bg-yellow-100 text-yellow-800 text-sm font-medium px-4 py-2 rounded-full">
                    <svg className="w-4 h-4 mr-2 animate-spin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 22C17.5228 22 22 17.5228 22 12H19C19 15.866 15.866 19 12 19V22Z" fill="currentColor" />
                    </svg>
                    Verification {status}
                  </span>
                ) : (
                  <span className="inline-flex items-center bg-red-100 text-red-800 text-sm font-medium px-4 py-2 rounded-full">
                    <svg className="w-4 h-4 mr-2 fill-current" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    Verification {status}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="hidden w-9/12 pt-4">
        {/* Hidden URL block */}
      </div>
    </main>
  );
};

export default Verification;
