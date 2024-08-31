import { isValidEmail } from "@/helpers/validations";
import dbConnect from "@/middleware/mongo";
import { Admin } from "@/models/Admin";
import { AES } from "crypto-js";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<any> => {
  if (req.method === "POST") {
    try {
      const {
        email = "",
        password = "",
        name = "",
      }: { email: string; password: string; name: string } = req.body;

      if (email.length === 0 || !isValidEmail(email)) {
        res.status(400).json({ message: "Invalid Email" });
        return;
      }
      if (password.length === 0) {
        res.status(400).json({ message: "Invalid Password" });
        return;
      }
      if (name.length === 0) {
        res.status(400).json({ message: "Invalid Name" });
        return;
      }

      // add logic to check email is already exists

      const adminSec = process.env.ADMIN_SEC;
      if (adminSec === undefined) throw Error("Invalid Admin Sec");

      const pass = AES.encrypt(password, adminSec).toString();

      await dbConnect();

      await Admin.create({ name, email, password: pass });

      res
        .status(201)
        .json({ message: "User Created Successfully, Please verify." });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Unkown Error Occured" });
    }
  } else {
    res.status(405).json({ message: "This method is not allowed" });
  }
};

export default handler;
