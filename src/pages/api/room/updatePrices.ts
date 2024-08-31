import dbConnect from "@/middleware/mongo";
import { Availability, type IAvailability } from "@/models/Availability";
import { Room } from "@/models/Room";
import { verifyAdmin } from "@/middleware/verifyToken";
import type { NextApiRequest, NextApiResponse } from "next";
import type { AvailabilityType } from "@/types/model";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<any> => {
  if (req.method === "POST") {
    const {
      dates,
      room,
      price,
    }: { dates: string[]; room: string; price: number } = req.body;

    const admin = verifyAdmin(req);

    if (admin === null) {
      res.status(401).json({ message: "You are not an admin" });
      return;
    }

    try {
      await dbConnect();

      const roomObj = await Room.findById(room);

      // get all the availability dates
      const roomAvailability: AvailabilityType[] = await Availability.find({
        room,
        date: { $in: dates },
      });
      // check if for each room aval obj is there or not
      // if yes update price
      // else create availability obj  currCapacity

      const toUpdate: string[] = [];
      const toCreate: IAvailability[] = [];

      dates.forEach((date) => {
        const aval = roomAvailability.find((r) => {
          return r.date === date;
        });
        if (aval !== undefined) {
          toUpdate.push(aval._id);
          console.log("Update Price");
        } else {
          toCreate.push({
            room,
            date,
            price,
            remainingCapacity: roomObj.currCapacity,
          });
          console.log("Create ");
        }
      });

      await Availability.insertMany(toCreate);
      await Availability.updateMany(
        { _id: { $in: toUpdate } },
        { $set: { price } }
      );

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
