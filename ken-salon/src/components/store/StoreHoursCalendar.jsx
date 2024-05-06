// components/StoreHoursDisplay.jsx
"use client";
import {  useState } from 'react';
import axios from 'axios';
import { baseUrl } from '@/api/ports';
import { useStore } from '@/context/StoreContext';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'; 
import MyCalendar from './ReactCalender';

const StoreHoursDisplay = () => {
  const {setStoreHourId, storeHours, setStoreHours  } = useStore();
  const [isVisible, setIsVisible] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleCreateStoreHour = () => {
    router.push('/superuser/');
  }
  const handleDeleteStoreHour = async (storeHourId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this store hour? This action cannot be undone.");
    if (confirmDelete) {
      try {
        await axios.delete(`${baseUrl}/api/storehours/${storeHourId}`, {
          headers: {
            'Authorization': `Bearer ${session.accessToken}`,
          },
        });
        // Remove the deleted store hour from the local state to update the UI
        setStoreHours(storeHours.filter(hour => hour._id !== storeHourId));
        alert('Store hour successfully deleted');
      } catch (error) {
        console.error('Failed to delete store hour:', error);
        alert('Failed to delete store hour');
      }
    }
  };

  const handleUpdateStoreHour = (storeHourId) => {
    setStoreHourId(storeHourId); 
    router.push(`/superuser/`); 
  };

  const isOwner = session?.user?.role === 'owner';

  return (
    <div className="p-4 bg-black rounded-lg shadow text-white">
      <h2 onClick={toggleVisibility} className="text-lg font-bold mb-2 cursor-pointer">Store Opening Times:</h2>
      
      {isVisible && (
        <>
          <ul className="list-disc pl-5">
            {storeHours.length > 0 ? (
              storeHours.map((hour, index) => (
                <li key={index} className="mb-1 text-white flex justify-between items-center">
                  <span>{hour.day}: {hour.openTime} - {hour.closeTime}</span>
                  {isOwner && (
                  <div>
                  <button onClick={handleCreateStoreHour} className="px-2 py-1 mr-2 bg-green-500 hover:bg-green-700 text-white font-bold rounded">
                    Create
                  </button>
                  <button onClick={() => handleUpdateStoreHour(hour._id)} className="px-2 py-1 mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded">
                    Update
                  </button>
                  <button onClick={() => handleDeleteStoreHour(hour._id)} className="px-2 py-1 bg-red-500 hover:bg-red-700 text-white font-bold rounded">
                    Delete
                  </button>
                </div>)}
                </li>
                
              ))
            ) : (
              <p>No store hours available.</p>
            )}
          </ul>
         
        </>
      )}
      <MyCalendar  />
    </div>
  );
};

export default StoreHoursDisplay;
