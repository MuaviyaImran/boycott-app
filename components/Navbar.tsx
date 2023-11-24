import React, { useContext, startTransition } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserLarge, faSignOut } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { MyContext } from "utils/contextProvider";

const Navbar: React.FC = () => {
  const session = useSession().data;
  const router = useRouter();
  const isAdminRoute = router.pathname === "/admin";
  const { setShow } = useContext(MyContext) as any;

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
    <header className="w-full top-0 flex justify-center sticky">
      <div className="bg-primary-backgroundC w-full text-primary-fontC">
        <div className="px-3 max-width flex gap-3 justify-between items-center py-1">
          <Link href="/">
            <div className="flex items-center">
              <Image
                src={"/flag/palestine-flag.png"}
                alt="Palestine Flag"
                width={50}
                height={50}
              ></Image>
              <span className="ml-1">Palestine</span>
            </div>
          </Link>
          <span className="">Boycott Israel</span>
          <div className="flex items-center gap-4">
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
