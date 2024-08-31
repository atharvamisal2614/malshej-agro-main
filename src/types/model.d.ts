import type { IAdmin } from "@/models/Admin";
import type { IAvailability } from "@/models/Availability";
import type { IBooking } from "@/models/Booking";
import type { ICoupon } from "@/models/Coupon";
import type { IRoom } from "@/models/Room";

interface AdminType extends MongoBase, IAdmin {}

interface AvailabilityType extends MongoBase, IAvailability {}

interface BookingType extends MongoBase, IBooking {}

interface RoomType extends MongoBase, IRoom {}

interface CouponType extends MongoBase, ICoupon {}
