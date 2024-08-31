import dbConnect from "@/middleware/mongo";
import { verifyAdmin } from "@/middleware/verifyToken";
import { Room } from "@/models/Room";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<any> => {
  const id = req.query.id;

  if (req.method === "GET") {
    try {
      await dbConnect();

      const room = await Room.findById(id);

      res.status(200).json({ message: "Room Found", room });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Unkown Error Occured" });
    }
  } else if (req.method === "PUT") {
    await dbConnect();
    const admin = verifyAdmin(req);

    if (admin === null) {
      res.status(401).json({ message: "You are not an admin" });
      return;
    }

    const {
      price,
      weekendRates,
      adultWeekend,
      child7Weekend,
      child10Weekend,
      adultWeekdays,
      child7Weekdays,
      child10Weekdays,
    } = req.body;

    try {
      const room = await Room.findByIdAndUpdate(id, {
        price,
        weekendRates,
        adultWeekend,
        child7Weekend,
        child10Weekend,
        adultWeekdays,
        child7Weekdays,
        child10Weekdays,
      });
      res.status(201).json({ message: "Price Updated successfully", room });
    } catch (error) {}
  } else {
    res.status(405).json({ message: "This method is not allowed" });
  }
};

export default handler;
