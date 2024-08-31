import RoomComp from "@/components/RoomComp";
import dbConnect from "@/middleware/mongo";
import { Room } from "@/models/Room";
import type { RoomType } from "@/types/model";
import React from "react";

const BambooHuts = ({ room }: { room: RoomType }): JSX.Element => {
  return (
    <>
      <RoomComp
        title="Bamboo Huts"
        desc="Indulge in luxury and comfort within our air-conditioned villa featuring exquisite design"
        img="/images/bamboohuts/bamboo1.jpg"
        room={room}
        imagesList={[
          "/images/bamboohuts/bamboo1.jpg",
          "/images/bamboohuts/bamboo2.jpg",
          "/images/bamboohuts/chairs.jpg",
          "/images/bamboohuts/bamboo3.jpg",
          "/images/bamboohuts/bamboo4.jpg",
          "/images/bamboohuts/bamboo5.jpg",
          "/images/bamboohuts/bamboo7.jpg",
          "/images/bamboohuts/bamboo8.jpg",
        ]}
      />
    </>
  );
};

export default BambooHuts;

export async function getServerSideProps(): Promise<any> {
  try {
    await dbConnect();

    const roomData = await Room.findOne({ slug: "hut" });

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
