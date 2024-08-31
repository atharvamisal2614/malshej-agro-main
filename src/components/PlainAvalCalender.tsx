import { getDateNoFromNumber } from "@/helpers/dateOps";
import type { AvailabilityType, RoomType } from "@/types/model";
import { BASE_URL } from "@/utils/config";
import axios from "axios";
import { useUrlState } from "dumbhooks";
import React, { useEffect, useState } from "react";

const PlainAvalCalender = ({
  room,
}: {
  room: RoomType | null;
}): JSX.Element => {
  const thisMonth: number = new Date().getMonth();
  const thisYear: number = new Date().getFullYear();

  const [month, setMonth] = useUrlState<number>("month", thisMonth);
  const [year, setYear] = useUrlState<number>("year", thisYear);
  const [availability, setAvailability] = useState<AvailabilityType[]>([]);
  const [days, setDays] = useState<string[]>([]);

  function getDaysInMonth(month: number, year: number): number[] {
    const date = new Date(year, month, 1);
    const days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    console.log(days);
    return days;
  }

  async function loadAvailability(newDates: number[]): Promise<void> {
    try {
      const url = `${BASE_URL}/api/room/availability`;
      const data = {
        dates: newDates,
        room: room?._id,
      };
      const res = await axios.post(url, data);
      setAvailability(res.data.roomAvailability as AvailabilityType[]);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  function getAvailability(d: string): number {
    const aval = availability.find((aval) => {
      return aval.date === d;
    });
    if (aval !== undefined) {
      return aval.remainingCapacity;
    } else {
      return room?.currCapacity ?? 0;
    }
  }

  function getPrice(d: string): number {
    console.log(d);
    const aval = availability.find((aval) => {
      return aval.date === d;
    });
    if (aval?.price !== undefined) {
      return aval.price;
    } else {
      if (room === null) return 0;
      const day = new Date(parseInt(d)).getDay();
      // console.log(day);
      if (day === 5 || day === 6 || day === 0) {
        console.log(room?.weekendRates);
        return room.weekendRates;
      }
      return room.price;
    }
  }

  /**
   * Generates Days for the calender
   */
  useEffect(() => {
    const days = getDaysInMonth(month ?? 1, year ?? 2024);

    const stringDays = days.map((day) => day.toString());

    const firstDay = new Date(days[0]).getDay();
    // console.log(firstDay);
    const newArr = [];
    for (let index = 0; index < firstDay; index++) {
      newArr.push("empty");
    }
    const finaldays = [...newArr, ...stringDays];
    void loadAvailability(days);

    setDays(finaldays);
  }, [month, year]);

  return (
    <>
      <h2 className="mt-10 p-5">Availability Calender</h2>
      <div className="flex gap-5 p-5">
        <select
          value={month ?? 1}
          className="inp"
          onChange={(e) => {
            setMonth(parseInt(e.target.value));
          }}
        >
          <option value={0}>January</option>
          <option value={1}>February</option>
          <option value={2}>March</option>
          <option value={3}>April</option>
          <option value={4}>May</option>
          <option value={5}>June</option>
          <option value={6}>July</option>
          <option value={7}>August</option>
          <option value={8}>September</option>
          <option value={9}>October</option>
          <option value={10}>November</option>
          <option value={11}>December</option>
        </select>

        <select
          value={year ?? 2024}
          className="inp"
          onChange={(e) => {
            setYear(parseInt(e.target.value));
          }}
        >
          {Array.from({ length: 7 }, (_, i) => (
            <option key={i} value={2024 + i}>
              {2024 + i}
            </option>
          ))}
        </select>
      </div>
      <div className="flex h-[70vh] flex-col flex-wrap p-5">
        <div className="h-[14.20%] border p-2 text-red-500">Sunday</div>
        <div className="h-[14.20%] border p-2">Monday</div>
        <div className="h-[14.20%] border p-2">Tuesday</div>
        <div className="h-[14.20%] border p-2">Wednesday</div>
        <div className="h-[14.20%] border p-2">Thursday</div>
        <div className="h-[14.20%] border p-2 text-primary">Friday</div>
        <div className="h-[14.20%] border p-2 text-primary">Saturday</div>

        {days.map((day, i) => (
          <div
            key={`${day} ${i}`}
            className={`  flex h-[14.20%]  flex-col justify-between rounded-md  border p-1 px-2`}
          >
            <div className="flex justify-between">
              <p className="text-lg font-semibold">
                {getDateNoFromNumber(day)}
              </p>
              {day !== "empty" && (
                <p className="text-primary">avl: {getAvailability(day)}</p>
              )}
            </div>
            {day !== "empty" && (
              <p className=" text-right text-sm font-semibold">
                Rs. {getPrice(day)}/-
              </p>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default PlainAvalCalender;
