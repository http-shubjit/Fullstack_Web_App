
const USER = require("../models/user")

const {setUser} =require("../services/auth")



async function handleSignup(req, res) {  
    let { name, phone, password,role } = req.body;
    
    if (req.role == "ADMIN")
        role = "ADMIN"
    else
        role = "NORMAL"

    console.log(role)
    const newUser=await USER.create({
        name, phone, password,role 
    })
    
    if (newUser) {
    const token= setUser(newUser)
    res.cookie("uuid", token);
    return res.redirect('/')
    }
    return res.render('signup', {
            error:'invalid Details'
        })
    
}

async function handleSignin(req, res) {  
     const {  phone, password } = req.body;
    const user = await USER.findOne({ phone, password })
   
    if (!user)
        return res.render('signin', {
            error:'invalid Details'
        })
   
    const token= setUser(user)//here we get the token which is return from setUser();
    res.cookie("uuid", token);//set uuid in our cookie
   
    return res.redirect('/')
}


module.exports = {
    handleSignup,
    handleSignin
}