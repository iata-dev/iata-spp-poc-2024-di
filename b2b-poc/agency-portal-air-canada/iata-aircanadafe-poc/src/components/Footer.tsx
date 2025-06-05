import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 py-4">
      <div className="container mx-auto text-center text-sm">
        <a href="#" className="mr-4 hover:text-redPrimary">
          Terms & Conditions
        </a>
        <a href="#" className="hover:text-redPrimary">
          Privacy Policy
        </a>
      </div>
    </footer>
  );
};

export default Footer;
