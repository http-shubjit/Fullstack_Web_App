const fs = require("fs");


function logResponse(filename) {
    return ((req, res, next) => {
  const formattedDate = new Date(Date.now()).toLocaleString();
  fs.appendFile(
    filename,
    `${formattedDate} || Request method: ${req.method} || Request path: ${req.path}\n`,
    (err) => {
      if (err) throw err;
      next();
    }
  );
})
}

module.exports={logResponse}

