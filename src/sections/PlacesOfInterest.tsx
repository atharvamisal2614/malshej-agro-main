import Place from "@/components/Place";
import React from "react";

const PlacesOfInterest = () => {
  return (
    <>
      <div className="py-20 md:p-5  bg-opacity-25">
        <h5 className="text-center">BEST LOCATION</h5>
        <br />
        <h2 className="text-center md:w-1/2 mx-auto">Places of Interest</h2>
        <br />

        <div className=" my-10">
          <Place
            name="Shivneri Fort"
            desc="Steep yourself in history as you visit the birthplace of the great Chattrapati Shivaji Maharaj and relive the grand old days"
            image="/images/places/shivneri.jpg"
            reverse={false}
          />
          <Place
            name="Pimpalgaon Joga Dam"
            desc="Built across the Pushpavati River with the length of around 5 Kms, Pimpalgaon Joga Dam is the prime attractions in the region."
            image="/images/places/dam.jpg"
            reverse={true}
          />
          <Place
            name="Harishchandra Gad"
            desc="Built across the Pushpavati River with the length of around 5 Kms, Pimpalgaon Joga Dam is the prime attractions in the region."
            image="/images/places/harishchandragad.jpg"
            reverse={false}
          />
          <Place
            name="Junnar Caves"
            desc="These rock-cut caves are located near Junnar and are known for their intricate carvings and historical significance."
            image="/images/places/ozar.jpg"
            reverse={true}
          />
          <Place
            name="Bhandardara"
            desc="This picturesque hill station is located near Ahmednagar and is known for its scenic beauty, waterfalls, and camping opportunities."
            image="/images/places/bhandardara.jpg"
            reverse={false}
          />
          <Place
            name="Bhimashankar Wildlife Sanctuary"
            desc="This sanctuary is home to a variety of wildlife species, including the Indian giant squirrel and the barking deer, and is known for its beautiful waterfalls."
            image="/images/places/bhimashankar.webp"
            reverse={true}
          />
        </div>
      </div>
    </>
  );
};

export default PlacesOfInterest;
