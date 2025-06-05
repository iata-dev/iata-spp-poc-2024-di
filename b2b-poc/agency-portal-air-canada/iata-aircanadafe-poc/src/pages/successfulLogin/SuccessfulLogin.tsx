import Navbar from "../../components/Navbar";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";

const SuccessfulLogin = () => {
  const location = useLocation();
  const newProfile = location?.state?.newProfile || null;

  useEffect(() => {
    if (newProfile) {
      toast.success("Your profile has been successfully created.");
    }
  }, [newProfile]);
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
      <main className="flex-grow flex items-center justify-center h-full relative">
        <img
          src="/assets/frame.png"
          alt="Frame"
          className="w-1/2 max-w-[950px] object-contain"
        />
      </main>
    </div>
  );
};

export default SuccessfulLogin;
