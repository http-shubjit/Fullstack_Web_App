const jwt = require("jsonwebtoken")

const SECRET="BAJARANGBALI,ME,RADHAKRISHNA"


function setUser(user) {
const token =jwt.sign({
      id: user._id,
   phone: user.phone,
   role:user.role
}, SECRET)
   return token;
  // it return a jwt token
}

function getUser(uuid) {

   if (!uuid)
      return null;

try {
   return jwt.verify(uuid,SECRET);
} catch (error) {
   return null;
}


    
}

module.exports = {
   setUser, getUser
}