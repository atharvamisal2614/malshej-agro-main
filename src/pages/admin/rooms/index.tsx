import { BASE_URL } from "@/utils/config";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import AdminLayout from "@/components/AdminLayout";
import type { RoomType } from "@/types/model";

const Rooms = (): JSX.Element => {
  const [rooms, setRooms] = useState<RoomType[]>([]);

  const getRooms = async (): Promise<void> => {
    try {
      const url = `${BASE_URL}/api/room`;
      const res = await axios.get(url);
      setRooms(res.data.rooms as RoomType[]);
    } catch (error) {
      console.log(error);
      toast.error("Unknown Error Occured");
    }
  };

  useEffect(() => {
    void getRooms();
  }, []);

  return (
    <>
      <AdminLayout>
        <div className="m-auto max-w-6xl p-10 text-center">
          <h2 className="mb-10">Our Rooms</h2>
          <div className="flex justify-center gap-5">
            {rooms.map((room) => (
              <div
                key={room._id}
                className="my-5 flex w-1/4 justify-between gap-10  rounded border p-5"
              >
                <div className="text-left">
                  <Link href={`/admin/rooms/${room.slug}`}>
                    <h4>{room.title}</h4>
                    <p>Price: {room.price}</p>
                    <p>Weekend Rates: {room.weekendRates}</p>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default Rooms;
