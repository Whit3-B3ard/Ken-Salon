
"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useStore } from '@/context/StoreContext'; 
import { baseUrl } from '@/api/ports';
import { useSession } from 'next-auth/react';

const inputStyle = "text-black px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
const button = " flex justify-center text-sm cursor-pointer text-gray-100 p-4 rounded-lg  transition duration-300 ease-in-out   hover:bg-gray-400"
const buttonStyle = "flex justify-center text-sm cursor-pointer text-gray-100 p-4 rounded-lg transition duration-300 ease-in-out hover:bg-gray-400";

const UpdateStoreHour = () => {
  const router = useRouter();
  const { currentStoreHourId } = useStore(); 
  const { data: session } = useSession();
  const [storeHour, setStoreHour] = useState({
    day: '',
    openTime: '',
    closeTime: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    const fetchStoreHour = async () => {
      if (currentStoreHourId) {
        try {
          const response = await axios.get(`${baseUrl}/api/storehours/${currentStoreHourId}`, {
            headers: {
              'Authorization': `Bearer ${session?.accessToken}`,
            },
          });
          setStoreHour(response.data);
        } catch (error) {
          console.error('Error fetching store hour:', error);
          setError('Failed to fetch store hour details.');
        }
      }
    };

    fetchStoreHour();
  }, [currentStoreHourId, session?.accessToken]); // Optional chaining for safer access

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStoreHour(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${baseUrl}/api/storehours/${currentStoreHourId}`, storeHour, {
        headers: {
          'Authorization': `Bearer ${session?.accessToken}`, // Optional chaining for safer access
        },
      });
      setSuccess('Store hour updated successfully');
      // Redirect the user after a successful update. Update this path as necessary.
      router.push('/stores'); 
    } catch (error) {
      console.error('Error updating store hour:', error);
      setError('Failed to update store hour.');
      setSuccess(''); // Clear success message on error
    }
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <>
      <h2 onClick={toggleFormVisibility} className={buttonStyle}>Update Store Hours</h2>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      {isFormVisible && (
        <div className="update-store-hour-form">
          <form onSubmit={handleSubmit} className="space-y-4 flex flex-col items-center">
            <div>
              <label htmlFor="day" className="block text-sm font-medium text-gray-200">Day</label>
              <select id="day" name="day" value={storeHour.day} onChange={handleChange} className={inputStyle}>
                <option value="">Select a day</option> 
                <option value="Monday">Monday</option> 
                <option value="Tuesday">Tuesday</option> 
                <option value="Wednesday">Wednesday</option> 
                <option value="Thursday">Thursday</option> 
                <option value="Friday">Friday</option> 
                <option value="Saturday">Saturday</option> 
                <option value="Sunday">Sunday</option>
              </select>
            </div>
            <div>
              <label htmlFor="openTime" className="block text-sm font-medium text-gray-200">Open Time</label>
              <input type="time" id="openTime" name="openTime" value={storeHour.openTime || ''} onChange={handleChange} className={inputStyle}/>
            </div>
            <div>
              <label htmlFor="closeTime" className="block text-sm font-medium text-gray-200">Close Time</label>
              <input type="time" id="closeTime" name="closeTime" value={storeHour.closeTime || ''} onChange={handleChange} className={inputStyle}/>
            </div>
            <button type="submit" className={buttonStyle}>Update Store Hour</button>
          </form>
        </div>
      )}
    </>
  );
};

export default UpdateStoreHour;
