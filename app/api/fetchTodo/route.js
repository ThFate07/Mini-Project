const { NextResponse } = require('next/server.js');
const jwt = require('jsonwebtoken');
const { fetchUser, fetchTodo } = require('../../../lib/user.js');

export async function POST(req, res) {
  if (req.method !== 'POST') {
    return NextResponse.json({ message: 'Method not allowed' });
  }

  try {
    const todos = await fetchTodo(req.headers.get("user-id"));
    return NextResponse.json({ status: 200, message: "Todos fetched", todos });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ status: 404, message: 'error' });
  }
}
