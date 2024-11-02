const { NextResponse } = require('next/server.js');
const jwt = require('jsonwebtoken');
const { updateTodo } = require("../../../lib/user.js");

export async function POST(req, res) {
  if (req.method !== 'POST') {
    return NextResponse.json({ message: 'Method not allowed' });
  }

  const {todo, _id} = await req.json();
  // validate token using jwt
  try { 
    
    const isUpdated = await updateTodo(todo, _id)
    if (isUpdated) { 

        return NextResponse.json({ message: "Todo updated"}, {status: 200});
    } else {
        
        return NextResponse.json({ message: "Error updating todo"}, {status: 404});
    }
  } catch(error) { 
    console.log(error)
    return NextResponse.json({message: 'error'}, {status: 404});
  }
}