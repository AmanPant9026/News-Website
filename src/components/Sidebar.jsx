import React from 'react';
import { useRouter } from 'next/router';

const Sidebar = () => {
  const router = useRouter();

  return (
    <aside className="bg-gray-900 text-gray-100 w-64 min-h-screen p-6 flex flex-col justify-between shadow-lg">
      {/* Logo Section */}
      <div>
        <div className="flex items-center space-x-3 mb-8">
          <img
            src="/logo.png"
            alt="Company Logo"
            className="w-14 h-14 rounded-full shadow-md"
          />
          <h1 className="text-2xl font-extrabold text-purple-400">
            MyDashboard
          </h1>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-4">
          <button
            onClick={() => router.push('/')}
            className={`flex items-center w-full px-4 py-3 rounded-lg transition-all ${
              router.pathname === '/'
                ? 'bg-purple-600 text-white'
                : 'hover:bg-gray-800 hover:text-purple-400'
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 mr-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 10h11M9 21V3m12 12l-4-4m0 0l4-4m-4 4H9"
              />
            </svg>
            Dashboard
          </button>

          <button
            onClick={() => router.push('/profile')}
            className={`flex items-center w-full px-4 py-3 rounded-lg transition-all ${
              router.pathname === '/profile'
                ? 'bg-purple-600 text-white'
                : 'hover:bg-gray-800 hover:text-purple-400'
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 mr-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5.121 17.804A2.992 2.992 0 005 19.828V21h14v-1.172a2.992 2.992 0 00-.121-2.024M15 10a5 5 0 11-10 0 5 5 0 0110 0zm-5 5a5 5 0 110-10 5 5 0 010 10z"
              />
            </svg>
            Profile
          </button>

          <button
            onClick={() => {
              localStorage.clear();
              router.push('/role-selection'); // Redirect to Role Selection page
            }}
            className="flex items-center w-full px-4 py-3 rounded-lg hover:bg-gray-800 hover:text-purple-400 transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 mr-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12H3m12 0l4-4m-4 4l4 4m-4-4V3"
              />
            </svg>
            Logout
          </button>
        </nav>
      </div>

      {/* Footer Section */}
      <div className="text-center mt-10">
        <p className="text-sm text-gray-400">© 2025 MyCompany</p>
        <p className="text-xs text-gray-500">All rights reserved.</p>
      </div>
    </aside>
  );
};

export default Sidebar;
