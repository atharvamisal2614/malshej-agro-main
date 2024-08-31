import type { RoomType } from "@/types/model";
import React, { type Dispatch, type SetStateAction } from "react";
import { DateRange } from "react-date-range";

interface IStateRange {
  startDate: Date;
  endDate: Date;
  key: string;
}

interface ICheckAvailabliltyProps {
  room: RoomType | null;
  state: IStateRange[];
  setState: Dispatch<SetStateAction<IStateRange[]>>;
  reqRooms: number;
  setReqRooms: Dispatch<SetStateAction<number>>;
  nights: number;
  checkAvailability: () => Promise<void>;
}

const CheckAvailability = ({
  room,
  state,
  setState,
  setReqRooms,
  reqRooms,
  nights,
  checkAvailability,
}: ICheckAvailabliltyProps): JSX.Element => {
  return (
    <>
      <div className="m-auto  max-w-6xl p-5">
        <h2>Check Availability</h2>

        <div className="my-14 flex flex-col gap-10 md:flex-row ">
          <div className="md:w-1/3">
            <h3 className="p-5">{room?.title}</h3>
            <div className="rounded bg-green-50 p-5 ">
              <h3>Rs. {room?.price}/-</h3>
              <p>Per Night</p>
            </div>
            {/* <div className="info flex gap-5 my-5">
              <div className="w-1/2 p-3 bg-slate-100  flex flex-col items-center ">
                <BiBed size={50} className={"text-primary"} />
                <p>1 King</p>
              </div>
              <div className="w-1/2 p-3 bg-slate-100  flex flex-col items-center ">
                <BiArea size={50} className={"text-primary"} />
                <p>313 sq ft</p>
              </div>
            </div> */}
            <div className="my-5 bg-green-50  p-5">
              <p className="text-center font-semibold">
                Check in 12:30 PM <br /> Check out 11:00 AM
              </p>
            </div>
          </div>
          <div className="flex border md:w-1/3">
            <DateRange
              className="m-auto"
              editableDateInputs={true}
              minDate={new Date()}
              rangeColors={["#198754"]}
              onChange={(item) => {
                console.log(item);
                setState([item.selection as IStateRange]);
              }}
              moveRangeOnFirstSelection={false}
              ranges={state}
            />
          </div>

          <div className="md:w-1/3">
            <p>
              {" "}
              <span className="font-semibold"> Check In: </span>{" "}
              {state[0].startDate.getDate()}-{state[0].startDate.getMonth() + 1}
              -{state[0].startDate.getFullYear()}
            </p>
            <p>
              {" "}
              <span className="font-semibold"> Check Out: </span>{" "}
              {state[0].endDate.getDate()}-{state[0].endDate.getMonth() + 1}-
              {state[0].endDate.getFullYear()}
            </p>

            <br />

            <p>
              {" "}
              <span className="font-semibold">Total Nights: </span> {nights}
            </p>

            <br />
            <h4>Number Of Rooms Required</h4>
            <div className="mt-5 flex gap-2">
              <button
                className="disabled:cursor-not-allowed disabled:bg-slate-300"
                disabled={reqRooms <= 1}
                onClick={() => {
                  setReqRooms(reqRooms - 1);
                }}
              >
                -
              </button>
              <p className="border px-5 py-2">{reqRooms}</p>
              <button
                className="disabled:cursor-not-allowed disabled:bg-slate-300"
                disabled={reqRooms >= (room?.currCapacity ?? 0)}
                onClick={() => {
                  setReqRooms(reqRooms + 1);
                }}
              >
                +
              </button>
            </div>

            <button
              onClick={() => {
                void checkAvailability();
              }}
              className="my-5 w-full"
            >
              {" "}
              Check Availability
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckAvailability;
