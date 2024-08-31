import AvailabilityCalender from "@/components/AvailabilityCalender";
import dbConnect from "@/middleware/mongo";
import { Room } from "@/models/Room";
import { BASE_URL } from "@/utils/config";
import axios from "axios";
import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import type { RoomType } from "@/types/model";

const EditRoom = ({ room }: { room: RoomType }): JSX.Element => {
  const [rates, setRates] = useState({
    price: 0,
    weekendRates: 0,
    adultWeekend: 0,
    child7Weekend: 0,
    child10Weekend: 0,
    adultWeekdays: 0,
    child7Weekdays: 0,
    child10Weekdays: 0,
  });

  const updatePrices = async (): Promise<void> => {
    try {
      const url = `${BASE_URL}/api/room/${room._id}`;
      const res = await axios.put(url, rates);
      console.log(res);
      toast.success("Rates Are Updated");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setRates({
      price: room.price,
      weekendRates: room.weekendRates,
      adultWeekend: room.adultWeekend,
      adultWeekdays: room.adultWeekdays,
      child10Weekdays: room.child10Weekdays,
      child10Weekend: room.child10Weekend,
      child7Weekdays: room.child7Weekdays,
      child7Weekend: room.child7Weekend,
    });
  }, [room]);

  return (
    <>
      <AdminLayout>
        <div className="m-auto my-10  max-w-7xl">
          <div className="flex items-end justify-between p-5">
            <h2>{room.title}</h2>
            <button
              onClick={() => {
                void updatePrices();
              }}
              className="h-fit "
            >
              Save All Rate Changes
            </button>
          </div>

          <AvailabilityCalender room={room} />
          <div className="p-5">
            <h3 className="mt-10">WeekDay Rates (Mon, Tue, Wed, Thu )</h3>

            <div className="mb-10 flex rounded border">
              <div className="w-1/4 p-5 ">
                <h4 className="mb-2">Base (Weekday)</h4>
                <input
                  required={true}
                  type="number"
                  value={rates.price}
                  className="inp"
                  onChange={(e) => {
                    setRates({ ...rates, price: parseInt(e.target.value) });
                  }}
                />
              </div>
              <div className="w-1/4 p-5">
                <h4 className="mb-2">Extra Adult</h4>
                <input
                  required={true}
                  type="number"
                  value={rates.adultWeekdays}
                  className="inp"
                  onChange={(e) => {
                    setRates({
                      ...rates,
                      adultWeekdays: parseInt(e.target.value),
                    });
                  }}
                />
              </div>
              <div className="w-1/4 p-5">
                <h4 className="mb-2">Extra Child 7+</h4>
                <input
                  required={true}
                  type="number"
                  value={rates.child7Weekdays}
                  className="inp"
                  onChange={(e) => {
                    setRates({
                      ...rates,
                      child7Weekdays: parseInt(e.target.value),
                    });
                  }}
                />
              </div>
              <div className="w-1/4 p-5">
                <h4 className="mb-2">Extra Child 10+</h4>
                <input
                  required={true}
                  type="number"
                  value={rates.child10Weekdays}
                  className="inp"
                  onChange={(e) => {
                    setRates({
                      ...rates,
                      child10Weekdays: parseInt(e.target.value),
                    });
                  }}
                />
              </div>
            </div>

            <h3 className="mt-10">WeekEnd Rates (Fri, Sat, Sun )</h3>
            <div className="mb-5 flex rounded border">
              <div className="w-1/4 p-5 ">
                <h4 className="mb-2">Weekend Rate</h4>
                <input
                  required={true}
                  type="number"
                  value={rates.weekendRates}
                  className="inp"
                  onChange={(e) => {
                    setRates({
                      ...rates,
                      weekendRates: parseInt(e.target.value),
                    });
                  }}
                />
              </div>
              <div className="w-1/4 p-5">
                <h4 className="mb-2">Extra Adult</h4>
                <input
                  required={true}
                  type="number"
                  value={rates.adultWeekend}
                  className="inp"
                  onChange={(e) => {
                    setRates({
                      ...rates,
                      adultWeekend: parseInt(e.target.value),
                    });
                  }}
                />
              </div>
              <div className="w-1/4 p-5">
                <h4 className="mb-2">Extra Child 7+</h4>
                <input
                  required={true}
                  type="number"
                  value={rates.child7Weekend}
                  className="inp"
                  onChange={(e) => {
                    setRates({
                      ...rates,
                      child7Weekend: parseInt(e.target.value),
                    });
                  }}
                />
              </div>
              <div className="w-1/4 p-5">
                <h4 className="mb-2">Extra Child 10+</h4>
                <input
                  required={true}
                  type="number"
                  value={rates.child10Weekend}
                  className="inp"
                  onChange={(e) => {
                    setRates({
                      ...rates,
                      child10Weekend: parseInt(e.target.value),
                    });
                  }}
                />
              </div>
            </div>
            <button
              onClick={() => {
                void updatePrices();
              }}
              className="h-fit "
            >
              Save All Rate Changes
            </button>
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default EditRoom;

export async function getServerSideProps(context: any): Promise<any> {
  const slug: string = context.query.slug;

  let room;
  try {
    await dbConnect();
    const roomData = await Room.find({ slug });
    room = JSON.parse(JSON.stringify(roomData[0]));
  } catch (error) {
    console.log(error);
    room = null;
  }
  return {
    props: { room }, // will be passed to the page component as props
  };
}
