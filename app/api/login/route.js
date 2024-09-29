// make a api for login and signup ( using next js )

const { compare } = require("bcryptjs");
const { NextResponse } = require("next/server.js");
const { getUserByEmail } = require("../../../lib/user.js");
const jwt = require("jsonwebtoken");


export async function POST(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  console.log('got req')
  const { email, password } = await req.json();


  const user = await getUserByEmail(email);

  
  if (!user) {
    return NextResponse.json({ status: 401, message: "Invalid email or password" });
  }

  const isPasswordValid = await compare(password, user.password);

  if (!isPasswordValid) {
    return NextResponse.json({ status: 401, message: "Invalid email or password" });
  }

  // For example, you can use a library like jsonwebtoken to generate a token
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  // You can then send the token as a response
  return NextResponse.json({ status: 200, message: "Login successful", token });

}
