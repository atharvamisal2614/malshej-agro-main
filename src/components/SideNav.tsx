import type { RoomType } from "@/types/model";
import { BASE_URL } from "@/utils/config";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";

const SideNav = (): JSX.Element => {
  const router = useRouter();
  const cookies = new Cookies();

  const [rooms, setRooms] = useState<RoomType[]>([]);

  const logout = (): void => {
    localStorage.removeItem("token");
    cookies.remove("authorization");
    void router.push("/auth/login");
  };

  const fetchRooms = async (): Promise<void> => {
    try {
      const r = await axios.get(`${BASE_URL}/api/room`);
      setRooms(r.data.rooms as RoomType[]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    void fetchRooms();
  }, []);

  return (
    <>
      <div className="fixed flex h-screen w-1/5 flex-col bg-green-100 p-4">
        <div className="overflow-y-scroll">
          <div className="flex items-center gap-3 px-2 py-4">
            <h2 className="text-3xl font-bold ">Malshej Admin Panel</h2>
          </div>

          <div className="flex flex-col gap-1 py-4">
            <Link href={"/admin"}>
              <h3 className="cursor-pointer py-1 text-2xl font-semibold text-black hover:text-primary">
                Home
              </h3>
            </Link>
            <br />
            <Link href={"/admin/bookings"}>
              <h3 className="cursor-pointer py-1 text-2xl font-semibold text-black hover:text-primary">
                All Bookings
              </h3>
            </Link>
            <Link href={"/admin/bookings/add-booking"}>
              <h3 className="cursor-pointer text-xl font-semibold text-black hover:text-primary">
                Add New Booking
              </h3>
            </Link>
            {rooms.map((room) => (
              <Link
                key={room._id}
                href={`/admin/bookings/add-booking/${room.slug}`}
              >
                <h3 className="cursor-pointer text-xl text-black hover:text-primary">
                  {room.title}
                </h3>
              </Link>
            ))}

            <br />

            <Link href={"/admin/rooms"}>
              <h3 className="cursor-pointer py-1 text-2xl font-semibold text-black hover:text-primary">
                Change Prices
              </h3>
            </Link>

            {rooms.map((room) => (
              <Link key={room._id} href={`/admin/rooms/${room.slug}`}>
                <h3 className="cursor-pointer text-xl text-black hover:text-primary">
                  {room.title}
                </h3>
              </Link>
            ))}
          </div>
          <Link href={"/admin/coupons"}>
            <h3 className="cursor-pointer py-1 text-2xl font-semibold text-black hover:text-primary">
              Coupons
            </h3>
          </Link>
          <div className="flex-1"></div>

          {/* <div className="divider my-6 h-[1px] w-full bg-gray-500"></div> */}

          <div className="flex gap-3 py-3 text-white">
            <button onClick={logout}>Logout</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideNav;
