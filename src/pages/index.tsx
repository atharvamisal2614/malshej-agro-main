import Navbar2 from "@/components/Navbar2";
import CorporateMeetings from "@/sections/CorporateMeetings";
import Dormitory from "@/sections/Dormitory";
import EventsWeddings from "@/sections/EventsWeddings";
import FacilitiesSection from "@/sections/FacilitiesSection";
import GalleryStrip from "@/sections/GalleryStrip";
import LuxuryFarmVilla from "@/sections/LuxuryFarmVilla";
import PlacesOfInterest from "@/sections/PlacesOfInterest";
import Restaurent from "@/sections/Restaurent";
import RoomsSection from "@/sections/RoomsSection";
import TopSection from "@/sections/TopSection";
import React from "react";

export default function Home(): JSX.Element {
  return (
    <>
      <Navbar2 />
      <TopSection />
      <FacilitiesSection />
      <RoomsSection />
      <LuxuryFarmVilla />
      <Dormitory />
      <GalleryStrip />
      <Restaurent />
      <EventsWeddings />
      <CorporateMeetings />
      <PlacesOfInterest />
      <div className="p-10"></div>
    </>
  );
}
