import RoomComp from "@/components/RoomComp";
import dbConnect from "@/middleware/mongo";
import { Room } from "@/models/Room";
import type { RoomType } from "@/types/model";
import React from "react";

const FamilyRoom = ({ room }: { room: RoomType }): JSX.Element => {
  return (
    <>
      <RoomComp
        title="Bunglow"
        desc="Each of these Luxury Farm Villas offers peace and quiet environment that you can enjoy you from your expansive, humdrum living area.It is a heaven in the country offering serenity."
        img="/images/bunglow/bunglowfront.jpg"
        room={room}
        imagesList={[
          "/images/bunglow/bunglow1.jpg",
          "/images/bunglow/bunglow2.jpg",
          "/images/bunglow/bunglow3.jpg",
          "/images/bunglow/bunglow4.jpg",
          "/images/bunglow/bunglow5.jpg",
          "/images/bunglow/bunglow6.jpg",
          "/images/bunglow/bunglow7.jpg",
          "/images/bunglow/bunglow8.jpg",
          "/images/bunglow/bunglow9.jpg",
          "/images/bunglow/bunglow10.jpg",
          "/images/bunglow/bunglow11.jpg",
          "/images/bunglow/bunglow12.jpg",
          "/images/bunglow/bunglow13.jpg",
          "/images/bunglow/bunglow14.jpg",
          "/images/bunglow/bunglow15.jpg",
          "/images/bunglow/bunglow16.jpg",
          "/images/bunglow/bunglow17.jpg",
          "/images/bunglow/bunglow18.jpg",
        ]}
      />
    </>
  );
};

export default FamilyRoom;

export async function getServerSideProps(): Promise<any> {
  try {
    await dbConnect();

    const roomData = await Room.findOne({ slug: "bunglow" });

    const room = JSON.parse(JSON.stringify(roomData));
    return {
      props: { room }, // will be passed to the page component as props
    };
  } catch (error) {
    console.log(error);
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
}
