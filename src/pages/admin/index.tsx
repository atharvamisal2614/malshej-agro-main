import AdminLayout from "@/components/AdminLayout";
import Link from "next/link";
import React from "react";

const Admin = (): JSX.Element => {
  return (
    <>
      <AdminLayout>
        <div className="">
          <h2 className="my-10 text-center">Admin Panel</h2>

          <Link href={"/admin/bookings"}>
            <p className="m-auto w-52 rounded border border-black px-5 py-1 text-center">
              Bookings
            </p>
          </Link>

          <Link href={"/admin/rooms"}>
            <p className="m-auto my-5 w-52 rounded border border-black px-5 py-1 text-center">
              Rooms
            </p>
          </Link>
        </div>
      </AdminLayout>
    </>
  );
};

export default Admin;
