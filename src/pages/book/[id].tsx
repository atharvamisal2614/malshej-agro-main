import CheckAvailability from "@/components/CheckAvailability";
import GuestDetails from "@/components/GuestDetails";
import { getDatesInRange } from "@/helpers/dateOps";
import dbConnect from "@/middleware/mongo";
import { Room } from "@/models/Room";
import type { AvailabilityType, BookingType, RoomType } from "@/types/model";
import { BASE_URL } from "@/utils/config";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";

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

  const [coupon, setCoupon] = useState<string>("");
  const [isAC, setIsAC] = useState(false);

  // This contains Booking data along with some other params for payment
  const [orderData, setOrderData] = useState<any | null>(null);

  const [roomAvailability, setRoomAvailability] = useState<AvailabilityType[]>(
    []
  );

  const router = useRouter();
  const formref = useRef<HTMLFormElement>(null);

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

  // To find total nights
  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;

  function dayDifference(date1: Date, date2: Date): number {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    setNights(diffDays);
    return diffDays;
  }

  const checkAvailability = async (): Promise<void> => {
    try {
      const dates = getDatesInRange(
        state[0].startDate.toString(),
        state[0].endDate.toString()
      );
      const url = `${BASE_URL}/api/room/checkavailability`;
      const data = {
        checkIn: state[0].startDate.toString(),
        checkOut: state[0].endDate.toString(),
        reqRooms,
        room,
        dates,
      };
      const res = await axios.post(url, data);
      console.log(res.data.roomAvailability);
      setRoomAvailability(res.data.roomAvailability as AvailabilityType[]);
      setPage(1);
    } catch (error) {
      toast.error("Rooms are not available");
      console.log(error);
    }
  };

  const checkout = async (): Promise<void> => {
    try {
      const url = `${BASE_URL}/api/payment/checkout`;
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

      const order = await axios.post(url, data);

      setOrderData(order.data as BookingType);
      console.log(order.data);
    } catch (error) {
      console.log(error);
      toast.error("Unknown Error Occured");
    }
  };

  useEffect(() => {
    if (orderData === null) return;
    console.log(orderData);
    console.log("form submit call");
    if (formref.current !== null) {
      formref.current.submit();
    }
  }, [orderData]);

  useEffect(() => {
    dayDifference(state[0].startDate, state[0].endDate);
    console.log(state[0].startDate.toString());
  }, [state]);

  useEffect(() => {
    if (!router.isReady) return;
    if (room === null) {
      toast.error("Unknown Error Occured");
      void router.push("/");
    }
  }, [router]);

  return (
    <>
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
          guest={guest}
          setState={setState}
          room={room}
          state={state}
          nights={nights}
          reqRooms={reqRooms}
          setPage={setPage}
          setGuest={setGuest}
          checkout={checkout}
          roomAvailability={roomAvailability}
          coupon={coupon}
          setCoupon={setCoupon}
          isAC={isAC}
          setIsAC={setIsAC}
        />
      )}

      <form
        ref={formref}
        id="sendtoairpay2"
        action="https://payments.airpay.co.in/pay/index.php"
        method="POST"
      >
        <input
          type="hidden"
          name="privatekey"
          value={orderData?.privatekey ?? ""}
        />
        <input type="hidden" name="mercid" value={orderData?.mid ?? ""} />
        <input
          type="hidden"
          name="orderid"
          value={orderData?.booking?.orderId ?? ""}
        />

        <input type="hidden" name="currency" value={356} />
        <input type="hidden" name="isocurrency" value={"INR"} />
        <input type="hidden" name="chmod" value={""} />
        {/* <input
          type="hidden"
          name="CUSTOMVAR"
          value={orderData?.booking?.orderId ? orderData?.booking?.orderId : ""}
        /> */}
        <input
          type="hidden"
          name="customvar"
          value={orderData?.booking?.orderId ?? ""}
        />
        <input
          type="hidden"
          name="buyerEmail"
          value={orderData?.booking.email ?? ""}
        />
        <input
          type="hidden"
          name="buyerPhone"
          value={orderData?.booking.phone ?? ""}
        />
        <input
          type="hidden"
          name="buyerFirstName"
          value={orderData?.booking.fname ?? ""}
        />
        <input
          type="hidden"
          name="buyerLastName"
          value={orderData?.booking.lname ?? ""}
        />
        <input type="hidden" name="buyerAddress" value={""} />
        <input type="hidden" name="buyerCity" value={""} />
        <input type="hidden" name="buyerState" value={""} />
        <input type="hidden" name="buyerCountry" value={""} />
        <input type="hidden" name="buyerPinCode" value={""} />
        <input
          type="hidden"
          name="amount"
          value={
            orderData?.booking.amount !== undefined
              ? orderData?.booking.amount.toFixed(2)
              : 100000.0
          }
        />
        <input
          type="hidden"
          name="checksum"
          value={orderData?.checksum ?? ""}
        />
      </form>
    </>
  );
};

export default Booking;

export async function getServerSideProps(context: any): Promise<any> {
  const slug: string = context.query.id;

  let room;
  try {
    await dbConnect();
    const roomData = await Room.find({ slug });
    room = JSON.parse(JSON.stringify(roomData[0]));
  } catch (error) {
    console.log(error);
    room = null;
  }
  return {
    props: { room }, // will be passed to the page component as props
  };
}
