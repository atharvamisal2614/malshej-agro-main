import type { BookingType } from "@/types/model";
import { createTransport } from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";

export const transporter = createTransport({
  host: "smtp.zoho.in",
  port: 465,
  secure: true,
  auth: {
    user: "resevations@bluwaterresort.in",
    pass: "Qxqe8u#t",
  },
});

export const sendMail = async (
  booking: BookingType
): Promise<SMTPTransport.SentMessageInfo> => {
  const mailOptions = {
    from: "reservation@bluwaterresort.in", // sender address
    to: booking.email,
    cc: "admin@bluwatrresort.in",
    subject: ` Your Booking Confirmation - Booking ID: ${booking._id}`, // Subject line
    html: `
        <p>
        Booking Successfull
        </p>
        `,
  };

  // const mailOptions = {
  //   from: "test.user@pranitpatil.com", // sender address
  //   to: "pp7590227@gmail.com",
  //   subject: "Booking Successfull", // Subject line
  //   html: <p>Working</p>, // plain text body
  // };

  console.log(mailOptions);

  const info = await transporter.sendMail(mailOptions);
  return info;
};
