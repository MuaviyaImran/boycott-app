import React from "react";
import Image from "next/image";
import { ErrorPageProps } from "types/types";

const ErrorPage: React.FC<ErrorPageProps> = ({ text }) => {
  return (
    <div className="max-width h-[80vh] justify-center flex flex-col items-center ">
      <Image
        className="h-auto w-auto"
        src="/error.svg"
        alt="Error Image"
        height={500}
        width={500}
      ></Image>
      <div className="">{text}</div>
    </div>
  );
};

export default ErrorPage;
