import dbConnect from "@/middleware/mongo";
import { Availability } from "@/models/Availability";
import { verifyAdmin } from "@/middleware/verifyToken";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<any> => {
  if (req.method === "POST") {
    const { dates, room } = req.body;

    const admin = verifyAdmin(req);

    if (admin === null) {
      res.status(401).json({ message: "You are not an admin" });
      return;
    }

    try {
      await dbConnect();

      // get all the dates when room is booked
      const roomAvailability = await Availability.find({
        room,
        date: { $in: dates },
      });

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
