import Image from "next/image";
import React from "react";

const Restaurent = () => {
  return (
    <>
      <div className="flex md:flex-row  flex-col max-w-7xl items-center mx-auto my-20">
        <div className="md:w-1/2 p-5">
          <div className="">
            <h5>Restaurent</h5>
            <br />
            <h2>Let the good times roll and leave all the planning to us.</h2>
            <br />
          </div>
          <Image
            src={"/images/food/food1.jpeg"}
            width={1000}
            height={1000}
            alt=""
          />
        </div>
        <div className="md:w-1/2 p-5 flex h-full flex-col justify-between">
          <Image
            src={"/images/food/restaurent.jpeg"}
            width={1000}
            height={1000}
            alt=""
          />
          <br />
          <br />

          <p>
            The ultimate bachelor party experience awaits in Lush Green Nature
            of Malshej.So, gather your bros and get primed for a world-class
            bachelor party for the ages in this spectacular destination.
          </p>
          <br />
          <a className="w-full" href="/MenuCard.pdf">
            <button className="w-full">Menu Card</button>
          </a>
          <br />
        </div>
      </div>
    </>
  );
};

export default Restaurent;
