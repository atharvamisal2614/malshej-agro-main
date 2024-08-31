import RoomComp from "@/components/RoomComp";
import dbConnect from "@/middleware/mongo";
import { Room } from "@/models/Room";
import type { RoomType } from "@/types/model";
import React from "react";

const Cottage = ({ room }: { room: RoomType }): JSX.Element => {
  return (
    <>
      <RoomComp
        title="Cottage"
        desc="Indulge in luxury and comfort within our air-conditioned villa featuring exquisite design"
        img="/images/cottage/cottages3.jpg"
        room={room}
        imagesList={[
          "/images/cottage/cottages1.jpg",
          "/images/cottage/cottages2.jpg",
          "/images/cottage/cottages3.jpg",
          "/images/cottage/cottages4.jpg",
          "/images/cottage/cottage5.jpg",
        ]}
      />
    </>
  );
};

export default Cottage;

export async function getServerSideProps(): Promise<any> {
  try {
    await dbConnect();

    const roomData = await Room.findOne({ slug: "cottage" });

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
