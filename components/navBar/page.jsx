"use client";
import Image from "next/image";
import LOGO from "../../public/images/logo.png";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState, useEffect } from "react";

const NavBar = () => {
  const [login, setLogin] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const savedLoginState =
      typeof window !== "undefined" && window.localStorage
        ? JSON.parse(localStorage.getItem("isLogin"))
        : false;
    setLogin(savedLoginState);
  }, []);

  const handleLogout = () => {
    localStorage.setItem("isLogin", JSON.stringify(false));
    setLogin(false);
    window.location.reload();
  };

  return (
    <div className="flex flex-col">
      <div className="bg-[#000000] h-[100px] text-white flex justify-between align-middle px-5 md:px-14">
        <div className=" flex justify-center gap-1 mt-4  items-center h-full">
          <Link href={"/"}>
            <div className="w-[100px] h-[100px] ">
              <Image className="rounded-full" src={LOGO} alt="Logo" />
            </div>
          </Link>
        </div>
        <div className="hidden md:hidden lg:flex">
          <ul className="font-mono flex justify-center text-[18px]  items-center h-full gap-6">
            <Link href={"/"} prefetch={false}>
              <li className="cursor-pointer hover:underline hover:underline-offset-4 hover:decoration-blue-500 hover:pb-2">
                Home
              </li>
            </Link>
            <Link href={"/movies"} prefetch={false}>
              <li className="cursor-pointer hover:underline hover:underline-offset-4 hover:decoration-blue-500 hover:pb-2">
                Movies
              </li>
            </Link>

            <Link href={"/genres/action/28"}>
              <li className="cursor-pointer hover:underline hover:underline-offset-4 hover:decoration-blue-500 hover:pb-2">
                Action
              </li>
            </Link>
            <Link href={"/upcoming"}>
              <li className="cursor-pointer hover:underline hover:underline-offset-4 hover:decoration-blue-500 hover:pb-2">
                Upcoming
              </li>
            </Link>
          </ul>
        </div>
        {!login ? (
          <div className="md:hidden lg:flex  justify-center text-[16px] hidden   items-center h-full gap-4">
            <Link href="/login">
              <button className="bg-blue-500 p-2 rounded-full w-[100px]">
                Login
              </button>
            </Link>
            <button className="bg-[#fd5c63] p-2 rounded-full w-[100px]">
              Sign up
            </button>
          </div>
        ) : (
          <div className="hidden md:hidden lg:flex  justify-center text-[16px]  items-center h-full gap-4">
            <p className="h-full flex justify-center items-center">
              Welcome User
            </p>

            <button
              onClick={() => handleLogout()}
              className="bg-[#fd5c63] p-2 rounded-full w-[100px]"
            >
              Logout
            </button>
          </div>
        )}
        <div className="h-full flex md:flex lg:hidden justify-center items-center">
          <GiHamburgerMenu
            className="cursor-pointer"
            size={20}
            onClick={() => setOpen((prev) => !prev)}
          />
        </div>
      </div>
      <div
        className={`bg-[#000000] text-white transition-all duration-1000 ease-in-out ${
          open ? "h-auto" : "h-0"
        } overflow-hidden`}
      >
        <div className="flex md:flex lg:hidden justify-center items-center">
          <ul className="font-mono flex justify-center flex-col text-[18px]  items-center h-full gap-6">
            <Link href={"/"}>
              <li className="cursor-pointer hover:underline hover:underline-offset-4 hover:decoration-blue-500">
                Home
              </li>
            </Link>
            <Link href={"/movies"}>
              <li className="cursor-pointer hover:underline hover:underline-offset-4 hover:decoration-blue-500 ">
                Movies
              </li>
            </Link>
            <Link href={"/genres/action/28"}>
              <li className="cursor-pointer hover:underline hover:underline-offset-4 hover:decoration-blue-500 ">
                Action
              </li>
            </Link>
            <Link href={"/upcoming"}>
              <li className="cursor-pointer hover:underline hover:underline-offset-4 hover:decoration-blue-500 ">
                Upcoming
              </li>
            </Link>
          </ul>
        </div>
        {!login ? (
          <div className="md:flex lg:hidden flex-col justify-center text-[16px] flex   items-center h-full gap-4">
            <Link href={"/login"}>
              <button className="mt-6 hover:underline hover:underline-offset-4 hover:decoration-blue-500 ">
                Login
              </button>
            </Link>
            <button className="mt-2 mb-6 hover:underline hover:underline-offset-4 hover:decoration-blue-500 ">
              Sign up
            </button>
          </div>
        ) : (
          <div className="flex justify-center text-[16px]  items-center h-full gap-4">
            <button
              onClick={() => handleLogout()}
              className="mt-4 mb-4  hover:underline hover:underline-offset-4 hover:decoration-blue-500"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
