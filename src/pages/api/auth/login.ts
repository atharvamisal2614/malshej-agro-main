import { isValidEmail } from "@/helpers/validations";
import { Admin } from "@/models/Admin";
import { sign } from "jsonwebtoken";
import { enc, AES } from "crypto-js";
import dbConnect from "@/middleware/mongo";
import type { NextApiRequest, NextApiResponse } from "next";
import type { AdminType } from "@/types/model";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<any> => {
  if (req.method === "POST") {
    try {
      const { email = "", password = "" }: { email: string; password: string } =
        req.body;

      if (email.length === 0 || !isValidEmail(email)) {
        res.status(400).json({ message: "Invalid Email" });
        return;
      }

      await dbConnect();

      const admin: AdminType | null = await Admin.findOne({ email });

      if (admin === null) {
        res.status(400).json({ message: "No user found with given email" });
        return;
      }

      if (!admin.verified) {
        res.status(400).json({ message: "Email is not verified" });
        return;
      }

      const adminSec = process.env.ADMIN_SEC;
      if (adminSec === undefined) throw Error("Invalid Admin Sec");

      const bytes = AES.decrypt(admin.password, adminSec);
      const pass = bytes.toString(enc.Utf8);

      if (pass === password) {
        const token = sign({ admin }, adminSec, {
          expiresIn: "10d",
        });
        res.status(200).json({ message: "Successfully Logged In", token });
        return;
      }
      res.status(400).json({ message: "Failed to login" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Unkown Error Occured" });
    }
  } else {
    res.status(405).json({ message: "This method is not allowed" });
  }
};

export default handler;
