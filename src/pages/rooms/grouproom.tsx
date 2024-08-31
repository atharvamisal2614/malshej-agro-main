import RoomComp from "@/components/RoomComp";
import dbConnect from "@/middleware/mongo";
import { Room } from "@/models/Room";
import type { RoomType } from "@/types/model";
import React from "react";
const GroupRoom = ({ room }: { room: RoomType }): JSX.Element => {
  return (
    <>
      <RoomComp
        title="Group Room"
        desc="Indulge in luxury and comfort within our air-conditioned villa featuring exquisite design"
        img="/images/grouproom/group2.jpg"
        room={room}
        imagesList={[
          "/images/grouproom/group2.jpg",
          "/images/grouproom/group3.jpg",
          "/images/grouproom/group1.jpg",
        ]}
      />
    </>
  );
};

export default GroupRoom;

export async function getServerSideProps(): Promise<any> {
  try {
    await dbConnect();

    const roomData = await Room.findOne({ slug: "group" });

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
