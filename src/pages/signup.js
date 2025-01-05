import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import { useRouter } from 'next/router';

const Signup = () => {
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
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(userCredential.user, { displayName: username });
      localStorage.setItem('username', username);

      router.push('/dashboard');
    } catch (err) {
      console.error('Signup Error:', err.message);
      setError(err.message);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const googleUsername = result.user.displayName || 'User';
      localStorage.setItem('username', googleUsername);

      router.push('/dashboard');
    } catch (err) {
      console.error('Google Signup Error:', err.message);
      setError(err.message);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-green-300 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <img
          src="/logo.png"
          alt="Company Logo"
          className="w-96 h-96 opacity-10 animate-fadeIn"
        />
      </div>

      <div className="relative bg-white bg-opacity-90 shadow-lg rounded-lg p-10 max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-green-600 mb-6">
          Create an Account
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSignup} className="space-y-6">
          <input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 transition-all font-semibold text-lg"
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
          <a href="/login" className="text-green-500 font-semibold underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
