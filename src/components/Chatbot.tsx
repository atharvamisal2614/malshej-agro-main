import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import React, { useState } from "react";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";

const theme = {
  background: "#f1f9f9",
  fontFamily: "Helvetica Neue",
  headerBgColor: "#198754",
  headerFontColor: "#ffffff",
  headerFontSize: "15px",
  botBubbleColor: "#198754",
  botFontColor: "#fff",
  userBubbleColor: "#fff",
  userFontColor: "#4a4a4a",
};

const Chatbot = () => {
  const [chat, setChat] = useState(false);

  const steps = [
    {
      id: "0",
      message: "Welcome to Malshej Agro Resort. How Can I Help You",
      trigger: "1",
    },
    {
      id: "1",
      options: [
        { value: 1, label: "Rooms", trigger: "2" },
        { value: 2, label: "Facilities", trigger: "3" },
        { value: 3, label: " End", trigger: "5" },
      ],
    },
    {
      id: "2",
      message:
        "Here are the list of rooms. 1.Cottage, 2.Ac Villa, 3.Baboo Hut, 4.Family Rooms, 5.Bunglow , 6.Group Room",
      trigger: "1",
    },
    {
      id: "3",
      message:
        "We have number of activities for every age group to stay active during the vacation like Indoor Games, Outdoor Game, Swimming Pool, etc.",
      trigger: "1",
    },
    {
      id: "5",
      message: "Bye",
      end: true,
    },
  ];
  return (
    <>
      <div className={`${chat ? "" : "hidden"} fixed right-5 bottom-20 z-50`}>
        <ThemeProvider theme={theme}>
          <ChatBot headerTitle="MalshejBot" steps={steps} />
        </ThemeProvider>
      </div>

      <div onClick={() => setChat(!chat)} className={` fixed bottom-5 right-5`}>
        <div className="p-2 flex justify-center items-center rounded-full bg-heading">
          <IoChatbubbleEllipsesOutline color={"#fff"} size={30} />
        </div>
      </div>
    </>
  );
};

export default Chatbot;
