import AdminLayout from "@/components/AdminLayout";
import { getIndianDate } from "@/helpers/dateOps";
import dbConnect from "@/middleware/mongo";
import { Booking } from "@/models/Booking";
import { Room } from "@/models/Room";
import type { BookingType, RoomType } from "@/types/model";
import { BASE_URL } from "@/utils/config";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

interface Props extends Omit<BookingType, "room">, MongoBase {
  room: RoomType;
}

const BookingDetails = ({
  booking,
}: {
  booking: Props | null;
}): JSX.Element => {
  const [notes, setnotes] = useState(booking?.notes);

  const saveNotes = async (): Promise<void> => {
    try {
      const url = `${BASE_URL}/api/bookings/${booking?._id}`;
      console.log(url);
      const res = await axios.put(url, { ...booking, notes });
      console.log(res.data);
      toast.success("Note Saved");
    } catch (error) {
      console.log(error);
      toast.error("Failed to save Notes");
    }
  };

  if (booking === null) {
    return (
      <>
        <div className="m-auto max-w-6xl p-10">
          No Booking Found with Given Id
        </div>
      </>
    );
  }
  return (
    <>
      <AdminLayout>
        <div className="m-auto max-w-6xl space-y-2 p-10">
          <h3>Booking #{booking?._id}</h3>

          <p>
            Name: <strong>{booking?.fname}</strong>{" "}
            <strong>{booking?.lname}</strong>
          </p>
          <p>
            Email: <strong>{booking?.email}</strong>
          </p>
          <p>
            Phone: <strong>{booking?.phone}</strong>
          </p>
          <p>
            Room: <strong>{booking?.room?.title ?? ""}</strong>
          </p>
          <p>
            Adults: <strong>{booking?.adults}</strong>
          </p>
          <p>
            Child 7+: <strong>{booking?.childs}</strong>
          </p>
          <p>
            Child 10+: <strong>{booking?.childTen}</strong>
          </p>

          <p>
            Booked Rooms: <strong>{booking?.reqRooms}</strong>
          </p>
          <p>
            Special Request: <strong>{booking?.specialRequest}</strong>
          </p>
          <p>
            Amount Paid: <strong>Rs. {booking?.amount}/-</strong>
          </p>
          <p>
            Check In: <strong>{getIndianDate(booking?.checkIn)}</strong>
          </p>
          <p>
            Check Out: <strong>{getIndianDate(booking?.checkOut)}</strong>
          </p>
          <p>
            Coupon Used: <strong>{booking.coupon}</strong>
          </p>

          <p>Notes:</p>
          <textarea
            className="w-full rounded border-2 border-gray-500 p-2 outline-none md:w-1/2"
            value={notes}
            onChange={(e) => {
              setnotes(e.target.value);
            }}
          />
          <br />
          <button
            onClick={() => {
              void saveNotes();
            }}
            className="btn"
          >
            Save Notes
          </button>
        </div>
      </AdminLayout>
    </>
  );
};

export default BookingDetails;

export async function getServerSideProps(context: any): Promise<any> {
  //   console.log(context);

  const id: string = context.params.id;

  let booking: any;

  try {
    await dbConnect();
    const bookingsData = await Booking.findById(id).populate({
      path: "room",
      model: Room,
    });

    console.log(bookingsData);

    booking = JSON.parse(JSON.stringify(bookingsData));
  } catch (error) {
    console.log(error);
    booking = null;
  }
  return {
    props: { booking }, // will be passed to the page component as props
  };
}
