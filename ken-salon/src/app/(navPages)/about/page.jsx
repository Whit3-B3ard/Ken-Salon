"use client"
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import "../../globals.css";

export default function About() {
  const [image2Ref, inView2] = useInView({
    triggerOnce: true,
  });
  const [fadeIn2, setFadeIn2] = useState(false);
  const [translateUp2, setTranslateUp2] = useState(false);

  useEffect(() => {
    if (inView2 && !fadeIn2) {
      setFadeIn2(true);
    }
  }, [inView2, fadeIn2]);

  useEffect(() => {
    if (fadeIn2 && !translateUp2) {
      setTranslateUp2(true);
    }
  }, [fadeIn2, translateUp2]);

  return (
    <div className="w-full h-screen flex">
      <div className="flex justify-between">
        <div className="flex flex-col w-full  justify-center lg:items-start overflow-y-hidden pl-16">
          <h1 className="my-4 text-3xl md:text-5xl text-black opacity-75 font-bold leading-tight text-center md:text-left pb-12">
          Where Beauty Meets Excellence:{" "}
            <span className="bg-clip-text text-transparent bg-green-500">
            Discover Our Salon
            </span>
            
          </h1>
        
          <p className="leading-normal text-black text-base md:text-2xl mb-8 text-center md:text-left">
          At Our Beauty Salon, we pride ourselves on providing advanced beauty solutions tailored to meet the unique needs of every individual.
        </p>
        <p className="leading-normal text-black text-base md:text-2xl mb-8 text-center md:text-left">
          Our salon is designed to create an ambiance of relaxation and luxury, where you can indulge in a range of beauty treatments that rejuvenate your body, mind, and soul.
        </p>
        <p className="leading-normal text-black text-base md:text-2xl mb-8 text-center md:text-left">
          Whether you're looking for a refreshing facial, a stunning hairstyle, or a relaxing massage, our team of experienced professionals is dedicated to delivering exceptional results that exceed your expectations.
        </p>
        <p className="leading-normal text-black text-base md:text-2xl mb-8 text-center md:text-left">
          We believe that everyone deserves to look and feel their best, which is why our salon offers a wide range of services suitable for all ages, genders, and skin types.
        </p>
        <p className="leading-normal text-black text-base md:text-2xl mb-8 text-center md:text-left">
          Visit Our Beauty Salon today and discover the perfect blend of sophistication, innovation, and personalized care. Let us help you unleash your inner beauty and confidence.
        </p>
        </div>

        <div className="w-1/3 xl:w-full py-12 pr-0 overflow-hidden flex justify-end">
          <div
            ref={image2Ref}
            className={`${fadeIn2 ? "fade-in duration-1000" : "invisible"} ${
              translateUp2 ? "translate-up" : ""
            } `}
          >
            <img
              className=" w-full fade-in rounded-xl h-full pr-24"
              src="../images/ken.jpg"
              alt="Man Model"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
