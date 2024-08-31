import dbConnect from "@/middleware/mongo";
import { Booking } from "@/models/Booking";
import React from "react";
import { Room } from "@/models/Room";
import { getIndianDate } from "@/helpers/dateOps";
import type { BookingType, RoomType } from "@/types/model";

interface Props extends Omit<BookingType, "room">, MongoBase {
  room: RoomType;
}

const PublicBooking = ({ booking }: { booking: Props }): JSX.Element => {
  return (
    <>
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
          Room: <strong>{booking?.room?.title}</strong>
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
      </div>
    </>
  );
};

export default PublicBooking;

export async function getServerSideProps(context: any): Promise<any> {
  const id = context.params.id;

  let booking;

  try {
    await dbConnect();

    const bookingsData = await Booking.findById(id, {
      createdAt: 0,
      notes: 0,
      phone: 0,
      updatedAt: 0,
    }).populate({ path: "room", model: Room });

    console.log(bookingsData);

    booking = JSON.parse(JSON.stringify(bookingsData));
  } catch (error) {
    console.log(error);
    booking = null;
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: { booking }, // will be passed to the page component as props
  };
}
