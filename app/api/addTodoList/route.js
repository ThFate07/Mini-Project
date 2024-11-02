const { NextResponse } = require('next/server.js');
const jwt = require('jsonwebtoken');
const {  addTodoList } = require('../../../lib/user.js');

export async function POST(req, res) {
  if (req.method !== 'POST') {
    return NextResponse.json({ message: 'Method not allowed' });
  }

  const { initTodoList, _id } = await req.json();
  
  try {
    const todoId = await addTodoList(initTodoList, req.headers.get('user-id'), _id);
    return NextResponse.json({ message: "Todo added", todoId }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'error' }, { status: 404 });
  }
}
