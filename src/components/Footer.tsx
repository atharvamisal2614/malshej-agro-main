import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <>
      <div id="contact" className="bg-[#1f242e] ">
        <div className="max-w-7xl mx-auto p-10 flex max-md:flex-col items-center">
          <div className="md:w-1/3 p-5 flex flex-col items-center">
            <Image width={200} height={200} src={"/logo.png"} alt="" />
            <br />
            <h3 className="text-white text-center">
              Malshej Agro Tourism And Farm
            </h3>
          </div>
          <div className="md:w-1/3 p-5 flex flex-col items-center">
            <h4 className="text-white text-center">Quick Links</h4>
            <br />
            <Link href={"/about"}>
              <p className="text-white text-center">About Us</p>
            </Link>
            <Link href={"/gallery"}>
              <p className="text-white text-center">Gallery</p>
            </Link>
            <Link href={"/hall"}>
              <p className="text-white text-center">Meeting Hall</p>
            </Link>
            <Link href={"/privacy-policy"}>
              <p className="text-white text-center">Privacy Policy</p>
            </Link>
            <Link href={"/terms-conditions"}>
              <p className="text-white text-center">Terms & Conditions</p>
            </Link>
            <Link href={"/reservation-cancellation"}>
              <p className="text-white text-center">
                Reservation And Cancellation
              </p>
            </Link>
          </div>
          <div className="md:w-1/3 p-5 flex flex-col items-center">
            <h4 className="text-white text-center">Address</h4>
            <p className="text-white text-center">
              Ghodemal, A/P dingore, Junnar, Dist - Pune - 421 209
            </p>
            <br />
            <p className="text-white text-center">malshejagrotf@gmail.com</p>
            <p className="text-white text-center">+91 76669 99551</p>
            <a href="https://goo.gl/maps/5wU42miPD64KrrW46">
              <p className="text-green-400 text-center">Google Maps</p>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
