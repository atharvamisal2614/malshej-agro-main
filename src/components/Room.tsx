import Image from "next/image";
import Link from "next/link";
import React from "react";

interface RoomProps {
  image: string;
  title: string;
  desc: string;
  url: string;
}

const Room = ({ image, title, desc, url }: RoomProps): JSX.Element => {
  return (
    <>
      <div className="p-5 md:w-1/3">
        <div className="w-full bg-accent">
          <Image
            className="max-h-60 object-cover"
            width={500}
            height={500}
            src={image}
            alt=""
          />
          <div className=" p-5">
            <h3>{title}</h3>
            <br />
            <p className="leading-5">{desc}</p>
            <Link href={url}>
              <button className="my-5">Book Now</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Room;
