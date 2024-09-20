const mongose = require("mongoose");

async function getCoonectToDB(url) {
    return mongose.connect(url);
    
}

module.exports = {
    getCoonectToDB
}