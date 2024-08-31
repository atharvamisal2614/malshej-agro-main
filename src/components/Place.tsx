import Image from "next/image";
import React from "react";

interface PlaceProps {
  image: string;
  name: string;
  desc: string;
  reverse: boolean;
}

const Place = ({ image, name, desc, reverse }: PlaceProps) => {
  return (
    <>
      <div
        className={`max-w-7xl mx-auto flex bg-accent md:flex-row flex-col ${
          reverse ? "md:flex-row-reverse" : ""
        }`}
      >
        <div className="md:w-1/2 md:h-96 h-72  overflow-hidden">
          <Image
            src={image}
            className="object-cover w-full h-full hover:scale-110 duration-300"
            width={700}
            height={400}
            alt=""
          />
        </div>
        <div className="md:w-1/2 p-8 flex flex-col justify-center">
          <h3>{name}</h3>
          <br />
          <p>{desc}</p>
        </div>
      </div>
    </>
  );
};

export default Place;
