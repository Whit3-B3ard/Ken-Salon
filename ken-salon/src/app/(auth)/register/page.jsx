
"use client"
import{ useState } from 'react';
import Link from 'next/link';
import { useRegister } from '@/context/userContext';
import {background1, box, button1, text, title} from "@/styles/styles01";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";


const RegisterPage = () => {
 const router = useRouter();
  const { register, error } = useRegister();
  const [formData, setFormData] = useState({name: '', email: '', password: '', confirmPassword: '', image: null,
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0]; 
    if (file) {
      setFormData(prevState => ({
        ...prevState,
        image: file 
      }));
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      console.log(error.message, 'Passwords do not match client side');
    }

     // Create a FormData instance
  const formDataToSend = new FormData();
  formDataToSend.append('name', formData.name);
  formDataToSend.append('email', formData.email);
  formDataToSend.append('password', formData.password);
  formDataToSend.append('confirmPassword', formData.confirmPassword);
  
  if (formData.image) {
    formDataToSend.append('logo', formData.image);
  }
    try {
      await register(formDataToSend);
      // router.push("/login", {replace: true});
    } catch (err) {
      console.log(err.message,'Error in signUp', );
      console.log(error,"error register",);
    }
  };

  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: '/' });
  };

  const { data: session, status } = useSession();
  if (session) {
    redirect ("/");
  }

  return (
    <div className="  flex  flex-col gap-4 justify-center items-center pr-4 pl-4" style={{
      backgroundImage: "url('/images/dubai1.jpg')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <div class=" flex flex-col mx-auto bg-transparent rounded-lg pt-12 my-5 w-1/3">
      <div class="flex justify-center w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5 draggable">
      <div class="flex items-center justify-center w-full lg:p-12">
      <div class="flex flex-col items-center w-full">
      <form onSubmit={handleSubmit} className="flex flex-col w-full h-full pb-6 text-center bg-white rounded-3xl p-12">
        <h2 className="mb-3 text-4xl font-extrabold text-dark-grey-900">Register</h2>
        {/* Name field */}
        <div>
          <label htmlFor="name" className="mb-2 text-sm text-start text-grey-900">Name</label>
          <input type="text" id="name" name="name" onChange={handleChange} value={formData.name} placeholder="John Doe"
            className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl border-2" />
        </div>
        {/* Email field */}
        <div>
          <label htmlFor="email" className="mb-2 text-sm text-start text-grey-900">Email</label>
          <input type="email" id="email" name="email" onChange={handleChange} value={formData.email} placeholder="mail@example.com"
            className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl border-2" />
        </div>
         {/* Password field with toggle */}
         <div className=" relative">
          <label htmlFor="password" className="mb-2 text-sm text-start text-grey-900">Password</label>
          <input type={showPassword ? "text" : "password"} id="password" name="password" onChange={handleChange} value={formData.password} placeholder="Enter a password"
            className="flex items-center w-full px-5 py-4 mb-5 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl border-2"/>
          <span onClick={togglePasswordVisibility} className="absolute inset-y-0 right-0 pr-2 pt-5  flex items-center cursor-pointer text-gray-700">
            {showPassword ? <span className='text-sm mb-4 pr-2'>Hide</span> : <span  className='text-sm mb-4 pr-2'>Show</span>}
          </span>
        </div>
        {/* Confirm Password field with toggle */}
        <div className=" relative">
          <label htmlFor="confirmPassword" className="mb-2 text-sm text-start text-grey-900">Confirm Password</label>
          <input type={showPassword ? "text" : "password"} id="confirmPassword" name="confirmPassword" onChange={handleChange} value={formData.confirmPassword} placeholder="Confirm your password"
            className="flex items-center w-full px-5 py-4 mb-5 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl border-2" />
          <span onClick={togglePasswordVisibility} className="absolute inset-y-0 right-0 pr-2 pt-5  flex items-center cursor-pointer text-gray-700">
            {showPassword ?  <span className='text-sm mb-4 pr-2'>Hide</span> : <span  className='text-sm mb-4 pr-2'>Show</span> }
          </span>
        </div>
        
        <div className="mb-4 pb-6 relative">
          {/* Image upload field */}
          <label htmlFor="imageUpload" className="block text-gray-900 text-sm font-bold mb-2">Profile Image</label>
          <input type="file" id="imageUpload" name="image" onChange={handleImageSelect} className="mt-1 p-2 w-full border rounded-md opacity-0 absolute inset-0 cursor-pointer" />
          <div className="p-2 w-full border rounded-md text-gray-300 flex justify-between items-center">
            <span>{formData.image ? formData.image.name : "Choose file..."}</span>
          </div>
          {formData.image && <img src={URL.createObjectURL(formData.image)} alt="Preview" className="mt-2 max-w-xs max-h-32" />}
        </div>

        {/* Submit button */}
        <button type="submit" className="mx-auto lg:mx-0 hover:underline bg-green-500 text-white font-bold rounded-full mt-4 lg:mt-0 py-4 px-8 shadow  focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">Register</button>
      </form>
      <div className="my-4">
        <Link href="/login" className="text-white hover:underline">
          Already registered? Login here.
        </Link>
      </div>

{/* Google Sign-in Button */}
 {/* Google Sign-in Button */}
 <button type="button" onClick={handleGoogleSignIn} className="flex items-center justify-center w-full py-4 mb-6 text-sm font-medium transition duration-300 rounded-2xl text-grey-900 bg-white hover:bg-grey-400 focus:ring-4 focus:ring-grey-300">
 <img class="h-5 mr-2" src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-google.png" alt=""></img>
          Sign up with Google
        </button>

      <div className="mt-2">
        <Link href="/" className="text-white hover:underline">
          Back to main page
        </Link>
      </div>
    </div>
    </div>
    </div>
    </div>
    </div>
  );
};

export default RegisterPage;
