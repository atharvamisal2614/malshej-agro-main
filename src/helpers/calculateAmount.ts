import type { AvailabilityType, CouponType, RoomType } from "@/types/model";
// import { getDatesInRange } from "./dateOps";.

export const calculateTotalAmount = (
  startDate: string,
  endDate: string,
  room: RoomType,
  adults: number,
  child: number,
  childTen: number,
  roomAvailability: AvailabilityType[],
  reqRooms: number,
  coupon: CouponType | null,
  dates: number[],
  isAC: boolean = false
): number => {
  let amount = 0;

  // const dates = getDatesInRange(startDate, endDate);
  // dates.pop();

  const adultsToExclude = room.slug === "dormitory" ? 13 : 2;

  const weekDayExtraCost =
    room.adultWeekdays * (adults - adultsToExclude) +
    room.child7Weekdays * child +
    room.child10Weekdays * childTen;

  const weekEndExtraCost =
    room.adultWeekend * (adults - adultsToExclude) +
    room.child7Weekend * child +
    room.child10Weekend * childTen;

  console.log("roomAvailability", roomAvailability);
  dates.forEach((date) => {
    let weekend = false;
    const day = new Date(date).getDay();
    console.log(day);
    if (day === 5 || day === 6 || day === 0) {
      weekend = true;
    }
    const aval = roomAvailability.find((val) => {
      return val.date === date.toString();
    });
    console.log(aval);
    // custom price is available
    if (aval?.price !== undefined) {
      if (weekend) {
        amount = amount + aval.price + weekEndExtraCost;
      } else {
        // weekday
        amount = amount + aval.price + weekDayExtraCost;
      }
    } else {
      // not available base pricing
      if (weekend) {
        console.log("weekend", room.weekendRates);
        amount = amount + room.weekendRates + weekEndExtraCost;
      } else {
        // weekday
        amount = amount + room.price + weekDayExtraCost;
      }
    }
  });
  if (isAC) {
    amount = amount + 500;
  }
  if (coupon !== null) {
    return (amount * reqRooms * (100 - coupon.discount)) / 100;
  }
  return amount * reqRooms;
};
