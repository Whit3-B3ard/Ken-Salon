"use client";
import React, { useContext, useState, useEffect } from "react";
import Link from "next/link";
import { useInView } from "react-intersection-observer";
import "./globals.css";
export default function Home() {
  const [image1Ref, inView1] = useInView({
    triggerOnce: true,
  });

  const [image2Ref, inView2] = useInView({
    triggerOnce: true,
  });

  const [fadeIn, setFadeIn] = useState(false);
  const [translateUp, setTranslateUp] = useState(true);
  const [translateUp2, setTranslateUp2] = useState(false);
  const [fadeIn2, setFadeIn2] = useState(false);

  useEffect(() => {
    console.log("inView1:", inView1, "inView2:", inView2);
    if (inView2) {
      setFadeIn2(true);
      setTranslateUp2(true);
    } else {
      setFadeIn(true);
      setTranslateUp(true);
    }
  }, [inView1, inView2]);
  return (
    <>
      <div className="relative w-full">
        <video
          className="w-full  object-cover"
          src="/videos/hero.mp4"
          autoPlay
          loop
          muted
          style={{ height: "900px" }}
        ></video>
        <div className="absolute inset-0">
          <div className="h-full w-full absolute bg-gradient-to-t from-black  to-transparent flex justify-end items-center">
            <div
              ref={image1Ref}
              className={`${
                fadeIn
                  ? " fade-in duration-1000 flex flex-col w-full xl:w-2/5 justify-center lg:items-start overflow-y-hidden pl-16 "
                  : "invisible"
              } ${translateUp ? "translate-up fade-in duration-1000" : null}`}
            >
              <h1 className="my-4 text-3xl md:text-5xl text-white opacity-75 font-bold leading-tight text-center md:text-left">
                Eleg
                <span className="bg-clip-text text-transparent bg-green-500">
                  ance:
                </span>
                <br></br>Your Beauty Haven
              </h1>
              <p className="leading-normal text-white text-base md:text-2xl mb-8 text-center md:text-left">
              Visit our luxurious salon in the heart of the UAE to <br></br>
               discover a world
               where brilliance and beauty meet,<br></br>
               Our team of specialists is committed to providing
                a <br></br> wide range of services that are sure to blow your mind!
              </p>
              <Link href="/services">
                <button className="mx-auto lg:mx-0 hover:underline bg-green-500 text-white font-bold rounded-full mt-4 lg:mt-0 py-4 px-8 shadow  focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out ">
                  Book Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-1/2 flex">
        <div className="flex justify-between">
          <div className="flex flex-col w-full  justify-center lg:items-start overflow-y-hidden pl-16">
            <h1 className="my-4 text-3xl md:text-5xl text-black opacity-75 font-bold leading-tight text-center md:text-left">
            Eleg
              <span className="bg-clip-text text-transparent bg-green-500">
                ance:
              </span>
              <br></br>Beauty Solutions
            </h1>
            <p className="leading-normal text-black text-base md:text-2xl mb-8 text-center md:text-left">
            Visit our luxurious salon in the heart of the UAE to discover a world where brilliance and beauty meet. Our team of specialists is committed to providing a wide range of services, including hair styling and transformation for both men and women, nails, facials, and solarium treatments. We stand out as the top beauty salon in the United Arab Emirates because of our dedication to quality, professionalism, and customer satisfaction. Embrace the pleasure that you deserve and love an unforgettable experience that will leave you feeling healthy and brilliant.
            </p>
          </div>

          <div className="w-1/3 xl:w-full py-12 pr-0 overflow-hidden flex justify-end">
            <div
              ref={image2Ref}
              className={`${fadeIn2 ? "fade-in duration-1000" : "invisible"} ${
                translateUp2 ? "translate-up" : null
              } `}
            >
              <img
                className=" w-3/4 fade-in rounded-xl"
                src="../images/kengrey.jpg"
                alt="Man Model"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
