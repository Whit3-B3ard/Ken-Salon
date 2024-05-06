"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useStore } from "@/context/StoreContext";
import { useService } from "@/context/ServiceContext";
import { useEmployee } from "@/context/EmployeeContext";
import { useSession } from 'next-auth/react';

const ServicesPage = () => {
  const { currentStoreId } = useStore();
  //console.log("🚀 ~ ServicesPage ~ currentStoreId:", currentStoreId)
  const { services, loading: servicesLoading, error: servicesError } = useService();
  const { employees, loading: employeesLoading, error: employeesError } = useEmployee();
  const [groupedServices, setGroupedServices] = useState({});
  const [sectionEmployees, setSectionEmployees] = useState({});
  const [selectedServices, setSelectedServices] = useState(new Set());
  const { data: session } = useSession();

  useEffect(() => {
    // Group services by section, then by category
    const grouped = services.reduce((acc, service) => {
      const section = service.section || 'Other';
      acc[section] = acc[section] || {};
      const category = service.category || 'Other';
      acc[section][category] = acc[section][category] || [];
      acc[section][category].push(service);
      return acc;
    }, {});

    setGroupedServices(grouped);
  }, [services]);

  useEffect(() => {
    // Group employees by section
    const employeesBySection = employees.reduce((acc, employee) => {
      employee.sections.forEach(section => {
        acc[section] = acc[section] || [];
        acc[section].push(employee);
      });
      return acc;
    }, {});

    setSectionEmployees(employeesBySection);
  }, [employees]);

  const handleServiceSelectionChange = (serviceId) => {
    const updatedSelection = new Set(selectedServices);
    if (updatedSelection.has(serviceId)) {
      updatedSelection.delete(serviceId);
    } else {
      updatedSelection.add(serviceId);
    }
    setSelectedServices(updatedSelection);
    console.log("User:", session?.user?.email, "Selected Services:", Array.from(updatedSelection));
  };


  if (!currentStoreId) return <p>Please select a store to view its services.</p>;
  if (servicesLoading || employeesLoading) return <p>Loading...</p>;
  if (servicesError) return <p className="text-red-500">Error loading services: {servicesError.message}</p>;
  if (employeesError) return <p className="text-red-500">Error loading employees: {employeesError.message}</p>;


  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4"><span className='text-green-500'>Our Services</span></h1>
      {Object.entries(groupedServices).map(([section, categories]) => (
        <div key={section} className="mb-8 w-full">
          <h2 className="text-xl font-bold mb-4">{section}</h2>
          
          {sectionEmployees[section]?.map((employee) => (
            <div key={employee._id} className="flex items-center mb-4">
              <img src={employee.userInfo.image} alt={employee.userInfo.name} style={{ width: 50, height: 50, borderRadius: '50%' }} />
              <div className="ml-4">
                <p className="font-bold">{employee.userInfo.name}</p>
              </div>
            </div>
          ))}

          {Object.keys(categories).map((category) => (
            <div key={category} className="mb-8">
              <h3 className="text-lg font-semibold mb-2">{category}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories[category].map((service) => (
                  <div 
                    key={service._id} 
                    className={`border p-4 rounded-lg cursor-pointer ${selectedServices.has(service._id) ? 'bg-gray-200' : ''}`}
                    onClick={() => handleServiceSelectionChange(service._id)}
                  >
                    <h4 className="text-lg font-semibold mb-2">{service.title}</h4>
                    <p className="mb-2">{service.description}</p>
                    <p className="mb-2">Duration: {service.duration} minutes</p>
                    <p className="mb-2">Price: ${service.price}</p>
                    <Link href={`/stores/${currentStoreId}/salon-services/${service._id}`}>
                      Learn more
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
      {/* Optionally, include a button here to proceed with the selected services */}
    </div>
  );
};

export default ServicesPage;

