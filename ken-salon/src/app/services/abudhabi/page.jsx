"use client";
import React, { useState } from "react";
import Link from "next/link";
export default function page() {
  return (
    <div className="relative w-full">
      <div className="mt-4 ml-8">
        <ul className=" flex gap-4">
        <Link href="/services">
          <li className="font-bold cursor-pointer hover:text-green-500 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">Services</li></Link>
          <li className="font-bold">&gt;</li>
          <Link href="/services/abudhabi">
          <li className="font-bold cursor-pointer hover:text-green-500 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">Abu Dhabi</li></Link>
          <li className="text-gray-400">&gt;</li>
          <li className="text-gray-400">For Him/Her</li>
          <li className="text-gray-400">&gt;</li>
          <li className="text-gray-400">Schedule</li>
          <li className="text-gray-400">&gt;</li>
          <li className="text-gray-400">Confirm</li>
        </ul>
      </div>
      <div className="w-full h-screen flex items-center pb-32">
        <div className="flex h-full w-1/2 justify-center items-end text-4xl flex-col">
          <Link href="/services/abudhabi/for-him">
            <div className="parent cursor-pointer flex flex-col pr-48 gap-8 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
              <img
                className="w-[200px] h-[200px]"
                src="/images/rmbg_male_logo.png"
                alt="male logo"
              />
              <button className=" text-gray-400 hover:text-green-500 font-bold hover-target focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out cedarville-cursive-regular">
                For Him
              </button>
            </div>
          </Link>
        </div>
        <div className="w-[0.4rem] h-2/3 bg-gray-500 rounded"> </div>
        <div className="flex h-full w-1/2  justify-center items-start text-4xl flex-col">
          <Link href="/services/abudhabi/for-her">
            <div className="parent cursor-pointer flex flex-col pl-48 gap-8 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
              <img
                className="w-[200px] h-[200px]"
                src="/images/rmbg_female_logo.png"
                alt=""
              />

              <button className=" text-gray-400 hover:text-green-500 font-bold hover-target focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out cedarville-cursive-regular">
                For Her
              </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
