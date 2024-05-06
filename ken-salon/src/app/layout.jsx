import { Inter } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "@/context/SidebarContext";
import Sidebar from "@/components/sidebar/index";
import Navbar from "@/components/navbar/Navbar";
// import Navigation from "@/components/Navigation";
import Footer from "@/components/footer/Footer";
// import UserContextProvider from "@/context/UserContext.jsx";
import { UserProvider } from "@/context/userContext";
import AuthProvider from "@/context/auth";
import { BasketProvider } from "@/context/BasketContext";
import { CalendarProvider } from '@/context/CalendarContext';
import { StoreProvider } from '@/context/StoreContext';
import { ServiceProvider } from '@/context/ServiceContext';
import { EmployeeProvider } from "@/context/EmployeeContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ken Salon",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        ></link>
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        ></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Cedarville+Cursive&family=Dancing+Script:wght@700&display=swap"
          rel="stylesheet"
        ></link>
        <link rel="icon" type="image/png" href="/logo01.png"></link>
      </head>

      <body className={inter.className}>
        <AuthProvider>
          <UserProvider>
          <StoreProvider>
                <ServiceProvider>
                 <CalendarProvider> 
                  <EmployeeProvider>
            <BasketProvider>
              <SidebarProvider>
                <div className="">
                  {/* <Sidebar className=" inset-0 left-0 top-0" /> */}
                  <div className="">
                    <Navbar />
                  </div>
                  {children}
                  <div className="">
                    <Footer />
                  </div>
                </div>
              </SidebarProvider>
            </BasketProvider>
            </EmployeeProvider>
            </CalendarProvider>
            </ServiceProvider>
            </StoreProvider>
          </UserProvider>
        </AuthProvider>
      </body>
    </html>
  );
}