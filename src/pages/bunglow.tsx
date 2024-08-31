import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import React from "react";

const Cottage = (): JSX.Element => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen p-5 pt-32">
        <h1>Bunglow</h1>
        <div className="flex flex-wrap items-center justify-center gap-5 py-10">
          <Image
            width={500}
            height={500}
            src={"/images/bunglow/bunglow9.jpg"}
            className="object-contain md:w-1/4 "
            alt=""
          />
          <Image
            width={500}
            height={500}
            src={"/images/bunglow/bunglow10.jpg"}
            className="object-contain md:w-1/4 "
            alt=""
          />
          <Image
            width={500}
            height={500}
            src={"/images/bunglow/bunglow11.jpg"}
            className="object-contain md:w-1/4 "
            alt=""
          />
          <Image
            width={500}
            height={500}
            src={"/images/bunglow/bunglow12.jpg"}
            className="object-contain md:w-1/4 "
            alt=""
          />

          <Image
            width={500}
            height={500}
            src={"/images/bunglow/bunglow8.jpg"}
            className="object-contain md:w-1/4 "
            alt=""
          />
          <Image
            width={500}
            height={500}
            src={"/images/bunglow/bunglow1.jpg"}
            className="object-contain md:w-1/4 "
            alt=""
          />
          <Image
            width={500}
            height={500}
            src={"/images/bunglow/bunglow2.jpg"}
            className="object-contain md:w-1/4 "
            alt=""
          />
          <Image
            width={500}
            height={500}
            src={"/images/bunglow/bunglow17.jpg"}
            className="object-contain md:w-1/4 "
            alt=""
          />
          <Image
            width={500}
            height={500}
            src={"/images/bunglow/bunglow3.jpg"}
            className="object-contain md:w-1/4 "
            alt=""
          />
          <Image
            width={500}
            height={500}
            src={"/images/bunglow/bunglow4.jpg"}
            className="object-contain md:w-1/4 "
            alt=""
          />

          <Image
            width={500}
            height={500}
            src={"/images/bunglow/bunglow7.jpg"}
            className="object-contain md:w-1/4 "
            alt=""
          />

          <Image
            width={500}
            height={500}
            src={"/images/bunglow/bunglow13.jpg"}
            className="object-contain md:w-1/4 "
            alt=""
          />
          <Image
            width={500}
            height={500}
            src={"/images/bunglow/bunglow14.jpg"}
            className="object-contain md:w-1/4 "
            alt=""
          />
          <Image
            width={500}
            height={500}
            src={"/images/bunglow/bunglow15.jpg"}
            className="object-contain md:w-1/4 "
            alt=""
          />
          <Image
            width={500}
            height={500}
            src={"/images/bunglow/bunglow5.jpg"}
            className="object-contain md:w-1/4 "
            alt=""
          />
          <Image
            width={500}
            height={500}
            src={"/images/bunglow/bunglow6.jpg"}
            className="object-contain md:w-1/4 "
            alt=" "
          />
          <Image
            width={500}
            height={500}
            src={"/images/bunglow/bunglow18.jpg"}
            className="object-contain md:w-1/4 "
            alt=" "
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cottage;
