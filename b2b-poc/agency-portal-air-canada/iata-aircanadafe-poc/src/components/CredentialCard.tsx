import React from "react";

interface CredentialProps {
  credential: {
    credentialName: string;
    issuer: string;
    primaryAttribute: string;
    primaryAttributeValue: string;
    secondaryAttribute: string;
    secondaryAttributeValue: string;
    backgroundImageSlice: string;
    primaryBackgroundColor: string;
    issuerLogoUrl: string;
  };
}

const CredentialCard: React.FC<CredentialProps> = ({ credential }) => (
  <div
    className="relative w-[328px] h-[200px] rounded-[10px] shadow overflow-hidden"
    style={{ backgroundColor: credential.primaryBackgroundColor }}
  >
    <div
      className="absolute inset-y-0 left-0 w-[35px]"
      style={{
        backgroundImage: `url(${credential.backgroundImageSlice})`,
        backgroundSize: "cover",
        backgroundPosition: "left",
      }}
    />
    <div className="absolute left-[66px] top-[35px] text-white text-lg font-normal">
      {credential.credentialName}
    </div>
    <div className="absolute left-[66px] top-[15px] text-white/80 text-sm font-medium">
      {credential.issuer}
    </div>
    <div className="absolute left-[66px] top-[90px] text-white/70 text-xs font-light">
      {credential.primaryAttribute}
    </div>
    <div className="absolute left-[66px] top-[110px] text-white text-xs font-medium">
      {credential.primaryAttributeValue}
    </div>
    <div className="absolute left-[66px] top-[140px] text-white/70 text-xs font-light">
      {credential.secondaryAttribute}
    </div>
    <div className="absolute left-[66px] top-[160px] text-white text-xs font-medium">
      {credential.secondaryAttributeValue}
    </div>
    <div className="absolute top-[20px] left-[16px] w-9 h-9 bg-white rounded-md flex items-center justify-center">
      <img src={credential.issuerLogoUrl} alt="Issuer Logo" className="w-6" />
    </div>
  </div>
);

export default CredentialCard;
