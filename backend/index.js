require('dotenv').config();
const express = require("express");
const { connectMongoDB} = require('./connection');
const {logResponse}=require('./middlewares/index')
const useRouter=require("./routes/user") // Move this line up

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logResponse("log.txt"));



const URL = process.env.URL


connectMongoDB(URL)
  .then(() => console.log("MongoDB connected successfully."))
  .catch((err) => console.error("MongoDB connection error:", err));



// user
app.use("/users",useRouter);


  




// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});