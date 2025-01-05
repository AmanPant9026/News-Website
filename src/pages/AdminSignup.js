import React, { useState } from 'react';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import { useRouter } from 'next/router';

const AdminSignup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, { displayName: username });
      localStorage.setItem('adminUsername', username);
      alert('Admin account created successfully');
      router.push('/admin-login');
    } catch (err) {
      console.error('Signup Error:', err.message);
      setError(err.message);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const googleUsername = result.user.displayName || 'Admin';
      localStorage.setItem('adminUsername', googleUsername);
      alert('Admin signed up successfully');
      router.push('/admin-dashboard');
    } catch (err) {
      console.error('Google Signup Error:', err.message);
      setError(err.message);
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

      {/* Signup Form */}
      <div className="relative bg-white bg-opacity-90 shadow-lg rounded-lg p-10 max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">
          Create Admin Account
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSignup} className="space-y-6">
          <input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
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
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-gray-700 text-white py-3 rounded-md hover:bg-gray-800 transition-all font-semibold text-lg"
          >
            Sign Up
          </button>
        </form>
        <div className="flex justify-center mt-6">
          <button
            onClick={handleGoogleSignup}
            className="flex items-center justify-center p-3 bg-gray-200 hover:bg-gray-300 rounded-full shadow-md transition-all"
          >
            <img src="/google-icon.png" alt="Google Icon" className="w-8 h-8" />
          </button>
        </div>
        <p className="mt-6 text-center text-gray-600">
          Already have an account?{' '}
          <a
            href="/admin-login"
            className="text-gray-700 font-semibold underline"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default AdminSignup;
