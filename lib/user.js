const clientPromise = require("./mongodb");


async function getUserByEmail(email) {
  const client = await clientPromise;
  const db = client.db('todo-list'); // Replace with your actual database name
  return await db.collection('users').findOne({ email });
}

// create user
async function createUser(userData) {
  const client = await clientPromise;
  const db = client.db('todo-list'); // Replace with your actual database name
  const { insertedId } = await db.collection('users').insertOne(userData);
  return insertedId;
}

async function fetchUser(userid) { 
  const client = await clientPromise;
  const db = client.db("todo-list");
  console.log(userid)
  const {username} = await db.collection('users').findOne({userid});
  return username

}

module.exports = { getUserByEmail, createUser, fetchUser };