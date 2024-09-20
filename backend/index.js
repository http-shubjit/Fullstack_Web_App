require('dotenv').config();
const express = require("express");
const path = require('path')
const cors = require('cors');
const cookieParser = require('cookie-parser')


const { getCoonectToDB } = require("./connection.js"); // 
const{checkForAunthentication,restrictTO}=require("./middlewares/auth.js")




const urlRoute = require("./routes/url.js")
const staticRoute = require("./routes/staticRoute.js")
const userRoute=require("./routes/user.js")


const app = express();
PORT = 8000;



const url=process.env.URL

getCoonectToDB(url)
  .then(() => console.log("MongoDB connected successfully."))
  .catch((err) => console.error("MongoDB connection error:", err));

app.set("view engine", 'ejs');//i tell epress i use view engine as ejs 
app.set("views",path.resolve("./views"))// and tell exprees all my views are in ./views folder here "views" is a constructor


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(checkForAunthentication);




app.get('/test', (req, res) => {
    res.json({ message: 'Hello from the backend!' });
});


app.use("/",staticRoute)

//
app.use("/url",restrictTO(["NORMAL","ADMIN"]), urlRoute)

app.use("/user",userRoute)


app.listen(PORT, () => {
  console.log("Server Start at http://localhost:"+PORT);
});


