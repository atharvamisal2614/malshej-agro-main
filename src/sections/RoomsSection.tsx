import Room from "@/components/Room";
import React from "react";

const RoomsSection = (): JSX.Element => {
  return (
    <>
      <div id="rooms" className="bg-[url('/bg-leaf.png')] pt-20  md:p-5">
        <div className="max-md:p-5">
          <h5 className="text-center">Luxury Property</h5>
          <br />
          <h2 className="mx-auto text-center md:w-1/2">
            Rest in Nature, Feel the class, Find your Freedom!
          </h2>
          <br />
          <p className="mx-auto text-center md:w-2/3">
            The accommodation area is surrounded by farm on all sides, with
            plantation as well. Our agro resort is surrounded by Sahyadri range
            of mountains and exotic malshej ghat views.
          </p>
        </div>

        <div className="mx-auto mt-10 flex max-w-7xl flex-wrap justify-center py-10 md:p-5">
          <Room
            image="/images/cottage/cottages3.jpg"
            title="Cottage"
            desc="Combining rustic elegance with modern comforts for an unforgettable stay."
            url="/rooms/cottage"
          />
          <Room
            image="/images/acvilla/ac-villa4.jpg"
            title="AC Villa"
            desc="Indulge in luxury and comfort within our air-conditioned villa featuring exquisite design."
            url="/rooms/ac-villa"
          />
          <Room
            image="/images/bamboohuts/bamboo2.jpg"
            title="Bamboo Huts"
            desc="Immerse yourself in nature's embrace within our charming Bamboo Huts."
            url="/rooms/bamboohuts"
          />
          <Room
            image="/images/grouproom/group3.jpg"
            title="Group Room"
            desc="Experience shared moments in our expansive group room, designed for comfort"
            url="/rooms/grouproom"
          />
          <Room
            image="/images/family-rooms/family2.jpg"
            title="Family Room (Non-AC)"
            desc="Relax in our spacious family room, designed for comfort and
              togetherness."
            url="/rooms/familyroom"
          />
          <Room
            image="/images/family-rooms/family2.jpg"
            title="Family Room (AC)"
            desc="Relax in our spacious family room, designed for comfort and
              togetherness."
            url="/rooms/familyroom-ac"
          />
        </div>
      </div>
    </>
  );
};

export default RoomsSection;
