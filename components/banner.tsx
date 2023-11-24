import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";

const Banner: React.FC = () => {
  return (
    <div className="bg-black text-primary-fontC flex justify-center text-center flex-col items-center px-4 lg:px-0 py-2 gap-1">
      <strong className="text-primary-backgroundC text-lg">Notice </strong>
      <span>
        Israeli product&apos;s barcode typically starts with the prefix &apos;729&apos;.
      </span>
      <span>Please be mindful while engaging in product transactions.</span>
    </div>
  );
};

export default Banner;
