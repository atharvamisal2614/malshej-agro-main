import dbConnect from "@/middleware/mongo";
import { Room } from "@/models/Room";
import { Availability } from "@/models/Availability";
import { Booking } from "@/models/Booking";
// import { getDatesInRange } from "@/helpers/dateOps";
import { verifyAdmin } from "@/middleware/verifyToken";
import { calculateTotalAmount } from "@/helpers/calculateAmount";
import type { NextApiRequest, NextApiResponse } from "next";
import type {
  AvailabilityType,
  BookingType,
  CouponType,
  RoomType,
} from "@/types/model";
// import { sendMail } from "@/utils/mail";
import { Coupon } from "@/models/Coupon";

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
      childTen,
      adults,
      child,
      dates,
      coupon,
      isAC,
    }: IGuest & {
      roomId: string;
      checkIn: string;
      checkOut: string;
      reqRooms: number;
      coupon: string;
      dates: number[];
      isAC: boolean;
    } = req.body;

    console.log(req.body);
    const admin = verifyAdmin(req);

    if (admin === null) {
      res.status(401).json({ message: "You are not an admin" });
      return;
    }

    try {
      await dbConnect();

      // const dates = getDatesInRange(checkIn, checkOut);
      dates.pop();
      console.log(dates);
      const roomAvailability: AvailabilityType[] = await Availability.find({
        room: roomId,
        date: { $in: dates },
      });
      console.log(roomAvailability);

      // check if on every date remaining capacity is greaterthan equal to requiredRooms
      for (let i = 0; i < roomAvailability.length; i++) {
        const room = roomAvailability[i];
        if (room.remainingCapacity < reqRooms) {
          res.status(404).json({ message: "You Just Missed It" });
          return;
        }
      }

      const room: RoomType | null = await Room.findById(roomId);

      if (room === null) throw Error("Room not found");

      // TODO: send mail
      if (reqRooms > room.currCapacity) {
        res.status(404).json({ message: "You Just Missed It" });
        return;
      }

      const couponObj: CouponType | null = await Coupon.findOne({
        code: coupon,
      });
      console.log("coupon", coupon);
      console.log("couponObj", couponObj);

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
      console.log(amount);
      if (amount > 7500) {
        amount = amount + amount * 0.18;
      } else {
        amount = amount + amount * 0.12;
      }

      const booking: BookingType = await Booking.create({
        fname,
        lname,
        email,
        phone,
        specialRequest,
        reqRooms,
        orderId: "Local",
        amount,
        room: roomId,
        checkIn,
        checkOut,
        receipt: "Local",
        paid: true,
        adults,
        childs: child,
        dates,
        childTen,
        coupon: couponObj?.code ?? "",
        isAC,
      });

      console.log("New Booking", booking);
      console.log("DatesInRange", dates);

      for (const date of dates) {
        const availablilty = await Availability.findOne({
          room: room._id,
          date,
        });

        console.log(date);

        if (availablilty !== null) {
          await Availability.findByIdAndUpdate(availablilty._id, {
            remainingCapacity: availablilty.remainingCapacity - reqRooms,
          });
        } else {
          await Availability.create({
            room: room._id,
            date,
            remainingCapacity: room.currCapacity - reqRooms,
          });
        }
      }
      // console.log(mailOptions);

      // void sendMail(booking);

      res.status(200).json({
        booking,
        message: "Booking Successfull",
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
