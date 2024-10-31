
const { NextResponse } = require('next/server.js');
const jwt = require('jsonwebtoken');
const { fetchUser } = require('../../../lib/user.js');
const {  fetchTodo} = require("../../../lib/user.js");

export async function POST(req, res) {
  if (req.method !== 'POST') {
    return NextResponse.json({ message: 'Method not allowed' });
  }

  const {token} = await req.json();
    // validate token using jwt
    try {
        const payload =  jwt.verify(token, process.env.JWT_SECRET);
        const todos = await fetchTodo(payload.userId);
        return NextResponse.json({status: 200, message: "Todos fetched", todos});
    } catch (e) { 
        console.log(e)
        return NextResponse.json({status: 404, message: 'error'});
    }
}