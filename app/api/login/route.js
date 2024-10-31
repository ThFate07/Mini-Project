// make a api for login and signup ( using next js )

import { response } from "express";

const { compare } = require("bcryptjs");
const { NextResponse } = require("next/server.js");
const { getUserByEmail } = require("../../../lib/user.js");
const jwt = require("jsonwebtoken");


export async function POST(req, res) {
  if (req.method !== "POST") {
    return NextResponse.json({ message: "Method not allowed" }, {status: 405});
  }


  const { email, password } = await req.json();


  const user = await getUserByEmail(email);

  
  if (!user) {
    return NextResponse.json({ message: "Invalid email or password" },{ status: 401});
  }

  const isPasswordValid = await compare(password, user.password);
  
  if (!isPasswordValid) {
    return NextResponse.json({message: "Invalid email or password" }, { status: 401});
  }

  // For example, you can use a library like jsonwebtoken to generate a token
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  const response = NextResponse.json({message: "Login successful"}, {status: 200});
  
  // You can then send the token as a response
  const cookieOptions = {
    httpOnly: false, // Prevents JavaScript access to the cookie
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    maxAge: 60 * 60 * 24, // Cookie expiration in seconds (1 day)
    path: '/', // Cookie path
  };

  response.cookies.set('token', token, cookieOptions);
  response.cookies.set('username', user.username, cookieOptions);

  return response
}
