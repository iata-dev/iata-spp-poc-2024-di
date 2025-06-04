import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";

const DeniedLogin = () => {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage: `url('../../../public/assets/BG.png')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      {/* Header */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow flex flex-col  items-center justify-center h-full relative">
        <img
          src="/assets/denied.png"
          alt="Frame"
          className="w-1/2 max-w-[250px] object-contain"
        />
        <h3 className="text-1xl font-bold text-gray-600 mt-4">Access Denied</h3>
        <p className="text-sm text-gray-600 mt-2">
          Please contact your agency admin.
        </p>
        <button className="relative text-redPrimary w-32 bg-[#E2E2E2] rounded-md overflow-hidden group my-4">
          {/* Hover Effect */}
          <span className="absolute inset-0 bg-redPrimary scale-x-0 transform origin-left transition-transform duration-1000 ease-out group-hover:scale-x-100"></span>
          <Link
            to="/"
            className="relative flex items-center justify-center z-10 py-2 rounded-lg"
          >
            <span className="text-sm font-normal text-gray-600 group-hover:text-white">
              Back to Login
            </span>
          </Link>
        </button>
      </main>
    </div>
  );
};

export default DeniedLogin;
