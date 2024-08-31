import dbConnect from "@/middleware/mongo";
import { Room } from "@/models/Room";
import { Availability } from "@/models/Availability";
import { Booking } from "@/models/Booking";
// import { getDatesInRange } from "@/helpers/dateOps";
import sha256 from "sha256";
import dateFormat from "dateformat";
import type { NextApiRequest, NextApiResponse } from "next";
import { calculateTotalAmount } from "@/helpers/calculateAmount";
import type { AvailabilityType, CouponType, RoomType } from "@/types/model";
import { Coupon } from "@/models/Coupon";
// // PROD
const mid = process.env.MID;
const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const secret = process.env.SEC;

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<any> => {
  if (req.method === "POST") {
    const {
      roomId,
      checkIn,
      checkOut,
      reqRooms,
      fname,
      lname,
      email,
      phone,
      specialRequest,
      address = "",
      city = "",
      state = "",
      country = "",
      adults,
      child,
      childTen,
      dates,
      coupon,
      isAC,
    }: IGuest & {
      roomId: string;
      checkIn: string;
      checkOut: string;
      reqRooms: number;
      address: string;
      city: string;
      state: string;
      country: string;
      coupon: string;
      dates: number[];
      isAC: boolean;
    } = req.body;

    console.log(req.body);
    console.log(mid);

    try {
      await dbConnect();

      // const dates = getDatesInRange(checkIn, checkOut);
      dates.pop();
      // TODO: should we dates.pop()?

      const roomAvailability: AvailabilityType[] = await Availability.find({
        room: roomId,
        date: { $in: dates },
      });

      // check if on every date remaining capacity is greaterthan equal to requiredRooms
      for (let i = 0; i < roomAvailability.length; i++) {
        const room = roomAvailability[i];
        if (room.remainingCapacity < reqRooms) {
          res.status(404).json({ message: "You Just Missed It" });
          return;
        }
      }

      const room: RoomType | null = await Room.findById(roomId);

      if (room === null) {
        res.status(404).json({ message: "No Room Found" });
        return;
      }

      if (reqRooms > (room?.currCapacity ?? 5)) {
        res.status(404).json({ message: "You Just Missed It" });
        return;
      }

      // const amount = room.price * dates.length * reqRooms;

      const couponObj: CouponType | null = await Coupon.findOne({
        code: coupon,
      });
      // Calculate Amount

      let amount = calculateTotalAmount(
        checkIn,
        checkOut,
        room,
        adults,
        child,
        childTen,
        roomAvailability,
        reqRooms,
        couponObj,
        dates,
        isAC
      );

      if (amount > 7500) {
        amount = amount + amount * 0.18;
      } else {
        amount = amount + amount * 0.12;
      }

      const chars = "0123456789abcdefghijklmnopqrstuvwxyz";
      let orderid = "";
      for (let i = 0; i <= 24; i++) {
        const randomNumber = Math.floor(Math.random() * chars.length);
        orderid += chars.substring(randomNumber, randomNumber + 1);
      }

      const alldata =
        email +
        fname +
        lname +
        address +
        city +
        state +
        country +
        amount.toFixed(2) +
        orderid;

      const udata = username + ":|:" + password;

      const privatekey = sha256(secret + "@" + udata);

      const keySha256 = sha256(username + "~:~" + password);

      const now = new Date();

      const aldata = alldata + dateFormat(now, "yyyy-mm-dd");

      const checksum = sha256(keySha256 + "@" + aldata);

      const fdata = alldata;

      const booking = await Booking.create({
        fname,
        lname,
        email,
        phone,
        specialRequest,
        reqRooms,
        orderId: orderid,
        amount,
        room: roomId,
        checkIn,
        checkOut,
        receipt: orderid,
        adults,
        childs: child,
        childTen,
        dates,
        coupon: couponObj?.code ?? "",
        isAC,
      });
      console.log(booking);
      res.status(200).json({
        mid,
        data: fdata,
        privatekey,
        checksum,
        booking,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Some Unknown Error occured" });
    }
  } else {
    res.status(405).json({ message: "This method is not allowed" });
  }
};

export default handler;
