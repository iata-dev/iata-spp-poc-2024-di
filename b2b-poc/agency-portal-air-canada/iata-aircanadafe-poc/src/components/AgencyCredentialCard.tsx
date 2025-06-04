import React from "react";

interface AgencyCredentialCardProps {
  backgroundImage: string;
  logo: string;
  title: string;
  subtitle: string;
  details: { label: string; value: string }[];
  primaryBackgroundColor: string;
}

const AgencyCredentialCard: React.FC<AgencyCredentialCardProps> = ({
  backgroundImage,
  logo,
  title,
  subtitle,
  details,
  primaryBackgroundColor,
}) => {
  return (
    <div className="w-1/5 bg-white shadow-lg rounded-lg">
      {/* Card Background Section */}
      <div className="relative w-full h-[214.44px] bg-[#eee1cb] shadow-md overflow-hidden rounded-lg">
        <img
          alt="Background"
          className="w-full h-[120px] object-cover"
          src={backgroundImage}
        />
        <div
          className={`p-4 rounded h-[137px]`}
          style={{
            backgroundColor: primaryBackgroundColor || "black",
          }}
        >
          <div className="absolute left-6 bottom-6 text-white">
            <div className="text-lg font-normal text-white">{subtitle}</div>
          </div>
          <div className="absolute top-[125px] left-[100px] rounded-lg flex items-center justify-center">
            <div className="font-semibold text-white/80 text-sm">{title}</div>
          </div>
          <div className="absolute top-[80px] left-[22px] w-[70px] h-[70px] bg-white rounded-lg flex items-center justify-center">
            <img
              alt="Logo"
              className="w-[52px] h-[50px] rounded-lg"
              src={logo}
            />
          </div>
        </div>
      </div>

      {/* Card Content Section */}

      <div className="space-y-4 p-4 border-b border-gray-200 h-full">
        {details.map((detail, index) => (
          <div
            key={index}
            className="flex border-b border-gray-200 p-2 justify-between"
          >
            <span className="text-gray-600 font-normal">{detail.label}:</span>
            <span className="text-gray-900 font-semibold">
              {detail.value || "********"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgencyCredentialCard;
