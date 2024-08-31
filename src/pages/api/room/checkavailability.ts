import dbConnect from "@/middleware/mongo";
import { getDatesInRange } from "@/helpers/dateOps";
import { Availability } from "@/models/Availability";
import { Room } from "@/models/Room";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<any> => {
  if (req.method === "POST") {
    const {
      checkIn,
      checkOut,
      room,
      reqRooms,
      dates,
    }: {
      checkIn: string;
      checkOut: string;
      room: string;
      reqRooms: number;
      dates: number[];
    } = req.body;

    try {
      // const dates = getDatesInRange(checkIn, checkOut);
      dates.pop();
      await dbConnect();

      const roomData = await Room.findById(room);

      // get room and check its max capacity
      // if req room is more return
      if (roomData.currCapacity < reqRooms) {
        res.status(404).json({ message: "Rooms Are Not Available" });
        return;
      }

      // get all the dates when room is booked
      const roomAvailability = await Availability.find({
        room,
        date: { $in: dates },
      });

      // check if on every date remaining capacity is greaterthan equal to requiredRooms
      for (let i = 0; i < roomAvailability.length; i++) {
        const room = roomAvailability[i];
        if (room.remainingCapacity < reqRooms) {
          res.status(404).json({ message: "Rooms Are Not Available" });
          return;
        }
      }

      res.status(200).json({ message: "Room Available", roomAvailability });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Unkown Error Occured" });
    }
  } else {
    res.status(405).json({ message: "This method is not allowed" });
  }
};

export default handler;
