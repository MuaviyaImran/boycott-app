import React, { useContext, startTransition, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserLarge,
  faSignOut,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { MyContext } from "utils/contextProvider";

const Navbar: React.FC = () => {
  const session = useSession().data;
  const router = useRouter();
  const isAdminRoute = router.pathname === "/admin";
  const { setShow } = useContext(MyContext) as any;
  const [mobNav, setMobNav] = useState(false);
  const updateShow = () => {
    startTransition(() => {
      setShow(true);
    });
  };

  const handleOnClick = () => {
    router.push("signin");
  };
  const handleLogout = () => {
    signOut();
    router.push("/");
  };
  return (
    <header className="w-full top-0 flex justify-center sticky h-[60px]">
      <div className="bg-primary-backgroundC w-full text-primary-fontC">
        <div className="px-3 max-width flex gap-3 justify-between items-center py-1">
          <Link href="/">
            <div className="flex items-center">
              <Image
                src={"/flag/palestine-flag.ico"}
                alt="Palestine Flag"
                width={50}
                height={50}
              ></Image>
              <span className="ml-1 hidden lg:flex">Palestine</span>
            </div>
          </Link>
          <span className="">Boycott Israel</span>
          <FontAwesomeIcon
            className="lg:hidden"
            icon={faBars}
            onClick={() => setMobNav(!mobNav)}
          />
          {/* overlay */}
          {mobNav ? (
            <div className="bg-black/80 fixed w-full h-screen z-10 top-0 left-0 lg:hidden"></div>
          ) : (
            ""
          )}
          <div
            className={`fixed top-16 w-[200px] bg-primary-fontC z-10 duration-300 lg:hidden
              ${mobNav ? "right-0 " : "right-[-100%] "}`}
          >
            <span
              onClick={() => setMobNav(!mobNav)}
              className="absolute right-4 top-2 cursor-pointer text-black"
            >
              x
            </span>
            <nav>
              <ul className="flex flex-col p-4 text-gray-800 items-end">
                <div className=" pt-1">
                  {session?.user ? (
                    <Link href="/admin" className="flex gap-2 justify-end py-4">
                      <Image
                        src={session?.user?.image ?? "/person-avatar.avif"}
                        alt="Profile Pic"
                        width={30}
                        height={30}
                        className="rounded-full"
                      ></Image>
                      <span>Admin</span>
                    </Link>
                  ) : (
                    <span
                      onClick={handleOnClick}
                      className="py-4 flex items-baseline justify-end"
                    >
                      <FontAwesomeIcon icon={faUserLarge} />
                      <span className="ml-1">Login</span>
                    </span>
                  )}
                  <span onClick={updateShow} className="justify-end py-4">
                    Suggestions
                  </span>
                  {session?.user ? (
                    <div
                      className="pt-4 flex justify-end gap-2 items-center"
                      onClick={handleLogout}
                    >
                      <FontAwesomeIcon
                        className="text-primary-backgroundC"
                        icon={faSignOut}
                        onClick={handleLogout}
                      />
                      <span>Logout</span>
                    </div>
                  ) : null}
                </div>
              </ul>
            </nav>
          </div>
          <div className="lg:flex items-center gap-4 hidden">
            {session?.user ? (
              <Link href="/admin" className="flex gap-2 items-center mx-2">
                <Image
                  src={session?.user?.image ?? "/person-avatar.avif"}
                  alt="Profile Pic"
                  width={30}
                  height={30}
                  className="rounded-full"
                ></Image>
                <span
                  className={`cursor-pointer underline-offset-4 ${
                    isAdminRoute ? "underline" : "hover:underline"
                  }`}
                >
                  Admin
                </span>
              </Link>
            ) : (
              <span
                onClick={handleOnClick}
                className="hover:cursor-pointer hover:underline underline-offset-4  flex items-baseline"
              >
                <FontAwesomeIcon icon={faUserLarge} />
                <span className="ml-1">Login</span>
              </span>
            )}
            <span
              onClick={updateShow}
              className="cursor-pointer hover:underline underline-offset-4 "
            >
              Suggestions
            </span>

            {session?.user ? (
              <FontAwesomeIcon
                className="cursor-pointer hover:bg-[#be85f2] p-2 rounded-full"
                icon={faSignOut}
                onClick={handleLogout}
              />
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
