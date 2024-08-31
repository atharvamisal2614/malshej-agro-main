import Image from "next/image";
import React from "react";

const EventsWeddings = () => {
  return (
    <>
      <div className="flex h-full bg-accent md:flex-row p-5 flex-col max-w-7xl items-center mx-auto my-10">
        <div className="md:w-1/2 flex justify-evenly h-full">
          <div className="w-1/2 p-3 h-full flex-1">
            <Image
              width={500}
              height={500}
              src={"/images/wedding/prewedding.jpg"}
              className="object-cover md:h-96 h-48 "
              alt=""
            />
          </div>
          <div className="w-1/2 p-3 h-full flex-1">
            <Image
              width={500}
              height={500}
              className="object-cover md:h-96 h-48"
              src={"/images/wedding/wedding.jpg"}
              alt=""
            />
          </div>
        </div>
        <div className="md:w-1/2 md:p-10 my-10">
          <h5>LUXURY Aminities</h5>
          <br />
          <h2>Events and Weddings</h2>
          <br />
          <p>
            Malshej agro tourism and farm offers large and spacious banqueting
            areas specially designed to make it a perfect venue for business
            Conference, Wedding and Marriage Parties, with the best facilities
            and amenities.
          </p>
          <br />
          <p>
            We can host events, parties and can entertain up to --- guests at
            Malshej agro tourism and farms and make the occasion truly
            memorable. The natural surroundings and the facilities make the most
            memorable event.
          </p>
        </div>
      </div>
    </>
  );
};

export default EventsWeddings;
