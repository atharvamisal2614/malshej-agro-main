import type { AdminType } from "@/types/model";
import { verify, type JwtPayload } from "jsonwebtoken";
import type { NextApiRequest } from "next";

interface IPayload extends JwtPayload {
  admin: AdminType;
}

export const verifyAdmin = (req: NextApiRequest): AdminType | null => {
  try {
    const { authorization } = req.headers;

    if (authorization === undefined)
      throw Error("Authorization Header Not Found");

    const adminSec = process.env.ADMIN_SEC;
    if (adminSec === undefined) return null;
    const bearer = authorization.split(" ");
    const token = bearer[1];

    const admin: IPayload = verify(token, adminSec) as IPayload;

    // console.log(admin);

    if (!admin.admin.verified) {
      return null;
    } else {
      return admin.admin;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};
