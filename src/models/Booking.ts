import mongoose, { model, type ObjectId } from "mongoose";

export interface IBooking {
  fname: string;
  lname: string;
  email: string;
  phone: string;
  specialRequest: string;
  reqRooms: number;
  adults: number;
  childs: number;
  childTen: number;
  orderId: string;
  paid: boolean;
  amount: number;
  room: ObjectId;
  checkIn: Date;
  checkOut: Date;
  dates: string[];
  receipt: string;
  notes: string;
  coupon: string;
  isAC: boolean;
}

const BookingSchema = new mongoose.Schema<IBooking>(
  {
    fname: {
      type: String,
      required: true,
    },
    lname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    specialRequest: {
      type: String,
    },
    reqRooms: {
      type: Number,
      required: true,
    },
    adults: {
      type: Number,
      required: true,
    },
    childs: {
      type: Number,
      required: true,
    },
    childTen: {
      type: Number,
      required: true,
    },
    orderId: {
      type: String,
      required: true,
    },
    paid: {
      type: Boolean,
      default: false,
    },
    amount: {
      type: Number,
      required: true,
    },
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    checkIn: {
      type: Date,
      required: true,
    },
    checkOut: {
      type: Date,
      required: true,
    },

    dates: [String],

    receipt: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
    },
    coupon: {
      type: String,
    },
    isAC: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

BookingSchema.index({ fname: "text", lname: "text" });

export const Booking =
  mongoose.models.Booking ?? model<IBooking>("Booking", BookingSchema);
