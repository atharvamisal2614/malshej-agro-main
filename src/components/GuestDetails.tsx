import { calculateTotalAmount } from "@/helpers/calculateAmount";
import { getDatesInRange } from "@/helpers/dateOps";
import type { AvailabilityType, CouponType, RoomType } from "@/types/model";
import { BASE_URL } from "@/utils/config";
import axios from "axios";
import React, {
  useEffect,
  useState,
  type Dispatch,
  type FormEvent,
  type SetStateAction,
} from "react";
import { toast } from "react-toastify";

interface IStateRange {
  startDate: Date;
  endDate: Date;
  key: string;
}

interface IGuestDetailsProps {
  room: RoomType | null;
  state: IStateRange[];
  setState: Dispatch<SetStateAction<IStateRange[]>>;
  reqRooms: number;
  nights: number;
  setPage: Dispatch<SetStateAction<number>>;
  guest: IGuest;
  setGuest: Dispatch<SetStateAction<IGuest>>;
  isAC: boolean;
  setIsAC: Dispatch<SetStateAction<boolean>>;
  checkout: () => Promise<void>;
  roomAvailability: AvailabilityType[];
  coupon: string;
  setCoupon: Dispatch<SetStateAction<string>>;
}

const GuestDetails = ({
  room,
  state,
  nights,
  reqRooms,
  guest,
  isAC,
  setIsAC,
  setPage,
  setGuest,
  checkout,
  roomAvailability,
  coupon,
  setCoupon,
}: IGuestDetailsProps): JSX.Element => {
  const [amount, setAmount] = useState(90000);

  const [couponObj, setCouponObj] = useState<null | CouponType>(null);

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();

    if (
      guest.phone === undefined ||
      parseInt(guest.phone) < 1000000000 ||
      parseInt(guest.phone) > 99999999999
    ) {
      toast.error("Enter Valid Phone Number");
      return;
    }
    void checkout();
  };

  const calculateAmount = (): void => {
    if (room === null) return;
    const dates = getDatesInRange(
      state[0].startDate.toString(),
      state[0].endDate.toString()
    );
    dates.pop();
    const finalAmount = calculateTotalAmount(
      state[0].startDate.toString(),
      state[0].endDate.toString(),
      room,
      guest.adults,
      guest.child,
      guest.childTen,
      roomAvailability,
      reqRooms,
      couponObj,
      dates,
      isAC
    );
    // console.log(finalAmount);
    setAmount(finalAmount);
  };

  const addCoupon = async (): Promise<void> => {
    try {
      const url = `${BASE_URL}/api/coupon/${coupon}`;
      const res = await axios.get(url);
      setCouponObj(res.data.coupon as CouponType);
    } catch (error) {
      console.log(error);
      toast.error("Invalid Coupon Code");
    }
  };

  useEffect(() => {
    calculateAmount();
  }, [guest.adults, guest.child, guest.childTen, couponObj, isAC]);

  return (
    <>
      <div className="m-auto  max-w-6xl p-5">
        <div className="my-10 flex flex-col gap-10 md:flex-row ">
          <div className="md:w-2/3">
            <h3 className="py-5">Guest Details</h3>

            <form
              id="guest-details"
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <div className="flex gap-5">
                <div className="w-1/2">
                  <p>First Name</p>
                  <input
                    type="text"
                    required
                    value={guest.fname}
                    onChange={(e) => {
                      setGuest({ ...guest, fname: e.target.value });
                    }}
                    className="w-full rounded border border-primary p-1 outline-none"
                  />
                </div>
                <div className="w-1/2">
                  <p>Last Name</p>
                  <input
                    type="text"
                    value={guest.lname}
                    onChange={(e) => {
                      setGuest({ ...guest, lname: e.target.value });
                    }}
                    required
                    className="w-full rounded border border-primary p-1 outline-none"
                  />
                </div>
              </div>
              <div className="my-5 flex gap-5">
                <div className="w-1/2">
                  <p>Email Address</p>
                  <input
                    type="email"
                    value={guest.email}
                    onChange={(e) => {
                      setGuest({ ...guest, email: e.target.value });
                    }}
                    required
                    className="w-full rounded border border-primary p-1 outline-none"
                  />
                </div>
                <div className="w-1/2">
                  <p>Phone Number</p>
                  <input
                    type="number"
                    value={guest.phone}
                    onChange={(e) => {
                      setGuest({ ...guest, phone: e.target.value });
                    }}
                    required
                    className="w-full rounded border border-primary p-1 outline-none"
                  />
                </div>
              </div>

              <div className="my-5 flex gap-5">
                <div className={`w-1/${room?.acAvailable ?? false ? 4 : 3}`}>
                  <p>Adults</p>
                  <select
                    value={guest.adults}
                    onChange={(e) => {
                      setGuest({ ...guest, adults: parseInt(e.target.value) });
                    }}
                    className="w-full rounded border border-primary p-1 outline-none"
                  >
                    {room?.slug === "dormitory" ? (
                      <>
                        <option value={13}>13</option>
                        <option value={14}>14</option>
                        <option value={15}>15</option>
                        <option value={16}>16</option>
                        <option value={17}>17</option>
                        <option value={18}>18</option>
                        <option value={19}>19</option>
                        <option value={20}>20</option>
                      </>
                    ) : (
                      <>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                      </>
                    )}
                  </select>
                </div>
                <div className={`w-1/${room?.acAvailable ?? false ? 4 : 3}`}>
                  <p>Child 7+</p>
                  <select
                    value={guest.child}
                    onChange={(e) => {
                      setGuest({ ...guest, child: parseInt(e.target.value) });
                    }}
                    className="w-full rounded border border-primary p-1 outline-none"
                  >
                    <option value={0}>0</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                  </select>
                </div>

                <div className={`w-1/${room?.acAvailable ?? false ? 4 : 3}`}>
                  <p>Child 10+</p>
                  <select
                    value={guest.childTen}
                    onChange={(e) => {
                      setGuest({
                        ...guest,
                        childTen: parseInt(e.target.value),
                      });
                    }}
                    className="w-full rounded border border-primary p-1 outline-none"
                  >
                    <option value={0}>0</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                  </select>
                </div>
                {(room?.acAvailable ?? false) && (
                  <div className="w-1/4">
                    <p>AC</p>
                    <select
                      value={isAC ? "true" : "false"}
                      onChange={(e) => {
                        setIsAC(e.target.value === "true");
                      }}
                      className="w-full rounded border border-primary p-1 outline-none"
                    >
                      <option value={"true"}>With AC</option>
                      <option value={"false"}>Without AC</option>
                    </select>
                  </div>
                )}
              </div>
              <p>Special Request</p>
              <textarea
                className="h-20 w-full rounded border border-primary p-1 outline-none"
                value={guest.specialRequest}
                cols={10}
                rows={30}
                onChange={(e) => {
                  setGuest({ ...guest, specialRequest: e.target.value });
                }}
              ></textarea>
            </form>
          </div>

          <div className="rounded bg-green-50 p-5 md:w-1/3">
            <h4 className="mb-5">Order Summary</h4>

            <p>
              Room Type: <strong>{room?.title}</strong>{" "}
            </p>
            <p>
              Check In:{" "}
              <strong>
                {" "}
                {state[0].startDate.getDate()}-
                {state[0].startDate.getMonth() + 1}-
                {state[0].startDate.getFullYear()}
              </strong>
            </p>
            <p>
              Check Out:{" "}
              <strong>
                {" "}
                {state[0].endDate.getDate()}-{state[0].endDate.getMonth() + 1}-
                {state[0].endDate.getFullYear()}
              </strong>
            </p>
            <p>
              No Of Nights: <strong>{nights}</strong>{" "}
            </p>
            <p>
              No Of Rooms: <strong> {reqRooms} </strong>{" "}
            </p>
            <br />
            <div className="flex items-center gap-3">
              <input
                value={coupon}
                onChange={(e) => {
                  setCoupon(e.target.value.toUpperCase());
                }}
                type="text"
                placeholder="Coupon Code"
                name=""
                id=""
              />
              <p
                onClick={() => {
                  void addCoupon();
                }}
                className="cursor-pointer text-primary"
              >
                Add
              </p>
            </div>
            <br />
            <p>
              Amount: <strong>Rs. {amount} /-</strong>{" "}
            </p>
            {amount > 7500 && (
              <p>
                18% GST: <strong>Rs. {(0.18 * amount).toFixed()} /-</strong>{" "}
              </p>
            )}
            {amount <= 7500 && (
              <p>
                12% GST: <strong>Rs. {0.12 * amount} /-</strong>{" "}
              </p>
            )}
            {amount > 7500 && (
              <p className="mt-5 text-lg font-semibold">
                SubTotal: <strong>Rs. {amount + 0.18 * amount} /-</strong>{" "}
              </p>
            )}
            {amount <= 7500 && (
              <p className="mt-5 text-lg font-semibold">
                SubTotal: <strong>Rs. {amount + 0.12 * amount} /-</strong>{" "}
              </p>
            )}

            <button
              type="submit"
              form="guest-details"
              className="my-5 w-full bg-primary"
            >
              Proceed to Checkout
            </button>
            <button
              onClick={() => {
                setPage(0);
              }}
              className="w-full border border-primary bg-white text-primary"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default GuestDetails;
