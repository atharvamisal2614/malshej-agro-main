import React from "react";

import RateCard from "@/components/RateCard";
import Image from "next/image";
import type { RoomType } from "@/types/model";
import Link from "next/link";
import { toast } from "react-toastify";

const RoomComp = ({
  title,
  img,
  desc,
  imagesList,
  room,
}: {
  title: string;
  img: string;
  desc: string;
  imagesList: string[];
  room: RoomType;
}): JSX.Element => {
  return (
    <div className="mx-auto flex min-h-screen max-w-7xl flex-col p-5 pt-32 md:flex-row">
      <div className="md:w-2/3 ">
        <h1>{title}</h1>
        {/* <div className="relative my-5 h-[50vh] w-full"> */}
        <Image
          src={img}
          className="my-5 object-cover"
          alt=""
          width={1200}
          height={1200}
        />
        {/* </div> */}

        <p>{desc}</p>

        <br />
        <br />
        <h3>More Images</h3>
        <div className="flex flex-wrap">
          {imagesList.map((i) => (
            <ImageComp key={i} url={i} />
          ))}
        </div>
      </div>
      <div className="md:w-1/3  md:p-5">
        <div className="mt-5 rounded bg-green-50 p-5">
          <h4>Starting From</h4>
          <h2>Rs. {room.price}/-</h2>
          <p>Per Night (Breakfast included)</p>
        </div>
        <div className="my-5 bg-green-50  p-5">
          <p className="text-center font-semibold">
            Check in 12:30 PM <br /> Check out 11:00 AM
          </p>
        </div>

        {/* <Link href={`/book/${room.slug}`}> */}
        <button
          onClick={() => {
            toast.error("Rooms are not available");
          }}
          className="w-full"
        >
          Book Now
        </button>
        {/* </Link> */}

        <RateCard room={room} />
      </div>
    </div>
  );
};

export default RoomComp;

const ImageComp = ({ url }: { url: string }): JSX.Element => {
  return (
    <div className="relative mt-5 h-60 w-full pr-5 md:w-1/3">
      <div className="relative h-full w-full">
        <Image src={url} className="object-cover" alt="" fill />
      </div>
    </div>
  );
};
