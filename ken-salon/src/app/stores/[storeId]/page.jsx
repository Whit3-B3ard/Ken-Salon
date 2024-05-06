// app/stores/[storeId]/page.jsx
"use client"
import { baseUrl } from '@/api/ports';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useStore } from "@/context/StoreContext"
import ServicesPage from './salon-services/page';
import StoreHoursCalendar from "@/components/store/StoreHoursCalendar"
import StoreClosureDisplay from '@/components/store/StoreClosureForm';

const StorePage = ({ params }) => {
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { storeId } = params;
  const { data: session} = useSession();
  const { setStoreId } = useStore();
  const router = useRouter();
  

  useEffect(() => {
    const fetchStore = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${baseUrl}/api/stores/${storeId}`);
        setStore(response.data);
        setStoreId(storeId);
        setError(null);
      } catch (error) {
        console.error(error, 'Failed to fetch store:' );
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (storeId) {
      fetchStore();
    }
  }, [storeId, setStoreId]);

  const isOwner = session?.user?.role === 'owner';

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching store details</div>;

  const handleDeleteStore = async () => {
    if (window.confirm("Are you sure you want to delete this store? This action cannot be undone.")) {
      try {
        await axios.delete(`${baseUrl}/api/stores/${storeId}`, {
          headers: {
            'Authorization': `Bearer ${session.accessToken}`,
          },
        });
        alert('Store successfully deleted');
        router.push('/stores');
      } catch (error) {
        console.error( error,'Failed to delete store:');
        alert('Failed to delete store');
      }
    }
  };

 
  return (
    <div className="p-4">
      {store ? (
        <>
          <h1 className="text-2xl font-bold">Store: {store.name}</h1>
          <div className="relative mt-2">
            <img src={store.imageStore} alt={`${store.name} Store Image`} width={500} height={500} />
            <StoreHoursCalendar />
            <StoreClosureDisplay/>
          </div>
          {/* Show Update button only to the store owner */}
          {isOwner && (
           <>
           <button
             onClick={() => router.push(`/superuser`)} // Programmatic navigation to the update form
             className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
           >
             Update Store
           </button>
           <button
             onClick={handleDeleteStore}
             className="mt-4 ml-4 px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600"
           >
             Delete Store
           </button>
           {/* Add "Create Service" button */}
           <button
                onClick={() => router.push(`/superuser`)} // Navigate to the Create Service page, passing the storeId
                className="mt-4 ml-4 px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600"
              >
                Create Service
              </button>
           
           
         </>
       )}
       <ServicesPage/>
        </>
      ) : (
        <div>Store not found</div>
      )}
    </div>
  );
};

export default StorePage;
