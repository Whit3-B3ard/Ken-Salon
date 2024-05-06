
// "use client"
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import CreateStore from "@/components/store/create-store"
import UpdateStoreForm from "@/components/store/UpdateStoreForm";
import CreateServicePage from "@/components/salonServices/create-service";
import UpdateServicePage from "@/components/salonServices/update-service";
import EmployeeList from "@/components/employee/EmployeeList";
import CreateEmployee from "@/components/employee/CreateEmployee";
import UpdateEmployee from "@/components/employee/UpdateEmployee";
import CreateStoreHoursForm from "@/components/store/CreateStoreHoursForm";
import UpdateStoreHour from "@/components/store/UpdateStoreHour";
import CreateStoreClosureForm from "@/components/store/CreateStoreClosureForm";
import UpdateStoreClosureForm from "@/components/store/UpdateStoreClosureForm";

export default async function Superuser() {
  const session = await getServerSession(options);

  if (!session || session.user.role !== 'owner') {
    
    redirect("/login");
  }

  return (
    <div className=" m-10 rounded-xl text-white " style={{backgroundColor:"#1F2937"}} >
      <h1 className="pt-4 pl-4">Superuser Dashboard</h1> 
      <CreateStore/>
      <UpdateStoreForm />
      <CreateStoreHoursForm/> 
      <UpdateStoreHour/>
      <CreateStoreClosureForm/>
      <UpdateStoreClosureForm/>
      <div className="my-8 border-t border-white"></div>
      <CreateServicePage/>
      <UpdateServicePage/>
      <div className="my-8 border-t border-white"></div>
      <EmployeeList/>
      <CreateEmployee/>
      <UpdateEmployee/>
      </div> 
  );
}
