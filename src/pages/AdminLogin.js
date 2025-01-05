import React, { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import { useRouter } from 'next/router';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Admin logged in successfully');
      router.push('/admin-dashboard'); // Redirect to admin dashboard
    } catch (err) {
      setError('Login failed. ' + err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);

      // Store the user's displayName or email
      const username = result.user.displayName || result.user.email;
      localStorage.setItem('adminUsername', username);

      router.push('/admin-dashboard'); // Redirect to admin dashboard
    } catch (err) {
      if (err.code === 'auth/popup-closed-by-user') {
        console.warn('Google Sign-In popup was closed by the user');
        setError('Sign-in popup closed. Please try again.');
      } else {
        console.error('Google Sign-In Error:', err.message);
        setError('Failed to sign in with Google. Please try again.');
      }
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-200 to-gray-400 overflow-hidden">
      {/* Background Logo */}
      <div className="absolute inset-0 flex items-center justify-center">
        <img
          src="/logo.png"
          alt="Company Logo"
          className="w-96 h-96 opacity-10 animate-fadeIn"
        />
      </div>

      {/* Admin Login Form */}
      <div className="relative bg-white bg-opacity-90 shadow-lg rounded-lg p-10 max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Admin Login
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-6">
          <input
            type="email"
            placeholder="Admin Email"
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-gray-700 text-white py-3 rounded-md hover:bg-gray-800 transition-all font-semibold text-lg"
          >
            Login
          </button>
        </form>
        <div className="flex justify-center mt-6">
          <button
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center p-3 bg-gray-200 hover:bg-gray-300 rounded-full shadow-md transition-all"
          >
            <img src="/google-icon.png" alt="Google Icon" className="w-8 h-8" />
          </button>
        </div>
        <p className="mt-6 text-center text-gray-600">
          Don&apos;t have an account?{' '}
          <a href="/AdminSignup" className="text-gray-800 font-semibold underline">
            Sign up
          </a>
        </p>
        <p className="mt-2 text-center text-gray-600">
          Back to{' '}
          <a href="/role-selection" className="text-gray-800 font-semibold underline">
            Role Selection
          </a>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
