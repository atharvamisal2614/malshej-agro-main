import Image from "next/image";
import Link from "next/link";
import React from "react";

const GalleryStrip = () => {
  return (
    <>
      <div className="flex md:flex-row flex-col flex-wrap justify-center gap-5 my-40">
        {/* <ZoomImage img="/images/g6.jpeg" /> */}
        <ZoomImage img="/images/g2.jpg" />
        <ZoomImage img="/images/g3.jpg" />
        <div className="h-40 md:w-40 flex justify-center items-center">
          <Link href={"/gallery"}>
            <button>Gallery</button>
          </Link>
          {/* <Link
            href={
              "https://drive.google.com/drive/folders/1aY9hu5PNsu88NBHw884XMJhJ9PZENcjj?usp=sharing "
            }
          >
            <button>Gallery</button>
          </Link> */}
        </div>
        <ZoomImage img="/images/g5.jpeg" />
        <ZoomImage img="/images/g4.jpg" />
        <ZoomImage img="/images/hall.jpeg" />
      </div>
    </>
  );
};

export default GalleryStrip;

function ZoomImage({ img }: { img: string }) {
  return (
    <>
      <div className="md:h-40 md:w-40 h-56  overflow-hidden">
        <Image
          width={400}
          height={400}
          className="w-full h-full object-cover hover:scale-110"
          src={img}
          alt=""
        />
      </div>
    </>
  );
}
