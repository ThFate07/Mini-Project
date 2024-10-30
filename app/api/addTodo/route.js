
const { NextResponse } = require('next/server.js');
const jwt = require('jsonwebtoken');
const { fetchUser } = require('../../../lib/user.js');
const { addTodo } = require("../../../lib/user.js");

export async function POST(req, res) {
  if (req.method !== 'POST') {
    return NextResponse.json({ message: 'Method not allowed' });
  }

  const {token, todo} = await req.json();
  // validate token using jwt
  try { 
    const payload =  jwt.verify(token, process.env.JWT_SECRET);
    console.log(payload)
    const todoId = await addTodo(todo, payload.userId)
    return NextResponse.json({status: 200, message: "Todo added", todoId});
  } catch(error) { 
    console.log(error)
    return NextResponse.json({statu: 404, message: 'error'});
  }
}