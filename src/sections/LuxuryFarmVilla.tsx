import Image from "next/image";
import Link from "next/link";
import React from "react";

const LuxuryFarmVilla = (): JSX.Element => {
  return (
    <>
      <div className="mx-auto my-10 flex max-w-7xl flex-col-reverse items-center p-5 md:flex-row">
        <div className="max-md:pt-10 md:w-2/5">
          <h5>Bunglow</h5>
          <br />
          <h2>Luxury Farm Villa</h2>
          <br />
          <p>
            Each of these Luxury Farm Villas offers peace and quiet environment
            that you can enjoy you from your expansive, humdrum living area.It
            is a heaven in the country offering serenity.
          </p>
          <br />
          <Link href={"/rooms/bunglow"}>
            <button>Book Now</button>
          </Link>
        </div>
        <div className="flex w-full md:w-3/5">
          <Image
            src={"/images/bunglow/bunglowfront.jpg"}
            className=" h-64 w-1/2 object-cover p-1 md:h-[40vh]"
            width={500}
            height={500}
            alt=""
          />
          <Image
            className="h-64 w-1/2 object-cover  p-1 md:h-[40vh]"
            src={"/images/villa/villa5.jpeg"}
            width={500}
            height={500}
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default LuxuryFarmVilla;
