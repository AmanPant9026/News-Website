import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Track user authentication state
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        window.location.href = '/login'; // Redirect if not logged in
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      {user ? (
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
          <div className="flex flex-col items-center">
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover mb-4 shadow-md"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold text-gray-500 mb-4 shadow-md">
                {user?.displayName?.charAt(0) || 'U'}
              </div>
            )}
            <h1 className="text-2xl font-semibold text-gray-800 mb-2">
              {user.displayName || 'User'}
            </h1>
            <p className="text-gray-600">{user.email}</p>
          </div>
          <div className="mt-6 space-y-4">
            <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
              Edit Profile
            </button>
            <button
              onClick={() => {
                auth.signOut();
                window.location.href = '/login';
              }}
              className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Profile;
