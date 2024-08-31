import RoomComp from "@/components/RoomComp";
import dbConnect from "@/middleware/mongo";
import { Room } from "@/models/Room";
import type { RoomType } from "@/types/model";
import React from "react";

const Cottage = ({ room }: { room: RoomType }): JSX.Element => {
  return (
    <>
      <RoomComp
        title="Dormitory"
        desc="Experience comfort and convenience in our well-maintained dormitory. Offering cozy beds, clean facilities, and secure lockers, our dormitory is the perfect blend of affordability and comfort for solo travelers and groups."
        img="/images/dorm/dorm1.jpg"
        room={room}
        imagesList={["/images/dorm/dorm2.jpg", "/images/dorm/dorm3.jpg"]}
      />
    </>
  );
};

export default Cottage;

export async function getServerSideProps(): Promise<any> {
  try {
    await dbConnect();

    const roomData = await Room.findOne({ slug: "dormitory" });

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
