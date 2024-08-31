import Image from "next/image";
import React, { useEffect, useState } from "react";

const TopSection = () => {
  const [image, setImage] = useState(1);

  const images = [
    "/images/top-slider1.jpg",
    "/images/top-slider2.jpg",
    "/images/top-slider3.jpg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setImage((prev) => prev + 1);
    }, 3500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <section className="relative ">
        <div className="absolute bg-black bg-opacity-40 z-30 md:p-14 p-5  md:h-screen flex flex-col justify-end h-[50vh] w-screen mx-auto">
          <h1 className="text-white"> Malshej Agro Tourism </h1>
          <div className="flex gap-5 w-full  justify-between">
            <p className="w-5/12 mt-10 text-white max-md:hidden">
              Sometimes, all it takes is getting one with nature to rejuvenate
              you and get work done better. Malshej Agro Tourism sets those
              relaxing moments in motion with offerings of Peace.
            </p>
            <h1 className="md:w-5/12 text-white"> and Farm</h1>
          </div>
        </div>
        <div className="relative -z-10 w-screen h-[50vh] md:h-screen">
          <Image
            fill
            className="w-full h-full -z-10"
            src={images[image % 3]}
            alt=""
            priority
          />
        </div>
      </section>
    </>
  );
};

export default TopSection;
