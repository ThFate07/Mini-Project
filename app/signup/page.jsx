"use client";

import React, { useState } from 'react';
import Link from 'next/link';

import { redirect } from 'next/dist/server/api-utils';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Cookies from 'js-cookie';

const Signup = () => {
    // add extra fields 
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error ,setError] = useState('');
  const router = useRouter();

  const initializeTodo = async () => {
    const initTodoList = {
      name: "New List",
      data: [],
      sort: null,
      filter: null,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/addTodoList",
        { initTodoList, token: Cookies.get("token") }
      );
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // use axios to send req to backend 
    
    try { 
      const response = await axios.post('http://localhost:3000/api/signup', {email, username, password});
      if (response.status === 200) {
~        initializeTodo();
        router.push('/app');
      } 
    } catch (err) { 
      setError(err.response.data.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-700">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        {/* Yellow bar to resemble the top bar */}
        <div className="bg-yellow-400 py-3 rounded-t-lg">
          <h2 className=" text-2xl font-semibold text-center text-gray-300" >Client Signup</h2>
        </div>

        <form onSubmit={handleSubmit} className="mt-6">
        <div className="mb-4">
            <label htmlFor="email" className="block text-gray-300 mb-2">Email</label>
            <input 
              type="text" 
              id="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="w-full p-3 rounded-md bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Enter your Email"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-300 mb-2">Username</label>
            <input 
              type="text" 
              id="username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              className="w-full p-3 rounded-md bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-300 mb-2">Password</label>
            <input 
              type="password" 
              id="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="w-full p-3 rounded-md bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Enter your password"
            />
            <p className="mt-1 text-gray-500" >Already have an account? <Link className='underline text-gray-500' href={'/login'}>Login</Link></p>
            <p className='text-red-500'>{error}</p>
          </div>
          <div className="flex items-center mb-6">
            <input 
              type="checkbox" 
              id="rememberMe" 
              checked={rememberMe} 
              onChange={(e) => setRememberMe(e.target.checked)} 
              className="h-4 w-4 text-yellow-400 focus:ring-yellow-400 bg-gray-600 border-none rounded"
            />
            <label htmlFor="rememberMe" className="ml-2 text-gray-300">Remember me</label>
          </div>
          <button 
            type="submit" 
            className="w-full p-3 rounded-md bg-gray-300 text-gray-900 font-semibold hover:bg-gray-400 transition-colors"
          >
            Signup
          </button>
          
        </form>
      </div>
    </div>
  );
};

export default Signup;
