import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
const Footer: React.FC = () => {
  return (
    <div className="bg-primary-backgroundC z-10 sticky bottom-0 w-full p-1 text-primary-fontC">
      <div className="lg:max-width flex gap-3 justify-between items-center py-1 px-3 flex-col md:flex-row text-sm md:text-base">
        <p className="flex items-center justify-center gap-1">
          <span className="text-[2rem] mt-3">&copy;</span> 2023 Boycott Israel.
          All rights reserved.
        </p>
        <div className="flex items-center">
          <FontAwesomeIcon icon={faEnvelope} />
          <span className="ml-1">muaviyaimran1122@gmail.com</span>
        </div>
      </div>
    </div>
  );
};
export default Footer;
