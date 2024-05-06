// "use client"
// import { useState, useEffect, useRef  } from 'react';
// import Link from 'next/link'
// import { usePathname } from 'next/navigation';
// import NavLink from './navLink/navLink';
// import HamburgerButton from '../HamburgerButton/HamburgerButton';
// import { useRegister } from "@/context/userContext"
// import { useSession, signOut } from "next-auth/react";
// import Image from 'next/image';


// export default function Links() {
//   const { data: session, status } = useSession();
//   const pathName = usePathname();
//   const { userLog, logout } = useRegister();
//   const [open, setOpen] = useState(false);
//   const menuRef = useRef(); // Create a ref for the menu

  

//    const  Links =[
//     { title:"Home", path:"/"},
//     { title: "Services", path: "/services",},
//     { title: "Gallery", path: "/gallery",},
//     { title: "Contact Us", path: "/contact" },
//     { title: "About", path: "/about" }
//    ];


//    // CLICK OUTSIDE MENU TO CLOSE MENU
//    useEffect(() => {
//     function handleClickOutside(event) {
//         if (open && menuRef.current && !menuRef.current.contains(event.target) && !event.target.closest('.hamburger-btn')) {
//             setOpen(false);
//         }
//     }
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//         document.removeEventListener('mousedown', handleClickOutside);
//     };
// }, [open]);

//    //styling
//    const button = " flex justify-center text-sm cursor-pointer text-gray-100 p-4 rounded-lg  transition duration-300 ease-in-out   hover:bg-gray-400"
   
//    //LOGOUT *******************************************
//    const handleLogout = async () => {
//     try {
//       await signOut({ redirect: false });
//       // No need to manually route to '/' since NextAuth will handle this based on your configuration
//     } catch (error) {
//       console.error('Logout error:', error);
//     }
//   };

//    return (
//     <div>
//       <div className='hidden lg:flex  gap-4'>
//         {Links.map((link) => (<NavLink item={link} key={link.title} />))}

//         {session ? (
//           <>
//           <Image src={session.user?.image} alt="Profile" width={50} height={50} className="rounded-full" />
//           <h2>Welcome {session.user?.name}</h2>
//           <button onClick={handleLogout} className={button}>Logout</button>
//           </>
//         ) : (
//           null
//         )}
//       </div>

//       {/* Toggle button for smaller screens */}
//       <div className='relative'>
//         <div className='flex justify-center items-center'>
//           <HamburgerButton isOpen={open} toggle={() => setOpen((prevOpen) => !prevOpen)} />
//         </div>
//         {open && (
//           <div ref={menuRef} className="absolute top-6 right-2 flex flex-col gap-4 lg:hidden bg-gray-600 shadow-md p-4 rounded-lg w-36 z-10">
//             {Links.map((link) => (<NavLink item={link} key={link.title} />))}

//             {session ? (
//               <>
//               <Image src={session.user.image } alt="Profile" width={50} height={50} className="rounded-full" />
//               <button onClick={handleLogout} className={button}>Logout</button>
//               </>
//             ) : (
//               <>
//                 <Link href="/login" className={button}>Login</Link>
//                 <Link href="/register" className={button}>Register</Link>
//               </>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
