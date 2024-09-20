const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    phone: { 
        type: String, 
        required: true,
        unique: true 
    },
    role:{
        type: String,
        default:"NORMAL"  
   },
    password: { 
        type: String, 
        required: true 
    }
});
module.exports = mongoose.model('user', UserSchema);