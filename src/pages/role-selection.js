import React from 'react';
import { useRouter } from 'next/router';

const RoleSelection = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 to-blue-200 text-gray-800">
      {/* Logo Section */}
      <div className="text-center">
        <img
          src="/logo.png"
          alt="Logo"
          className="w-24 h-24 mx-auto mb-6 shadow-lg rounded-full bg-white p-2"
        />
        <h1 className="text-4xl font-extrabold tracking-wide mb-2">
          Welcome to <span className="text-blue-600">MyDashboard</span>
        </h1>
        <p className="text-lg text-gray-600">
          Please select your role to proceed
        </p>
      </div>

      {/* Role Selection Buttons */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 w-10/12 md:w-6/12 lg:w-4/12">
        <button
          onClick={() => router.push('/AdminLogin')}
          className="py-4 px-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold text-lg rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300"
        >
          Admin Login/Signup
        </button>
        <button
          onClick={() => router.push('/login')}
          className="py-4 px-6 bg-green-500 hover:bg-green-600 text-white font-semibold text-lg rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300"
        >
          User Login/Signup
        </button>
      </div>

      {/* Footer Section */}
      <div className="absolute bottom-4 text-center text-gray-500">
        <p className="text-sm">
          © {new Date().getFullYear()} MyCompany. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default RoleSelection;
