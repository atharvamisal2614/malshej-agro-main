import Image from "next/image";
import React, { type Dispatch, type SetStateAction, useState } from "react";

const Gallery = (): JSX.Element => {
  const [image, setImage] = useState<string | null>(null);
  return (
    <>
      {image !== null && (
        <div
          onClick={() => {
            setImage(null);
          }}
          className="fixed top-0  flex h-screen w-screen flex-col items-center justify-center bg-primary bg-opacity-50"
        >
          <div className="relative">
            <div
              onClick={() => {
                setImage(null);
              }}
              className="absolute right-10 top-5 cursor-pointer text-3xl text-white"
            >
              X
            </div>
            <Image
              className="m-auto my-5 p-3"
              width={1000}
              height={1000}
              src={image}
              alt=""
            />
          </div>
        </div>
      )}
      <div className="p-5 pt-20">
        <h1>Photo Gallery</h1>

        <div className="my-5 flex flex-wrap ">
          <Photo img="/images/g22.jpg" setImage={setImage} />
          <Photo img="/images/g3.jpg" setImage={setImage} />
          <Photo img="/images/g4.jpg" setImage={setImage} />
          <Photo img="/images/g5.jpeg" setImage={setImage} />
          {/* <Photo img="/images/g6.jpeg" setImage={setImage} /> */}
          <Photo img="/images/hall.jpeg" setImage={setImage} />
          <Photo img="/images/food/food1.jpeg" setImage={setImage} />
          <Photo img="/images/villa/villa2.jpeg" setImage={setImage} />
          <Photo img="/images/g7.jpeg" setImage={setImage} />
          <Photo img="/images/g2.jpg" setImage={setImage} />
          <Photo img="/images/cottage/cottage5.jpg" setImage={setImage} />
          <Photo img="/images/cottage/cottage6.jpg" setImage={setImage} />
          <Photo img="/images/g12.jpg" setImage={setImage} />
          <Photo img="/images/g13.jpg" setImage={setImage} />
          <Photo img="/images/g14.jpg" setImage={setImage} />
          <Photo img="/images/g16.jpg" setImage={setImage} />
          {/* <Photo img="/images/g17.jpg" setImage={setImage} /> */}
          <Photo img="/images/g18.jpg" setImage={setImage} />
          <Photo img="/images/g19.jpg" setImage={setImage} />
          <Photo img="/images/g20.jpg" setImage={setImage} />
          <Photo img="/images/g21.jpg" setImage={setImage} />
          <Photo img="/images/bamboohuts/bamboo8.jpg" setImage={setImage} />
          <Photo img="/images/bamboohuts/bamboo9.jpg" setImage={setImage} />
          <Photo img="/images/bamboohuts/bamboo11.jpg" setImage={setImage} />
          <Photo img="/images/malshej1.jpg" setImage={setImage} />
          <Photo img="/images/malshej2.jpg" setImage={setImage} />
          <Photo img="/images/malshej3.jpg" setImage={setImage} />
        </div>
      </div>
    </>
  );
};

export default Gallery;

interface PhotoProps {
  setImage: Dispatch<SetStateAction<string | null>>;
  img: string;
}

const Photo = ({ setImage, img }: PhotoProps): JSX.Element => {
  return (
    <>
      <Image
        className="w-1/2 cursor-pointer object-contain p-3 md:w-1/4"
        width={500}
        height={500}
        onClick={() => {
          setImage(img);
        }}
        src={img}
        alt=""
      />
    </>
  );
};
