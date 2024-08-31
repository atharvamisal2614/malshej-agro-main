import dbConnect from "@/middleware/mongo";
import { verifyAdmin } from "@/middleware/verifyToken";
import { Booking } from "@/models/Booking";
import { isValidObjectId } from "mongoose";
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

      // add search
      const { bid = "", name = "" }: { bid: string; name: string } =
        req.query as { bid: string; name: string };

      if (bid.length !== 0 && isValidObjectId(bid)) {
        const bookings = await Booking.find({ _id: bid });
        res.status(200).json({ message: "Bookings Fetched", bookings });
        return;
      }

      if (name.length !== 0) {
        const bookings = await Booking.find({
          $text: { $search: name },
          paid: true,
        })
          .sort({ _id: -1 })
          .limit(100);
        res.status(200).json({ message: "Bookings Fetched", bookings });
        return;
      }

      const bookings = await Booking.find({ paid: true })
        .sort({ _id: -1 })
        .limit(100);
      res.status(200).json({ message: "Bookings Fetched", bookings });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Unkown Error Occured" });
    }
  } else {
    res.status(405).json({ message: "This method is not allowed" });
  }
};

export default handler;
