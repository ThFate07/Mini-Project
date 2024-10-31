const clientPromise = require("./mongodb");
const { ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');

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
  
  const response = await db.collection('users').findOne({ _id: new ObjectId(userid) });  

  if (response) {
      return response.username;
  } else {
    return null;
  }

}

async function addTodo(todo, userid) { 
  try { 

    const client = await clientPromise;
    const db = client.db("todo-list");
    const userTodos = await db.collection('todos').findOne({_id: new ObjectId(userid)});
    if (!userTodos) {
      await db.collection('todos').insertOne({userid, todos: [todo]});
    } else {
      await db.collection('todos').updateOne({userid}, {$push: {todos: todo}});
    }
    return true;
  } catch (e) { 
    console.log(e)
    return false;
  }

}

async function fetchTodo(userId) {
  const client = await clientPromise;
  const db = client.db("todo-list");
  const response = await db.collection('todos').findOne({userid: userId});
  if (response) {
    const { todos } = response;

    return todos[0];
  } else {
    return null;
  }
}

async function validateToken(token) { 
  // validate token using jwt
  try { 
    
    const payload =  jwt.verify(token, process.env.JWT_SECRET);
    const username = await fetchUser(payload.userId)
    if (username) { 

      return { status: 200, message: "is Logged in", username};
    } else { 
      return { status: 404, message: "User not found"};
    }
  } catch(error) { 
    return {status: 404, message: error};
  }
}

module.exports = { getUserByEmail, createUser, fetchUser,addTodo,fetchTodo, validateToken};