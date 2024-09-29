"use client";

import { useState, useEffect } from 'react';
import './globals.css';
import { AuthContext } from '../lib/AuthContext.js';

export default function RootLayout({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState({logged: false, username: ''});

  useEffect(() => {
    // Check if the user is logged in using their token
    const token = localStorage.getItem('token');
    console.log("sending req: ")
    fetch('http://localhost:3000/api/validate', {
      method: "POST",
      body: JSON.stringify({token})
    }).then(res => res.json()).then(data => { 
      console.log(data)
      if (data.status === 200) {
        console.log("user is logged in: ", data.username)
        setIsLoggedIn({logged: true, username: data.username});
      } else { 
        console.log("user is not logged in")
        setIsLoggedIn(false)
      }
    }).catch(err => setIsLoggedIn(false));
    
  }, []);

  return (
    <AuthContext.Provider value={isLoggedIn}>
      <html lang="en">
        <body>
          {children}
        </body>
      </html>
    </AuthContext.Provider>
  );
}