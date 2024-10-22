import React from 'react';
import { useParams } from 'react-router-dom';

const RegisterForm = () => {
  const { role } = useParams(); // Get the role from the URL

  return (
    <div className="relative flex items-center justify-center h-screen bg-gray-100">
      {/* Background Circles for Animation */}
      <div className="circle circle1"></div>
      <div className="circle circle2"></div>
      <div className="circle circle3"></div>

      <div className="flex shadow-lg rounded-lg bg-white max-w-4xl mx-auto">
        {/* Left Side with Logo and Message */}
        <div className="hidden md:flex flex-col justify-center bg-blue-50 p-10 rounded-l-lg w-1/2">
          <img src="/images/logo.png" alt="IdentifyX Logo" className="mb-4 size-6 rounded-lg" />
          <p className="text-gray-700 text-lg">
            Welcome to IdentifyX, where the future of radiology begins! We are thrilled to have you join our platform.
          </p>
          <p className="mt-4">
            Have an account? <a href="/login" className="text-blue-600 underline">Log in</a>
          </p>
        </div>

        {/* Right Side with Registration Form */}
        <div className="flex flex-col justify-center p-10 w-full md:w-1/2">
          <h2 className="text-3xl font-bold mb-4">
            Register {role === 'hospital' ? 'Hospital/Imaging Center/Diagnostic Lab' : 'Doctor/Radiologist'}
          </h2>
          <form>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700">First Name</label>
                <input type="text" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-gray-700">Last Name</label>
                <input type="text" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
              </div>
            </div>
            {/* Additional Form Fields */}
            <div className="mt-4">
              <label className="block text-gray-700">{role === 'hospital' ? 'Hospital/Clinic Name' : 'Practice Name'}</label>
              <input type="text" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-gray-700">Email Address</label>
                <input type="email" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-gray-700">Mobile No.</label>
                <input type="text" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-gray-700">Username</label>
              <input type="text" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-gray-700">Password</label>
                <input type="password" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-gray-700">Confirm Password</label>
                <input type="password" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-gray-700">Country</label>
              <select className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500">
                <option>India</option>
                <option>USA</option>
                <option>UK</option>
              </select>
            </div>
            <div className="flex items-center mt-4">
              <input type="checkbox" className="mr-2" />
              <label className="text-gray-700 text-sm">
                I accept the <a href="#" className="text-blue-600 underline">terms</a> and <a href="#" className="text-blue-600 underline">privacy policy</a>
              </label>
            </div>
            <button className="w-full bg-blue-500 text-white py-2 mt-4 rounded-lg hover:bg-blue-600 transition-all duration-300">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
