import Image from "next/image";
import Link from "next/link";
import React from "react";

const CorporateMeetings = () => {
  // bg - [url("/HeroBg.jpg")];
  return (
    <>
      <div
        style={{ backgroundImage: "/images/top-slider1.jpeg" }}
        className="w-screen relative h-[75vh] my-20 "
      >
        <Image
          fill
          src={"/images/hall.jpeg"}
          className="object-cover "
          alt=""
        />
        <div className="w-full h-full bg-black absolute bg-opacity-50 flex flex-col justify-center items-center p-5">
          <h5 className="text-white">Corporate Meetings</h5>
          <br />
          <h2 className="text-white text-center md:w-2/3">
            Malshej is a welcome change from the usual city meeting venues.
          </h2>
          <br />
          <p className="text-gray-300 text-center md:w-1/2 ">
            Malshej is the best spot for your off site, conference, seminar,
            corporate picnic or any such events.
          </p>
          <p className="text-gray-300 text-center w-1/2 max-md:hidden">
            If you are looking for a place to get your team together, we will
            partner with you in not only hosting your team but also be your
            event planner.
          </p>
          <br />
          <Link href={"/hall"}>
            <button>View Details</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default CorporateMeetings;
