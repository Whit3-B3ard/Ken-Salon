import React from "react";
export default function Footer() {
  return (
    <div className="text-white w-full h-16 bg-black flex justify-between items-center px-4">
      <div><a className="flex title-font font-medium items-center md:justify-start justify-center text-white">
          <span className="ml-3 text-xl">Ken's Salon</span>
        </a></div>
      <ul className="flex justify-between items-center w-1/5">
        <i className="fa-brands fa-instagram fa-xl"></i>
        <i className="fa-brands fa-instagram fa-xl"></i>
        <i className="fa-brands fa-tiktok fa-xl"></i>
        <i className="fa-brands fa-tiktok fa-xl"></i>
      </ul>
      <div>
      <p className="text-sm text-gray-400 sm:ml-6 sm:mt-0 mt-4">© 2021 Ken's Salon —
          <a href="https://twitter.com/placeholder" className="text-gray-500 ml-1" rel="noopener noreferrer" target="_blank">@kenssalon</a>
        </p>
      </div>
    </div>
  );
}
