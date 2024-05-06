"use client";
import React, { useState, useRef, useContext } from "react";
import "../../../../globals.css";
import Link from "next/link";
import CalendarComponent from "@/components/calendar/Calendar";
import { BasketContext } from "@/context/BasketContext";
export default function page() {
  const { basket, removeFromBasket, total } = useContext(BasketContext);

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
          <Link href="/services/for-him">
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
      <div className="w-full h-full flex">
        <div className=" w-2/3 flex flex-col mt-8">
          <CalendarComponent />
        </div>
        <div className="h-full w-1/3 flex justify-end ">
          <div className="fixed h-3/4 w-1/4  border-8 border-black rounded-xl mr-14 flex flex-col bg-gray-100 basket">
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
                    Checkout
                  </button>
                </Link>
              ) : (
                <button
                  className="mx-auto lg:mx-0 bg-slate-800 opacity-50 text-white font-bold rounded-full mt-4 lg:mt-0 py-4 px-8 shadow cursor-not-allowed"
                  disabled
                >
                  Checkout
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
