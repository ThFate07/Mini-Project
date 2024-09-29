const { hash } = require('bcryptjs');
const { createUser, getUserByEmail } = require("../../../lib/user.js"); // Assume these functions exist
const { NextResponse } = require('next/server.js');
const jwt = require('jsonwebtoken');


export async function POST(req, res) {
  if (req.method !== 'POST') {
    return NextResponse.json({ message: 'Method not allowed' });
  }

  const { email, username, password } = await req.json();

  // Validate input
  if (!email || !password || !username) {
    return NextResponse.json({ status:400 , message: 'Email and password are required' });
  }

  // Check if user already exists
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return NextResponse.json({ status: 409, message: 'User already exists' });
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

  console.log(userId)
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });

  if (userId) { 

    return NextResponse.json({ message: 'User created', userId , status: 200, token});
  }
}