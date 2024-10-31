const { NextResponse } = require('next/server.js');
const jwt = require('jsonwebtoken');
const {  validateToken } = require('../../../lib/user.js');

export async function POST(req, res) {
  if (req.method !== 'POST') {
    return NextResponse.json({ message: 'Method not allowed' });
  }

  const { token } = await req.json();
  // validate token using jwt
  const {status, message, username} = await validateToken(token);

  
  return NextResponse.json({message, username}, {status});
}