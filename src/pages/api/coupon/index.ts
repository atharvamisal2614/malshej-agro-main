import dbConnect from "@/middleware/mongo";
import { verifyAdmin } from "@/middleware/verifyToken";
import { Coupon } from "@/models/Coupon";
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

      const coupons = await Coupon.find();
      res.status(200).json({ message: "Coupons Fetched", coupons });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Unkown Error Occured" });
    }
  } else if (req.method === "POST") {
    const { code, discount }: { code: string; discount: number } = req.body;

    try {
      await dbConnect();

      const coupon = await Coupon.create({ code, discount });

      res.status(201).json({ message: "Coupon Created", coupon });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Unkown Error Occured" });
    }
  } else {
    res.status(405).json({ message: "This method is not allowed" });
  }
};

export default handler;
