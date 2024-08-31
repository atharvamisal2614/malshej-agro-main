import mongoose, { model } from "mongoose";

export interface IRoom {
  title: string;
  slug: string;
  maxPeople: number;
  currCapacity: number;
  price: number;
  weekendRates: number;
  adultWeekend: number;
  child7Weekend: number;
  child10Weekend: number;
  adultWeekdays: number;
  child7Weekdays: number;
  child10Weekdays: number;
  validTill: string;
  acAvailable: boolean;
}

const RoomSchema = new mongoose.Schema<IRoom>(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    maxPeople: {
      type: Number,
      required: true,
    },
    currCapacity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    weekendRates: {
      type: Number,
      required: true,
    },
    adultWeekend: {
      type: Number,
      required: true,
    },
    child7Weekend: {
      type: Number,
      required: true,
    },
    child10Weekend: {
      type: Number,
      required: true,
    },
    adultWeekdays: {
      type: Number,
      required: true,
    },
    child7Weekdays: {
      type: Number,
      required: true,
    },
    child10Weekdays: {
      type: Number,
      required: true,
    },
    validTill: {
      type: String,
    },
    acAvailable: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Room = mongoose.models.Room ?? model<IRoom>("Room", RoomSchema);
