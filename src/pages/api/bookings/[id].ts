import dbConnect from "@/middleware/mongo";
import { verifyAdmin } from "@/middleware/verifyToken";
import { Availability } from "@/models/Availability";
import { Booking } from "@/models/Booking";
import type { BookingType } from "@/types/model";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<any> => {
  const id = req.query.id;
  const admin = verifyAdmin(req);

  if (admin === null) {
    res.status(401).json({ message: "You are not an admin" });
    return;
  }

  if (req.method === "PUT") {
    const { notes } = req.body;

    try {
      await dbConnect();
      const room = await Booking.findByIdAndUpdate(
        id,
        { notes },
        { new: true }
      );
      res.status(201).json({ message: "Booking Updated successfully", room });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Unkown Error Occured" });
    }
  } else if (req.method === "DELETE") {
    try {
      await dbConnect();

      const booking: BookingType | null = await Booking.findById(id);

      if (booking === null) {
        res.status(400).json({ message: "Booking Not Found" });
        return;
      }

      const { room, reqRooms } = booking;

      for (const date of booking.dates) {
        const availablilty = await Availability.findOne({
          room,
          date,
        });

        console.log(availablilty);

        await Availability.findByIdAndUpdate(availablilty._id, {
          remainingCapacity: availablilty.remainingCapacity + reqRooms,
        });
      }
      await Booking.findByIdAndDelete(booking._id);

      res.status(200).json({ message: "Booking Deleted successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Unkown Error Occured" });
    }
  } else {
    res.status(405).json({ message: "This method is not allowed" });
  }
};

export default handler;
