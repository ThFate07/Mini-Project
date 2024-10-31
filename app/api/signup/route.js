const { hash } = require('bcryptjs');
const { createUser, getUserByEmail } = require("../../../lib/user.js"); // Assume these functions exist
const { NextResponse } = require('next/server.js');
const jwt = require('jsonwebtoken');


export async function POST(req, res) {
  if (req.method !== 'POST') {
    return NextResponse.json({ message: 'Method not allowed' }, {status: 404});
  }

  const { email, username, password } = await req.json();

  // Validate input
  if (!email || !password || !username) {
    return NextResponse.json({   message: 'Email and password are required' }, {status:400});
  }

  // Check if user already exists
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return NextResponse.json({ message: 'User already exists' }, {status: 409});
  }
  
  const hashedPassword = await hash(password, 10)
  // Create new user
  const newUser = {
    email,
    username,
    password: hashedPassword, 
    createdAt: new Date(),
  };

  const userId = await createUser(newUser);

  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
  const response = NextResponse.json({ message: 'User created', token}, {status: 200});

  const cookieOptions = {
    httpOnly: false, // Prevents JavaScript access to the cookie
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    maxAge: 60 * 60 * 24, // Cookie expiration in seconds (1 day)
    path: '/', // Cookie path
  };
  
  response.cookies.set('token', token, cookieOptions);
  response.cookies.set('username', username, cookieOptions);

  if (userId) { 

    return response
  }
}