import React from "react";

interface Employee {
  name: string;
}

interface RevokeModalProps {
  isRevokeModalOpen: boolean;
  employeeToRevoke: Employee | null;
  confirmRevokeCredential: () => void;
  closeModal: () => void; // Use only one handler
}

const RevokeModal: React.FC<RevokeModalProps> = ({
  isRevokeModalOpen,
  employeeToRevoke,

  confirmRevokeCredential,
  closeModal,
}) => {
  if (!isRevokeModalOpen || !employeeToRevoke) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-120 p-6">
        <div className=" py-2 border-b border-slate-200 dark:border-slate-700">
          <div className="flex justify-between items-center">
            <div className="font-semibold text-slate-800 dark:text-slate-100">
              Revoke Credential
            </div>
            <button
              className="text-slate-400 dark:text-slate-500 hover:text-slate-500 dark:hover:text-slate-400"
              onClick={closeModal}
            >
              <div className="sr-only">Close</div>
              <svg className="w-4 h-4 fill-current">
                <path d="M7.95 6.536l4.242-4.243a1 1 0 111.415 1.414L9.364 7.95l4.243 4.242a1 1 0 11-1.415 1.415L7.95 9.364l-4.243 4.243a1 1 0 01-1.414-1.415L6.536 7.95 2.293 3.707a1 1 0 011.414-1.414L7.95 6.536z" />
              </svg>
            </button>
          </div>
        </div>

        <div className=" mt-4 justify-start items-center gap-2.5 inline-flex">
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.79505 25.1035H23.205C24.963 25.1035 26.0645 23.838 26.0645 22.244C26.0666 21.7503 25.9372 21.265 25.6895 20.838L16.467 4.33798C15.9395 3.38848 14.9785 2.89648 14.006 2.89648C13.045 2.89648 12.061 3.38848 11.533 4.33798L2.32255 20.8495C2.06455 21.2945 1.93555 21.7635 1.93555 22.2445C1.93555 23.838 3.04905 25.1035 4.79505 25.1035ZM14.006 17.076C13.385 17.076 13.045 16.7245 13.0215 16.092L12.8575 10.303C12.834 9.66998 13.326 9.20098 13.994 9.20098C14.6505 9.20098 15.166 9.68148 15.1425 10.3145L14.967 16.092C14.9435 16.7365 14.6035 17.076 14.006 17.076ZM14.006 21.4005C13.326 21.4005 12.6935 20.8615 12.6935 20.1345C12.6935 19.4075 13.3145 18.8695 14.006 18.8695C14.6975 18.8695 15.3185 19.3965 15.3185 20.1345C15.3185 20.873 14.6855 21.4005 14.006 21.4005Z"
              fill="#F43F5E"
            />
          </svg>

          <div className="text-rose-500 text-xl font-semibold ">Warning</div>
        </div>
        <p className="mt-4 text-left text-md">
          This action cannot be undone and this credential will be revoked.{" "}
          <br></br>
          <br></br>
          <span className="font-semibold">Employee Name:</span>{" "}
          {employeeToRevoke.name}
        </p>
        <div className="mt-6 flex justify-end space-x-2">
          <button
            onClick={closeModal}
            className="btn-sm bg-white border-slate-200 hover:border-slate-300 text-slate-600"
          >
            Cancel
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent row click
              confirmRevokeCredential();
            }}
            className="btn-sm bg-white border-slate-200 hover:border-slate-300 text-rose-500"
          >
            Revoke Credential
          </button>
        </div>
      </div>
    </div>
  );
};
export default RevokeModal;
