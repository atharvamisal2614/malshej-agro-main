import AdminLayout from "@/components/AdminLayout";
import CheckAvailability from "@/components/CheckAvailability";
import GuestDetails from "@/components/GuestDetails";
import PlainAvalCalender from "@/components/PlainAvalCalender";
import { getDatesInRange } from "@/helpers/dateOps";
import dbConnect from "@/middleware/mongo";
import { Room } from "@/models/Room";
import type { AvailabilityType, RoomType } from "@/types/model";
import { BASE_URL } from "@/utils/config";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css";
import { toast } from "react-toastify";

const Booking = ({ room }: { room: RoomType | null }): JSX.Element => {
  // get dates and number of rooms
  // check Availability.
  // if available get details
  // show booking details
  // send to checkout
  // If Successufull send them a link
  const [isAC, setIsAC] = useState(false);
  const [page, setPage] = useState(0);
  const [reqRooms, setReqRooms] = useState(1);
  const [nights, setNights] = useState(0);
  const [guest, setGuest] = useState<IGuest>({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    adults: 2,
    child: 0,
    childTen: 0,
    specialRequest: "",
  });
  const [roomAvailability, setRoomAvailability] = useState<AvailabilityType[]>(
    []
  );

  const [coupon, setCoupon] = useState<string>("");

  const router = useRouter();

  const tomorrow = (): Date => {
    const result = new Date();
    result.setDate(result.getDate() + 2);
    return result;
  };

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: tomorrow(),
      key: "selection",
    },
  ]);

  const checkAvailability = async (): Promise<void> => {
    try {
      const url = `${BASE_URL}/api/room/checkavailability`;
      const dates = getDatesInRange(
        state[0].startDate.toString(),
        state[0].endDate.toString()
      );
      const data = {
        checkIn: state[0].startDate.toString(),
        checkOut: state[0].endDate.toString(),
        reqRooms,
        room,
        dates,
      };
      const res = await axios.post(url, data);
      // console.log(res.data);
      setRoomAvailability(res.data.roomAvailability as AvailabilityType[]);

      setPage(1);
    } catch (error: any) {
      if (error?.response?.status === 404) {
        toast.error("Sorry Rooms are not available");
      } else {
        console.log(error);
        toast.error("Unknown Error Occured");
      }
    }
  };

  const checkout = async (): Promise<void> => {
    try {
      const url = `${BASE_URL}/api/admin-booking`;
      const dates = getDatesInRange(
        state[0].startDate.toString(),
        state[0].endDate.toString()
      );
      const data = {
        roomId: room?._id,
        checkIn: state[0].startDate.toString(),
        checkOut: state[0].endDate.toString(),
        reqRooms,
        fname: guest.fname,
        lname: guest.lname,
        email: guest.email,
        phone: guest.phone,
        specialRequest: guest.specialRequest,
        adults: guest.adults,
        child: guest.child,
        childTen: guest.childTen,
        coupon,
        dates,
        isAC,
      };

      console.log("Checkout Data", data);

      const order = await axios.post(url, data);
      console.log(order);
      toast.success("Booking Successfull User will receive email shortly");

      setTimeout(() => {
        void router.push(`/admin/bookings/${order.data.booking._id}`);
      }, 1000);
    } catch (error) {
      console.log(error);
      toast.error("Unknown Error Occured");
    }
  };

  // To find total nights
  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;

  function dayDifference(date1: Date, date2: Date): number {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    setNights(diffDays);
    return diffDays;
  }

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (state[0].endDate) {
      dayDifference(state[0].startDate, state[0].endDate);
    }
  }, [state]);

  if (room === null) return <p>Room Not Found</p>;

  return (
    <>
      <AdminLayout>
        {page === 0 && (
          <CheckAvailability
            room={room}
            setState={setState}
            state={state}
            setReqRooms={setReqRooms}
            reqRooms={reqRooms}
            nights={nights}
            checkAvailability={checkAvailability}
          />
        )}
        {page === 1 && (
          <GuestDetails
            room={room}
            state={state}
            nights={nights}
            reqRooms={reqRooms}
            setPage={setPage}
            setState={setState}
            guest={guest}
            setGuest={setGuest}
            checkout={checkout}
            roomAvailability={roomAvailability}
            coupon={coupon}
            setCoupon={setCoupon}
            isAC={isAC}
            setIsAC={setIsAC}
          />
        )}
        <PlainAvalCalender room={room} />
      </AdminLayout>
    </>
  );
};

export default Booking;

export async function getServerSideProps(context: any): Promise<any> {
  const id: string = context.query.id;

  let room: RoomType | null;
  try {
    await dbConnect();
    const roomData: RoomType | null = await Room.findOne({ slug: id });
    room = JSON.parse(JSON.stringify(roomData));
    console.log(room);
    return {
      props: { room }, // will be passed to the page component as props
    };
  } catch (error) {
    console.log(error);
    return {
      redirect: {
        destination: "/admin",
        permanent: false,
      },
    };
  }
}
