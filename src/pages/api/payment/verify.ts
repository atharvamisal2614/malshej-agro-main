import dbConnect from "@/middleware/mongo";
import { Booking } from "@/models/Booking";
import { Availability } from "@/models/Availability";
import { Room } from "@/models/Room";
import CRC32 from "crc-32";
import type { NextApiRequest, NextApiResponse } from "next";
import type { AvailabilityType, BookingType } from "@/types/model";
import { sendMail } from "@/utils/mail";

// // PROD
const mid = process.env.MID;
const username = process.env.USERNAME;
// const password = process.env.PASSWORD;
// const secret = process.env.SEC;

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<any> => {
  if (req.method === "POST") {
    try {
      if (req.body.TRANSACTIONPAYMENTSTATUS !== "SUCCESS") {
        res.status(400).json({ message: "Booking Unsuccessfull" });
        return;
      }

      await dbConnect();
      console.log(req.body);

      let txnhash = CRC32.str(
        req.body.TRANSACTIONID +
          ":" +
          req.body.APTRANSACTIONID +
          ":" +
          req.body.AMOUNT +
          ":" +
          req.body.TRANSACTIONSTATUS +
          ":" +
          req.body.MESSAGE +
          ":" +
          mid +
          ":" +
          username
      );

      const chmod = req.body.CHMOD;
      const custmvar = req.body.CUSTOMERVPA;
      if (chmod === "upi") {
        txnhash = CRC32.str(
          req.body.TRANSACTIONID +
            ":" +
            req.body.APTRANSACTIONID +
            ":" +
            req.body.AMOUNT +
            ":" +
            req.body.TRANSACTIONSTATUS +
            ":" +
            req.body.MESSAGE +
            ":" +
            mid +
            ":" +
            username +
            ":" +
            custmvar
        );
      }
      txnhash = txnhash >>> 0;
      const txndata = req.body;
      console.log(txndata.ap_SecureHash);
      console.log(txnhash);

      console.log(txndata.CUSTOMVAR);

      const booking: BookingType | null = await Booking.findOneAndUpdate(
        { orderId: txndata.CUSTOMVAR },
        { paid: true },
        { new: true }
      );

      if (booking === null) {
        res.status(400).json({ message: "Booking Unsuccessfull" });
        return;
      }

      const { room, reqRooms, dates } = booking;

      // const dates = getDatesInRange(checkIn.toString(), checkOut.toString());
      // dates.pop();

      const roomObj = await Room.findById(room);

      for (const date of dates) {
        const availablilty = await Availability.findOne<AvailabilityType>({
          room,
          date,
        });

        if (availablilty !== null) {
          await Availability.findByIdAndUpdate(availablilty._id, {
            remainingCapacity: availablilty.remainingCapacity - reqRooms,
          });
        } else {
          await Availability.create({
            room,
            date,
            remainingCapacity: roomObj.currCapacity - reqRooms,
          });
        }
      }

      await sendMail(booking);

      res.status(200).json({ message: "Booking Successfull", booking });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Unknown error occured" });
    }
  } else {
    res.status(405).json({ message: "This method is not allowed" });
  }
};

export default handler;
