import PageLoader from 'next/dist/client/page-loader.js';

const { NextResponse } = require('next/server.js');
const jwt = require('jsonwebtoken');
const { fetchUser } = require('../../../lib/user.js');

export async function POST(req, res) {
  if (req.method !== 'POST') {
    return NextResponse.json({ message: 'Method not allowed' });
  }

  const {token } = await req.json();
  // validate token using jwt
  try { 
    
    const payload =  jwt.verify(token, process.env.JWT_SECRET);
    const username = await fetchUser(payload.userId)
    return NextResponse.json({status: 200, message: "is Logged in", username});
  } catch(error) { 
    console.log(error)
    return NextResponse.json({statu: 404, message: 'error'});
  }
}