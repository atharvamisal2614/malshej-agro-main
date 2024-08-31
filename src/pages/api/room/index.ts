import dbConnect from "@/middleware/mongo";
import { verifyAdmin } from "@/middleware/verifyToken";
import { Room } from "@/models/Room";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<any> => {
  const admin = verifyAdmin(req);

  if (admin === null) {
    res.status(401).json({ message: "You are not an admin" });
    return;
  }

  if (req.method === "GET") {
    try {
      await dbConnect();

      const rooms = await Room.find();
      res.status(200).json({ message: "Rooms Fetched", rooms });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Unkown Error Occured" });
    }
  } else if (req.method === "POST") {
    const {
      title,
      slug,
      maxPeople,
      currCapacity,
      price,
      weekendRates,
      adultWeekend,
      child7Weekend,
      child10Weekend,
      adultWeekdays,
      child7Weekdays,
      child10Weekdays,
      validTill,
    } = req.body;

    try {
      await dbConnect();

      const room = await Room.create({
        title,
        slug,
        maxPeople,
        currCapacity,
        price,
        weekendRates,
        adultWeekend,
        child7Weekend,
        child10Weekend,
        adultWeekdays,
        child7Weekdays,
        child10Weekdays,
        validTill,
      });

      res.status(201).json({ message: "Room Created", room });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Unkown Error Occured" });
    }
  } else {
    res.status(405).json({ message: "This method is not allowed" });
  }
};

export default handler;
