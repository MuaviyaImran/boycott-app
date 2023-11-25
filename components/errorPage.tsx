import React from "react";
import Image from "next/image";
import { ErrorPageProps } from "types/types";
import { useRouter } from "next/router";

const ErrorPage: React.FC<ErrorPageProps> = ({ text, isLogin }) => {
  const router = useRouter();
  return (
    <div className="max-width h-[80vh] justify-center flex flex-col items-center ">
      <Image
        className="h-auto w-auto"
        src="/error.svg"
        alt="Error Image"
        height={500}
        width={500}
      ></Image>
      <div className="flex flex-col md:flex-row text-center md:text-left gap-2">
        {text}
        {isLogin ? (
          <span
            className="text-primary-backgroundC underline underline-offset-4"
            onClick={() => router.push("/signin")}
          >
            Login
          </span>
        ) : null}
      </div>
    </div>
  );
};

export default ErrorPage;
