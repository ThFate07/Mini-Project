
const { NextResponse } = require('next/server.js');
const jwt = require('jsonwebtoken');
const { fetchUser } = require('../../../lib/user.js');
const { addTodoList } = require("../../../lib/user.js");

export async function POST(req, res) {
  if (req.method !== 'POST') {
    return NextResponse.json({ message: 'Method not allowed' });
  }

  const {token, initTodoList, _id} = await req.json();
  // validate token using jwt
  try { 
    const payload =  jwt.verify(token, process.env.JWT_SECRET);
    const todoId = await addTodoList(initTodoList, payload.userId, _id)
    return NextResponse.json({ message: "Todo added", todoId}, {status: 200});
  } catch(error) { 
    console.log(error)
    return NextResponse.json({message: 'error'}, {status: 404});
  }
}