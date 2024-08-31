import Chatbot from "@/components/Chatbot";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { MdCall, MdOutlineWhatsapp } from "react-icons/md";
import { IoLogoInstagram } from "react-icons/io5";
import Head from "next/head";
import React from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token !== null) {
        config.headers.Authorization = "Bearer " + token;
      }
      return config;
    },
    (error) => {
      void Promise.reject(error);
    }
  );
  return (
    <>
      <Head>
        <title>Malshej Agro Tourism and Farm</title>
        <meta name="description" content="Malshej Agro Tourism and Farm" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <div className="fixed right-1 top-96">
        <div className="my-1 bg-heading p-2">
          <a href="tel:917666999551">
            <MdCall color={"#fff"} />
          </a>
        </div>
        <div className="my-1 bg-heading p-2">
          <a href="https://wa.me/917666999551">
            <MdOutlineWhatsapp color={"#fff"} />
          </a>
        </div>
        <div className="my-1 bg-heading p-2">
          <a href="https://www.instagram.com/malshej.agro.tourism/">
            <IoLogoInstagram color={"#fff"} />
          </a>
        </div>
      </div>
      <ToastContainer />
      <Navbar />
      <Component {...pageProps} />
      <Footer />
      <Chatbot />
    </>
  );
}
