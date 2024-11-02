const { NextResponse } = require('next/server.js');
const jwt = require('jsonwebtoken');
const { fetchUser, updateTodoList, deleteTodoList } = require('../../../lib/user.js');


export async function POST(req, res) {
  if (req.method !== 'POST') {
    return NextResponse.json({ message: 'Method not allowed' });
  }

  const body = await req.json();
  // validate token using jwt
  try {
    if (body.action === 'update') {
      const todoId = await updateTodoList(body.name, body._id);
      return NextResponse.json({ message: "Todo list updated", todoId }, { status: 200 });
    } else if (body.action === 'delete') {
      const todoId = await deleteTodoList(body._id);
      if (todoId) {
        return NextResponse.json({ message: "Todo list deleted", todoId }, { status: 200 });
      } else {
        return NextResponse.json({ message: "Error deleting Todo list", todoId }, { status: 404 });
      }
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'error' }, { status: 404 });
  }
}
