import { getDateNoFromNumber } from "@/helpers/dateOps";
import type { AvailabilityType, RoomType } from "@/types/model";
import { BASE_URL } from "@/utils/config";
import axios from "axios";
import { useUrlState } from "dumbhooks";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AvailabilityCalender = ({ room }: { room: RoomType }): JSX.Element => {
  const thisMonth = new Date().getMonth();

  const [month, setMonth] = useUrlState<number>("month", thisMonth);
  const [year, setYear] = useState<number>(2024);
  const [availability, setAvailability] = useState<AvailabilityType[]>([]);
  const [days, setDays] = useState<string[]>([]);
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [newPrice, setNewPrice] = useState(0);

  function getDaysInMonth(month: number, year: number): number[] {
    const date = new Date(year, month, 1);
    const days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    return days;
  }

  async function loadAvailability(newDates: number[]): Promise<void> {
    try {
      const url = `${BASE_URL}/api/room/availability`;
      const data = {
        dates: newDates,
        room: room._id,
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
      return room.currCapacity;
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
      const day = new Date(parseInt(d)).getDay();
      // console.log(day);
      if (day === 5 || day === 6 || day === 0) {
        console.log(room.weekendRates);
        return room.weekendRates;
      }
      return room.price;
    }
  }

  const selectDate = (date: string): void => {
    if (date === "empty") return;

    if (!selectedDates.includes(date)) {
      // not present
      setSelectedDates((prev) => [...prev, date]);
    } else {
      // present
      const newArr = [...selectedDates];
      const index = newArr.indexOf(date);
      if (index > -1) {
        newArr.splice(index, 1);
      }
      setSelectedDates(newArr);
    }
  };

  const updatePrices = async (): Promise<void> => {
    if (selectedDates.length === 0) {
      toast.error("No Dates are Selected");
      return;
    }

    if (newPrice < 50) {
      toast.error("New Price Is less than 50");
      return;
    }
    try {
      const url = `${BASE_URL}/api/room/updatePrices`;
      const data = {
        dates: selectedDates,
        room: room._id,
        price: newPrice,
      };
      await axios.post(url, data);
      toast.success("Prices Updated Sucessfully");
    } catch (error) {
      console.log(error);
    }

    // clear data
    const days = getDaysInMonth(month ?? 1, year ?? 2024);
    void loadAvailability(days);
    setSelectedDates([]);
  };

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
          value={year}
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
      <div className="flex p-5 ">
        <div className="flex h-[70vh] w-2/3 flex-col flex-wrap py-5">
          <div className="h-[14.20%] border p-2 text-red-500">Sunday</div>
          <div className="h-[14.20%] border p-2">Monday</div>
          <div className="h-[14.20%] border p-2">Tuesday</div>
          <div className="h-[14.20%] border p-2">Wednesday</div>
          <div className="h-[14.20%] border p-2">Thursday</div>
          <div className="h-[14.20%] border p-2 text-primary">Friday</div>
          <div className="h-[14.20%] border p-2 text-primary">Saturday</div>

          {days.map((day, i) => (
            <div
              onClick={() => {
                selectDate(day);
              }}
              key={`${day} ${i}`}
              className={` ${
                selectedDates.includes(day) ? "bg-green-100" : ""
              } flex h-[14.20%] cursor-pointer flex-col justify-between rounded-md  border p-1 px-2`}
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
        <div className="w-1/3 p-5 pl-10">
          <h3>Update Prices</h3>
          <input
            value={newPrice}
            onChange={(e) => {
              setNewPrice(parseInt(e.target.value));
            }}
            type="number"
            className="inp my-2 "
          />
          <br />

          <button
            onClick={() => {
              void updatePrices();
            }}
          >
            Update Price
          </button>
        </div>
      </div>
    </>
  );
};

export default AvailabilityCalender;
