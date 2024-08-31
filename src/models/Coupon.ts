import mongoose, { model } from "mongoose";

export interface ICoupon {
  code: string;
  discount: number;
}

const CouponSchema = new mongoose.Schema<ICoupon>(
  {
    code: { type: String, required: true, unique: true },
    discount: { type: Number, required: true },
  },
  { timestamps: true }
);

export const Coupon =
  mongoose.models.Coupon ?? model<ICoupon>("Coupon", CouponSchema);
