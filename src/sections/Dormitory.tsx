import Image from "next/image";
import Link from "next/link";
import React from "react";

const Dormitory = (): JSX.Element => {
  return (
    <>
      <div className="mx-auto my-10 flex max-w-7xl flex-col-reverse items-center p-5 md:flex-row">
        <div className="max-md:pt-10 md:w-2/5">
          <h2>Dormitory</h2>
          <br />
          <p>
            Experience comfort and convenience in our well-maintained dormitory.
            Offering cozy beds, clean facilities, and secure lockers, our
            dormitory is the perfect blend of affordability and comfort for solo
            travelers and groups.
          </p>
          <br />
          <Link href={"/rooms/dormitory"}>
            <button>Book Now</button>
          </Link>
        </div>
        <div className="flex w-full md:w-3/5">
          <Image
            src={"/images/dorm/dorm1.jpg"}
            className=" h-64 w-1/2 object-cover p-1 md:h-[40vh]"
            width={500}
            height={500}
            alt=""
          />
          <Image
            className="h-64 w-1/2 object-cover  p-1 md:h-[40vh]"
            src={"/images/dorm/dorm2.jpg"}
            width={500}
            height={500}
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default Dormitory;
