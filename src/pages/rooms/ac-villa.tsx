import RoomComp from "@/components/RoomComp";
import dbConnect from "@/middleware/mongo";
import { Room } from "@/models/Room";
import type { RoomType } from "@/types/model";
import React from "react";

const ACVilla = ({ room }: { room: RoomType }): JSX.Element => {
  return (
    <>
      <RoomComp
        title="Ac Villa"
        desc="Indulge in luxury and comfort within our air-conditioned villa featuring exquisite design"
        img="/images/acvilla/ac-villa7.jpg"
        room={room}
        imagesList={[
          "/images/acvilla/ac-villa7.jpg",
          "/images/acvilla/ac-villa2.jpg",
          "/images/acvilla/ac-villa3.jpg",
          "/images/acvilla/ac-villa6.jpg",
          "/images/acvilla/ac-villa4.jpg",
          "/images/acvilla/ac-villa5.jpg",
          "/images/acvilla/ac-villa8.jpg",
          "/images/acvilla/ac-villa.jpg",
        ]}
      />
    </>
  );
};

export default ACVilla;

export async function getServerSideProps(): Promise<any> {
  try {
    await dbConnect();

    const roomData = await Room.findOne({ slug: "villa" });

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
