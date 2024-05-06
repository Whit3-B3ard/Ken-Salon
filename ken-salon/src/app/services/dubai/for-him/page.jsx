"use client";
import React, { useState, useRef, useContext } from "react";
import "../../../globals.css";
import Link from "next/link";
import services from "./services";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { BasketContext } from "@/context/BasketContext";
export default function page() {
  const { basket, addToBasket, removeFromBasket, total } = useContext(BasketContext);
  const [activeTab, setActiveTab] = useState(0);
  const swiperRef = useRef(null);
  const updateSwiperHeight = () => {
    const swiper = swiperRef.current;
    if (swiper && swiper.swiper) {
      const activeSlideHeight =
        swiper.swiper.slides[swiper.swiper.activeIndex].clientHeight;
      if (activeSlideHeight) {
        swiper.swiper.wrapperEl.style.height = `fit-content`;
        swiper.swiper.wrapperEl.style.display = "flex";
      }
    }
  };
  const handleTabClick = (index) => {
    setActiveTab(index);
    if (swiperRef.current !== null && swiperRef.current.swiper !== undefined) {
      swiperRef.current.swiper.slideTo(index);
      setTimeout(updateSwiperHeight, 10); 
    }
  };

  return (
    <>
      <div className="mt-4 ml-8">
        <ul className=" flex gap-4">
          <Link href="/services">
            <li className="font-bold cursor-pointer hover:text-green-500 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
              Services
            </li>
          </Link>
          <li className="font-bold">&gt;</li>
          <Link href="/services/dubai">
          <li className="font-bold cursor-pointer hover:text-green-500 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">Dubai</li></Link>
          <li className="font-bold">&gt;</li>
          <Link href="/services/dubai/for-him">
            <li className="font-bold cursor-pointer hover:text-green-500 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
              For Him
            </li>
          </Link>
          <li className="text-gray-400">&gt;</li>
          <li className="text-gray-400">Schedule</li>
          <li className="text-gray-400">&gt;</li>
          <li className="text-gray-400">Confirm</li>
        </ul>
      </div>
      <div className="w-full  flex">
        <div className=" w-2/3 flex flex-col items-center mt-8">
          <div className="h-4/5 w-4/5 rounded-xl">
            <h1 className="font-bold text-4xl">Select services</h1>
            <div className="category-tabs">
              {services.map((category, index) => (
                <div
                  key={category.category}
                  className={`tab ${activeTab === index ? "active" : ""}`}
                  onClick={() => handleTabClick(index)}
                >
                  {category.category}
                </div>
              ))}
            </div>
            <Swiper
              spaceBetween={50}
              slidesPerView={"auto"}
              onSwiper={(swiper) => console.log(swiper)}
              className="mySwiper"
              onSlideChange={(swiper) => {
                setActiveTab(swiper.activeIndex);
                setTimeout(updateSwiperHeight, 5000); 
              }}
              ref={swiperRef}
              slidesPerGroupAuto={true}
            >
              {services.map((category) => (
                <SwiperSlide key={category.category}>
                  <h2 className="font-bold text-xl pt-4">
                    {category.category}
                  </h2>
                  <div
                    key={category.category}
                    className="service-category h-full flex flex-col gap-3 w-full "
                  >
                    {category.items.map((service) => (
                      <div
                        key={service.id}
                        className="service pt-8 flex flex-col cursor-pointer  "
                      >
                        <div className="border-2 rounded-xl border-gray-400 mt-4 h-40 flex w-3/4 hover:bg-green-500 bg-slate-800 text-white  hover:text-white shadow  focus:outline-none focus:shadow-outline transform transition  duration-300 ease-in-out">
                          <div className="flex h-full w-4/5 flex-col justify-start py-6 pl-6 ">
                            <h1 className="font-bold ">{service.title}</h1>
                            <h4>{service.duration}</h4>
                            <h3 className="font-bold ">{service.price}</h3>
                          </div>
                          <div className="flex h-full w-1/5 justify-center items-center">
                            <div
                              className="rounded-full hover:bg-gray-500 p-2 cursor-pointer"
                              onClick={() =>
                                addToBasket(service, category.imageUrl)
                              }
                            >
                              <i className="fa-solid fa-plus fa-2xl"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        <div className="h-full w-1/3 flex justify-end ">
          <div className="fixed h-3/4 w-1/4  border-2 border-gray-500 rounded-xl mr-14 flex flex-col bg-gray-100 basket">
            <h1 className="w-full text-center font-bold pt-2 basket-header">
              Basket
            </h1>
            <div className="flex flex-col h-4/6 w-full pt-4 basket-items">
              <h2 className="font-bold  pl-4">Items:</h2>
              {basket.map((item, index) => (
                <div
                  key={index}
                  className="pl-4 flex justify-between items-center mb-[10px] basket-item"
                >
                  <img
                    src={item.imageUrl}
                    alt="Service"
                    className="w-24 h-24 object-cover rounded-xl" 
                  />
                  <p className="truncate item-title">{item.title}</p>
                  <p className="pr-4 item-price">{item.price}</p>

                  <div className="mr-4 item-action">
                    <i
                      className="fa-solid fa-trash fa-xl cursor-pointer text-slate-800 hover:text-red-500 shadow  focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
                      onClick={() => removeFromBasket(index)}
                    ></i>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center h-1/6 w-full justify-between basket-total">
              <h2 className="font-bold pl-4">Total:</h2>
              <h2 className="font-bold pr-4">AED {total.toFixed(2)}</h2>
            </div>
            <div className="w-full h-1/6 flex justify-center items-center">
              {basket.length > 0 ? (
                <Link href="/services/dubai/for-him/schedule">
                  <button className="mx-auto lg:mx-0 hover:underline bg-slate-800 hover:bg-green-500 text-white font-bold rounded-full mt-4 lg:mt-0 py-4 px-8 shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
                    Schedule
                  </button>
                </Link>
              ) : (
                <button
                  className="mx-auto lg:mx-0 bg-slate-800 opacity-50 text-white font-bold rounded-full mt-4 lg:mt-0 py-4 px-8 shadow cursor-not-allowed"
                  disabled
                >
                  Schedule
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
