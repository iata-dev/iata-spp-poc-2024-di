"use client";

import type { NextPage } from "next";
import { useState, Suspense, useEffect, FormEvent } from "react";
import { useQRCode } from "next-qrcode";
import { visaVcSchema, credentialSchemaSample, electronicPassportSchema, loyaltyScheme, boardingPassSchema, liveBiometricsSchema, orderSchema, corporateSchema } from './credshemas';
import Link from "next/link";
import Form, { IChangeEvent } from '@rjsf/core';
import { UiSchema } from '@rjsf/utils';
import { customizeValidator } from '@rjsf/validator-ajv8';

const formData = new FormData();

const validator = customizeValidator<FormData>();

const uiSchema: UiSchema = {
  "ui:submitButtonOptions": { "submitText": "Request Credential" },
  'ui:widget': 'textarea',
  'ui:options': {
    semantic: {
      errorOptions: {
        size: 'small',
        pointing: 'below',
      },
    },
  },
};

const selectSchema = {
  title: "Choose Credential Type",
  type: "object",
  properties: {
    credentialType: {
      type: "string",
      title: "Select Credential Type",
      enum: ["Credential 1", "Credential 2", "Credential 3"]
    }
  }
};

const Issuance: NextPage = () => {
  const [qrCodeText, setQrCodeText] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [scheme, setScheme] = useState("openid-credential-offer");
  const [credFormat, setCredFormat] = useState("visa-person-1");
  const delay = (ms: number | undefined) =>
    new Promise((res) => setTimeout(res, ms));
  const [referenceId, setReferenceId] = useState(null);
  const [status, setStatus] = useState("");
  const [selectedCredential, setSelectedCredential] = useState("");

  const onSchemaOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScheme(e.target.value);
  };

  const onCredFormatOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredFormat(e.target.value);
  };

  interface CredParams {
    claimsWrapper: string;
    schema: object;
  }

  const credentialParams = (credType: string): CredParams => {
    switch (credType) {
      case 'visa_vc':
        return {
          claimsWrapper: '',
          schema: visaVcSchema
        };
      case 'epassport_copy_vc':
        return {
          claimsWrapper: '',
          schema: electronicPassportSchema
        };
      case 'frequent_flyer_vc':
        return {
          claimsWrapper: '',
          schema: loyaltyScheme
        }
      case 'boarding_pass_vc':
        return {
          claimsWrapper: '',
          schema: boardingPassSchema
        }
      case 'live_biometric_vc':
        return {
          claimsWrapper: '',
          schema: liveBiometricsSchema
        }
      case 'order_id_vc':
        return {
          claimsWrapper: '',
          schema: orderSchema
        }
      case 'corporate_vc':
        return {
          claimsWrapper: '',
          schema: corporateSchema
        }
      default:
        return {
          claimsWrapper: "claims",
          schema: credentialSchemaSample
        };
    }
  };

  // Choose schema based on selected credential type
  const chooseCredentialSchema = (credentialType: string) => {
    return credentialParams(credentialType).schema;
  };

  // Handle change in the select box
  // const handleChangeCredType = (e) => {
  //   const credentialType = e.formData.credentialType;
  //   setSelectedCredential(credentialType);
  // };

  const handleChangeCredentialType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const credentialType = e.target.value;
    setSelectedCredential(credentialType);
  }

  const handleSubmitCredType = (form: IChangeEvent, event: FormEvent<any>) => {

    if (isLoading) return;


    const claimsWrapper = credentialParams(selectedCredential).claimsWrapper;

    let claims = {}

    if (claimsWrapper === "") {
      claims = {
        ...form.formData,
      }
    } else {
      claims = {
        [claimsWrapper]: {
          ...form.formData,
        }
      }
    }

    const credClaims = {
      ...claims,
      vct: selectedCredential
    }
    console.log("Credential data submitted --: ", credClaims);
    callAPI(credClaims)
  };



  const callAPI = async (claiims: object) => {
    console.log("calling API");
    setReferenceId(null);
    setStatus("PENDING");
    setIsLoading(true);

    try {
      const res = await fetch(`/api/issuance`, {
        cache: "no-cache",
        method: "POST",
        body: JSON.stringify(claiims),
      });
      const data = await res.json();
      console.log(data.issuance.credentialOfferUri);
      const urlEncoded = encodeURIComponent(data.issuance.credentialOfferUri);

      setQrCodeText(`?credential_offer_uri=${urlEncoded}`);
      setReferenceId(data.issuance.referenceId);
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
          const res = await fetch(`/api/issuance/${referenceId}`, {
            cache: "no-cache",
            method: "GET",
          });
          const data = await res.json();
          const status = data.issuanceStatus;
          setStatus(status);
          if (status === "ISSUED") clearInterval(interval);
        } catch (error) {
          console.error("Error fetching status:", error);
          setStatus("ERROR");
        }
      }, 2000);

      return () => clearInterval(interval); // Cleanup interval on component unmount
    }
    if (selectedCredential.length === 0) {
      setSelectedCredential("visa_vc");
    }

  }, [referenceId, selectedCredential]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-white">
      <h1 className="text-3xl font-bold mb-2">End to End Proof of Concept 2024</h1>
      <p className="text-lg text-gray-600 mb-8 text-center max-w-2xl">
        Issue Secure Credentials
      </p>
      <div className="px-24 gap-16 grid-cols-2">
        <div className="mb-2.5">
          <div className="pt-6 hidden">
          </div>
          {/* Hide the Credential Format block */}
          <div className="hidden">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Credential
            </h3>
            <ul className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                <div className="flex items-center ps-3">
                  <input
                    id="list-radio-sdjwt-1"
                    type="radio"
                    value="visa-person-1"
                    name="list-radio-sdjwt-1"
                    checked={credFormat === "visa-person-1"}
                    onChange={onCredFormatOptionChange}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    htmlFor="list-radio-sdjwt-1"
                    className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Visa Person 1
                  </label>
                </div>
              </li>
              <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                <div className="flex items-center ps-3">
                  <input
                    id="list-radio-sdjwt-2"
                    type="radio"
                    value="visa-person-2"
                    name="list-radio-sdjwt-2"
                    checked={credFormat === "visa-person-2"}
                    onChange={onCredFormatOptionChange}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    htmlFor="list-radio-sdjwt-2"
                    className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Visa Person 2
                  </label>
                </div>
              </li>
              <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                <div className="flex items-center ps-3">
                  <input
                    id="list-radio-sdjwt-3"
                    type="radio"
                    value="frequent1"
                    name="list-radio-sdjwt-3"
                    checked={credFormat === "frequent1"}
                    onChange={onCredFormatOptionChange}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    htmlFor="list-radio-sdjwt-3"
                    className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Loyalty Program Account - Cathay Sample
                  </label>
                </div>
              </li>
              <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                <div className="flex items-center ps-3">
                  <input
                    id="list-radio-sdjwt-4"
                    type="radio"
                    value="boardingpass1"
                    name="list-radio-sdjwt-4"
                    checked={credFormat === "boardingpass1"}
                    onChange={onCredFormatOptionChange}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    htmlFor="list-radio-sdjwt-4"
                    className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Boarding Pass - Cathay Sample
                  </label>
                </div>
              </li>

              <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                <div className="flex items-center ps-3">
                  <input
                    id="list-radio-sdjwt-5"
                    type="radio"
                    value="passport1"
                    name="list-radio-sdjwt-5"
                    checked={credFormat === "passport1"}
                    onChange={onCredFormatOptionChange}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    htmlFor="list-radio-sdjwt-5"
                    className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    ePassport Copy VC - Sample
                  </label>
                </div>
              </li>

              <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                <div className="flex items-center ps-3">
                  <input
                    id="list-radio-sdjwt-6"
                    type="radio"
                    value="LiveBiometric"
                    name="list-radio-sdjwt-6"
                    checked={credFormat === "LiveBiometric"}
                    onChange={onCredFormatOptionChange}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    htmlFor="list-radio-sdjwt-6"
                    className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Live Biometric VC - Sample
                  </label>
                </div>
              </li>

              <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                <div className="flex items-center ps-3">
                  <input
                    id="list-radio-sdjwt-7"
                    type="radio"
                    value="employee"
                    name="list-radio-sdjwt-7"
                    checked={credFormat === "employee"}
                    onChange={onCredFormatOptionChange}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    htmlFor="list-radio-sdjwt-7"
                    className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Corporate VC - Sample
                  </label>
                </div>
              </li>

              <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                <div className="flex items-center ps-3">
                  <input
                    id="list-radio-sdjwt-8"
                    type="radio"
                    value="order"
                    name="list-radio-sdjwt-8"
                    checked={credFormat === "order"}
                    onChange={onCredFormatOptionChange}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    htmlFor="list-radio-sdjwt-8"
                    className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >

                    Order VC - Sample
                  </label>
                </div>
              </li>
            </ul>
          </div>
          {/* Hide the scheme block */}
          <div >
            <div className="text-left">
              <h1>Select Credential Type</h1>

              <form className="mx-auto">
                {/* <label htmlFor="countries_disabled" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label> */}
                <select onChange={handleChangeCredentialType} id="countries_disabled" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option value="visa_vc">Visa VC</option>
                  <option value="epassport_copy_vc">ePassport copy VC</option>
                  <option value="frequent_flyer_vc">Frequent Flyer VC</option>
                  <option value="boarding_pass_vc">Boarding Pass VC</option>
                  <option value="live_biometric_vc">Live Biometric VC</option>
                  <option value="order_id_vc">Order VC</option>
                  <option value="corporate_vc">Corporate VC</option>
                </select>
              </form>
              {/* <Form className="max-w-sm mx-auto" schema={selectSchema} onChange={handleChangeCredType} validator={validator} /> */}

              {selectedCredential && (
                <Form className="schema-form"
                  schema={chooseCredentialSchema(selectedCredential)}
                  // @ts-ignore
                  validator={validator} formData={formData}
                  uiSchema={uiSchema}
                  onSubmit={handleSubmitCredType}
                  showErrorList="bottom"
                  // liveValidate={true}
                  noHtml5Validate={true}
                />

              )}
            </div>

          </div>
        </div>
        <div className="flex flex-row justify-center items-center">
          <div className="mt-2.5">
            <div className="bg-gray-50 p-5 rounded-md w-[340px] h-[340px] border border-gray-300 shadow-sm">
              {isLoading && (
                <>
                  <div className="flex items-center justify-center">
                    <span className="text-3xl mr-4">Loading</span>

                    <svg
                      className="animate-spin h-5 w-5 text-gray-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth={4}
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  </div>
                </>
              )}
              {qrCodeText && !isLoading ? (
                <Link href={`${scheme}://${qrCodeText}`} target="_blank">
                  <Canvas
                    text={`${scheme}://${qrCodeText}`}
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
              ) : null}
            </div>
            <div className="mt-4 p-4 rounded-md border border-gray-200 shadow-sm h-16 flex items-center justify-center">
              {referenceId && (
                <div className="flex items-center justify-center">
                  {status === "ISSUED" ? (
                    <span className="inline-flex items-center bg-green-100 text-green-800 text-sm font-medium px-4 py-2 rounded-full">
                      <svg
                        className="w-4 h-4 mr-2 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Credential {status}
                    </span>
                  ) : status === "PENDING" ? (
                    <span className="inline-flex items-center bg-yellow-100 text-yellow-800 text-sm font-medium px-4 py-2 rounded-full">
                      <svg
                        className="w-4 h-4 mr-2 animate-spin"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 22C17.5228 22 22 17.5228 22 12H19C19 15.866 15.866 19 12 19V22Z"
                          fill="currentColor"
                        />
                      </svg>
                      Issuance {status}
                    </span>
                  ) : (
                    <span className="inline-flex items-center bg-red-100 text-red-800 text-sm font-medium px-4 py-2 rounded-full">
                      <svg
                        className="w-4 h-4 mr-2 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Issuance {status}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Hide the Url block */}
      <div className="hidden w-9/12 pt-4">
        <label
          htmlFor="message"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Url
        </label>
        <textarea
          id="message"
          readOnly={true}
          rows={4}
          defaultValue={qrCodeText ? `${scheme}://${qrCodeText}` : ""}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
    </main >
  );
};

export default Issuance;
