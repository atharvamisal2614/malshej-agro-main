import AdminLayout from "@/components/AdminLayout";
import dbConnect from "@/middleware/mongo";
import { Room } from "@/models/Room";
import type { RoomType } from "@/types/model";
import Link from "next/link";
import React from "react";

const AddBooking = ({ rooms }: { rooms: RoomType[] }): JSX.Element => {
  return (
    <>
      <AdminLayout>
        <div className="m-auto max-w-6xl p-10 text-center">
          <h2 className="mb-10">Select Room Type</h2>

          <div className="mx-auto flex max-w-2xl flex-wrap justify-center gap-5">
            {rooms.map((room) => (
              <Link
                key={room._id}
                href={`/admin/bookings/add-booking/${room.slug}`}
              >
                <p className="mx-auto  w-40 rounded border-2 border-gray-500 p-2 text-xl hover:bg-green-100">
                  {room.title}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default AddBooking;

export async function getServerSideProps(): Promise<any> {
  try {
    await dbConnect();

    const roomData = await Room.find();

    const rooms = JSON.parse(JSON.stringify(roomData));
    return {
      props: { rooms }, // will be passed to the page component as props
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
