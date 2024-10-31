const { NextResponse } = require('next/server.js');
const jwt = require('jsonwebtoken');
const {  validateToken } = require('../../../lib/user.js');

export async function POST(req, res) {
  if (req.method !== 'POST') {
    return NextResponse.json({ message: 'Method not allowed' });
  }

  const { token } = await req.json();
  console.log(token)
  // validate token using jwt
  const {status, message, username} = await validateToken(token);

  console.log(status, message, username)
  
  return NextResponse.json({message, username}, {status});
}