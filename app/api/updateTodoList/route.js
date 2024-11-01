
const { NextResponse } = require('next/server.js');
const jwt = require('jsonwebtoken');
const { fetchUser } = require('../../../lib/user.js');
const { updateTodoList } = require("../../../lib/user.js");

export async function POST(req, res) {
  if (req.method !== 'POST') {
    return NextResponse.json({ message: 'Method not allowed' });
  }

  const {token, name, _id} = await req.json();
  // validate token using jwt
  try { 
    const payload =  jwt.verify(token, process.env.JWT_SECRET);

    console.log()
    const todoId = await updateTodoList(name, _id)
    return NextResponse.json({ message: "Todo list updated", todoId}, {status: 200});
  } catch(error) { 
    console.log(error)
    return NextResponse.json({message: 'error'}, {status: 404});
  }
}