"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, redirect, useSearchParams } from "next/navigation";
import { background1, box, text, title, button1 } from "@/styles/styles01.jsx";
import { useRegister } from "@/context/userContext";
import { signIn, useSession } from "next-auth/react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login, error } = useRegister();
  //const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const { data: session, status } = useSession();
  if (session) {
    redirect("/");
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // await signIn(email, password, rememberMe);
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl,
        rememberMe,
      });
      if (!res?.error) {
        redirect(callbackUrl);
      } else {
        alert("Invalid email or password");
      }
    } catch (error) {
      console.log(error.message || "Login failed due to an unexpected error");
    }
  };

  const handleGoogleSignIn = () => {
    signIn("google");
  };

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
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full h-full pb-6 text-center bg-white rounded-3xl p-12"
      >
        <h2 className="mb-3 text-4xl font-extrabold text-dark-grey-900">Login</h2>
        {/* Email field */}
        <p class="mb-4 text-grey-700">Enter your email and password</p>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="mb-2 text-sm text-start text-grey-900"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="mail@example.com"
            className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl border-2"
          />
        </div>
        {/* Password field with toggle */}
        <div className="mb-4 relative">
          <label
            htmlFor="password"
            className="mb-2 text-sm text-start text-grey-900"
          >
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter a password"
            className="flex items-center w-full px-5 py-4 mb-5 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl border-2"
          />
          <span
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 pr-3 pt-5 flex items-center cursor-pointer text-gray-500"
          >
            {showPassword ? (
              <span className="text-sm mb-4">Hide</span>
            ) : (
              <span className="text-sm mb-4">Show</span>
            )}
          </span>
        </div>
        {/* Remember Me Checkbox */}
        <div className="mb-4 flex justify-center gap-4">
        <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
          <label
            htmlFor="rememberMe"
            className="block text-sm font-medium text-gray-900"
          >
            
            Remember Me
          </label>
        </div>
        {/* Error Message Display */}
        {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
        {/* Submit Button */}
        <button
          type="submit"
          className="mx-auto lg:mx-0 hover:underline bg-green-500 text-white font-bold rounded-full mt-4 lg:mt-0 py-4 px-8 shadow  focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out "
        >
          Login
        </button>
        <p className="text-sm leading-relaxed text-grey-900 pt-6">Not registered yet? <a href="/register" class="font-bold text-green-500">Create an Account</a></p>
      </form>
      <div class="flex items-center mb-3">
              <hr class="h-0 border-b border-solid border-grey-500 grow"></hr>
              <p class="mx-4 text-grey-600">or</p>
              <hr class="h-0 border-b border-solid border-grey-500 grow"></hr>
            </div>
      {/* Google Sign-in Button */}
      <button
        type="button"
        onClick={handleGoogleSignIn}
        className="flex items-center justify-center w-full py-4 mb-6 text-sm font-medium transition duration-300 rounded-2xl text-grey-900 bg-white hover:bg-grey-400 focus:ring-4 focus:ring-grey-300"
      >
        <img class="h-5 mr-2" src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-google.png" alt=""></img>
        Sign in with Google
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

export default LoginPage;
