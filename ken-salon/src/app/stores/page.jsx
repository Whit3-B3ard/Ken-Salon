// app/stores/page.jsx
"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { baseUrl } from '@/api/ports';

const StoresPage = () => {
 
  const [stores, setStores] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/stores`);
        setStores(response.data);
      } catch (error) {
        console.error(error,'Error fetching stores:' );
        setError('Failed to load stores. Please try again later.');
      }
    };
    fetchStores();
  }, []);

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4 mt-4"><span className='text-green-500'>Visit</span> our salons</h1>
      
      <div className="flex  lg:flex-row flex-col justify-center gap-4 m-2">
        {stores.map((store) => (
          <div key={store._id} className="flex flex-col items-start p-4 gap-4" >
            <Link href={`/stores/${store._id}`} passHref >
            <h2 className="text-xl font-semibold">{store.name}</h2>
            </Link>
             {store.imageStore && (
              <div className=" relative mt-2 ">
                <img src={store.imageStore} alt="Store" width={500} height={500} className='rounded-xl ' />
              </div>
            )}
            {/* Displaying address fields */}
            {store && (
              <div>
                
                <p className='text-sm text-gray-100'>{store.street}</p>
                <p className='text-sm text-gray-100'>{store.city}, {store.state} {store.zipCode}</p>
                <p className='text-sm text-gray-100'>{store.country}</p>
              </div>
            )}
            {/* Displaying contact info fields */}
            {store && (
              <div>
                <p className='text-sm text-gray-100'>Phone: {store.phone}</p>
                <p className='text-sm text-gray-100'>
                Mobile: <a href={`https://wa.me/${store.mobile}?text=Hello, I'm interested in your services.`} className="hover:underline" target="_blank" rel="noopener noreferrer">{store.mobile}</a></p>
                <p className='text-sm text-gray-100'>Email: <a href={`mailto:${store.email}`} className="text-green-600">{store.email}</a></p>
              </div>
            )}
          </div>
        ))}
        </div>
      </div>
    
  );
};


export default StoresPage;
