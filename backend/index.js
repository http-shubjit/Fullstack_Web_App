const fs=require("fs")
const express = require("express");
const mongoose = require("mongoose");
const app = express(); 


app.use(express.urlencoded({ extended: false }));


app.use((req, res, next) => {
const formattedDate = new Date(Date.now()).toLocaleString(); 
fs.appendFile(
    "log.txt",
    `${formattedDate} || Request method is : ${req.method} || Request path is :  ${req.path}\n`,
    (err) => {
      if (err) throw err;
      next();
    }
  );
});

mongoose
  .connect(
    "Your Url"
  )
  .then(() => {
    console.log("Mongo Db Connect..");
  })
  .catch((err) => {
    console.log("Error" + err);
  });

  const userSchmea = new mongoose.Schema({
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
      required: true,
    },
    job_tittle: {
      type: String,
    },
  });

const User = mongoose.model("User", userSchmea);
  
app.post("/post",async (req, res) => {
    const body = req.body;
    console.log(req)
    if (
      !body ||
      !body.first_name ||
      !body.last_name ||
      !body.email ||
      !body.gender ||
      !body.job_tittle
    ) {
      res.status(400).json({ msg: "all field are required" });
    }
    const result = await User.create({
      first_name: body.first_name,
      last_name: body.last_name,
      email: body.email,
      gender: body.gender,
      job_tittle: body.job_tittle,
    });
    res.status(201).json({ msg: "user created" });
})
  
app.get("/get", async (req, res) => {
    const alluser = await User.find({});
    const html = alluser.map((user) => `<li>${user.first_name}</li>`).join("");
    res.send(alluser);
  });



app.listen(8000, () => {
  console.log("server start");
});
