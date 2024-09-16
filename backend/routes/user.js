// const { MongoClient } = require("mongodb");
// async function fetchData() {
//   const client = new MongoClient(URL);
//   try {
//     await client.connect();
//     console.log("MongoDB Connected");
//     const db = client.db("sample_restaurants");
//     const collection = db.collection("restaurants");
//     const allRestaurants = await collection.find({}).toArray();
//     return allRestaurants;
//   } catch (err) {
//     console.error("Error connecting to MongoDB:", err);
//   } finally {
//     await client.close();
//   }
// }


const express = require("express");
const router = express.Router();
const User = require('../models/user')
const { GetAllUser, createUser, getUserById, updateUser, deleteUser } = require('../controllers/user');


//All Handler
// Route to create a new user
router.post("/", createUser);

// Route to get all users
router.get("/", GetAllUser);

// Route to get a user by ID
router.get("/:id", getUserById);

// Route to update a user by ID
router.put("/:id", updateUser);

// Route to delete a user by ID
router.delete("/:userId", deleteUser);


module.exports = router;