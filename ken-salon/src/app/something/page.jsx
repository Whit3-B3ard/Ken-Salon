"use client";

import Head from "next/head";

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Redirect the message to the specified email
    window.location.href = "mailto:ken.beauty1@hotmail.com";
  };

  return (
    <div>
      <Head>
        <title>Contact Us</title>
      </Head>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Contact Us</h1>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="mb-8 flex flex-col">
          <div className="mb-4">
            <label
              htmlFor="message"
              className="block font-medium text-gray-700"
            >
              Message:
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              className="form-textarea mt-1 block w-full rounded border-gray-800 outline focus:border-blue-400 focus:ring focus:ring-blue-400"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-slate-600 text-white py-2 px-4 hover:bg-green-500 mr-0 w-40 h-10 self-end rounded-md focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
          >
            Send Message
          </button>
        </form>

        <div className="flex">
          {/* Address */}
          <div className="w-1/3 pr-4">
            <div>
              <h2 className="text-xl font-semibold mb-2">Address:</h2>
              <p>Marina Mall Ring Road,</p>
              <p>Al Marina,</p>
              <p>Abu Dhabi</p>
            </div>
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-2">Ring us on</h2>
              <p>Marina Mall Ring Road,</p>
              <p>Al Marina,</p>
              <p>Abu Dhabi</p>
            </div>
          </div>
          {/* Google Map */}
          <div className="mb-8 w-2/3 rounded-lg overflow-hidden">
            <iframe
              src="https://maps.google.com/maps?q=Marina%20Mall%20Ring%20Road,%20Al%20Marina,%20Abu%20Dhabi&t=&z=13&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Google Map"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
