"use client"
import React, { useState } from 'react';
import routes from '../../routes/sidebar';
import Link from 'next/link';
import { Button } from '@windmill/react-ui';
import { FaFile } from "react-icons/fa";

function SidebarContent({ currentPath }) {

  const [isDropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="py-4 text-gray-500 dark:text-gray-400 h-full">
      <a className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200" href="#">
        Dashboard
      </a>
      <ul className="mt-6">
        {routes.map((route, index) => {
          if (route.routes) {
            return (
              <li key={index} className='relative px-6 flex flex-col cursor-pointer'>
                
                <div className='relative py-3 flex items-center cursor-pointer'>
                <FaFile />
                <span className='ml-4' onClick={() => setDropdownOpen(!isDropdownOpen)}>{route.name}</span>
                </div>
                
                {isDropdownOpen && (
                  <ul className='flex flex-col'>
                    {route.routes.map((subRoute, subIndex) => (
                      <li key={subIndex}>
                        <Link href={subRoute.path}>
                          <h1 className={currentPath === subRoute.path ? 'text-gray-800 dark:text-gray-100' : ''}>
                            {subRoute.name}
                          </h1>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          }

          return (
            <li className="relative px-6 py-3" key={index}>
              <Link href={route.path} passHref>
                <h1 className={`inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 ${currentPath === route.path ? 'text-gray-800 dark:text-gray-100' : ''}`}>
                  <route.icon className="w-5 h-5" />
                  <span className="ml-4">{route.name}</span>
                </h1>
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="px-6 my-6">
        <Button>
          Create account
          <span className="ml-2">+</span>
        </Button>
      </div>
    </div>
  );
}

export default SidebarContent;
