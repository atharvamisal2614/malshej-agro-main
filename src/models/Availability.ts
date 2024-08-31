import mongoose, { model } from "mongoose";

export interface IAvailability {
  room: string;
  date: string;
  price: number;
  remainingCapacity: number;
}

const AvailabilitySchema = new mongoose.Schema(
  {
    room: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
    },
    remainingCapacity: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const Availability =
  mongoose.models.Availability ??
  model<IAvailability>("Availability", AvailabilitySchema);
