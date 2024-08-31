import RoomComp from "@/components/RoomComp";
import dbConnect from "@/middleware/mongo";
import { Room } from "@/models/Room";
import type { RoomType } from "@/types/model";
import React from "react";

const FamilyRoom = ({ room }: { room: RoomType }): JSX.Element => {
  return (
    <>
      <RoomComp
        title="Family Room"
        desc="Indulge in luxury and comfort within our air-conditioned villa featuring exquisite design"
        img="/images/family-rooms/family1.jpg"
        room={room}
        imagesList={[
          "/images/family-rooms/family1.jpg",
          "/images/family-rooms/family2.jpg",
          "/images/g1.jpg",
        ]}
      />
    </>
  );
};

export default FamilyRoom;

export async function getServerSideProps(): Promise<any> {
  try {
    await dbConnect();

    const roomData = await Room.findOne({ slug: "family-ac" });

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
