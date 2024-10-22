import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterSelection = () => {
  const navigate = useNavigate();

  const handleSelection = (role) => {
    navigate(`/register/${role}`);
  };

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

        {/* Right Side with Selection */}
        <div className="flex flex-col justify-center p-10 w-full md:w-1/2">
          <h2 className="text-3xl font-bold mb-4">Register</h2>
          <div className="grid grid-cols-2 gap-4">
            <div
              className="cursor-pointer border rounded-lg p-4 text-center hover:bg-blue-100 transition"
              onClick={() => handleSelection('hospital')}
            >
              <img src="/images/hospital.png" alt="Hospital" className="mx-auto mb-4" />
              <p className="font-semibold">Hospital/Imaging Center/Diagnostic Lab</p>
            </div>
            <div
              className="cursor-pointer border rounded-lg p-4 text-center hover:bg-blue-100 transition"
              onClick={() => handleSelection('doctor')}
            >
              <img src="/images/doctor.png" alt="Doctor" className="mx-auto mb-4" />
              <p className="font-semibold">Doctor/Radiologist</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterSelection;
