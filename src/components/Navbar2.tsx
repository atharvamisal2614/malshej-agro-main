import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const Navbar2 = (): JSX.Element => {
  const [navbar, setNavbar] = useState(false);
  return (
    <>
      <div className="absolute z-50 flex w-full items-center justify-between p-5 md:px-20">
        <Image width={60} height={60} src={"/logo.png"} alt="" />
        <div
          onClick={() => {
            setNavbar(!navbar);
          }}
          className={`flex h-10 w-10 cursor-pointer flex-col justify-around border-2 border-white p-2`}
        >
          <div className="h-0.5 w-full bg-white"></div>
          <div className="h-0.5 w-full bg-white"></div>
          <div className="h-0.5 w-full bg-white"></div>
        </div>
      </div>

      <div
        className={`${
          navbar ? "h-screen" : "h-0"
        } fixed z-40 w-full bg-heading transition-all duration-500 ease-in-out`}
      >
        <div
          className={`${
            navbar ? "translate-y-60" : "-translate-y-60 opacity-0"
          } flex flex-col justify-center gap-5 text-center transition-all duration-300 ease-in-out`}
        >
          <Link href={"/about"}>
            <p
              onClick={() => {
                setNavbar(false);
              }}
              className="text-white"
            >
              About Us
            </p>
          </Link>
          <Link href={"/gallery"}>
            <p
              onClick={() => {
                setNavbar(false);
              }}
              className="text-white"
            >
              Gallery
            </p>
          </Link>
          <Link href={"/rooms"}>
            <p
              onClick={() => {
                setNavbar(false);
              }}
              className="text-white"
            >
              Rooms
            </p>
          </Link>
          <Link href={"/#contact"}>
            <p
              onClick={() => {
                setNavbar(false);
              }}
              className="text-white"
            >
              Contact
            </p>
          </Link>
          <Link href={"/rooms"}>
            <button>Book Now</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar2;
